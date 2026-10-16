import { test, expect, type Page } from "@playwright/test";

const host = "https://kieksme.github.io/csp-brand";
async function website(page: Page) {
  const events: Record<string, any>[] = [];
  await page.route("https://analytics-api.kieks.me/**", async (route) => {
    const request = route.request();
    events.push({
      body: request.postDataJSON(),
      headers: await request.allHeaders(),
    });
    await route.fulfill({
      status: 201,
      body: "{}",
      contentType: "application/json",
    });
  });
  // Exercise the production origin while serving the actual static build locally.
  await page.route(`${host}/**`, async (route) => {
    const url = new URL(route.request().url());
    const response = await page.request.get(
      `http://127.0.0.1:4322${url.pathname}`,
    );
    await route.fulfill({ response });
  });
  return events;
}

test("production events follow real interactions and omit private data on returning visits", async ({
  page,
}) => {
  const events = await website(page);
  await page.goto(
    `${host}/?email=private-sentinel&utm_source=private-sentinel#private-sentinel`,
  );
  await expect
    .poll(() => events.filter((e) => e.body.ev === "SITE_VIEW").length)
    .toBe(1);
  await page.locator(".faq-item summary").first().click();
  await expect
    .poll(() => events.some((e) => e.body.ev === "FAQ_OPEN"))
    .toBe(true);
  // Prevent the browser opening email/external apps after the analytics handler runs.
  await page.evaluate(() =>
    window.addEventListener("click", (event) => {
      if (
        (event.target as Element).closest(
          'a[href^="mailto:"], a[href*="csp-acme"], a[href*="github.com"]',
        )
      )
        event.preventDefault();
    }),
  );
  await page.locator("#contact .contact-mail").click();
  await page.locator(".hero-copy a").filter({ hasText: "Demo" }).click();
  await expect
    .poll(() => events.some((e) => e.body.ev === "CONTACT_CLICK"))
    .toBe(true);
  await expect
    .poll(() => events.some((e) => e.body.ev === "DEMO_CLICK"))
    .toBe(true);
  await page
    .locator(".plugin-card h3 a")
    .filter({ hasText: "Microsoft Teams" })
    .click();
  await expect(page).toHaveURL(/\/plugins\/#teams$/);
  await expect
    .poll(() => events.some((e) => e.body.ev === "PLUGINS_VIEW"))
    .toBe(true);
  await page.evaluate(() =>
    window.addEventListener("click", (event) => event.preventDefault()),
  );
  await page.locator("#teams .text-link").click();
  await expect
    .poll(() => events.some((e) => e.body.ev === "DOCS_CLICK"))
    .toBe(true);
  await page.goto(`${host}/`);
  await expect.poll(() => events.filter((e) => !e.body.ev).length).toBe(3);
  for (const { body, headers } of events) {
    expect(body.pid).toBe("poqo5aTL3ArD");
    expect(body).not.toHaveProperty("unique");
    expect(JSON.stringify(body)).not.toMatch(
      /private-sentinel|mailto|kontakt@|utm_|subject|\?/,
    );
    expect(headers).not.toHaveProperty("cookie");
    expect(headers).not.toHaveProperty("referer");
    expect(Object.keys(body)).toEqual(
      expect.arrayContaining(["pid", "pg", "lc", "tz"]),
    );
  }
});

test("English components track downloads and language without reading user input", async ({
  page,
}) => {
  const events = await website(page);
  await page.goto(`${host}/en/docs/components/`);
  await page.getByLabel("Your name", { exact: true }).fill("private-sentinel");
  await page.evaluate(() =>
    window.addEventListener("click", (event) => event.preventDefault()),
  );
  await page.locator('.ui-doc-intro a[href$=".tgz"]').click();
  await expect
    .poll(() => events.some((e) => e.body.ev === "DOWNLOAD_CLICK"))
    .toBe(true);
  await page.locator(".language-link").click();
  await expect
    .poll(() => events.some((e) => e.body.ev === "LANGUAGE_SWITCH"))
    .toBe(true);
  expect(
    events.filter((e) => e.body.ev).every((e) => e.body.meta.locale === "en"),
  ).toBe(true);
  expect(JSON.stringify(events)).not.toContain("private-sentinel");
});

test("DNT, local development and 404s send no analytics", async ({ page }) => {
  const events = await website(page);
  await page.addInitScript(() =>
    Object.defineProperty(navigator, "doNotTrack", {
      value: "1",
      configurable: true,
    }),
  );
  await page.goto(`${host}/`);
  await page.locator(".faq-item summary").first().click();
  await page.waitForTimeout(200);
  expect(events).toEqual([]);
  await page.addInitScript(() =>
    Object.defineProperty(navigator, "doNotTrack", {
      value: "0",
      configurable: true,
    }),
  );
  await page.goto("./");
  await page.locator(".faq-item summary").first().click();
  await page.waitForTimeout(200);
  expect(events).toEqual([]);
  await page.goto(`${host}/missing-page/`);
  await page.waitForTimeout(200);
  expect(events).toEqual([]);
});

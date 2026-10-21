import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

/** Canonical origin+base for this default Pages-shaped browser build. */
const canonicalBase =
  process.env.CSP_BRAND_CANONICAL_URL?.replace(/\/$/, "") ||
  `${(process.env.CSP_BRAND_SITE_URL || "https://kieksme.github.io").replace(/\/$/, "")}${
    process.env.CSP_BRAND_CANONICAL_URL
      ? ""
      : (process.env.CSP_BRAND_BASE_PATH ?? "/csp-brand").replace(/\/$/, "")
  }`;

const routes = [
  "",
  "en/",
  "plugins/",
  "en/plugins/",
  "brand/",
  "en/brand/",
  "docs/components/",
  "en/docs/components/",
];

for (const path of routes) {
  test(`page ${path || "home"}: accessible, complete and self-contained`, async ({
    page,
  }) => {
    const failed: string[] = [];
    const remote: string[] = [];
    page.on("response", (r) => {
      if (r.status() >= 400) failed.push(`${r.status()} ${r.url()}`);
    });
    page.on("pageerror", (e) => failed.push(e.message));
    page.on("request", (r) => {
      if (
        !r.url().startsWith("http://127.0.0.1:4322") &&
        !r.url().startsWith("data:")
      )
        remote.push(r.url());
    });
    await page.goto(path || "./");
    await page.evaluate(() => document.fonts.ready);
    await page.evaluate(() =>
      Promise.all(
        document.getAnimations().map((animation) => animation.finished),
      ),
    );
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("html")).toHaveAttribute(
      "lang",
      path.startsWith("en/") ? "en-GB" : "de",
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    expect(failed).toEqual([]);
    expect(remote).toEqual([]);
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
          .analyze()
      ).violations,
    ).toEqual([]);
    const canonical = page.locator('link[rel="canonical"]');
    await expect(canonical).toHaveAttribute("href", `${canonicalBase}/${path}`);
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      "content",
      new RegExp(`social-${path.startsWith("en/") ? "en" : "de"}\\.png$`),
    );
    await expect(page.locator('link[hreflang="de-DE"]')).toHaveCount(1);
    await expect(page.locator('link[hreflang="en-GB"]')).toHaveCount(1);
    const jsonLd = page.locator('script[type="application/ld+json"]');
    await expect(jsonLd).toHaveCount(1);
    const schema = JSON.parse((await jsonLd.textContent()) || "null");
    expect(schema?.["@context"]).toBe("https://schema.org");
    expect(Array.isArray(schema?.["@graph"])).toBe(true);
    expect(
      schema["@graph"].some(
        (node: { "@type": string }) => node["@type"] === "Organization",
      ),
    ).toBe(true);
    if (!path || path === "en/") {
      const types = schema["@graph"].map(
        (node: { "@type": string }) => node["@type"],
      );
      expect(types).toEqual(
        expect.arrayContaining([
          "Organization",
          "SoftwareApplication",
          "FAQPage",
        ]),
      );
    }
    if (path.includes("plugins")) {
      await expect(page.locator(".plugin-card--detail")).toHaveCount(8);
      await expect(
        page.locator(".plugin-card--detail .badge").filter({
          hasText: path.startsWith("en/")
            ? "still to be verified"
            : "noch zu verifizieren",
        }),
      ).toHaveCount(3);
    }
  });
}

test("language switches preserve page and plugin navigation uses the correct base", async ({
  page,
}) => {
  await page.goto("plugins/");
  await page.locator(".language-link").click();
  await expect(page).toHaveURL(/\/csp-brand\/en\/plugins\/$/);
  await expect(page.locator("h1")).toHaveText("Eight plugins. Your setup.");
  await page.locator(".language-link").click();
  await expect(page).toHaveURL(/\/csp-brand\/plugins\/$/);
  await page.goto("./");
  await page
    .locator(".plugin-card h3 a")
    .filter({ hasText: "Microsoft Teams" })
    .click();
  await expect(page).toHaveURL(/\/plugins\/#teams$/);
  await expect(page.locator("#teams")).toBeVisible();
});

test("FAQ, contact, mobile menu and keyboard focus work", async ({
  page,
}, testInfo) => {
  await page.goto("./");
  await page.keyboard.press("Tab");
  await expect(page.locator(".skip-link")).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#main$/);
  const question = page.locator(".faq-item").first();
  await question.locator("summary").click();
  await expect(question).toHaveAttribute("open", "");
  await expect(question.locator("p")).toBeVisible();
  const primaryCta = page.locator("#contact .button");
  const primaryHref = await primaryCta.getAttribute("href");
  // Booking URL unset (default): mailto primary. When CSP_BRAND_BOOKING_URL is
  // set at build time, primary is the booking link and mailto stays secondary.
  if (primaryHref?.startsWith("mailto:")) {
    expect(primaryHref).toMatch(/^mailto:kontakt@kieks\.me\?subject=/);
  } else {
    expect(primaryHref).toBeTruthy();
    await expect(page.locator('#contact a[href^="mailto:"]')).toHaveCount(1);
  }
  if (testInfo.project.name === "mobile") {
    const menu = page.locator(".mobile-nav");
    await menu.locator("summary").click();
    await expect(menu).toHaveAttribute("open", "");
    await page.keyboard.press("Escape");
    await expect(menu).not.toHaveAttribute("open");
    await menu.locator("summary").click();
    await menu.locator("nav a").filter({ hasText: "Plugins" }).click();
    await expect(page).toHaveURL(/\/plugins\/$/);
  }
});

test("reduced motion and internal link destinations", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("./");
  expect(
    await page
      .locator(".hero-copy")
      .evaluate((el) => getComputedStyle(el).animationName),
  ).toBe("none");
  for (const path of routes) {
    await page.goto(path || "./");
    const links = await page
      .locator("a")
      .evaluateAll((els) =>
        els
          .map((el) => (el as HTMLAnchorElement).href)
          .filter((href) => href.startsWith(location.origin)),
      );
    for (const href of new Set(links)) {
      const response = await page.request.get(href.split("#")[0]);
      expect(response.status(), href).toBe(200);
      if (href.includes("#")) {
        const url = new URL(href);
        if (url.pathname === new URL(page.url()).pathname)
          expect(
            await page.locator(`[id="${url.hash.slice(1)}"]`).count(),
            href,
          ).toBe(1);
      }
    }
  }
});

test("404 provides a working route back", async ({ page }) => {
  const response = await page.goto("missing-page/");
  expect(response?.status()).toBe(404);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    "content",
    "noindex, follow",
  );
  await page.locator(".notfound .button").click();
  await expect(page).toHaveURL(/\/csp-brand\/$/);
});

test("robots.txt allows indexing and points at the sitemap", async ({
  page,
}) => {
  const response = await page.request.get("/csp-brand/robots.txt");
  expect(response.status()).toBe(200);
  const body = await response.text();
  expect(body).toContain("User-agent: *");
  expect(body).toContain("Allow: /");
  expect(body).toContain("Disallow: /storybook/");
  expect(body).toContain("Disallow: /downloads/");
  expect(body).toMatch(
    /Sitemap: https:\/\/kieksme\.github\.io\/csp-brand\/sitemap-index\.xml/,
  );
});

test("thanks pages are noindex and reachable in both languages", async ({
  page,
}) => {
  for (const path of ["danke/", "en/thanks/"]) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      "noindex, follow",
    );
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(
      page.locator('script[type="application/ld+json"]'),
    ).toHaveCount(0);
  }
});

test("shared React catalogue hydrates and the installable package is downloadable", async ({
  page,
}) => {
  await page.goto("docs/components/");
  await page.getByRole("button", { name: "Button ausprobieren" }).click();
  await expect(page.locator("[data-demo-counter]")).toHaveText("Klicks: 1");
  await page.getByLabel("Ihr Name", { exact: true }).fill("Lena");
  await expect(page.locator("[data-demo-name]")).toHaveText("Hallo Lena");
  await expect(
    page.getByRole("button", { name: "Deaktiviert" }),
  ).toBeDisabled();
  const disclosure = page.locator(".ui-catalogue details");
  await disclosure.locator("summary").click();
  await expect(disclosure).toHaveAttribute("open", "");
  const response = await page.request.get("downloads/kieksme-csp-ui-0.1.0.tgz");
  expect(response.status()).toBe(200);
  const bytes = await response.body();
  expect([...bytes.subarray(0, 2)]).toEqual([0x1f, 0x8b]);
  await page.locator(".language-link").click();
  await expect(page).toHaveURL(/\/en\/docs\/components\/$/);
});

import { test, expect } from "@playwright/test";

test("published Storybook has all public components, API docs and CI documentation", async ({
  page,
  request,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("response", (response) => {
    if (response.status() >= 400)
      errors.push(`${response.status()} ${response.url()}`);
  });
  const response = await request.get("storybook/index.json");
  expect(response.status()).toBe(200);
  const entries = Object.values((await response.json()).entries) as {
    id: string;
    title: string;
    type: string;
  }[];
  expect(entries.filter((entry) => entry.type === "story")).toHaveLength(48);
  const docs = entries.filter((entry) => entry.type === "docs");
  expect(
    docs.filter((entry) => /^(Atoms|Molecules)\//.test(entry.title)),
  ).toHaveLength(13);
  // Load every docs route through the real manager and iframe, not only the JSON index.
  for (const entry of docs) {
    await page.goto(`storybook/?path=/docs/${encodeURIComponent(entry.id)}`);
    const preview = page.frameLocator("#storybook-preview-iframe");
    await expect(
      preview.getByRole("heading", { level: 1 }).first(),
    ).toBeVisible();
    await expect(preview.locator(".sb-errordisplay")).not.toBeVisible();
  }
  const pkg = await request.get("storybook/downloads/kieksme-csp-ui-0.1.0.tgz");
  expect(pkg.status()).toBe(200);
  expect([...(await pkg.body()).subarray(0, 2)]).toEqual([31, 139]);
  expect(errors).toEqual([]);
});

test("Storybook controls and customer themes update the actual component", async ({
  page,
}, testInfo) => {
  test.skip(
    testInfo.project.name === "mobile",
    "Desktop control panel interaction; mobile docs/rendering is covered separately.",
  );
  await page.goto("storybook/?path=/story/atoms-button--primary");
  const preview = page.frameLocator("#storybook-preview-iframe");
  await expect(
    preview.getByRole("button", { name: "Contact support" }),
  ).toBeVisible();
  await page.getByRole("tab", { name: /Controls/ }).click();
  await page.locator("#control-children").fill("Request human support");
  const button = preview.getByRole("button", { name: "Request human support" });
  await expect(button).toBeVisible();
  await expect(button).toHaveCSS("background-color", "rgb(0, 107, 100)");
  await page
    .getByRole("button", { name: "Customer portal theme CSP Light" })
    .click();
  await page.getByText("CSP Dark", { exact: true }).click();
  await expect(button).toHaveCSS("background-color", "rgb(213, 243, 107)");
  await expect(button).toHaveCSS("color", "rgb(0, 0, 0)");
  await page.locator('label[for="control-isDisabled"]').click();
  await expect(button).toBeDisabled();
  await page.locator('label[for="control-isDisabled"]').click();
  await expect(button).toBeEnabled();
  await page.locator('label[for="control-isLoading"]').click();
  await expect(button).toBeDisabled();
  await expect(button).toHaveAttribute("aria-busy", "true");
});

test("Storybook introduction language links preserve the explorer and publish base", async ({
  page,
}) => {
  await page.goto("storybook/?path=/docs/start-overview--docs");
  const preview = page.frameLocator("#storybook-preview-iframe");
  await preview.getByRole("link", { name: "Deutsch", exact: true }).click();
  await expect(page).toHaveURL(
    /\/csp-brand\/storybook\/\?path=\/docs\/start-deutsch--docs/,
  );
  await expect(page.locator("#storybook-preview-iframe")).toHaveAttribute(
    "src",
    /id=start-deutsch--docs/,
  );
  await expect(
    page.frameLocator("#storybook-preview-iframe").getByRole("heading", {
      name: /Eine Bibliothek für Website und Portal/,
    }),
  ).toBeVisible();
  await preview.getByRole("link", { name: "English", exact: true }).click();
  await expect(page.locator("#storybook-preview-iframe")).toHaveAttribute(
    "src",
    /id=start-overview--docs/,
  );
  await expect(
    page.frameLocator("#storybook-preview-iframe").getByRole("heading", {
      name: /One library for website and portal/,
    }),
  ).toBeVisible();
});

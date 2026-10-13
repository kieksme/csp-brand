import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/browser",
  fullyParallel: false,
  workers: 1,
  reporter: [["list"]],
  use: {
    baseURL: "http://127.0.0.1:4322/csp-brand/",
    launchOptions: process.env.CSP_BRAND_CHROMIUM
      ? { executablePath: process.env.CSP_BRAND_CHROMIUM }
      : {},
    trace: process.env.CSP_BRAND_NO_TRACE ? "off" : "retain-on-failure",
  },
  projects: [
    { name: "desktop", use: { viewport: { width: 1440, height: 1000 } } },
    {
      name: "mobile",
      use: {
        viewport: { width: 390, height: 844 },
        isMobile: true,
        hasTouch: true,
      },
    },
  ],
  webServer: {
    command: "pnpm build && node scripts/serve-dist.mjs",
    url: "http://127.0.0.1:4322/csp-brand/",
    reuseExistingServer: false,
    timeout: 60000,
  },
});

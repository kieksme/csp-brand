import { defineConfig } from "vitest/config";
import { playwright } from "@vitest/browser-playwright";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
export default defineConfig({
  plugins: [
    storybookTest({
      configDir: new URL("./.storybook", import.meta.url).pathname,
      storybookScript: "pnpm storybook --ci",
    }),
  ],
  test: {
    name: "storybook",
    browser: {
      enabled: true,
      provider: playwright({
        launchOptions: process.env.CSP_BRAND_CHROMIUM
          ? { executablePath: process.env.CSP_BRAND_CHROMIUM }
          : {},
      }),
      headless: true,
      instances: [{ browser: "chromium" }],
    },
  },
});

import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
export default defineConfig({
  site:
    process.env.CSP_BRAND_SITE_URL ||
    (process.env.NETLIFY === "true" ? process.env.URL : undefined) ||
    "https://kieksme.github.io",
  base:
    process.env.CSP_BRAND_BASE_PATH ??
    (process.env.NETLIFY === "true" ? "/" : "/csp-brand"),
  trailingSlash: "always",
  output: "static",
  integrations: [
    react(),
    sitemap({
      i18n: { defaultLocale: "de", locales: { de: "de-DE", en: "en-GB" } },
    }),
  ],
  vite: { server: { fs: { strict: true } } },
});

import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
export default defineConfig({
  site: "https://kieksme.github.io",
  base: "/csp-brand",
  trailingSlash: "always",
  output: "static",
  integrations: [
    sitemap({
      i18n: { defaultLocale: "de", locales: { de: "de-DE", en: "en-GB" } },
    }),
  ],
  vite: { server: { fs: { strict: true } } },
});

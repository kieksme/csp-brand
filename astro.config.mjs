import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
export default defineConfig({
  // TODO: ⟦PLATZHALTER: Domain⟧ (E1) — set CSP_BRAND_SITE_URL to the single
  // indexed origin (e.g. https://csp.example) once decided. Defaults keep
  // GitHub Pages / Netlify URL behaviour.
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
  vite: {
    // Expose CSP_BRAND_* to import.meta.env (booking URL used by client analytics).
    envPrefix: ["PUBLIC_", "CSP_BRAND_"],
    server: { fs: { strict: true } },
  },
});

export type Locale = "de" | "en";
export type PageKind = "home" | "plugins" | "brand" | "components" | "thanks";

const viteEnv =
  (import.meta as ImportMeta & { env?: Record<string, string | undefined> })
    .env ?? {};

export const base = (viteEnv.BASE_URL ?? "/").replace(/\/$/, "");
export const asset = (path: string) => `${base}/${path.replace(/^\//, "")}`;

/** Locale-aware path without the deploy base (for canonical URLs across hosts). */
export const publicPath = (locale: Locale, page: PageKind = "home") => {
  if (page === "thanks") return locale === "en" ? "/en/thanks/" : "/danke/";
  const prefix = locale === "en" ? "/en" : "";
  if (page === "home") return locale === "en" ? "/en/" : "/";
  if (page === "components") return `${prefix}/docs/components/`;
  return `${prefix}/${page}/`;
};

export const route = (locale: Locale, page: PageKind = "home") =>
  asset(publicPath(locale, page).replace(/^\//, ""));

export const sourceUrl = "https://github.com/kieksme/csp";
export const brandRepo = "https://github.com/kieksme/csp-brand";
export const demoUrl = "https://kieksme.github.io/csp-acme/";
export const contactUrl = (locale: Locale) =>
  `mailto:kontakt@kieks.me?subject=${encodeURIComponent(locale === "de" ? "CSP: Integration besprechen" : "CSP: Discuss integration")}`;

/**
 * TODO: ⟦PLATZHALTER: Buchungs-URL⟧ (E3) — set CSP_BRAND_BOOKING_URL when the
 * booking tool is chosen. Empty string keeps current mailto-only primary CTAs
 * and skips BOOKING_CLICK matching so no broken link or event is emitted.
 */
export const bookingUrl =
  typeof viteEnv.CSP_BRAND_BOOKING_URL === "string"
    ? viteEnv.CSP_BRAND_BOOKING_URL.trim()
    : "";

/** Primary CTA: booking when configured, otherwise mailto (current behaviour). */
export const primaryCtaUrl = (locale: Locale) =>
  bookingUrl || contactUrl(locale);

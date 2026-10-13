export type Locale = "de" | "en";
export type PageKind = "home" | "plugins" | "brand";
export const base = import.meta.env.BASE_URL.replace(/\/$/, "");
export const asset = (path: string) => `${base}/${path.replace(/^\//, "")}`;
export const route = (locale: Locale, page: PageKind = "home") =>
  asset(`${locale === "en" ? "en/" : ""}${page === "home" ? "" : `${page}/`}`);
export const sourceUrl = "https://github.com/kieksme/csp";
export const brandRepo = "https://github.com/kieksme/csp-brand";
export const demoUrl = "https://kieksme.github.io/csp-acme/";
export const contactUrl = (locale: Locale) =>
  `mailto:kontakt@kieks.me?subject=${encodeURIComponent(locale === "de" ? "CSP: Integration besprechen" : "CSP: Discuss integration")}`;

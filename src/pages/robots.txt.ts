import type { APIRoute } from "astro";
import { canonicalOrigin } from "../lib/site";

/**
 * Marketing-host robots.txt. On GitHub Pages the file under /csp-brand/ is not
 * authoritative for the host; use CSP_BRAND_NOINDEX / canonical instead (E2).
 * TODO: ⟦PLATZHALTER: Domain⟧ (E1) — Sitemap URL follows CSP_BRAND_CANONICAL_URL
 * or CSP_BRAND_SITE_URL once the indexed origin is set.
 */
export const GET: APIRoute = ({ site }) => {
  const canonical = process.env.CSP_BRAND_CANONICAL_URL?.trim();
  const origin = (
    canonical ||
    process.env.CSP_BRAND_SITE_URL ||
    site?.origin ||
    canonicalOrigin()
  ).replace(/\/$/, "");
  // Canonical marketing host is expected at domain root; otherwise keep this build's base.
  const base = canonical
    ? ""
    : (
        process.env.CSP_BRAND_BASE_PATH ??
        (process.env.NETLIFY === "true" ? "/" : "/csp-brand")
      ).replace(/\/$/, "");
  const body = [
    "User-agent: *",
    "Allow: /",
    "Disallow: /storybook/",
    "Disallow: /downloads/",
    "",
    `Sitemap: ${origin}${base}/sitemap-index.xml`,
    "",
  ].join("\n");
  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};

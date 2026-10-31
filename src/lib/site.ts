/**
 * Build-time site / SEO configuration.
 * Single sources for undecided marketing values — set via env, never hardcode live domains.
 */

const read = (key: string) => process.env[key]?.trim() || "";

/** Build site origin (trailing slash stripped). Mirrors astro.config.mjs defaults. */
export const buildSiteOrigin = () => {
  const configured = read("CSP_BRAND_SITE_URL");
  if (configured) return configured.replace(/\/$/, "");
  if (process.env.NETLIFY === "true" && read("URL"))
    return read("URL").replace(/\/$/, "");
  return "https://kieksme.github.io";
};

/**
 * TODO: ⟦PLATZHALTER: Domain⟧ (E1) — set CSP_BRAND_CANONICAL_URL on non-canonical
 * hosts (e.g. GitHub Pages) so link[rel=canonical] and hreflang point at the indexed host.
 * When unset, canonical matches this build's site (current behaviour).
 */
export const canonicalOrigin = () => {
  const configured = read("CSP_BRAND_CANONICAL_URL");
  if (configured) return configured.replace(/\/$/, "");
  return buildSiteOrigin();
};

/**
 * TODO: ⟦PLATZHALTER: Host indexing⟧ (E2) — set CSP_BRAND_NOINDEX=true on the
 * non-canonical host, or set CSP_BRAND_CANONICAL_URL to a different origin than
 * this build's site (auto-noindex). Neither is enabled by default.
 */
export const shouldNoindex = () => {
  if (read("CSP_BRAND_NOINDEX") === "true") return true;
  const canonical = read("CSP_BRAND_CANONICAL_URL");
  if (!canonical) return false;
  return (
    canonical.replace(/\/$/, "").toLowerCase() !==
    buildSiteOrigin().toLowerCase()
  );
};

/**
 * TODO: ⟦PLATZHALTER: Ort laut Impressum⟧ (E6) — set CSP_BRAND_ORG_LOCALITY when
 * the legal address city is confirmed. Omitted from JSON-LD while empty.
 */
export const orgLocality = () => read("CSP_BRAND_ORG_LOCALITY");

/**
 * TODO: ⟦PLATZHALTER: Logo-URL⟧ — set CSP_BRAND_ORG_LOGO_URL to an absolute PNG
 * (≥112×112). Defaults to this build's apple-touch-icon when unset.
 */
export const orgLogoUrl = (fallbackAbsolute: string) =>
  read("CSP_BRAND_ORG_LOGO_URL") || fallbackAbsolute;

/** Absolute URL for a public path on the canonical origin (no deploy base prefix). */
export const canonicalPageUrl = (publicPath: string) =>
  new URL(publicPath.replace(/^\//, ""), `${canonicalOrigin()}/`).href;

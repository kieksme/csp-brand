import { text } from "../data/copy";
import { productVersion } from "../data/plugins";
import type { Locale, PageKind } from "./paths";
import { publicPath } from "./paths";
import { canonicalPageUrl, orgLocality, orgLogoUrl } from "./site";

const ORGANIZATION_ID = "https://kieks.me/#organization";

export function buildJsonLd(options: {
  locale: Locale;
  page: PageKind;
  /** Absolute logo fallback from the current build (e.g. apple-touch-icon). */
  logoFallback: string;
  description: string;
}) {
  const { locale, page, logoFallback, description } = options;
  const graphs: Record<string, unknown>[] = [buildOrganization(logoFallback)];

  if (page === "home") {
    graphs.push(
      buildSoftwareApplication(locale, description),
      buildFaqPage(locale),
    );
  }

  return {
    "@context": "https://schema.org",
    "@graph": graphs,
  };
}

function buildOrganization(logoFallback: string) {
  const locality = orgLocality();
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: "kieks.me GbR",
    url: "https://kieks.me/",
    email: "kontakt@kieks.me",
    logo: orgLogoUrl(logoFallback),
    // TODO: ⟦PLATZHALTER: Team / founder consent⟧ (E6) — confirm founder vs member naming.
    founder: [
      { "@type": "Person", name: "André Lademann" },
      { "@type": "Person", name: "Thomas Schöne" },
    ],
    address: {
      "@type": "PostalAddress",
      addressCountry: "DE",
      ...(locality ? { addressLocality: locality } : {}),
    },
    sameAs: ["https://github.com/kieksme"],
  };
}

function buildSoftwareApplication(locale: Locale, description: string) {
  return {
    "@type": "SoftwareApplication",
    name: "CSP – Customer Service Portal",
    alternateName: "CSP by kieks.me",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    softwareVersion: productVersion,
    license: "https://opensource.org/licenses/MIT",
    isAccessibleForFree: true,
    // TODO: ⟦PLATZHALTER: is kieksme/csp public?⟧ (E11) — adjust if the product repo is private.
    codeRepository: "https://github.com/kieksme/csp",
    url: canonicalPageUrl(publicPath(locale, "home")),
    inLanguage: ["de-DE", "en-GB"],
    description,
    publisher: { "@id": ORGANIZATION_ID },
    provider: { "@id": ORGANIZATION_ID },
  };
}

function buildFaqPage(locale: Locale) {
  const items = text(locale).faq.items;
  return {
    "@type": "FAQPage",
    inLanguage: locale === "de" ? "de-DE" : "en-GB",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

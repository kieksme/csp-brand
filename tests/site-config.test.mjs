import test from "node:test";
import assert from "node:assert/strict";
import { publicPath, bookingUrl } from "../src/lib/paths.ts";
import { productVersion } from "../src/data/plugins.ts";
import {
  buildSiteOrigin,
  canonicalOrigin,
  shouldNoindex,
} from "../src/lib/site.ts";

test("publicPath covers home, catalogue and thanks routes without deploy base", () => {
  assert.equal(publicPath("de", "home"), "/");
  assert.equal(publicPath("en", "home"), "/en/");
  assert.equal(publicPath("de", "plugins"), "/plugins/");
  assert.equal(publicPath("en", "components"), "/en/docs/components/");
  assert.equal(publicPath("de", "thanks"), "/danke/");
  assert.equal(publicPath("en", "thanks"), "/en/thanks/");
});

test("bookingUrl defaults to empty so CTAs stay mailto-only", () => {
  assert.equal(bookingUrl, "");
});

test("productVersion stays aligned with the documented CSP baseline", () => {
  assert.equal(productVersion, "0.13.4");
});

test("shouldNoindex follows env without hardcoding an undecided domain", () => {
  const keys = [
    "CSP_BRAND_CANONICAL_URL",
    "CSP_BRAND_SITE_URL",
    "CSP_BRAND_NOINDEX",
    "NETLIFY",
    "URL",
  ];
  const previous = Object.fromEntries(
    keys.map((key) => [key, process.env[key]]),
  );
  try {
    for (const key of keys) delete process.env[key];
    assert.equal(buildSiteOrigin(), "https://kieksme.github.io");
    assert.equal(canonicalOrigin(), "https://kieksme.github.io");
    assert.equal(shouldNoindex(), false);

    process.env.CSP_BRAND_NOINDEX = "true";
    assert.equal(shouldNoindex(), true);

    delete process.env.CSP_BRAND_NOINDEX;
    process.env.CSP_BRAND_SITE_URL = "https://pages.example";
    process.env.CSP_BRAND_CANONICAL_URL = "https://marketing.example";
    assert.equal(shouldNoindex(), true);
    assert.equal(canonicalOrigin(), "https://marketing.example");
  } finally {
    for (const key of keys) {
      if (previous[key] === undefined) delete process.env[key];
      else process.env[key] = previous[key];
    }
  }
});

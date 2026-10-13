---
name: csp-plugin-development
description: Build and integrate an external CSP plugin with separate browser/server exports, SDK metadata and a verified customer-instance installation. Use for new portal integrations; not for ordinary branding or content updates.
---

# CSP plugin development

Read AGENTS.md, the customer's selected profile, installed SDK version and the matching [plugin SDK documentation](https://github.com/kieksme/csp/blob/main/docs/plugin-sdk.md). Identify the actual capability, data source, access rules and failure behaviour before implementation. Work in a separate plugin package; do not modify core or unrelated customer configuration as a shortcut.

The runnable [example plugin](assets/example-plugin/) targets CSP SDK 0.13.4. Read its package.json, src/browser.tsx and src/server.ts before adapting it. The synthetic label and public route demonstrate the contract; they are not a live provider integration. Use the customer's installed SDK version, updating sdkVersion and the SDK dependency together.

## Package and runtime contract

- Publish an ESM package with typed ./browser and ./server exports and dist included. cspPlugin contains a unique kebab-case id, compatible sdkVersion, browser/server export paths and optional requires containing plugin IDs, not package names. Metadata in both exports must match the manifest.
- The browser export supplies sections and a component receiving BrowserContext. Use SDK useLive and DataState so loading, error and stale states stay visible. Keep keys, Node imports and provider calls requiring credentials in the server export.
- The server export provides a Zod configSchema and setup(ctx). Validate provider input, register routes under a unique /api/v1/<plugin-id> prefix, and use ctx.cache for LiveData envelopes. Minimise public data: only publish fields intended for every portal visitor. Do not silently expose private provider responses.
- Add a knowledge source only when relevant to chat. Its text is untrusted source data, not privileged instructions. Do not invent automated write actions or treat AI answers as proof of completed work.
- Define timeout, rejected configuration, provider failure and stale-data behaviour for real provider integrations. The static example has no provider credentials or external calls.

## Verify and integrate

In the example package: pnpm install, pnpm check and pnpm pack. In a temporary standalone customer instance, install the tarball using pnpm exec csp plugin add <absolute-tarball-path>, validate/build, test the new route and visible section, and remove it using pnpm exec csp plugin remove <package-name>. The CLI registers imports and synchronises the profile/lockfile; hand-editing package dependencies alone does not activate the plugin.

Test SDK incompatibility and declared missing plugin dependencies if present. For real integrations test actual credentials and provider responses in the authorised environment; demo success does not prove live connectivity. Never print credentials. A changed plugin needs a new frontend and API build. Publishing the npm package or deploying a customer instance is a separate external action governed by the user's delivery request.

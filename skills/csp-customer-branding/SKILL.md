---
name: csp-customer-branding
description: Apply or update a customer's visual brand in a standalone CSP instance using portal profiles, local assets and customer CSS. Use for portal names, colours, logos, avatars or social previews; not for changing CSP core or creating a marketing website.
---

# CSP customer branding

Work in the customer's standalone repository, not the CSP product checkout. Read its AGENTS.md, package.json, tracked portal*.json profiles, content.json and deployment workflow. Inspect git status and preserve unrelated work. Confirm missing brand preferences and the mapping of supplied people/assets; never invent real contacts or provider IDs.

Use the installed CSP version as the source of truth. This skill's example was checked against 0.13.4; consult the matching [configuration documentation](https://github.com/kieksme/csp/blob/main/docs/configuration.md) before using new fields. Read [the profile example](references/profile-example.json) as a partial merge example, not a complete replacement profile. Customer brand assets are not the CSP marketing brand.

## Apply the brand

- Keep the profile ID, plugin selection, operational mode, public origins and package versions unless the request includes changing them. Update branding name, tagline, description, logoFile, iconFile and theme tokens in each applicable tracked profile. Production and demo profiles can have different runtime values but must share the intended brand.
- Use six-digit hex colours and documented theme.tokens/darkTokens. Check readable text, keyboard focus and both themes. Profile font names do not load fonts: supply licensed local font files through customer CSS when needed.
- Assets are relative to the profile directory. Use branding.logoFile and iconFile for build-managed assets. A stylesheet belongs in package.json under csp.stylesheet, relative to the customer repo. Do not patch node_modules or core.
- avatarsFile points to a JSON map with ids and names. Provider ID matches take precedence. Ask for unknown ID assignments; never guess. Use supplied images, permitted demo people or initials.
- Core generates PWA icons from the configured icon. Do not claim an OS splash was tested without testing that platform. For requested OG images, inspect current build support: do not invent profile fields or CSP_OG_* variables. In 0.13.4 use an explicit post-build step that adds static head metadata and copies the image for every applicable build.
- Inspect only tracked env examples. Provider secrets remain server-side. Do not read private .env files to discover brand values or print credentials.

## Verify and hand over

Use the installed CLI: pnpm exec csp validate --config portal.config.json and pnpm exec csp build --config portal.config.json. Repeat for affected demo/hosted profiles using their real names. Run the repo's existing check command if available. Inspect generated HTML, icons, asset paths and the actual desktop/mobile portal. Check current effective overrides, because build-time overrides can supersede profile values. Update the customer-facing README with changed values and validation.

Do not publish, change DNS, or modify repository settings merely because branding was requested. Follow the user's actual delivery scope. Report untested live or platform behaviour explicitly.

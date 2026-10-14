# @kieksme/csp-ui

Shared React 19 components and corporate identity for CSP customer portals and Astro websites. Package version 0.1.0 is independent of the CSP product release. There is no SDK dependency and no provider or support business logic.

## Build and install

From the csp-brand checkout:

```sh
pnpm install --frozen-lockfile
pnpm build:ui
pnpm pack:ui
```

Install `public/downloads/kieksme-csp-ui-0.1.0.tgz` in a standalone customer or React project using `pnpm add /absolute/path/to/kieksme-csp-ui-0.1.0.tgz`. The built website also serves this versioned package under `/downloads/`. This version is distributed as a tarball; do not assume an npm publication exists.

## React

```tsx
import { Button, FormField, Card, Badge } from "@kieksme/csp-ui";
import "@kieksme/csp-ui/styles.css";
import "@kieksme/csp-ui/fonts.css"; // optional, local Inter

<Card title="Service status" icon="kuma">
  <Badge tone="success">Available</Badge>
  <Button onClick={() => openRequest()}>Contact support</Button>
</Card>;
```

`Button` is a native action button (default type=button), with primary/secondary/light/danger variants, isDisabled, isLoading and optional hasArrow. `LinkButton` is a native anchor with required href. `Badge` supports neutral/accent/success/warning. `Icon` has typed names, size and an optional accessible label; otherwise decorative. `Logo` accepts the consumer's src/alt. `Avatar` renders a supplied image or named initials. `Input`, `Label` and `TextArea` forward native props. `FormField` associates label, hint and error with a stable ID. `Card`, `Disclosure` and `Alert` compose atoms; Disclosure works without JavaScript. Alert accepts an explicit role and defaults to status, or alert for danger.

Components use native props and React callbacks. No `client:*` or Astro-only runtime is required in a React portal. CSS uses csp-ui-prefixed selectors; button/badge/logo/faq-item compatibility classes let the existing brand layout retain its styling.

## Astro

Install `@astrojs/react`, add react() in astro.config, then render the same components. Use client:load only for an interactive React demo or a component needing browser callbacks; ordinary links, badges, icons and native disclosures render statically. The Brand website's adapters under src/components/atoms demonstrate slot compatibility.

## Tokens and customer theme

`@kieksme/csp-ui/tokens` exports framework-independent tokens and cspThemePreset. Their source is src/quarks/tokens.ts. `tokens.css` defines namespaced values; `marketing.css` maps the existing brand CSS variables to those shared values. No body/reset rules are imposed on a portal.

For CSP, import `@kieksme/csp-ui/portal.css` after the component CSS and place csp-ui-portal on your component wrapper. This maps customer runtime colours/fonts to the library. The optional brand/portal-theme.json can be merged into a profile's theme field. Keep runtime, plugin and contact settings separate. To use the CSP preset font, import fonts.css. The library does not silently replace a customer's existing brand.

Brand assets are exported under `@kieksme/csp-ui/brand/*`; use a bundler's ?url import for a logo URL. `Logo` accepts that resolved URL or a customer-owned image. Do not pass a local filesystem URL into production markup.

## Licence

Components and token code are MIT. Bundled CSP logos have separate terms in brand/LICENSE.md. Inter is OFL in fonts/LICENSE.txt; Lucide/Feather notices are in THIRD-PARTY-NOTICES.md. No exclusive rights to colour values are asserted.

# CSP component library

The reusable package lives in packages/ui and exports React components, framework-independent CI tokens, scoped CSS, local Inter fonts and separately licensed brand assets. Atomic Design layers run from quarks to atoms and molecules; website-specific organisms, templates and copy remain in the marketing app.

The Astro app consumes the real React components through @astrojs/react adapters. React CSP plugins can install the same built tarball without an Astro dependency. Browser callbacks are ordinary React handlers, while native disclosure controls remain functional without JavaScript.

## Storybook

Storybook 10 uses React/Vite, Controls, Actions, Autodocs and the Accessibility addon. All 13 public components have adjacent stories. The Quarks section renders live colour/spacing tokens and documents the corporate identity. English and German introductions cover installation, portal theming and licence boundaries.

The manager uses CSP branding. The theme toolbar synchronizes the explorer, documentation and preview background; documentation listens for global changes and uses matching light/dark Storybook themes. The preview inherits the same light/dark runtime theme adapter as a customer portal. Theme-specific stories select the required theme explicitly.

Development: `pnpm storybook` on port 6006. Tests: `pnpm test:storybook` runs browser rendering, play interactions and accessibility checks through the official Vitest addon. CI runs it after installing Chromium. The existing Node unit tests and portal integration proof remain in use.

The ordinary website build copies Storybook to dist/storybook. Netlify publishes it at /storybook/ from the same main-branch build. Relative assets also support GitHub Pages under /csp-brand/storybook/. No separate Netlify project, API token in CI or paid visual-testing service is required.

Stories and Storybook dependencies are excluded from the distributed UI package.

## Delivery

- Implementation: packages/ui/src/components and packages/ui/src/quarks.
- Behaviour tests: test/unit/components/ui.test.tsx.
- Live examples: /docs/components/ and /en/docs/components/.
- Package/API documentation: packages/ui/README.md.
- CSP integration: scripts/verify-skills.mjs installs the UI tarball into a fresh standalone customer/plugin fixture, applies the optional preset and validates/builds it.

## Contracts

Use LinkButton for navigation and Button for actions. Native disabled and busy states prevent unintended actions. FormField links hints and errors through aria-describedby/aria-invalid. Icons are decorative unless explicitly labelled. Customer themes are inherited only through the opt-in csp-ui-portal wrapper/adapter. CSP logos retain their own terms; components and tokens are MIT.

The website serves the versioned tarball from /downloads/. No npm publication is implied. Use matching CSS and JS from one UI package version. Keep customer-specific processes and provider secrets out of the UI library.

# CSP component library

The reusable package lives in packages/ui and exports React components, framework-independent CI tokens, scoped CSS, local Inter fonts and separately licensed brand assets. Atomic Design layers run from quarks to atoms and molecules; website-specific organisms, templates and copy remain in the marketing app.

The Astro app consumes the real React components through @astrojs/react adapters. React CSP plugins can install the same built tarball without an Astro dependency. Browser callbacks are ordinary React handlers, while native disclosure controls remain functional without JavaScript.

## Delivery

- Implementation: packages/ui/src/components and packages/ui/src/quarks.
- Behaviour tests: test/unit/components/ui.test.tsx.
- Live examples: /docs/components/ and /en/docs/components/.
- Package/API documentation: packages/ui/README.md.
- CSP integration: scripts/verify-skills.mjs installs the UI tarball into a fresh standalone customer/plugin fixture, applies the optional preset and validates/builds it.

## Contracts

Use LinkButton for navigation and Button for actions. Native disabled and busy states prevent unintended actions. FormField links hints and errors through aria-describedby/aria-invalid. Icons are decorative unless explicitly labelled. Customer themes are inherited only through the opt-in csp-ui-portal wrapper/adapter. CSP logos retain their own terms; components and tokens are MIT.

The website serves the versioned tarball from /downloads/. No npm publication is implied. Use matching CSS and JS from one UI package version. Keep customer-specific processes and provider secrets out of the UI library.

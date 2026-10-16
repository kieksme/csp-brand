# CSP by kieks.me

Marketing-Website und Corporate Identity für das [Customer Service Portal](https://github.com/kieksme/csp). CSP ist Open Source. kieks.me bietet Einrichtung und Integration als individuelles Projekt mit Code- und Skill-Übergabe an, ohne verpflichtendes Abonnement. Externe Anbieter und Infrastruktur können eigene Kosten verursachen.

- [Website auf Netlify](https://csp-brand-kieksme.netlify.app/)
- [GitHub-Pages-Vorschau](https://kieksme.github.io/csp-brand/)
- [Storybook](https://csp-brand-kieksme.netlify.app/storybook/)
- [Komponentenbibliothek](packages/ui/README.md) und [Live-Dokumentation](https://csp-brand-kieksme.netlify.app/docs/components/)
- [Produkt-Wiki](https://github.com/kieksme/csp/wiki)
- [Brand-Guide](brand/README.md) und [Nutzungsregeln](BRAND-LICENSE.md)
- [Kunden-Skills und Übergabe](docs/handover.md)
- [CHANGELOG](CHANGELOG.md)

## Entwicklung

Node 22.12+ und pnpm 12.8.1. Installation und lokale Vorschau:

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Die Seite liegt unter `http://localhost:4321/csp-brand/`. Astro 7 startet Dev-/Preview-Server im Hintergrund; `pnpm exec astro dev stop` beziehungsweise `pnpm exec astro preview stop` beendet sie.

```sh
pnpm check
pnpm exec playwright install chromium
pnpm test:browser
pnpm test:storybook
pnpm storybook
pnpm preview
```

Optional kann `CSP_BRAND_CHROMIUM` auf einen bereits installierten Chromium zeigen. Die Browserprüfungen bauen die Seite und starten einen temporären statischen Server; kein Portal-Backend und keine Provider-Secrets nötig.

## Inhalt und Architektur

Deutsch unter `/`, Englisch unter `/en/`; dazu jeweils `/plugins/`, `/brand/` und `/docs/components/`. `src/data/copy.ts` enthält synchronisierte Texte, `src/data/plugins.ts` den typisierten Katalog mit Quellen und Verifikationshinweisen. Produktbaseline: CSP 0.13.4. Der Katalog ist bewusst versioniert und muss bei Produktänderungen redaktionell geprüft werden.

Atomic Design: Quarks → Atoms → Molecules → Organisms → Templates → Pages. Komponenten importieren keine höheren Ebenen. Templates komponieren Organisms, Pages befüllen Templates. Die Vorlage des Projekts verwendet lokale Fonts und SVGs, ohne externe Einbettungen. Anonyme Swetrix-Nutzungsanalyse respektiert Do Not Track und ist nur auf den freigegebenen öffentlichen Hosts aktiv; siehe [Analytics](docs/analytics.md).

Die gemeinsame React-19-Bibliothek `@kieksme/csp-ui` liegt in `packages/ui`. Sie enthält Tokens, lokale Fonts, Brand-Assets, einen CSP-Theme-Preset und wiederverwendbare Komponenten. Astro-Adapter rendern dieselben Implementierungen. `pnpm pack:ui` erzeugt einen installierbaren Tarball unter `public/downloads/`; das Paket ist noch nicht auf npm veröffentlicht. `pnpm test:skills` installiert es in einem temporären CSP-Plugin und prüft einen echten Button-Klick im Kundenportal.

UI-Icons verwenden Lucide über `src/components/atoms/Icon.astro`. Die typisierte Zuordnung importiert nur benötigte Icons aus `lucide-react` in der gemeinsamen Bibliothek; sie werden als dekorative SVGs im Build gerendert. Das eigene CSP-Logo bleibt ein separates Markenasset. Lizenzhinweise stehen in THIRD-PARTY-NOTICES.md.

## Storybook

`pnpm storybook` startet den Komponenten-Explorer unter `http://127.0.0.1:6006/`. Storybook 10 mit React/Vite dokumentiert alle 13 exportierten Komponenten über Stories, Autodocs, Controls, Actions und Accessibility. Light-/Dark-Themes übernehmen dieselben CSP-Theme-Tokens wie das Kundenportal. Quarks und Markenregeln sind dokumentiert; der Einstieg ist deutsch und englisch verfügbar.

`pnpm test:storybook` führt Render-, Interaktions- und Accessibility-Tests mit Vitest/Chromium aus. `pnpm build` erzeugt Website und Storybook und legt den Explorer in `dist/storybook/` ab. Relative Assets funktionieren auf Netlify (`/storybook/`) und GitHub Pages (`/csp-brand/storybook/`). Storybook ist nur eine Entwicklungsabhängigkeit. Stories gehen nicht in den UI-Tarball ein.

## Veröffentlichung

GitHub Actions prüft Formatierung, Typen, Katalog/Übersetzungen, Build und Desktop-/Mobil-Browserfälle. Nur ein erfolgreicher Main-Build deployt zu GitHub Pages. Unter Settings → Pages muss die Quelle GitHub Actions sein. `astro.config.mjs` verwendet standardmäßig die Pages-Origin und `/csp-brand`. Netlify baut über `netlify.toml` mit Basispfad `/` und der Site-URL aus der Netlify-Umgebung. Eine eigene Domain kann über `CSP_BRAND_SITE_URL` gesetzt werden. Für einen lokalen Root-Build: `CSP_BRAND_BASE_PATH=/ CSP_BRAND_SITE_URL=https://example.netlify.app pnpm build`.

Impressum und Datenschutz verlinken auf die bestehenden Anbieter-Seiten. Diese Website sendet Anfragen über den E-Mail-Client und verarbeitet kein eigenes Kontaktformular. Quellcode/Skills sind MIT, Brand-Assets separat lizenziert. Siehe THIRD-PARTY-NOTICES.md für Schrift- und Bildhinweise.

## English

A bilingual marketing site, brand system and customer skill package for CSP by kieks.me. The product is open source under MIT. Setup, integration and handover are agreed as an individual project without a mandatory subscription; third-party and infrastructure costs are separate. Copy the three skill folders into the customer repository's `.agents/skills/`; see [handover instructions](docs/handover.md). Shared React components and CI tokens, Astro static build, local fonts, GitHub Pages/Netlify and no contact backend. Brand artwork has separate terms.

# CSP by kieks.me

Marketing-Website und Corporate Identity für das [Customer Service Portal](https://github.com/kieksme/csp). CSP ist Open Source. kieks.me bietet Einrichtung und Integration als individuelles Projekt mit Code- und Skill-Übergabe an, ohne verpflichtendes Abonnement. Externe Anbieter und Infrastruktur können eigene Kosten verursachen.

- [Website](https://kieksme.github.io/csp-brand/)
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
pnpm preview
```

Optional kann `CSP_BRAND_CHROMIUM` auf einen bereits installierten Chromium zeigen. Die Browserprüfungen bauen die Seite und starten einen temporären statischen Server; kein Portal-Backend und keine Provider-Secrets nötig.

## Inhalt und Architektur

Deutsch unter `/`, Englisch unter `/en/`; dazu jeweils `/plugins/` und `/brand/`. `src/data/copy.ts` enthält synchronisierte Texte, `src/data/plugins.ts` den typisierten Katalog mit Quellen und Verifikationshinweisen. Produktbaseline: CSP 0.13.4. Der Katalog ist bewusst versioniert und muss bei Produktänderungen redaktionell geprüft werden.

Atomic Design: Quarks → Atoms → Molecules → Organisms → Templates → Pages. Komponenten importieren keine höheren Ebenen. Templates komponieren Organisms, Pages befüllen Templates. Die Vorlage des Projekts verwendet lokale Fonts und SVGs, ohne Analytics oder externe Einbettungen.

UI-Icons verwenden Lucide über `src/components/atoms/Icon.astro`. Die typisierte Zuordnung importiert nur benötigte Icons aus `@lucide/astro`; sie werden als dekorative SVGs im Build gerendert. Das eigene CSP-Logo bleibt ein separates Markenasset. Lizenzhinweise stehen in THIRD-PARTY-NOTICES.md.

## Veröffentlichung

GitHub Actions prüft Formatierung, Typen, Katalog/Übersetzungen, Build und Desktop-/Mobil-Browserfälle. Nur ein erfolgreicher Main-Build deployt zu GitHub Pages. Unter Settings → Pages muss die Quelle GitHub Actions sein. `astro.config.mjs` enthält die Pages-Origin und `/csp-brand` als Basispfad; bei einer eigenen Domain beide Werte und die öffentliche Verifikation aktualisieren.

Impressum und Datenschutz verlinken auf die bestehenden Anbieter-Seiten. Diese Website sendet Anfragen über den E-Mail-Client und verarbeitet kein eigenes Kontaktformular. Quellcode/Skills sind MIT, Brand-Assets separat lizenziert. Siehe THIRD-PARTY-NOTICES.md für Schrift- und Bildhinweise.

## English

A bilingual marketing site, brand system and customer skill package for CSP by kieks.me. The product is open source under MIT. Setup, integration and handover are agreed as an individual project without a mandatory subscription; third-party and infrastructure costs are separate. Copy the three skill folders into the customer repository's `.agents/skills/`; see [handover instructions](docs/handover.md). Astro static build, local fonts, GitHub Pages and no contact backend. Brand artwork has separate terms.

# Website-Analytics / Website analytics

Die Website verwendet das private Swetrix-Projekt **csp-brand** (`poqo5aTL3ArD`) auf [analytics.kieks.me](https://analytics.kieks.me/). Acme bleibt ein getrenntes Projekt. Der Browser sendet direkt an `https://analytics-api.kieks.me/log` (Seitenaufruf) und `/log/custom` (Events). Die Projekt-ID ist öffentlich; API-Schlüssel werden nicht ausgeliefert.

## Aktivierung und Datenschutz

`src/lib/analytics.ts` ist die gemeinsame Browser-Integration im SiteLayout. Tracking ist ausschließlich über HTTPS auf `csp-brand-kieksme.netlify.app` und auf `kieksme.github.io/csp-brand/` aktiv, in beiden Sprachen. Andere Hosts, lokale Entwicklung, Deploy-Previews, Storybook und 404-Seiten senden nichts. Das Swetrix-Projekt erlaubt nur diese beiden Hosts, verwendet Basic-Bot-Schutz und ist nicht öffentlich einsehbar.

Do Not Track (`1` oder `yes`) verhindert die Erfassung. Jeder Dokumentaufruf sendet einen Seitenaufruf, auch bei späteren Besuchen derselben Seite; eine doppelte Initialisierung sendet nichts zusätzlich. Es gibt keine Cookies, Browser-Speicherung, eigenen Besucher-IDs, Referrer, Query-/UTM-Parameter, Hashes, Linkziele, E-Mail-Adressen, FAQ-Texte oder Formulareingaben. Übertragen werden Pfad, Sprache, Zeitzone und die unten genannten begrenzten Metadaten. Der Analytics-Server erhält technisch die IP-Adresse und HTTP-Browserinformationen. Es gibt keine automatische Fehlererfassung, Session-Replays oder Retries; ein Netzwerkfehler unterbricht keine Website-Funktion.

## Custom Events

Alle Events enthalten nur `locale` (`de`/`en`) und `page` (`home`, `plugins`, `brand`, `components`) plus die explizit genannten Metadaten.

| Event             | Auslöser und weitere Metadaten                                                                           |
| ----------------- | -------------------------------------------------------------------------------------------------------- |
| `SITE_VIEW`       | Geladenes öffentliches Dokument                                                                          |
| `PLUGINS_VIEW`    | Plugin-Katalog geladen                                                                                   |
| `COMPONENTS_VIEW` | Komponenten-Dokumentation geladen                                                                        |
| `SECTION_VIEW`    | Abschnittsüberschrift mindestens zu 20 Prozent sichtbar; einmal pro Dokument, `section` aus fester Liste |
| `FAQ_OPEN`        | FAQ tatsächlich geöffnet; `item` als numerische Position, kein Fragetext                                 |
| `DEMO_CLICK`      | Klick auf die Acme-Demo                                                                                  |
| `CONTACT_CLICK`   | Klick auf E-Mail-Link; misst Kontaktinteresse, keinen E-Mail-Versand                                     |
| `PLUGINS_CLICK`   | Navigation zum Plugin-Katalog; optional `plugin` aus den acht Katalog-IDs                                |
| `DOCS_CLICK`      | Produkt-Dokumentation auf GitHub angeklickt                                                                |
| `SOURCE_CLICK`    | Produkt-Quellcode auf GitHub angeklickt                                                                    |
| `SKILLS_CLICK`    | Kunden-Skills auf GitHub angeklickt                                                                        |
| `LANGUAGE_SWITCH` | Sprachwechsel angeklickt                                                                                 |
| `DOWNLOAD_CLICK`  | UI-Paket angeklickt; kein Nachweis eines abgeschlossenen Downloads                                       |
| `STORYBOOK_CLICK` | Komponenten-Explorer angeklickt                                                                          |

## Gespeicherte Funnels

| Funnel                    | Schritte                                        |
| ------------------------- | ----------------------------------------------- |
| Website zur Demo          | `SITE_VIEW` → `DEMO_CLICK`                      |
| Plugins bis Dokumentation | `PLUGINS_CLICK` → `PLUGINS_VIEW` → `DOCS_CLICK` |
| FAQ zum Kontakt           | `SITE_VIEW` → `FAQ_OPEN` → `CONTACT_CLICK`      |
| Website zum Kontakt       | `SITE_VIEW` → `CONTACT_CLICK`                   |
| Komponenten zum Download  | `COMPONENTS_VIEW` → `DOWNLOAD_CLICK`            |

Die Funnels wurden über Swetrix MCP angelegt. Eventnamen erscheinen im Dashboard erst nach tatsächlichen Interaktionen; es werden keine Registrierungs-Events erfunden. Lokale Browserprüfungen ersetzen nur die Collector-Antwort, während sie den tatsächlichen statischen Website-Build unter der Produktions-Origin ausführen. Live-Erfassung nach Deployment separat über Swetrix-Sitzungen prüfen.

## English

The bilingual website uses its own private **csp-brand** project, separate from Acme. Only the two production hosts above collect anonymous page views and the listed interaction events. DNT is respected. Local development, preview hosts, Storybook and 404 pages do not collect data. Payloads omit cookies, user input, identifiers, query strings, UTM parameters and referrers. The server necessarily receives network IP and HTTP browser information. Contact and download clicks indicate interest, not completed enquiries or downloads. Five saved funnels cover demo discovery, plugin documentation, FAQ/contact interest and component downloads. The browser test suite checks real interactions, repeat visits and privacy exclusions using a mocked collector.

# Website-Analytics / Website analytics

Die beiden veröffentlichten Website-Einstiege erhalten eigene private Swetrix-Projekte auf [analytics.kieks.me](https://analytics.kieks.me/):

| Auftritt                   | Öffentliche URL                        | Projekt         | Projekt-ID     |
| -------------------------- | -------------------------------------- | --------------- | -------------- |
| Marketing                  | https://csp-brand-kieksme.netlify.app/ | `csp-marketing` | `poqo5aTL3ArD` |
| Produkt-/Entwickleransicht | https://kieksme.github.io/csp-brand/   | `csp-product`   | `zU7UlsSu89t1` |

<!-- TODO: ⟦PLATZHALTER: Domain⟧ (E1) — after the canonical marketing host is live, add its row (or replace the Netlify app URL) and set CSP_BRAND_MARKETING_HOST / Swetrix allowed host. -->

Beide Einstiege werden aus derselben Website-Quelle gebaut. Beide Sprachversionen gehören jeweils zum Projekt ihres Hosts. Acme bleibt ein drittes, getrenntes Projekt. Der Browser sendet direkt an `https://analytics-api.kieks.me/log` (Seitenaufruf) und `/log/custom` (Events). Die Projekt-IDs sind öffentlich; API-Schlüssel werden nicht ausgeliefert.

Das ursprüngliche Projekt `csp-brand` wurde in `csp-marketing` umbenannt. Historische Testaufrufe aus der ersten gemeinsamen Einrichtung bleiben erhalten; die Trennung gilt ab Deployment dieser Änderung. Es werden keine Daten gelöscht oder nachträglich als neue Conversions eingespielt.

## Aktivierung und Datenschutz

`src/lib/analytics.ts` ist die gemeinsame Browser-Integration im SiteLayout. Tracking ist ausschließlich über HTTPS auf `csp-brand-kieksme.netlify.app` (plus optional `CSP_BRAND_MARKETING_HOST`) und auf `kieksme.github.io/csp-brand/` aktiv, in beiden Sprachen. Andere Hosts, lokale Entwicklung, Deploy-Previews, Storybook und 404-Seiten senden nichts. Jeder Host wählt genau eine Projekt-ID; es gibt keine Doppelübertragung an beide Projekte. Jedes Swetrix-Projekt erlaubt serverseitig nur seinen eigenen Host, verwendet Basic-Bot-Schutz und ist nicht öffentlich einsehbar.

Do Not Track (`1` oder `yes`) verhindert die Erfassung. Jeder Dokumentaufruf sendet einen Seitenaufruf, auch bei späteren Besuchen derselben Seite; eine doppelte Initialisierung sendet nichts zusätzlich. Es gibt keine Cookies, Browser-Speicherung, eigenen Besucher-IDs, Referrer, Query-/UTM-Parameter, Hashes, Linkziele, E-Mail-Adressen, FAQ-Texte oder Formulareingaben. Übertragen werden Pfad, Sprache, Zeitzone und die unten genannten begrenzten Metadaten. Der Analytics-Server erhält technisch die IP-Adresse und HTTP-Browserinformationen. Es gibt keine automatische Fehlererfassung, Session-Replays oder Retries; ein Netzwerkfehler unterbricht keine Website-Funktion.

## Custom Events

Alle Events enthalten nur `site` (`marketing`/`product`), `locale` (`de`/`en`) und `page` (`home`, `plugins`, `brand`, `components`, `thanks`) plus die explizit genannten Metadaten.

| Event               | Auslöser und weitere Metadaten                                                                                                 |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `SITE_VIEW`         | Geladenes öffentliches Dokument                                                                                                |
| `PLUGINS_VIEW`      | Plugin-Katalog geladen                                                                                                         |
| `COMPONENTS_VIEW`   | Komponenten-Dokumentation geladen                                                                                              |
| `SECTION_VIEW`      | Abschnittsüberschrift mindestens zu 20 Prozent sichtbar; einmal pro Dokument, `section` aus fester Liste                       |
| `FAQ_OPEN`          | FAQ tatsächlich geöffnet; `item` als numerische Position, kein Fragetext                                                       |
| `DEMO_CLICK`        | Klick auf die Acme-Demo                                                                                                        |
| `CONTACT_CLICK`     | Klick auf E-Mail-Link; optional `placement` aus fester Liste; misst Kontaktinteresse, keinen E-Mail-Versand                    |
| `BOOKING_CLICK`     | Klick auf konfigurierte Buchungs-URL (`CSP_BRAND_BOOKING_URL`); optional `placement`; misst Interesse, keinen gebuchten Termin |
| `BOOKING_CONFIRMED` | Aufruf der Danke-Seite `/danke/` bzw. `/en/thanks/` nach Weiterleitung des Buchungstools; eigentliche Conversion               |
| `PLUGINS_CLICK`     | Navigation zum Plugin-Katalog; optional `plugin` aus den acht Katalog-IDs                                                      |
| `DOCS_CLICK`        | Produkt-Dokumentation auf GitHub angeklickt                                                                                    |
| `SOURCE_CLICK`      | Produkt-Quellcode auf GitHub angeklickt                                                                                        |
| `SKILLS_CLICK`      | Kunden-Skills auf GitHub angeklickt                                                                                            |
| `LANGUAGE_SWITCH`   | Sprachwechsel angeklickt                                                                                                       |
| `DOWNLOAD_CLICK`    | UI-Paket angeklickt; kein Nachweis eines abgeschlossenen Downloads                                                             |
| `STORYBOOK_CLICK`   | Komponenten-Explorer angeklickt                                                                                                |

`BOOKING_CLICK` bleibt inaktiv, solange `CSP_BRAND_BOOKING_URL` leer ist (kein kaputter CTA, kein Event). <!-- TODO: ⟦PLATZHALTER: Buchungs-URL / Buchungstool⟧ (E3) -->

## Gespeicherte Funnels

### Marketing (`csp-marketing`)

| Funnel                    | Schritte                                                         |
| ------------------------- | ---------------------------------------------------------------- |
| Website zur Demo          | `SITE_VIEW` → `DEMO_CLICK`                                       |
| Plugins bis Dokumentation | `PLUGINS_CLICK` → `PLUGINS_VIEW` → `DOCS_CLICK`                  |
| FAQ zum Kontakt           | `SITE_VIEW` → `FAQ_OPEN` → `CONTACT_CLICK`                       |
| Website zum Kontakt       | `SITE_VIEW` → `CONTACT_CLICK`                                    |
| Komponenten zum Download  | `COMPONENTS_VIEW` → `DOWNLOAD_CLICK`                             |
| Website zur Buchung       | `SITE_VIEW` → `BOOKING_CLICK` → `BOOKING_CONFIRMED` (nach Setup) |
| FAQ zur Buchung           | `SITE_VIEW` → `FAQ_OPEN` → `BOOKING_CLICK` (nach Setup)          |

<!-- TODO: Funnels im Swetrix-Projekt csp-marketing anlegen, sobald BOOKING_* Events live fließen. MSP-Funnel erst mit /msp/-Seite. -->

### Produkt (`csp-product`)

| Funnel                   | Schritte                                        |
| ------------------------ | ----------------------------------------------- |
| Produkt zur Demo         | `SITE_VIEW` → `DEMO_CLICK`                      |
| Plugin zur Dokumentation | `PLUGINS_CLICK` → `PLUGINS_VIEW` → `DOCS_CLICK` |
| Komponenten zum Download | `COMPONENTS_VIEW` → `DOWNLOAD_CLICK`            |
| Produkt zum Quellcode    | `SITE_VIEW` → `SOURCE_CLICK`                    |
| Produkt zu Kunden-Skills | `SITE_VIEW` → `SKILLS_CLICK`                    |

Die Funnels wurden über Swetrix MCP angelegt. Eventnamen erscheinen im Dashboard erst nach tatsächlichen Interaktionen; es werden keine Registrierungs-Events erfunden. Lokale Browserprüfungen ersetzen nur die Collector-Antwort, während sie den tatsächlichen statischen Website-Build unter der Produktions-Origin ausführen. Live-Erfassung nach Deployment separat über Swetrix-Sitzungen prüfen.

## English

The two existing deployments use separate private Swetrix projects: **csp-marketing** for the Netlify marketing entry point and **csp-product** for the GitHub Pages product/developer view. They share the same website source. German and English visits belong to the project selected by the current host; Acme remains separate. Each project has five saved funnels tailored to marketing interest or product adoption. Booking conversion events (`BOOKING_CLICK`, `BOOKING_CONFIRMED`) are wired in code and activate when `CSP_BRAND_BOOKING_URL` is set and the thank-you pages receive redirects from the booking tool. The former shared csp-brand project was renamed csp-marketing; historical setup test data is retained, and separation applies from this deployment onward.

DNT is respected. Local development, preview hosts, unrelated GitHub Pages paths, Storybook and 404 pages do not collect data. Payloads omit cookies, user input, identifiers, query strings, UTM parameters and referrers. The server necessarily receives network IP and HTTP browser information. Contact and download clicks indicate interest, not completed enquiries or downloads. The browser tests check production-host project routing, real interactions, repeat visits and privacy exclusions using a mocked collector. Live collection is verified separately after deployment through Swetrix sessions and funnels.

# CSP by kieks.me — Corporate Identity

## Positionierung

CSP bündelt Kundenservice, Bereitschaft, Status und Wissen. Das Produkt ist Open Source unter MIT. kieks.me verkauft die Einrichtung, Anpassung und Integration als individuell vereinbartes Projekt. Übergabe und Skills ermöglichen eigenständige Weiterentwicklung. Kein verpflichtendes Abonnement; Provider- und Infrastrukturkosten werden separat offengelegt.

**Claim:** Ihr Serviceportal. Ihr Code. Ihre Freiheit.

**English:** Your service portal. Your code. Your freedom.

Zielgruppe: IT-Verantwortliche im Mittelstand. Ton: klar, direkt, fachlich korrekt, professionelle Sie-Ansprache. Zeigen, was CSP kann; keine behaupteten Einsparungen, Garantien, Partnerschaften oder Kundenreferenzen. Aussagen über Automatisierung von echten Handlungen nur mit belegter Funktion. Die Standardmodule sind öffentlich.

KI-Entlastung: 80 % der Serviceanfragen vorfiltern ist ein Zielwert, noch keine eigene Messung. Mögliche Kostenersparnis wird im Kundenprojekt geprüft. Nutzer können die KI jederzeit überspringen: per Hotline oder über menschliche Chat-Übernahme mit eingerichtetem Support-Plugin. Keine sofortige Antwort oder durchgehende Besetzung versprechen; es gelten vereinbarte Servicezeiten.

## Bildmarke und Logo

Ein kantiges Headset mit geradem Mikrofonarm steht für Zuhören und den direkten Kontakt zum Serviceteam. Der Bügel hat abgeschrägte Ecken, die Ohrmuscheln sind rechteckig. Die geometrischen CSP-Buchstaben sind als Vektorpfade gezeichnet; die kleine Anbieterzeile bleibt editierbarer Text. Der Schrift-Fallback für diese Zeile ist Arial/sans-serif. Ein neues Brand ist keine zugesicherte Markenregistrierung.

`assets/logo-primary.svg` für helle Flächen, `logo-light.svg` für dunkle Flächen; `logo-mono-dark.svg` und `logo-mono-light.svg` für einfarbige Anwendungen. `icon.svg` für kleine quadratische Anwendungen. Mindestbreite Wortmarke: 120 px; Icon: 24 px. Freiraum mindestens eine halbe Symbolhöhe. Nicht strecken, drehen, umfärben oder mit Effekten verändern. Der Web-Brand-Guide zeigt Anwendungen.

## Quarks und Typografie

| Rolle  | Wert    | Anwendung                      |
| ------ | ------- | ------------------------------ |
| Paper  | #F7FAF9 | Helle Grundfläche              |
| Ink    | #102A2A | Haupttext und dunkle Sektionen |
| Petrol | #006B64 | Links, Buttons, Bildmarke      |
| Lime   | #D5F36B | Akzente mit dunklem Text       |

Die gemeinsame Quelle liegt in `packages/ui/src/quarks/tokens.ts`. Daraus entstehen CSS-Tokens, Website-Aliase und ein CSP-Theme-Preset. Die Bibliothek bündelt Komponenten und lizenzierte Brand-Assets; siehe [Komponentenbibliothek](../packages/ui/README.md). Inter Variable wird lokal geladen. Fließtext 400, Navigation 550–600, Überschriften 650. Überschriften sind kompakt und groß, Fließtext hat großzügige Zeilenhöhe. Limette nie für kleinen Text auf heller Fläche nutzen. Abstände basieren auf 4 px, Komponentenradius 8 px; Breakpoints 480/820/1100 px werden in der Website konsistent gepflegt. Animationen sind dezent und bei reduzierter Bewegung deaktiviert.

UI-Icons kommen aus Lucide (`lucide-react`) und werden zentral im Icon-Atom ausgewählt, mit 1,6 px Strichstärke und `currentColor`. Pfeile, Navigation, FAQ und Plugin-Symbole verwenden dieselbe Bibliothek. Die Icons sind dekorativ; sichtbare Texte tragen die Bedeutung. Das CSP-Headset ist eine eigenständige Bildmarke und bleibt unabhängig von der Icon-Library.

## Bilder und Anwendungen

Produktbilder zeigen echte Portal-Demoansichten mit sichtbarer Kennzeichnung synthetischer Daten. Keine Stockfotos als Kundenbeleg. Flächen und Diagramme greifen das modulare Zeichen auf; technische Details gehören auf die Plugin-Seite und in Dokumentation.

Social-Vorschauen liegen als editierbare SVGs und PNGs mit 1200 × 630 px in `assets/`. Favicons und Apple-Touch-Icon werden in `public/brand/` ausgeliefert. `pnpm assets` exportiert Logos, PNGs und Social-Bilder reproduzierbar mit Sharp. Die lizenzierte Inter-Schrift liegt über Fontsource vor; der Social-SVG-Text verwendet einen portablen Arial/sans-serif-Fallback.

## Rechte

Die Website und Skills sind MIT. Markenassets haben eigene [Nutzungsregeln](../BRAND-LICENSE.md); Schriftrechte siehe [Third-party notices](../THIRD-PARTY-NOTICES.md). Kundenbranding ist unabhängig von dieser Produktmarke.

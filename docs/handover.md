# Kundenübergabe / Customer handover

Das Integrationsprojekt übergibt den kundenspezifischen Repository-Stand, Konfiguration, Betriebsdokumentation und das Skill-Paket. Vereinbarte echte Anbindungen werden in der Kundenumgebung geprüft. Hosting und Provider-Verträge gehören in die separate Kostenübersicht. Dieses öffentliche Repo enthält weder private Kundenkonfiguration noch Zugangsdaten.

## Skills installieren

Kopieren Sie die vollständigen drei Ordner aus `skills/` in `<kundenrepo>/.agents/skills/`. In Codex lassen sich die Skills über `$csp-customer-branding`, `$csp-content-maintenance` und `$csp-plugin-development` aufrufen. Andere Assistenten benötigen ihre eigene Skill-Konfiguration; die Markdown-Anweisungen und Beispiele bleiben lesbar. Prüfen Sie nach der Installation die Skill-Erkennung im verwendeten Assistenten.

Beispielaufträge:

- „Nutze $csp-customer-branding und ändere die Markenfarben in Standard- und Demo-Profil anhand unserer gelieferten CI. Betriebswerte bleiben erhalten.“
- „Nutze $csp-content-maintenance und ergänze diese freigegebene FAQ. Prüfe Inhalte und die Frontend-/API-Übergabe.“
- „Nutze $csp-plugin-development und entwickle ein lesendes Plugin für diesen dokumentierten Dienst. Prüfe das Paket in einer temporären Kundeninstanz.“

Die Skills sind gegen CSP 0.13.4 geprüft. Vor Arbeiten an anderen Versionen installierte Pakete und die zugehörige Produktdokumentation prüfen. Den Beispiel-Plugin-Ordner zuerst in ein eigenes Arbeitsverzeichnis kopieren; seine Beispielwerte sind synthetisch. Skills unterstützen die Arbeit, garantieren aber keine korrekten KI-Änderungen. Ihr Team prüft Diff, Tests und gewünschtes Verhalten vor Auslieferung.

## Übergabe-Checkliste

- Projektumfang und Kosten für Infrastruktur/Anbieter dokumentiert.
- Repository, Eigentümerschaft, Zugänge und Wiederherstellungsweg übergeben; Secrets über einen geeigneten sicheren Kanal.
- Gewählte Plugins und Versionen, echte Verbindungsprüfungen sowie verbleibende Grenzen dokumentiert.
- Standard-/Demo-Profile, Inhalte und Frontend/API-Deployment erklärt.
- Drei Skills vollständig kopiert, im Assistenten erkannt und anhand eines eigenen Auftrags ausprobiert.
- Weiterentwicklung, optionale Zusatzaufträge und separate Brand-Nutzungsregeln erklärt.

## English

Copy the three complete folders from `skills/` to your customer repository's `.agents/skills/`. Invoke the matching skill by name in Codex. Other assistants require their own discovery configuration. Keep references and assets with SKILL.md. The skills and runnable example target CSP 0.13.4; check the installed version and matching product documentation before applying them to another release.

Handover includes project code, configuration, operational documentation and skills. Verify real connections in the customer's environment and list separate provider/infrastructure costs. Review generated changes, tests and deployment results. Public sample files never contain customer secrets. Branding rights are separate from the MIT licence for code and skills.

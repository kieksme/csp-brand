import type { Locale } from "../lib/paths";
export type PluginId =
  | "contact"
  | "signl4"
  | "kuma"
  | "content"
  | "chat"
  | "teams"
  | "slack"
  | "telegram";
export interface Plugin {
  id: PluginId;
  package: string;
  name: Record<Locale, string>;
  tagline: Record<Locale, string>;
  description: Record<Locale, string>;
  features: Record<Locale, string[]>;
  requirements: Record<Locale, string>;
  docs: string;
  verification: "public" | "provider" | "live-pending";
  requires: PluginId[];
}
/** Reviewed against CSP 0.13.4 documentation on 2026-10-13. */
export const productVersion = "0.13.4";
export const plugins = [
  {
    id: "contact",
    package: "@kieksme/csp-plugin-contact",
    name: {
      de: "Kontakt",
      en: "Contact",
    },
    tagline: {
      de: "Der direkte Draht, wenn es zählt.",
      en: "A direct line when it matters.",
    },
    description: {
      de: "Hotline und Kontaktinformationen geben Ihren Kunden einen klaren Weg zum Support.",
      en: "A hotline and contact details give your customers a clear route to support.",
    },
    features: {
      de: [
        "Notfall-Hotline",
        "Kontaktwissen für den Assistenten",
        "Lesende WebMCP-Tools",
      ],
      en: [
        "Emergency hotline",
        "Contact knowledge for the assistant",
        "Read-only WebMCP tools",
      ],
    },
    requirements: {
      de: "Eine öffentliche Support-Rufnummer.",
      en: "A public support phone number.",
    },
    docs: "https://github.com/kieksme/csp/blob/main/docs/plugins.md",
    verification: "public",
    requires: [],
  },
  {
    id: "signl4",
    package: "@kieksme/csp-plugin-signl4",
    name: {
      de: "SIGNL4",
      en: "SIGNL4",
    },
    tagline: {
      de: "Wer ist gerade für mich da?",
      en: "Who is on duty right now?",
    },
    description: {
      de: "Bereitschaften, Teamprofile und aktuelle Alerts aus SIGNL4 werden im Portal sichtbar.",
      en: "Bring SIGNL4 duty schedules, team profiles and current alerts into the portal.",
    },
    features: {
      de: [
        "Schichten und zuständige Personen",
        "Teamprofile, Avatare und vCards",
        "Aktuelle Alerts",
      ],
      en: [
        "Duty schedules and contacts",
        "Team profiles, avatars and vCards",
        "Current alerts",
      ],
    },
    requirements: {
      de: "SIGNL4-Zugang, API-Key und Team-ID; Anbietergebühren separat.",
      en: "SIGNL4 access, API key and team ID; provider fees are separate.",
    },
    docs: "https://github.com/kieksme/csp/blob/main/docs/configuration.md",
    verification: "provider",
    requires: [],
  },
  {
    id: "kuma",
    package: "@kieksme/csp-plugin-kuma",
    name: {
      de: "Uptime Kuma",
      en: "Uptime Kuma",
    },
    tagline: {
      de: "Systemstatus statt Rätselraten.",
      en: "System status without the guesswork.",
    },
    description: {
      de: "Die veröffentlichte Uptime-Kuma-Statusseite liefert Monitorstatus und Vorfälle direkt ins Portal.",
      en: "Show monitor status and incidents from your published Uptime Kuma status page.",
    },
    features: {
      de: [
        "Monitorstatus und Vorfälle",
        "Aktualisierte Live-Daten",
        "Veraltete Daten werden gekennzeichnet",
      ],
      en: [
        "Monitor status and incidents",
        "Refreshed live data",
        "Stale data is identified",
      ],
    },
    requirements: {
      de: "Erreichbare Uptime-Kuma-Statusseite mit URL und Slug.",
      en: "An accessible Uptime Kuma status page with its URL and slug.",
    },
    docs: "https://github.com/kieksme/csp/blob/main/docs/plugins.md",
    verification: "provider",
    requires: [],
  },
  {
    id: "content",
    package: "@kieksme/csp-plugin-content",
    name: {
      de: "Inhalte & FAQ",
      en: "Content & FAQ",
    },
    tagline: {
      de: "Die gute Antwort beginnt mit gutem Wissen.",
      en: "Good answers start with good knowledge.",
    },
    description: {
      de: "Prozesse, häufige Fragen und Ticketvorlagen machen Supportwissen leicht zugänglich.",
      en: "Make support knowledge accessible through processes, frequently asked questions and ticket templates.",
    },
    features: {
      de: [
        "Prozesse und FAQ mit Markdown",
        "Links zum vorhandenen Ticketsystem",
        "Kopierbare Ticketvorlagen",
      ],
      en: [
        "Processes and FAQ with Markdown",
        "Links to your existing ticket system",
        "Copyable ticket templates",
      ],
    },
    requirements: {
      de: "Öffentliche Inhalte in einer versionierten JSON-Datei. Tickets werden im externen System angelegt.",
      en: "Public content in a versioned JSON file. Tickets are created in the external system.",
    },
    docs: "https://github.com/kieksme/csp/blob/main/docs/content.md",
    verification: "public",
    requires: [],
  },
  {
    id: "chat",
    package: "@kieksme/csp-plugin-chat",
    name: {
      de: "KI-Chat",
      en: "AI chat",
    },
    tagline: {
      de: "Antworten im Kontext Ihres Portals.",
      en: "Answers in the context of your portal.",
    },
    description: {
      de: "Ein gekennzeichneter digitaler Assistent nutzt Inhalte und Live-Quellen der eigenen Instanz.",
      en: "A clearly labelled digital assistant uses content and live sources from its own portal instance.",
    },
    features: {
      de: [
        "OpenAI, Azure OpenAI oder Ollama",
        "Gestreamte Antworten mit Quellen",
        "Keine eigenständigen Ticket- oder Alert-Aktionen",
      ],
      en: [
        "OpenAI, Azure OpenAI or Ollama",
        "Streamed answers with sources",
        "No autonomous ticket or alert actions",
      ],
    },
    requirements: {
      de: "Konfigurierter Modellanbieter; API-/Infrastrukturkosten separat. KI-Antworten können fehlerhaft sein.",
      en: "A configured model provider; API and infrastructure costs are separate. AI answers can be incorrect.",
    },
    docs: "https://github.com/kieksme/csp/blob/main/docs/chat.md",
    verification: "provider",
    requires: [],
  },
  {
    id: "teams",
    package: "@kieksme/csp-plugin-teams",
    name: {
      de: "Microsoft Teams",
      en: "Microsoft Teams",
    },
    tagline: {
      de: "Vom Assistenten zum Menschen.",
      en: "From assistant to human.",
    },
    description: {
      de: "Supportgespräche werden mit einem Teams-Kanal verbunden. Ihr Team kann den Chat ausdrücklich übernehmen.",
      en: "Connect support conversations to a Teams channel. Your team can explicitly take over the chat.",
    },
    features: {
      de: [
        "Entra-Anmeldung und gespeicherte Gespräche",
        "Ein Channel-Thread pro Gespräch",
        "Übernahme, Bot-Pause, Freigabe und Abschluss",
      ],
      en: [
        "Entra sign-in and persisted conversations",
        "One channel thread per conversation",
        "Takeover, bot pause, release and closure",
      ],
    },
    requirements: {
      de: "Chat-Plugin, Entra-App, PostgreSQL und Teams-App im Standardkanal.",
      en: "Chat plugin, Entra app, PostgreSQL and a Teams app in a standard channel.",
    },
    docs: "https://github.com/kieksme/csp/blob/main/docs/teams-support.md",
    verification: "live-pending",
    requires: ["chat"],
  },
  {
    id: "slack",
    package: "@kieksme/csp-plugin-slack",
    name: {
      de: "Slack",
      en: "Slack",
    },
    tagline: {
      de: "Support dort, wo Ihr Team arbeitet.",
      en: "Support where your team works.",
    },
    description: {
      de: "Slack-Channel-Threads verbinden das Portal mit menschlichem Support über die gemeinsame Chat-Oberfläche.",
      en: "Slack channel threads connect the portal to human support through the shared chat interface.",
    },
    features: {
      de: [
        "Channel-Threads und direkte Antworten",
        "Menschliche Übernahme und Bot-Pause",
        "Signierte Events und Button-Aktionen",
      ],
      en: [
        "Channel threads and direct replies",
        "Human takeover and bot pause",
        "Signed events and button actions",
      ],
    },
    requirements: {
      de: "Chat-Plugin, Slack-App, Entra-Anmeldung und PostgreSQL.",
      en: "Chat plugin, Slack app, Entra sign-in and PostgreSQL.",
    },
    docs: "https://github.com/kieksme/csp/blob/main/docs/slack-support.md",
    verification: "live-pending",
    requires: ["chat"],
  },
  {
    id: "telegram",
    package: "@kieksme/csp-plugin-telegram",
    name: {
      de: "Telegram",
      en: "Telegram",
    },
    tagline: {
      de: "Ein Gespräch. Ein eigener Thread.",
      en: "One conversation. One dedicated thread.",
    },
    description: {
      de: "Ein Forum-Thema je Gespräch verbindet das Portal mit Ihrer Telegram-Supportgruppe.",
      en: "A forum topic for each conversation connects the portal to your Telegram support group.",
    },
    features: {
      de: [
        "Forum-Themen und menschliche Übernahme",
        "Anonyme Besuchersitzungen oder Entra",
        "Secret-geschützte Webhooks und persistente Inbox",
      ],
      en: [
        "Forum topics and human takeover",
        "Anonymous visitor sessions or Entra",
        "Secret-protected webhooks and a persistent inbox",
      ],
    },
    requirements: {
      de: "Chat-Plugin, Telegram-Bot, Forum-Supergruppe und PostgreSQL.",
      en: "Chat plugin, Telegram bot, a forum supergroup and PostgreSQL.",
    },
    docs: "https://github.com/kieksme/csp/blob/main/docs/telegram-support.md",
    verification: "live-pending",
    requires: ["chat"],
  },
] satisfies Plugin[];

import type { Locale } from "../lib/paths";
export const copy = {
  de: {
    title: "CSP by kieks.me · Ihr Serviceportal. Ihr Code. Ihre Freiheit.",
    description:
      "Open-Source-Serviceportal für Ihren Mittelstand. Wir richten CSP ein, integrieren Ihre Systeme und übergeben Code und Skills. Kein verpflichtendes Abo.",
    nav: ["Das Portal", "Plugins", "Angebot", "Ihr Projekt"],
    contact: "Integration besprechen",
    demo: "Demo ansehen",
    source: "Quellcode ansehen",
    allPlugins: "Alle Plugins entdecken",
    skip: "Zum Inhalt",
    menu: "Menü",
    hero: {
      eyebrow: "CUSTOMER SERVICE PORTAL",
      first: "Ihr Serviceportal.",
      second: "Ihr Code.",
      third: "Ihre Freiheit.",
      text: "Support, Status und Wissen an einem Ort. KI kann Routinearbeit reduzieren und Kosten sparen. Ihre Kunden wählen jederzeit den direkten Weg zum Serviceteam – auch ohne KI.",
      proof: [
        "Open Source · MIT",
        "Einrichtung statt Lizenzverkauf",
        "Kein verpflichtendes Abo",
        "Direkter Kontakt auch ohne KI",
      ],
      label: "Synthetische Produktdemo · Acme",
      note: "Ein Portal, das zu Ihrem Unternehmen passt.",
    },
    strip: ["Support bündeln.", "Systeme verbinden.", "Selbst weiterbauen."],
    product: {
      eyebrow: "01 / ALLES AN EINEM ORT",
      title: "Weniger suchen.\nSchneller weiterkommen.",
      description:
        "Wenn ein Dienst ausfällt, zählt ein klarer nächster Schritt. CSP bringt Ansprechpartner, Systemstatus und Antworten zusammen.",
      benefits: [
        {
          title: "Menschen erreichen",
          text: "Hotline, Bereitschaft und Teamkontakte: Ihre Kunden wissen, wohin sie sich wenden können.",
        },
        {
          title: "Status verstehen",
          text: "Aktuelle Meldungen und Monitorstatus aus Ihren Systemen – zentral und verständlich.",
        },
        {
          title: "Wissen nutzbar machen",
          text: "FAQ, Prozesse und Ticketvorlagen helfen direkt. Der digitale Assistent nutzt die Quellen Ihres Portals.",
        },
      ],
    },
    plugins: {
      eyebrow: "02 / MODULAR VERBUNDEN",
      title: "Ihre Systeme.\nEin gemeinsamer Einstieg.",
      description:
        "Wählen Sie die Plugins, die zu Ihrem Support passen. Neue Integrationen können Sie mit dem offenen SDK selbst entwickeln.",
      heading: "Acht Plugins. Ihr Setup.",
      intro:
        "Jedes Plugin hat einen klaren Zweck. Hier sehen Sie, was es leistet und was für die Einrichtung benötigt wird.",
      requirements: "Für die Einrichtung",
      docs: "Technische Dokumentation",
      pending: "Live-Anbindung noch zu verifizieren",
      provider: "Provider-Verbindung pro Projekt prüfen",
      public: "Öffentliches Portalmodul",
      transport:
        "Teams, Slack und Telegram sind alternative Supporttransporte. Pro Instanz wird genau einer ausgewählt; alle benötigen das Chat-Plugin.",
      providers:
        "Der KI-Chat unterstützt OpenAI, Azure OpenAI und Ollama. Modellanbieter und Hosting werden passend zu Ihren Anforderungen gewählt.",
      date: "Funktionsstand: CSP 0.13.4 · geprüft am 13. Oktober 2026.",
    },
    ownership: {
      eyebrow: "03 / KLARE VERHÄLTNISSE",
      title: "Einmal integrieren.\nDauerhaft selbst bestimmen.",
      intro: "Sie beauftragen unsere Arbeit. Der Code bleibt offen.",
      cards: [
        {
          title: "Keine CSP-Lizenzgebühr",
          text: "Das Produkt steht unter MIT. Sie können es nutzen, verändern und in Ihrer eigenen Infrastruktur betreiben.",
        },
        {
          title: "Kein verpflichtendes Abo",
          text: "Einrichtung und Integration werden als individuelles Projekt vereinbart. Zusätzliche Leistungen beauftragen Sie nur bei Bedarf.",
        },
        {
          title: "Kein Zwang zum Anbieter",
          text: "Sie erhalten Ihren Projektstand, Konfiguration und Dokumentation. Ihr Team oder ein anderer Dienstleister kann weiterarbeiten.",
        },
      ],
      cost: "Kostenklarheit gehört dazu: Hosting, SIGNL4, Microsoft-/Slack-Dienste und KI-Anbieter können eigene Kosten verursachen. Diese werden vorab besprochen und separat ausgewiesen.",
    },
    offer: {
      eyebrow: "04 / UNSER ANGEBOT",
      title: "Drei Stufen.\nKlare Verantwortung.",
      intro:
        "Für Verantwortliche im Betrieb: Aufwand, Übergabe und Zuständigkeit sind je Stufe klar getrennt. Sie beauftragen nur, was Sie brauchen.",
      steps: [
        {
          tag: "Stufe 1 · Paketpreis",
          title: "Integration und Beratung",
          text: "Wir richten CSP in Ihrer Umgebung ein und binden Ihre Systeme an – selbst oder gemeinsam mit Ihrem Team. Der Paketpreis wird nach Klärung des Umfangs vereinbart; Preise nennen wir auf Anfrage.",
          groups: [
            {
              label: "Betriebsumgebung",
              items: ["On-Premise", "Azure", "AWS", "Google Cloud"],
            },
            {
              label: "Anmeldung und Berechtigungen",
              items: [
                "z. B. Entra ID",
                "z. B. Keycloak",
                "Weitere nach Absprache",
              ],
            },
          ],
          note: "Umgebung und Anmeldesystem werden vor Projektbeginn geprüft. Compliance- und Governance-Anforderungen klären wir von Beginn an und berücksichtigen sie in der Umsetzung; das ist keine Zertifizierungs- oder DSGVO-Zusage. KI bleibt optional: Ein Betrieb mit lokalen Modellen oder z. B. Azure AI Foundry ist nach Projektprüfung möglich.",
        },
        {
          tag: "Stufe 2",
          title: "Schulung für Betrieb und Entwicklung",
          text: "Operations lernt Betrieb, Updates und Monitoring. Development lernt die Weiterentwicklung mit CSP-SDK und Skills. Ziel ist, dass Ihr Team CSP ohne uns betreiben und erweitern kann.",
          groups: [
            { label: "Zielgruppen", items: ["Operations", "Development"] },
          ],
        },
        {
          tag: "Stufe 3 · Optional",
          title: "Betreuung nach Vereinbarung",
          text: "Laufende Pflege über Rahmenvertrag oder Subscription – nur, wenn Sie diese ausdrücklich beauftragen. Ohne Betreuung bleibt der Betrieb wie vereinbart bei Ihnen.",
          groups: [],
        },
      ],
      about:
        "Herausgeberin von CSP ist die kieks.me GbR. Wir arbeiten auch als AI Consultant; zwei AI Solution Architects begleiten Integration und Schulung.",
    },
    process: {
      eyebrow: "05 / VOM PLAN ZUM PORTAL",
      title: "Ein Projekt.\nEine saubere Übergabe.",
      description:
        "Umfang und Preis entstehen aus Ihren Anforderungen. Jede Stufe wird vorab abgestimmt, nichts läuft ohne Ihre Beauftragung.",
      steps: [
        {
          title: "Verstehen",
          text: "Wir klären Supportwege, bestehende Systeme, Daten und Betriebsanforderungen.",
        },
        {
          title: "Verbinden",
          text: "Wir richten das Portal ein, passen die Marke an und integrieren die gewählten Systeme.",
        },
        {
          title: "Prüfen",
          text: "Wir testen die vereinbarten Abläufe und echten Anbindungen in Ihrer Umgebung.",
        },
        {
          title: "Übergeben",
          text: "Ihr Team erhält Code, Konfiguration, Dokumentation und Skills zur Weiterentwicklung.",
        },
      ],
    },
    skills: {
      eyebrow: "06 / WISSEN BLEIBT BEI IHNEN",
      title: "Nicht nur eingerichtet.\nAuch weitergedacht.",
      text: "Im Paket enthalten: versionierte Skills für KI-Coding-Assistenten. Sie geben Ihrem Team konkrete Arbeitsabläufe und Prüfungen für die eigene Weiterentwicklung.",
      items: [
        {
          name: "Branding",
          text: "Farben, Logo und Portalprofile passend zu Ihrer Marke pflegen.",
        },
        {
          name: "Inhalte",
          text: "FAQ, Prozesse und Ticketvorlagen sicher aktualisieren.",
        },
        {
          name: "Eigene Plugins",
          text: "Neue Integrationen mit dem CSP-SDK entwickeln und prüfen.",
        },
      ],
      link: "Skill-Paket ansehen",
      note: "Skills unterstützen Ihr Team. Änderungen werden weiterhin fachlich geprüft und getestet.",
      file: "Ihr Projekt / skills",
    },
    faq: {
      eyebrow: "NOCH FRAGEN?",
      title: "Gut zu wissen.",
      items: [
        {
          question: "Welche Umgebungen und Anmeldesysteme sind möglich?",
          answer:
            "Wir betrachten On-Premise, Azure, AWS und Google Cloud. Für Anmeldung und Berechtigungen nennen wir z. B. Entra ID und Keycloak; weitere Systeme nach Absprache. Ob Ihre Umgebung passt, prüfen wir vor Projektbeginn.",
        },
        {
          question: "Was kostet die Integration?",
          answer:
            "Integration und Beratung werden als Paketpreis vereinbart. Den Betrag nennen wir auf Anfrage, nachdem Umfang, Umgebung und Anbindungen geklärt sind. Hosting und externe Dienste können gesondert anfallen.",
        },
        {
          question: "Gibt es Schulung und laufende Betreuung?",
          answer:
            "Ja. Die Schulung für Operations und Development ist die zweite Stufe. Eine laufende Betreuung über Rahmenvertrag oder Subscription ist optional und wird nur auf Ihre ausdrückliche Beauftragung erbracht.",
        },
        {
          question: "Was genau bezahlen wir?",
          answer:
            "Die vereinbarte Einrichtung, Anpassung, Integration und Übergabe. CSP selbst ist Open Source unter MIT. Ein individuelles Angebot macht den Projektumfang und separate Anbieter- oder Infrastrukturkosten transparent.",
        },
        {
          question: "Gibt es ein Abonnement oder laufende Lizenzkosten?",
          answer:
            "Für CSP gibt es keine Lizenzgebühr und bei unserem Integrationsangebot kein verpflichtendes Abo. Hosting, externe Dienste und KI-Nutzung können laufende Kosten verursachen. Spätere Unterstützung oder Erweiterungen werden separat beauftragt.",
        },
        {
          question:
            "Können wir das Portal selbst betreiben und weiterentwickeln?",
          answer:
            "Ja. Die MIT-Lizenz erlaubt Nutzung und Änderungen. Sie erhalten den Projektstand, Dokumentation und Skills für Branding, Inhalte und eigene Plugins. Die Nutzung der CSP-Markenassets ist separat geregelt.",
        },
        {
          question: "Kann das Portal unser Ticketsystem ersetzen?",
          answer:
            "CSP ist der zentrale Einstieg zum Support. Das Content-Plugin verlinkt Ihr vorhandenes Ticketsystem und bietet Vorlagen. Der KI-Chat legt keine Tickets an und verändert keine Alerts.",
        },
        {
          question: "Können unsere Kunden die KI jederzeit überspringen?",
          answer:
            "Ja. Die Hotline bietet einen direkten Kontakt ohne KI. Mit einem eingerichteten Teams-, Slack- oder Telegram-Support-Plugin können Kunden im Chat schon vor der ersten KI-Nachricht eine echte Person anfordern. Der Bot pausiert, das Serviceteam kann übernehmen. Besetzung und Antwortzeiten richten sich nach Ihren vereinbarten Servicezeiten.",
        },
        {
          question: "Sind unsere Informationen automatisch privat?",
          answer:
            "Nein. Die Standardmodule sind öffentlich; veröffentlichte Inhalte müssen dafür geeignet sein. Geschützte Supportgespräche und die jeweilige Anmeldung werden separat eingerichtet. Datenfreigaben, KI-Anbieter und Betrieb klären wir im Projekt.",
        },
        {
          question: "Sind 80 Prozent KI-Vorfilterung bereits gemessen?",
          answer:
            "Die 80 Prozent sind unser Zielwert, noch keine eigene Messung. Vorfilterung bedeutet, wiederkehrende Fragen mit KI zu klären und Anliegen vorzubereiten. Die tatsächliche Quote und mögliche Kostenersparnis werden anhand Ihrer Anfragen und Prozesse im Projekt geprüft.",
        },
      ],
    },
    cta: {
      eyebrow: "IHR NÄCHSTER SCHRITT",
      title: "Machen wir Support\nein Stück einfacher.",
      text: "Welche Systeme nutzen Sie? Was soll Ihr Portal können? Lassen Sie uns darüber sprechen.",
    },
    footer: {
      tagline: "Offener Code. Klare Zusammenarbeit.",
      brand: "Brand & Designsystem",
      legal: "Impressum",
      privacy: "Datenschutz",
      repo: "Website & Skills",
      copyright:
        "Ein Angebot der kieks.me GbR. Produktcode: MIT. Markenassets: gesonderte Nutzungsregeln.",
    },
    brand: {
      title: "Ein klarer Auftritt. Ein offenes System.",
      eyebrow: "CSP / BRAND GUIDE",
      intro:
        "Die visuelle Identität von CSP by kieks.me: modular, präzise und souverän. Die Quellen und Nutzungsregeln liegen im Repository.",
      palette: "Eine Palette mit Haltung.",
      logos: "Zuhören. Verbinden. Weiterhelfen.",
      typography: "Klarheit in jeder Zeile.",
      download: "Brand-Dateien ansehen",
      rights:
        "Website-Code und Skills sind MIT-lizenziert. Logo, Bildmarke und Markenanwendungen sind von dieser Lizenz ausgenommen. Details regelt BRAND-LICENSE.md.",
      rules:
        "Logo nicht verzerren oder umfärben. Mindestens eine halbe Symbolhöhe Freiraum lassen. Kleine Anwendungen nutzen das Icon; die Wortmarke bleibt ab 120 px Breite lesbar.",
    },
    notfound: {
      title: "Diese Seite ist nicht hier.",
      text: "Vielleicht ist der Link veraltet. Über die Startseite finden Sie Portal, Plugins und Kontakt.",
      link: "Zur Startseite",
    },
    thanks: {
      title: "Termin bestätigt · CSP by kieks.me",
      heading: "Termin bestätigt.",
      text: "Vielen Dank. Wir melden uns zum vereinbarten Zeitpunkt.",
      link: "Zur Startseite",
    },
    aiService: {
      eyebrow: "KI-ENTLASTUNG / FREIE WAHL",
      title: "Weniger Routine.\nMehr Zeit für Service.",
      description:
        "KI kann wiederkehrende Fragen klären und Anliegen für Ihr Team vorbereiten. Das kann Bearbeitungsaufwand und Servicekosten reduzieren. Wie viel, hängt von Ihren Anfragen und der Qualität Ihrer Wissensquellen ab.",
      targetLabel: "UNSER ZIELWERT",
      target: "80 %",
      targetText: "der Serviceanfragen mit KI vorfiltern",
      targetNote:
        "80 % ist ein Zielwert, noch keine eigene Messung. Die tatsächliche Vorfilterungsquote und der Kosteneffekt werden im Kundenprojekt gemessen.",
      humanTitle: "Direkt zum Menschen. Jederzeit Ihre Wahl.",
      humanText:
        "Ihre Kunden können auf den KI-Assistenten verzichten: die Hotline direkt anwählen oder im Chat einen Service-Mitarbeiter anfordern – auch vor der ersten KI-Nachricht. Eine KI-Antwort muss dafür nicht abgewartet werden.",
      humanDetails:
        "Bei der menschlichen Supportanfrage pausiert der Bot. Das Serviceteam übernimmt das Gespräch. Die Chat-Weiterleitung benötigt ein eingerichtetes Teams-, Slack- oder Telegram-Plugin; Besetzung und Antwortzeiten richten sich nach den vereinbarten Servicezeiten.",
      humanBadge: "Keine verpflichtende KI-Interaktion",
      sourceLink: "So funktioniert die menschliche Übernahme",
    },
  },
  en: {
    title: "CSP by kieks.me · Your service portal. Your code. Your freedom.",
    description:
      "An open-source service portal for your business. We set up CSP, integrate your systems and hand over code and skills. No mandatory subscription.",
    nav: ["The portal", "Plugins", "Offer", "Your project"],
    contact: "Discuss integration",
    demo: "Explore the demo",
    source: "View source code",
    allPlugins: "Explore all plugins",
    skip: "Skip to content",
    menu: "Menu",
    hero: {
      eyebrow: "CUSTOMER SERVICE PORTAL",
      first: "Your service portal.",
      second: "Your code.",
      third: "Your freedom.",
      text: "Support, status and knowledge in one place. AI can reduce routine work and costs. Your customers can choose a direct route to your service team at any time, including without AI.",
      proof: [
        "Open source · MIT",
        "Setup instead of licence sales",
        "No mandatory subscription",
        "Direct contact without AI",
      ],
      label: "Synthetic product demo · Acme",
      note: "A portal that fits your business.",
    },
    strip: [
      "Bring support together.",
      "Connect your systems.",
      "Build on your terms.",
    ],
    product: {
      eyebrow: "01 / ONE PLACE TO START",
      title: "Less searching.\nMore moving forward.",
      description:
        "When a service fails, a clear next step matters. CSP brings contacts, system status and answers together.",
      benefits: [
        {
          title: "Reach the right people",
          text: "A hotline, duty schedules and team contacts help your customers find the right person.",
        },
        {
          title: "Understand the status",
          text: "Current alerts and monitor status from your systems, presented clearly in one place.",
        },
        {
          title: "Put knowledge to work",
          text: "FAQ, processes and ticket templates provide practical help. The digital assistant uses your portal’s sources.",
        },
      ],
    },
    plugins: {
      eyebrow: "02 / CONNECTED BY DESIGN",
      title: "Your systems.\nOne shared starting point.",
      description:
        "Choose the plugins that fit your support. Build new integrations yourself using the open SDK.",
      heading: "Eight plugins. Your setup.",
      intro:
        "Each plugin has a clear purpose. See what it does and what you need to set it up.",
      requirements: "Setup requirements",
      docs: "Technical documentation",
      pending: "Live connection still to be verified",
      provider: "Verify provider connection per project",
      public: "Public portal module",
      transport:
        "Teams, Slack and Telegram are alternative support transports. Each instance uses exactly one; all require the chat plugin.",
      providers:
        "AI chat supports OpenAI, Azure OpenAI and Ollama. Model providers and hosting are selected to match your requirements.",
      date: "Feature baseline: CSP 0.13.4 · reviewed on 13 October 2026.",
    },
    ownership: {
      eyebrow: "03 / CLEAR TERMS",
      title: "Integrate once.\nStay in control.",
      intro: "You commission our work. The code stays open.",
      cards: [
        {
          title: "No CSP licence fee",
          text: "The product is MIT-licensed. Use it, change it and run it on your own infrastructure.",
        },
        {
          title: "No mandatory subscription",
          text: "Setup and integration are agreed as an individual project. Commission additional services only when you need them.",
        },
        {
          title: "Freedom to choose your provider",
          text: "You receive your project code, configuration and documentation. Your team or another provider can take it forward.",
        },
      ],
      cost: "Clear costs are part of the deal: hosting, SIGNL4, Microsoft/Slack services and AI providers may have their own fees. These are discussed upfront and listed separately.",
    },
    offer: {
      eyebrow: "04 / OUR OFFER",
      title: "Three stages.\nClear responsibility.",
      intro:
        "For those accountable for operations: effort, handover and ownership are separated for each stage. You commission only what you need.",
      steps: [
        {
          tag: "Stage 1 · Package price",
          title: "Integration and consulting",
          text: "We set up CSP in your environment and connect your systems – ourselves or together with your team. The package price is agreed once the scope is clear; prices are provided on request.",
          groups: [
            {
              label: "Operating environment",
              items: ["On-premises", "Azure", "AWS", "Google Cloud"],
            },
            {
              label: "Sign-in and permissions",
              items: [
                "e.g. Entra ID",
                "e.g. Keycloak",
                "Others by arrangement",
              ],
            },
          ],
          note: "Environment and sign-in system are reviewed before the project starts. We clarify compliance and governance requirements from the beginning and take them into account in the implementation; this is not a certification or GDPR commitment. AI stays optional: operation with local models or, for example, Azure AI Foundry is possible after a project review.",
        },
        {
          tag: "Stage 2",
          title: "Training for operations and development",
          text: "Operations learns running, updating and monitoring. Development learns how to extend CSP with the CSP SDK and skills. The aim is for your team to run and extend CSP without us.",
          groups: [
            { label: "Audiences", items: ["Operations", "Development"] },
          ],
        },
        {
          tag: "Stage 3 · Optional",
          title: "Support by agreement",
          text: "Ongoing maintenance through a framework agreement or subscription – only if you explicitly commission it. Without support, operation stays with you as agreed.",
          groups: [],
        },
      ],
      about:
        "CSP is published by kieks.me GbR. We also work as an AI consultant; two AI solution architects support integration and training.",
    },
    process: {
      eyebrow: "05 / FROM PLAN TO PORTAL",
      title: "One project.\nA proper handover.",
      description:
        "Scope and price follow your requirements. Every stage is agreed upfront; nothing happens without your commission.",
      steps: [
        {
          title: "Understand",
          text: "We clarify support paths, existing systems, data and operational requirements.",
        },
        {
          title: "Connect",
          text: "We set up your portal, apply your brand and integrate the selected systems.",
        },
        {
          title: "Verify",
          text: "We test the agreed workflows and real connections in your environment.",
        },
        {
          title: "Hand over",
          text: "Your team receives code, configuration, documentation and skills to keep building.",
        },
      ],
    },
    skills: {
      eyebrow: "06 / KNOWLEDGE STAYS WITH YOU",
      title: "Set up for today.\nReady for your next idea.",
      text: "Included: versioned skills for AI coding assistants. They give your team practical workflows and checks to develop the portal further.",
      items: [
        {
          name: "Branding",
          text: "Maintain colours, logos and portal profiles for your brand.",
        },
        {
          name: "Content",
          text: "Update FAQ, processes and ticket templates safely.",
        },
        {
          name: "Custom plugins",
          text: "Build and verify new integrations with the CSP SDK.",
        },
      ],
      link: "Explore the skill package",
      note: "Skills support your team. Changes still need human review and testing.",
      file: "Your project / skills",
    },
    faq: {
      eyebrow: "A FEW MORE ANSWERS",
      title: "Good to know.",
      items: [
        {
          question: "Which environments and sign-in systems are possible?",
          answer:
            "We consider on-premises, Azure, AWS and Google Cloud. For sign-in and permissions we mention, for example, Entra ID and Keycloak; others by arrangement. We check whether your environment fits before the project starts.",
        },
        {
          question: "What does the integration cost?",
          answer:
            "Integration and consulting are agreed as a package price. We provide the amount on request once scope, environment and connections are clear. Hosting and external services may be charged separately.",
        },
        {
          question: "Is there training and ongoing support?",
          answer:
            "Yes. Training for operations and development is the second stage. Ongoing support through a framework agreement or subscription is optional and only provided when you explicitly commission it.",
        },
        {
          question: "What exactly do we pay for?",
          answer:
            "The agreed setup, customisation, integration and handover. CSP itself is open source under MIT. An individual proposal makes the scope and separate provider or infrastructure costs clear.",
        },
        {
          question: "Is there a subscription or recurring licence fee?",
          answer:
            "CSP has no licence fee, and our integration offer has no mandatory subscription. Hosting, third-party services and AI usage may have recurring costs. Further support or extensions are commissioned separately.",
        },
        {
          question: "Can we run and develop the portal ourselves?",
          answer:
            "Yes. The MIT licence allows use and modification. You receive the project code, documentation and skills for branding, content and custom plugins. Use of CSP brand assets is governed separately.",
        },
        {
          question: "Can the portal replace our ticket system?",
          answer:
            "CSP is the central starting point for support. The content plugin links to your existing ticket system and provides templates. AI chat does not create tickets or change alerts.",
        },
        {
          question: "Can our customers skip AI at any time?",
          answer:
            "Yes. The hotline provides direct contact without AI. With a configured Teams, Slack or Telegram support plugin, customers can request a real person in chat before the first AI message. The bot pauses and the service team can take over. Staffing and response times follow your agreed service hours.",
        },
        {
          question: "Is our information automatically private?",
          answer:
            "No. Standard modules are public, so published content must be suitable for that. Protected support conversations and their sign-in are set up separately. We agree data access, AI providers and operation as part of your project.",
        },
        {
          question: "Is 80% AI pre-screening already measured?",
          answer:
            "80% is our target, not our own measured result. Pre-screening means using AI to clarify recurring questions and prepare requests. The actual rate and potential cost savings are assessed against your requests and processes in the project.",
        },
      ],
    },
    cta: {
      eyebrow: "YOUR NEXT STEP",
      title: "Let’s make support\na little simpler.",
      text: "Which systems do you use? What should your portal do? Let’s talk.",
    },
    footer: {
      tagline: "Open code. Clear collaboration.",
      brand: "Brand & design system",
      legal: "Legal notice",
      privacy: "Privacy",
      repo: "Website & skills",
      copyright:
        "An offer by kieks.me GbR. Product code: MIT. Brand assets: separate terms of use.",
    },
    brand: {
      title: "A clear identity. An open system.",
      eyebrow: "CSP / BRAND GUIDE",
      intro:
        "The visual identity of CSP by kieks.me: modular, precise and confident. Sources and terms of use live in the repository.",
      palette: "A palette with purpose.",
      logos: "Listen. Connect. Help.",
      typography: "Clarity in every line.",
      download: "Explore the brand files",
      rights:
        "Website code and skills are MIT-licensed. The logo, symbol and brand applications are excluded from that licence. BRAND-LICENSE.md defines their terms of use.",
      rules:
        "Do not stretch or recolour the logo. Leave at least half a symbol height of clear space. Use the icon for small applications; use the wordmark at 120 px wide or larger.",
    },
    notfound: {
      title: "This page isn’t here.",
      text: "The link may be out of date. Find the portal, plugins and contact on the homepage.",
      link: "Back to the homepage",
    },
    thanks: {
      title: "Booking confirmed · CSP by kieks.me",
      heading: "Booking confirmed.",
      text: "Thank you. We will talk at the scheduled time.",
      link: "Back to the homepage",
    },
    aiService: {
      eyebrow: "AI ASSISTANCE / YOUR CHOICE",
      title: "Less routine work.\nMore time for service.",
      description:
        "AI can answer recurring questions and prepare requests for your team. This can reduce handling effort and service costs. The impact depends on your requests and the quality of your knowledge sources.",
      targetLabel: "OUR TARGET",
      target: "80%",
      targetText: "of service requests pre-screened with AI",
      targetNote:
        "80% is a target, not our own measured result. The actual pre-screening rate and cost impact are measured in the customer project.",
      humanTitle: "Straight to a person. Always your choice.",
      humanText:
        "Your customers can skip the AI assistant: call the hotline directly or request a service team member in chat, even before the first AI message. There is no need to wait for an AI answer.",
      humanDetails:
        "A human support request pauses the bot. The service team takes over the conversation. Chat handover requires a configured Teams, Slack or Telegram plugin; staffing and response times follow the agreed service hours.",
      humanBadge: "No mandatory AI interaction",
      sourceLink: "How human takeover works",
    },
  },
};
export const text = (locale: Locale) => copy[locale];

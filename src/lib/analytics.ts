/** Anonymous website events. No SDK enrichment, identifiers or URL parameters. */
export function startAnalytics() {
  const root = document.documentElement;
  const page = root.dataset.analyticsPage;
  const locale = root.lang === "de" ? "de" : "en";
  const project =
    location.protocol !== "https:"
      ? undefined
      : location.hostname === "csp-brand-kieksme.netlify.app"
        ? { id: "poqo5aTL3ArD", site: "marketing" }
        : location.hostname === "kieksme.github.io" &&
            location.pathname.startsWith("/csp-brand/")
          ? { id: "zU7UlsSu89t1", site: "product" }
          : undefined;
  if (
    !project ||
    !page ||
    !["home", "plugins", "brand", "components"].includes(page) ||
    navigator.doNotTrack === "1" ||
    navigator.doNotTrack === "yes" ||
    root.dataset.analyticsStarted
  )
    return;
  root.dataset.analyticsStarted = "true";

  const send = (event?: string, metadata: Record<string, string> = {}) => {
    // Recheck DNT for every interaction, including a preference changed mid-visit.
    if (["1", "yes"].includes(navigator.doNotTrack ?? "")) return;
    void fetch(`https://analytics-api.kieks.me/log${event ? "/custom" : ""}`, {
      method: "POST",
      credentials: "omit",
      referrerPolicy: "no-referrer",
      keepalive: true,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        pid: project.id,
        pg: location.pathname,
        lc: locale,
        tz: Intl.DateTimeFormat().resolvedOptions().timeZone,
        ...(event
          ? {
              ev: event,
              meta: { site: project.site, locale, page, ...metadata },
            }
          : {}),
      }),
    }).catch(() => {});
  };
  send();
  send("SITE_VIEW");
  if (page === "plugins") send("PLUGINS_VIEW");
  if (page === "components") send("COMPONENTS_VIEW");

  const sections = new Set([
    "portal",
    "ai-service",
    "plugins",
    "ownership",
    "project",
    "skills",
    "faq",
    "contact",
  ]);
  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting || entry.intersectionRatio < 0.2) continue;
        const section = entry.target.closest<HTMLElement>(
          "[data-analytics-section]",
        )?.dataset.analyticsSection;
        if (section && sections.has(section)) send("SECTION_VIEW", { section });
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.2 },
  );
  document
    .querySelectorAll("[data-analytics-section]")
    .forEach((el) => observer.observe(el.querySelector("h2") ?? el));

  const plugins = new Set([
    "contact",
    "signl4",
    "kuma",
    "content",
    "chat",
    "teams",
    "slack",
    "telegram",
  ]);
  document
    .querySelectorAll<HTMLDetailsElement>(".faq-item")
    .forEach((faq, index) => {
      faq.addEventListener("toggle", () => {
        if (faq.open) send("FAQ_OPEN", { item: String(index + 1) });
      });
    });
  document.addEventListener("click", (event) => {
    const link =
      event.target instanceof Element ? event.target.closest("a") : null;
    if (!link || event.defaultPrevented) return;
    const url = new URL(link.href, location.href);
    if (link.classList.contains("language-link")) send("LANGUAGE_SWITCH");
    else if (url.protocol === "mailto:") send("CONTACT_CLICK");
    else if (
      url.origin === "https://kieksme.github.io" &&
      url.pathname.startsWith("/csp-acme/")
    )
      send("DEMO_CLICK");
    else if (
      url.origin === location.origin &&
      /\/plugins\/$/.test(url.pathname)
    ) {
      const plugin = url.hash.slice(1);
      send("PLUGINS_CLICK", plugins.has(plugin) ? { plugin } : {});
    } else if (
      url.origin === location.origin &&
      /\/downloads\/kieksme-csp-ui-[\d.]+\.tgz$/.test(url.pathname)
    )
      send("DOWNLOAD_CLICK");
    else if (
      url.origin === location.origin &&
      /\/storybook\/$/.test(url.pathname)
    )
      send("STORYBOOK_CLICK");
    else if (
      url.origin === "https://github.com" &&
      (url.pathname.startsWith("/kieksme/csp/wiki") ||
        url.pathname.startsWith("/kieksme/csp/blob/main/docs/"))
    )
      send("DOCS_CLICK");
    else if (
      url.origin === "https://github.com" &&
      url.pathname.startsWith("/kieksme/csp-brand/tree/main/skills")
    )
      send("SKILLS_CLICK");
    else if (
      url.origin === "https://github.com" &&
      /^\/kieksme\/csp(?:\/|$)/.test(url.pathname)
    )
      send("SOURCE_CLICK");
  });
}

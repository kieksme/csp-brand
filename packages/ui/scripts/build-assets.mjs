import { mkdir, copyFile, writeFile } from "node:fs/promises";
import { tokens, cspThemePreset } from "../dist/quarks/tokens.js";
await Promise.all(
  ["styles", "fonts", "brand"].map((dir) => mkdir(dir, { recursive: true })),
);
const vars = {
  ...Object.fromEntries(
    Object.entries(tokens.colors).map(([key, value]) => [key, value]),
  ),
  font: tokens.typography.family,
  radius: tokens.radius,
  shadow: tokens.shadow,
  duration: tokens.motion.duration,
  ease: tokens.motion.easing,
  content: tokens.contentWidth,
  "text-sm": tokens.typography.small,
  "text-base": tokens.typography.base,
  "text-lg": tokens.typography.large,
  ...Object.fromEntries(
    Object.entries(tokens.spacing).map(([key, value]) => [
      `space-${key}`,
      value,
    ]),
  ),
};
const css =
  "/* Generated from quarks/tokens.ts. */\n:root {\n" +
  Object.entries(vars)
    .map(([key, value]) => `  --csp-ui-${key}: ${value};`)
    .join("\n") +
  "\n}\n";
await writeFile("styles/tokens.css", css);
await writeFile(
  "styles/marketing.css",
  '@import "./tokens.css";\n:root {\n' +
    Object.keys(vars)
      .map((key) => `  --${key}: var(--csp-ui-${key});`)
      .join("\n") +
    "\n}\n",
);
await writeFile(
  "styles/portal.css",
  "/* Import after core styles; place csp-ui-portal on a wrapper to inherit customer theme. */\n.csp-ui-portal {\n --csp-ui-petrol: var(--accent); --csp-ui-on-accent: var(--accent-ink, #ffffff); --csp-ui-lime: var(--accent-secondary); --csp-ui-paper: var(--paper); --csp-ui-white: var(--card); --csp-ui-ink: var(--ink); --csp-ui-muted: var(--muted); --csp-ui-line: var(--line); --csp-ui-soft: var(--soft); --csp-ui-font: var(--font-family); --csp-ui-radius: var(--radius);\n}\n",
);
await writeFile(
  "brand/portal-theme.json",
  JSON.stringify(cspThemePreset, null, 2) + "\n",
);
for (const name of [
  "logo-primary.svg",
  "logo-light.svg",
  "logo-mono-dark.svg",
  "logo-mono-light.svg",
  "icon.svg",
])
  await copyFile("../../brand/assets/" + name, "brand/" + name);
await copyFile("../../LICENSE", "LICENSE");
await copyFile("../../BRAND-LICENSE.md", "brand/LICENSE.md");
await copyFile("../../brand/licenses/Inter-OFL.txt", "fonts/LICENSE.txt");
await copyFile(
  "../../brand/licenses/Lucide-LICENSE.txt",
  "THIRD-PARTY-NOTICES.md",
);
await copyFile(
  "../../node_modules/@fontsource-variable/inter/files/inter-latin-wght-normal.woff2",
  "fonts/inter-latin.woff2",
);
await copyFile(
  "../../node_modules/@fontsource-variable/inter/files/inter-latin-ext-wght-normal.woff2",
  "fonts/inter-latin-ext.woff2",
);
await writeFile(
  "styles/fonts.css",
  '@font-face { font-family: "Inter Variable"; font-style: normal; font-weight: 100 900; font-display: swap; src: url("../fonts/inter-latin.woff2") format("woff2"); unicode-range: U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+0304,U+0308,U+0329,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD; }\n@font-face { font-family: "Inter Variable"; font-style: normal; font-weight: 100 900; font-display: swap; src: url("../fonts/inter-latin-ext.woff2") format("woff2"); unicode-range: U+0100-02BA,U+02BD-02C5,U+02C7-02CC,U+02CE-02D7,U+02DD-02FF,U+0304,U+0308,U+0329,U+1D00-1DBF,U+1E00-1E9F,U+2020,U+20A0-20AB,U+20AD-20C0,U+2113,U+2C60-2C7F,U+A720-A7FF; }\n',
);
console.log(
  "Generated shared tokens, marketing aliases, portal adapter, brand preset and licensed local assets.",
);

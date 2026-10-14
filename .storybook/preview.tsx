import type { Preview } from "@storybook/react-vite";
import type { CSSProperties } from "react";
import "@kieksme/csp-ui/styles.css";
import "@kieksme/csp-ui/portal.css";
import "@kieksme/csp-ui/fonts.css";
import { cspThemePreset, tokens } from "../packages/ui/src/quarks/tokens";
import { cspStorybookTheme } from "./theme";
import "./preview.css";
const preview: Preview = {
  globalTypes: {
    theme: {
      description: "Customer portal theme",
      toolbar: {
        title: "Theme",
        icon: "paintbrush",
        items: [
          { value: "light", title: "CSP Light" },
          { value: "dark", title: "CSP Dark" },
        ],
        dynamicTitle: true,
      },
    },
  },
  initialGlobals: { theme: "light" },
  decorators: [
    (Story, context) => {
      const dark = context.globals.theme === "dark";
      const theme = {
        ...cspThemePreset.tokens,
        ...(dark ? cspThemePreset.darkTokens : {}),
      };
      const style = Object.fromEntries(
        Object.entries(theme).map(([key, value]) => [
          `--${key.replace(/[A-Z]/g, (letter) => "-" + letter.toLowerCase())}`,
          value,
        ]),
      );
      return (
        <div
          className="csp-ui-portal csp-story-surface"
          style={
            {
              ...style,
              "--accent-ink": dark ? "#000000" : "#ffffff",
              background: theme.paper,
              color: theme.ink,
            } as CSSProperties
          }
        >
          <Story />
        </div>
      );
    },
  ],
  parameters: {
    layout: "padded",
    controls: { expanded: true },
    docs: { theme: cspStorybookTheme, codePanel: true },
    a11y: { test: "error" },
    options: {
      storySort: { order: ["Start", "Quarks", "Atoms", "Molecules"] },
    },
    backgrounds: {
      options: {
        light: { name: "Paper", value: tokens.colors.paper },
        dark: { name: "Ink", value: tokens.colors.ink },
      },
    },
  },
};
export default preview;

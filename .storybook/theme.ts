import { create } from "storybook/theming/create";
import { cspThemePreset, tokens } from "../packages/ui/src/quarks/tokens";

export function getCspStorybookTheme(dark = false) {
  const colors = dark
    ? { ...tokens.colors, ...cspThemePreset.darkTokens }
    : tokens.colors;
  const accent = dark ? cspThemePreset.darkTokens.accent : colors.petrol;
  return create({
    base: dark ? "dark" : "light",
    brandTitle: "CSP by kieks.me — Components",
    brandUrl: "../docs/components/",
    brandImage: dark ? "./brand/logo-light.svg" : "./brand/logo-primary.svg",
    brandTarget: "_self",
    colorPrimary: accent,
    colorSecondary: accent,
    appBg: colors.paper,
    appContentBg: dark ? cspThemePreset.darkTokens.card : colors.white,
    appBorderColor: colors.line,
    appBorderRadius: 8,
    fontBase: tokens.typography.family,
    textColor: colors.ink,
    barTextColor: colors.muted,
    barSelectedColor: accent,
    barBg: dark ? cspThemePreset.darkTokens.card : colors.white,
  });
}
export const cspStorybookTheme = getCspStorybookTheme();

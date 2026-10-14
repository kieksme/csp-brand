import { create } from "storybook/theming/create";
import { tokens } from "../packages/ui/src/quarks/tokens";
export const cspStorybookTheme = create({
  base: "light",
  brandTitle: "CSP by kieks.me — Components",
  brandUrl: "../docs/components/",
  brandImage: "./brand/logo-primary.svg",
  brandTarget: "_self",
  colorPrimary: tokens.colors.petrol,
  colorSecondary: tokens.colors.petrol,
  appBg: tokens.colors.paper,
  appContentBg: tokens.colors.white,
  appBorderColor: tokens.colors.line,
  appBorderRadius: 8,
  fontBase: tokens.typography.family,
  textColor: tokens.colors.ink,
  barTextColor: tokens.colors.muted,
  barSelectedColor: tokens.colors.petrol,
});

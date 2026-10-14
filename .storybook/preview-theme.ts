import { cspThemePreset } from "../packages/ui/src/quarks/tokens";

export function applyPreviewTheme(dark: boolean) {
  const theme = {
    ...cspThemePreset.tokens,
    ...(dark ? cspThemePreset.darkTokens : {}),
  };
  for (const [key, value] of Object.entries(theme)) {
    document.documentElement.style.setProperty(
      `--${key.replace(/[A-Z]/g, (letter) => "-" + letter.toLowerCase())}`,
      value,
    );
  }
  document.documentElement.style.colorScheme = dark ? "dark" : "light";
}

import { addons } from "storybook/manager-api";
import { GLOBALS_UPDATED, SET_GLOBALS } from "storybook/internal/core-events";
import { getCspStorybookTheme } from "./theme";

addons.setConfig({
  theme: getCspStorybookTheme(),
  sidebar: { showRoots: true },
});
// Register after Storybook installs its real channel; an early getChannel() is a mock.
addons.register("csp/theme", (api) => {
  const updateTheme = ({
    userGlobals,
    globals = {},
  }: {
    userGlobals?: Record<string, unknown>;
    globals?: Record<string, unknown>;
  }) =>
    api.setOptions({
      theme: getCspStorybookTheme((userGlobals ?? globals).theme === "dark"),
    });
  addons.getChannel().on(GLOBALS_UPDATED, updateTheme);
  addons.getChannel().on(SET_GLOBALS, updateTheme);
});

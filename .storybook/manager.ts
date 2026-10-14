import { addons } from "storybook/manager-api";
import { cspStorybookTheme } from "./theme";
addons.setConfig({ theme: cspStorybookTheme, sidebar: { showRoots: true } });

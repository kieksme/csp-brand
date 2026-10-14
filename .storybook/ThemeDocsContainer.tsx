import { useEffect, useState, type PropsWithChildren } from "react";
import {
  DocsContainer,
  type DocsContainerProps,
} from "@storybook/addon-docs/blocks";
import { GLOBALS_UPDATED } from "storybook/internal/core-events";
import { applyPreviewTheme } from "./preview-theme";
import { getCspStorybookTheme } from "./theme";

export function ThemeDocsContainer({
  children,
  context,
}: PropsWithChildren<DocsContainerProps>) {
  const [dark, setDark] = useState(() => {
    const last = context.channel.last(GLOBALS_UPDATED)?.[0];
    const story = context.componentStories()[0];
    const globals =
      last?.globals ??
      (story
        ? context.getStoryContext(story).globals
        : context.projectAnnotations.initialGlobals);
    return globals?.theme === "dark";
  });
  useEffect(() => {
    const update = ({ globals }: { globals: Record<string, unknown> }) =>
      setDark(globals.theme === "dark");
    context.channel.on(GLOBALS_UPDATED, update);
    return () => context.channel.off(GLOBALS_UPDATED, update);
  }, [context.channel]);
  useEffect(() => applyPreviewTheme(dark), [dark]);
  return (
    <DocsContainer context={context} theme={getCspStorybookTheme(dark)}>
      {children}
    </DocsContainer>
  );
}

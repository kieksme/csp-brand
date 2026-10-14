import type { StorybookConfig } from "@storybook/react-vite";
const config: StorybookConfig = {
  stories: [
    "../storybook/docs/**/*.mdx",
    "../packages/ui/src/**/*.stories.tsx",
  ],
  framework: "@storybook/react-vite",
  addons: [
    "@storybook/addon-docs",
    "@storybook/addon-a11y",
    "@storybook/addon-vitest",
  ],
  staticDirs: [
    { from: "../public/brand", to: "/brand" },
    { from: "../public/downloads", to: "/downloads" },
    { from: "../packages/ui/fonts", to: "/fonts" },
    { from: "../packages/ui/styles", to: "/styles" },
  ],
  typescript: {
    reactDocgen: "react-docgen-typescript",
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => !prop.parent?.fileName.includes("node_modules"),
    },
  },
  core: { disableTelemetry: true },
  async viteFinal(config) {
    // Relative URLs allow the same artifact to work on Netlify and GitHub Pages.
    config.base = "./";
    return config;
  },
};
export default config;

import { cp } from "node:fs/promises";
await cp("storybook-static", "dist/storybook", { recursive: true });
console.log("Included Storybook in the site at /storybook/.");

import { cspPlugin } from "../package.json";
import { z } from "zod";
import type { ServerPlugin } from "@kieksme/csp-sdk";
export default {
  id: cspPlugin.id,
  sdkVersion: cspPlugin.sdkVersion,
  requires: cspPlugin.requires,
  configSchema: z.object({ CSP_EXAMPLE_LABEL: z.string().min(1).optional() }),
  setup(ctx) {
    const load = () =>
      ctx.cache.get("example-service", async () => ({
        label: ctx.env.CSP_EXAMPLE_LABEL ?? "Synthetic example service",
      }));
    ctx.app.get("/api/v1/example-service", load);
    ctx.knowledge.set("example-service", async () => {
      const result = await load();
      return [
        {
          id: "example-service",
          title: "Example service",
          text: result.data.label,
          href: "#example-service",
          stale: result.stale,
        },
      ];
    });
  },
} satisfies ServerPlugin;

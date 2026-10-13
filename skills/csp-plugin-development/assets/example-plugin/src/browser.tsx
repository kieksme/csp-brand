import { cspPlugin } from "../package.json";
import type { BrowserContext, BrowserPlugin } from "@kieksme/csp-sdk";
import { DataState, useLive } from "@kieksme/csp-sdk/browser";
function ExampleService(ctx: BrowserContext) {
  const state = useLive<{ label: string }>(ctx, "/example-service");
  return (
    <div>
      <p>{state.data?.label}</p>
      <DataState {...state} />
    </div>
  );
}
export default {
  id: cspPlugin.id,
  sdkVersion: cspPlugin.sdkVersion,
  requires: cspPlugin.requires,
  sections: [
    {
      id: "example-service",
      label: "Example service",
      title: "Example service",
      order: 80,
      component: ExampleService,
    },
  ],
} satisfies BrowserPlugin;

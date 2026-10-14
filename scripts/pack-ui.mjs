import { mkdir } from "node:fs/promises";
import { spawnSync } from "node:child_process";
import { resolve } from "node:path";
await mkdir("public/downloads", { recursive: true });
const result = spawnSync(
  "pnpm",
  ["pack", "--pack-destination", resolve("public/downloads")],
  { cwd: "packages/ui", stdio: "inherit" },
);
if (result.status !== 0) process.exit(result.status ?? 1);

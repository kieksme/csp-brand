import assert from "node:assert/strict";
import {
  cp,
  mkdir,
  mkdtemp,
  readFile,
  readdir,
  rm,
  writeFile,
} from "node:fs/promises";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { spawn } from "node:child_process";
const temp = await mkdtemp(join(tmpdir(), "csp-brand-skill-"));
const plugin = join(temp, "plugin");
const customer = join(temp, "customer");
const env = {
  ...Object.fromEntries(
    Object.entries(process.env).filter(([key]) => !key.startsWith("CSP_")),
  ),
  CSP_DEMO: "true",
  CSP_CHAT_DEMO: "true",
};
const run = (args, cwd, expected = 0) =>
  new Promise((resolveRun, reject) => {
    const proc = spawn("pnpm", args, {
      cwd,
      env,
      stdio: ["ignore", "pipe", "pipe"],
    });
    let output = "";
    proc.stdout.on("data", (data) => {
      output += data;
    });
    proc.stderr.on("data", (data) => {
      output += data;
    });
    proc.on("error", reject);
    proc.on("close", (code) => {
      if (expected === 0 ? code !== 0 : code === 0)
        reject(
          new Error(
            `pnpm ${args.join(" ")} exited ${code}\n${output.slice(-7000)}`,
          ),
        );
      else {
        console.log(`✓ pnpm ${args.join(" ")}`);
        resolveRun(output);
      }
    });
  });
try {
  await cp(
    resolve("skills/csp-plugin-development/assets/example-plugin"),
    plugin,
    {
      recursive: true,
      filter: (path) =>
        !path.includes("node_modules") &&
        !path.includes("/dist") &&
        !path.endsWith("pnpm-lock.yaml"),
    },
  );
  await run(["install", "--package-import-method=hardlink"], plugin);
  await run(["check"], plugin);
  await mkdir(join(temp, "tarballs"));
  await run(["pack", "--pack-destination", join(temp, "tarballs")], plugin);
  const tarball = join(
    temp,
    "tarballs",
    (await readdir(join(temp, "tarballs"))).find((name) =>
      name.endsWith(".tgz"),
    ),
  );
  await run(["dlx", "@kieksme/csp-cli@0.13.4", "init", customer], temp);
  await run(["install", "--package-import-method=hardlink"], customer);
  const profilePath = join(customer, "portal.config.json");
  const profile = JSON.parse(await readFile(profilePath, "utf8"));
  const partial = JSON.parse(
    await readFile(
      resolve("skills/csp-customer-branding/references/profile-example.json"),
      "utf8",
    ),
  );
  Object.assign(profile, partial);
  profile.public = { ...profile.public, demo: true, staticDemo: true };
  await writeFile(profilePath, JSON.stringify(profile, null, 2));
  await mkdir(join(customer, "public"), { recursive: true });
  const logo =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><circle cx="32" cy="32" r="25" fill="#006b64"/></svg>';
  await writeFile(join(customer, "public/customer-logo.svg"), logo);
  await writeFile(join(customer, "public/customer-icon.svg"), logo);
  await writeFile(
    join(customer, "avatars.json"),
    JSON.stringify({ ids: {}, names: {} }),
  );
  const content = JSON.parse(
    await readFile(
      resolve("skills/csp-content-maintenance/references/content-example.json"),
      "utf8",
    ),
  );
  await writeFile(
    join(customer, "content.json"),
    JSON.stringify(content, null, 2),
  );
  await run(["exec", "csp", "validate"], customer);
  await run(["exec", "csp", "build"], customer);
  const index = await readFile(join(customer, "dist/index.html"), "utf8");
  assert.ok(index.includes("Example Service Portal"));
  await run(["exec", "csp", "plugin", "add", tarball], customer);
  await run(["exec", "csp", "validate"], customer);
  await run(["exec", "csp", "build"], customer);
  const configured = JSON.parse(await readFile(profilePath, "utf8"));
  assert.ok(configured.plugins.includes("csp-example-service"));
  await writeFile(
    join(customer, "skill-smoke.mjs"),
    `
import assert from 'node:assert/strict';
import { loadProfile } from '@kieksme/csp-core/profile';
import { createServer } from '@kieksme/csp-core/server';
import { contentSchema, validatePlugins } from '@kieksme/csp-sdk';
import browser from 'csp-example-service/browser';
import server from 'csp-example-service/server';
import { readFile } from 'node:fs/promises';
const { config }=loadProfile('portal.config.json',{CSP_DEMO:'true',CSP_CHAT_DEMO:'true'});
const content=contentSchema.parse(JSON.parse(await readFile('content.json','utf8')));
assert.equal(content.faq[0].id,'contact');
assert.equal(config.color,'#006B64');
assert.equal(config.name,'Example Service Portal');
assert.equal(browser.sections[0].id,'example-service');
validatePlugins([browser]);
assert.throws(()=>validatePlugins([{...browser,sdkVersion:'^999.0.0'}]));
assert.throws(()=>validatePlugins([{...browser,requires:['missing-service']}]));
const app=await createServer({plugins:[server],config,env:{CSP_DEMO:'true'}});
const health=await app.inject({method:'GET',url:'/health'});
assert.ok(health.json().plugins.includes('example-service'));
const response=await app.inject({method:'GET',url:'/api/v1/example-service'});
assert.equal(response.statusCode,200);
assert.equal(response.json().data.label,'Synthetic example service');
assert.equal(response.json().stale,false);
await app.close();
console.log('Brand/content schemas, browser export, metadata rejection and server route passed');
`,
  );
  await run(["exec", "node", "skill-smoke.mjs"], customer);
  await run(
    ["exec", "csp", "plugin", "remove", "csp-example-service"],
    customer,
  );
  const removed = JSON.parse(await readFile(profilePath, "utf8"));
  assert.ok(!removed.plugins.includes("csp-example-service"));
  await run(["exec", "csp", "build"], customer);
  content.tickets[0].href = "javascript:alert(1)";
  await writeFile(join(customer, "content.json"), JSON.stringify(content));
  await run(["exec", "csp", "validate"], customer, 1);
  console.log(
    "All three customer skill examples passed in a fresh standalone instance.",
  );
} finally {
  if (temp.startsWith(join(tmpdir(), "csp-brand-skill-")))
    await rm(temp, { recursive: true, force: true });
}

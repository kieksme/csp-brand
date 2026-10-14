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
import http from "node:http";
import { cspThemePreset } from "../packages/ui/dist/quarks/tokens.js";
import { chromium } from "@playwright/test";
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
  await mkdir(resolve("test-results"), { recursive: true });
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
  const uiTarball = resolve("public/downloads/kieksme-csp-ui-0.1.0.tgz");
  await run(["add", uiTarball], plugin);
  await writeFile(
    join(plugin, "src/browser.tsx"),
    `
import { useState } from 'react';
import { cspPlugin } from '../package.json';
import type { BrowserContext, BrowserPlugin } from '@kieksme/csp-sdk';
import { DataState, useLive } from '@kieksme/csp-sdk/browser';
import { Button, Card, Badge } from '@kieksme/csp-ui';
import '@kieksme/csp-ui/styles.css';
import '@kieksme/csp-ui/fonts.css';
import '@kieksme/csp-ui/portal.css';
function ExampleService(ctx: BrowserContext) {
 const state=useLive<{label:string}>(ctx,'/example-service');
 const [count,setCount]=useState(0);
 return <div className="csp-ui-portal"><Card title="Shared UI in CSP" icon="contact"><Badge tone="success">UI package installed</Badge><p>{state.data?.label}</p><Button onClick={()=>setCount(value=>value+1)}>Portal UI clicks: {count}</Button><DataState {...state}/></Card></div>;
}
export default {id:cspPlugin.id,sdkVersion:cspPlugin.sdkVersion,requires:cspPlugin.requires,sections:[{id:'example-service',label:'Example service',title:'Example service',order:80,component:ExampleService}]} satisfies BrowserPlugin;
`,
  );
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
  profile.theme = cspThemePreset;
  profile.public = { ...profile.public, demo: true, staticDemo: true };
  await writeFile(profilePath, JSON.stringify(profile, null, 2));
  await mkdir(join(customer, "public"), { recursive: true });
  const logo = await readFile(resolve("brand/assets/logo-primary.svg"), "utf8");
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
  const preview = http.createServer(async (req, res) => {
    try {
      let path = new URL(req.url ?? "/", "http://localhost").pathname;
      if (path.endsWith("/")) path += "index.html";
      const data = await readFile(join(customer, "dist", path));
      const type = path.endsWith(".js")
        ? "text/javascript"
        : path.endsWith(".css")
          ? "text/css"
          : path.endsWith(".svg")
            ? "image/svg+xml"
            : path.endsWith(".woff2")
              ? "font/woff2"
              : "text/html";
      res.writeHead(200, { "Content-Type": type });
      res.end(data);
    } catch {
      res.writeHead(404);
      res.end();
    }
  });
  await new Promise((done) => preview.listen(0, "127.0.0.1", done));
  const browser = await chromium.launch({
    executablePath: process.env.CSP_BRAND_CHROMIUM || undefined,
  });
  try {
    const page = await browser.newPage({
      viewport: { width: 1200, height: 900 },
    });
    await page.emulateMedia({ reducedMotion: "reduce", colorScheme: "light" });
    await page.goto(`http://127.0.0.1:${preview.address().port}/`, {
      waitUntil: "networkidle",
    });
    await page.getByRole("button", { name: "Portal UI clicks: 0" }).click();
    assert.equal(
      await page.getByRole("button", { name: "Portal UI clicks: 1" }).count(),
      1,
    );
    const colour = await page
      .locator(".csp-ui-portal .csp-ui-button")
      .evaluate((element) => getComputedStyle(element).backgroundColor);
    assert.equal(colour, "rgb(0, 107, 100)");
    await page.locator(".csp-ui-portal").screenshot({
      path: resolve("test-results/csp-ui-integration.png"),
      animations: "disabled",
    });
    await page
      .getByRole("button", { name: "Dunkles Design aktivieren" })
      .click();
    await page.waitForFunction(
      () =>
        getComputedStyle(
          document.querySelector(".csp-ui-portal .csp-ui-button"),
        ).backgroundColor === "rgb(213, 243, 107)",
    );
    const foreground = await page
      .locator(".csp-ui-portal .csp-ui-button")
      .evaluate((element) => getComputedStyle(element).color);
    assert.equal(foreground, "rgb(0, 0, 0)");
    console.log(
      "✓ Shared UI mounted and handled a real click inside the CSP portal, with inherited preset colour.",
    );
  } finally {
    await browser.close();
    await new Promise((done) => preview.close(done));
  }
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
  // CSS is validated by the actual portal build/browser above; Node only checks exports and server contracts.
  await writeFile(
    join(customer, "css-loader.mjs"),
    `export async function load(url, context, nextLoad) { if (url.endsWith('.css')) return {format:'module',source:'',shortCircuit:true}; return nextLoad(url, context); }`,
  );
  await run(
    ["exec", "node", "--loader", "./css-loader.mjs", "skill-smoke.mjs"],
    customer,
  );
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

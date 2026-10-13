import test from "node:test";
import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import { plugins } from "../src/data/plugins.ts";
import { copy } from "../src/data/copy.ts";

test("catalog includes eight plugins and their real dependency/verification boundaries", () => {
  assert.deepEqual(
    plugins.map((p) => p.id),
    [
      "contact",
      "signl4",
      "kuma",
      "content",
      "chat",
      "teams",
      "slack",
      "telegram",
    ],
  );
  assert.equal(new Set(plugins.map((p) => p.package)).size, 8);
  for (const plugin of plugins) {
    assert.equal(plugin.package, `@kieksme/csp-plugin-${plugin.id}`);
    assert.match(
      plugin.docs,
      /^https:\/\/github.com\/kieksme\/csp\/blob\/main\/docs\/.+\.md$/,
    );
    for (const locale of ["de", "en"]) {
      assert.ok(
        plugin.name[locale] &&
          plugin.description[locale] &&
          plugin.requirements[locale],
      );
      assert.ok(plugin.features[locale].length > 0);
    }
    if (["teams", "slack", "telegram"].includes(plugin.id)) {
      assert.deepEqual(plugin.requires, ["chat"]);
      assert.equal(plugin.verification, "live-pending");
    }
  }
});

test("German and English have matching content structure", () => {
  const shape = (value) =>
    Array.isArray(value)
      ? value.map(shape)
      : typeof value === "object" && value !== null
        ? Object.fromEntries(
            Object.entries(value).map(([key, v]) => [key, shape(v)]),
          )
        : typeof value;
  assert.deepEqual(shape(copy.de), shape(copy.en));
});

test("Atomic Design components cannot import a higher level", async () => {
  const levels = ["atoms", "molecules", "organisms", "templates"];
  for (const [level, name] of levels.entries()) {
    for (const file of await readdir(`src/components/${name}`)) {
      if (!file.endsWith(".astro")) continue;
      const source = await readFile(`src/components/${name}/${file}`, "utf8");
      for (const match of source.matchAll(/from\s+['"]\.\.\/([^/'"]+)\//g)) {
        const target = levels.indexOf(match[1]);
        if (target < 0) continue;
        assert.ok(target < level, `${name}/${file} imports ${match[1]}`);
        if (name === "molecules") assert.equal(target, 0);
      }
    }
  }
});

test("skill examples match the documented SDK baseline and referenced files exist", async () => {
  const pkg = JSON.parse(
    await readFile(
      "skills/csp-plugin-development/assets/example-plugin/package.json",
      "utf8",
    ),
  );
  assert.equal(pkg.dependencies["@kieksme/csp-sdk"], "0.13.4");
  assert.equal(pkg.cspPlugin.sdkVersion, "^0.13.4");
  assert.deepEqual(pkg.cspPlugin.requires, []);
  for (const target of ["browser", "server"])
    assert.equal(pkg.cspPlugin[target], `./${target}`);
  for (const id of [
    "csp-customer-branding",
    "csp-content-maintenance",
    "csp-plugin-development",
  ]) {
    const skill = await readFile(`skills/${id}/SKILL.md`, "utf8");
    assert.match(
      skill,
      new RegExp(`^---\\nname: ${id}\\ndescription: .+\\n---`),
    );
    for (const match of skill.matchAll(
      /\]\(((?:references|assets)\/[^)]+)\)/g,
    )) {
      const path = `skills/${id}/${match[1]}`;
      if (path.endsWith("/")) await readdir(path);
      else await readFile(path);
    }
  }
});

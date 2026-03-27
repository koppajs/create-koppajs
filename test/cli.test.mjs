import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

import {
  DEFAULT_TEMPLATE,
  TEMPLATE_DIR,
  copyStarterTemplate,
  ensureTargetDir,
  parseArgs,
  patchPackageJson,
  patchChangelog,
  patchReadme,
  patchReleaseNotes,
  validateProjectName,
  validateStarterTemplate,
} from "../bin/create-koppajs.js";

function createTempDir(t) {
  const dir = mkdtempSync(join(tmpdir(), "create-koppajs-test-"));
  t.after(() => {
    rmSync(dir, { recursive: true, force: true });
  });
  return dir;
}

test("parseArgs reads flags and the first positional project name", () => {
  assert.deepEqual(parseArgs(["node", "cli", "--help", "demo"]), {
    help: true,
    version: false,
    projectName: "demo",
    templateName: null,
    optionError: null,
  });

  assert.deepEqual(parseArgs(["node", "cli", "--version"]), {
    help: false,
    version: true,
    projectName: null,
    templateName: null,
    optionError: null,
  });
});

test("parseArgs reads starter template options", () => {
  assert.deepEqual(parseArgs(["node", "cli", "demo", "--template", "router"]), {
    help: false,
    version: false,
    projectName: "demo",
    templateName: "router",
    optionError: null,
  });

  assert.deepEqual(parseArgs(["node", "cli", "--router", "demo"]), {
    help: false,
    version: false,
    projectName: "demo",
    templateName: "router",
    optionError: null,
  });

  assert.deepEqual(parseArgs(["node", "cli", "demo", "--template"]), {
    help: false,
    version: false,
    projectName: "demo",
    templateName: null,
    optionError: "Option --template requires a value.",
  });
});

test("validateProjectName accepts valid names", () => {
  assert.doesNotThrow(() => validateProjectName("my-app"));
  assert.doesNotThrow(() => validateProjectName("my_app"));
});

test("validateStarterTemplate accepts supported templates", () => {
  assert.doesNotThrow(() => validateStarterTemplate(DEFAULT_TEMPLATE));
  assert.doesNotThrow(() => validateStarterTemplate("router"));
});

test("validateProjectName rejects invalid names", () => {
  assert.throws(() => validateProjectName(""), /Project name cannot be empty/);
  assert.throws(() => validateProjectName("."), /Invalid project name "\."/);
  assert.throws(() => validateProjectName(".."), /Invalid project name "\.\."/);
  assert.throws(() => validateProjectName("bad/name"), /path separators/);
  assert.throws(() => validateProjectName("bad\\name"), /path separators/);
});

test("validateStarterTemplate rejects unknown templates", () => {
  assert.throws(
    () => validateStarterTemplate("unknown"),
    /Unknown starter template "unknown"/,
  );
});

test("ensureTargetDir creates missing directories and allows empty ones", (t) => {
  const root = createTempDir(t);
  const freshTarget = join(root, "fresh-project");

  ensureTargetDir(freshTarget);
  assert.equal(existsSync(freshTarget), true);

  assert.doesNotThrow(() => ensureTargetDir(freshTarget));
});

test("ensureTargetDir rejects non-empty directories", (t) => {
  const root = createTempDir(t);
  const target = join(root, "existing-project");

  mkdirSync(target, { recursive: true });
  writeFileSync(join(target, "file.txt"), "content\n");

  assert.throws(
    () => ensureTargetDir(target),
    /already exists and is not empty/,
  );
});

test("copyStarterTemplate scaffolds the default starter and patch helpers update generated files", (t) => {
  const root = createTempDir(t);
  const target = join(root, "generated-project");

  copyStarterTemplate(DEFAULT_TEMPLATE, target);

  assert.equal(existsSync(join(target, ".gitignore")), true);
  assert.equal(existsSync(join(target, "_gitignore")), false);
  assert.equal(existsSync(join(target, ".editorconfig")), true);
  assert.equal(existsSync(join(target, ".github")), true);
  assert.equal(existsSync(join(target, ".husky")), true);
  assert.equal(existsSync(join(target, ".npmrc")), true);
  assert.equal(existsSync(join(target, ".prettierignore")), true);

  patchPackageJson(target, "generated-project");
  patchReadme(target, "generated-project");
  patchChangelog(target, "generated-project");
  patchReleaseNotes(target, "generated-project");

  const pkg = JSON.parse(readFileSync(join(target, "package.json"), "utf-8"));
  const readme = readFileSync(join(target, "README.md"), "utf-8");
  const changelog = readFileSync(join(target, "CHANGELOG.md"), "utf-8");
  const release = readFileSync(join(target, "RELEASE.md"), "utf-8");

  assert.equal(pkg.name, "generated-project");
  assert.equal(pkg.dependencies["@koppajs/koppajs-core"], "^3.0.7");
  assert.equal(pkg.devDependencies["@koppajs/koppajs-vite-plugin"], "^1.0.4");
  assert.match(readme, /generated-project/);
  assert.doesNotMatch(readme, /__PROJECT_NAME__/);
  assert.match(changelog, /generated-project/);
  assert.match(release, /generated-project/);
});

test("copyStarterTemplate applies the router overlay when requested", (t) => {
  const root = createTempDir(t);
  const target = join(root, "router-project");

  copyStarterTemplate("router", target);

  patchPackageJson(target, "router-project");
  patchReadme(target, "router-project");
  patchChangelog(target, "router-project");
  patchReleaseNotes(target, "router-project");

  const pkg = JSON.parse(readFileSync(join(target, "package.json"), "utf-8"));
  const readme = readFileSync(join(target, "README.md"), "utf-8");

  assert.equal(pkg.name, "router-project");
  assert.equal(pkg.dependencies["@koppajs/koppajs-core"], "^3.0.7");
  assert.equal(pkg.dependencies["@koppajs/koppajs-router"], "^0.1.2");
  assert.equal(pkg.devDependencies["@koppajs/koppajs-vite-plugin"], "^1.0.4");
  assert.equal(existsSync(join(target, "src", "router-page.kpa")), true);
  assert.equal(existsSync(join(target, "docs", "specs", "router-navigation.md")), true);
  assert.match(readme, /router starter project/i);
  assert.equal(existsSync(join(TEMPLATE_DIR, "src", "router-page.kpa")), false);
});

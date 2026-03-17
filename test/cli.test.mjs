import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

import {
  TEMPLATE_DIR,
  copyDirRecursive,
  ensureTargetDir,
  parseArgs,
  patchPackageJson,
  patchChangelog,
  patchReadme,
  patchReleaseNotes,
  validateProjectName,
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
  });

  assert.deepEqual(parseArgs(["node", "cli", "--version"]), {
    help: false,
    version: true,
    projectName: null,
  });
});

test("validateProjectName accepts valid names", () => {
  assert.doesNotThrow(() => validateProjectName("my-app"));
  assert.doesNotThrow(() => validateProjectName("my_app"));
});

test("validateProjectName rejects invalid names", () => {
  assert.throws(() => validateProjectName(""), /Project name cannot be empty/);
  assert.throws(() => validateProjectName("."), /Invalid project name "\."/);
  assert.throws(() => validateProjectName(".."), /Invalid project name "\.\."/);
  assert.throws(() => validateProjectName("bad/name"), /path separators/);
  assert.throws(() => validateProjectName("bad\\name"), /path separators/);
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

test("copyDirRecursive renames publish-safe dotfiles and patch helpers update generated files", (t) => {
  const root = createTempDir(t);
  const target = join(root, "generated-project");

  copyDirRecursive(TEMPLATE_DIR, target);

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
  assert.match(readme, /generated-project/);
  assert.doesNotMatch(readme, /__PROJECT_NAME__/);
  assert.match(changelog, /generated-project/);
  assert.match(release, /generated-project/);
});

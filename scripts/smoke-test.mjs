#!/usr/bin/env node

import { existsSync, readFileSync, rmSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync, spawnSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const TMP = join(ROOT, ".tmp-smoke");
const CLI = join(ROOT, "bin", "create-koppajs.js");
const PROJECT = "test-app";

let passed = 0;
let failed = 0;

function assert(condition, label) {
  if (condition) {
    console.log(`  ✓ ${label}`);
    passed++;
  } else {
    console.error(`  ✗ ${label}`);
    failed++;
  }
}

function cleanup() {
  if (existsSync(TMP)) {
    rmSync(TMP, { recursive: true, force: true });
  }
}

function expectFailure(args, label, options = {}) {
  const result = spawnSync(process.execPath, [CLI, ...args], {
    cwd: TMP,
    stdio: "pipe",
    encoding: "utf-8",
    ...options,
  });
  assert(result.status !== 0, label);
  return result;
}

console.log("\n  Smoke test: create-koppajs\n");

try {
  // Setup
  cleanup();
  mkdirSync(TMP, { recursive: true });

  // Run CLI
  execFileSync(process.execPath, [CLI, PROJECT], { cwd: TMP, stdio: "pipe" });

  const projectDir = join(TMP, PROJECT);

  // Check package.json exists and has correct name
  const pkgPath = join(projectDir, "package.json");
  assert(existsSync(pkgPath), "package.json exists");

  if (existsSync(pkgPath)) {
    const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
    assert(pkg.name === PROJECT, `package.json name is "${PROJECT}"`);
    assert(typeof pkg.scripts?.check === "string", 'package.json defines "check"');
    assert(typeof pkg.scripts?.validate === "string", 'package.json defines "validate"');
  }

  const readmePath = join(projectDir, "README.md");
  assert(existsSync(readmePath), "README.md exists");

  if (existsSync(readmePath)) {
    const readme = readFileSync(readmePath, "utf-8");
    assert(readme.includes(PROJECT), "README.md project name is patched");
    assert(!readme.includes("__PROJECT_NAME__"), "README.md placeholder is removed");
  }

  const changelogPath = join(projectDir, "CHANGELOG.md");
  assert(existsSync(changelogPath), "CHANGELOG.md exists");

  if (existsSync(changelogPath)) {
    const changelog = readFileSync(changelogPath, "utf-8");
    assert(changelog.includes(PROJECT), "CHANGELOG.md project name is patched");
  }

  const releasePath = join(projectDir, "RELEASE.md");
  assert(existsSync(releasePath), "RELEASE.md exists");

  if (existsSync(releasePath)) {
    const release = readFileSync(releasePath, "utf-8");
    assert(release.includes(PROJECT), "RELEASE.md project name is patched");
  }

  // Check src/main.ts exists
  const mainPath = join(projectDir, "src", "main.ts");
  assert(existsSync(mainPath), "src/main.ts exists");

  // Check other expected files
  assert(existsSync(join(projectDir, "index.html")), "index.html exists");
  assert(existsSync(join(projectDir, "tsconfig.json")), "tsconfig.json exists");
  assert(existsSync(join(projectDir, "vite.config.mjs")), "vite.config.mjs exists");
  assert(existsSync(join(projectDir, "vitest.config.mjs")), "vitest.config.mjs exists");
  assert(existsSync(join(projectDir, "playwright.config.ts")), "playwright.config.ts exists");
  assert(existsSync(join(projectDir, ".gitignore")), ".gitignore exists");
  assert(existsSync(join(projectDir, ".editorconfig")), ".editorconfig exists");
  assert(existsSync(join(projectDir, ".npmrc")), ".npmrc exists");
  assert(existsSync(join(projectDir, ".prettierignore")), ".prettierignore exists");
  assert(existsSync(join(projectDir, ".github", "workflows", "ci.yml")), ".github/workflows/ci.yml exists");
  assert(existsSync(join(projectDir, ".github", "workflows", "release.yml")), ".github/workflows/release.yml exists");
  assert(existsSync(join(projectDir, ".husky", "pre-commit")), ".husky/pre-commit exists");
  assert(existsSync(join(projectDir, "commitlint.config.mjs")), "commitlint.config.mjs exists");
  assert(existsSync(join(projectDir, "eslint.config.mjs")), "eslint.config.mjs exists");
  assert(existsSync(join(projectDir, "prettier.config.mjs")), "prettier.config.mjs exists");
  assert(existsSync(join(projectDir, "pnpm-lock.yaml")), "pnpm-lock.yaml exists");
  assert(existsSync(join(projectDir, "src", "app-view.kpa")), "src/app-view.kpa exists");
  assert(existsSync(join(projectDir, "src", "counter-component.kpa")), "src/counter-component.kpa exists");
  assert(existsSync(join(projectDir, "tests", "unit", "normalize-kpa-module-export.test.ts")), "tests/unit/normalize-kpa-module-export.test.ts exists");
  assert(existsSync(join(projectDir, "docs", "quality", "quality-gates.md")), "docs/quality/quality-gates.md exists");

  // Existing empty directory is allowed
  const emptyDirProject = "empty-dir-app";
  mkdirSync(join(TMP, emptyDirProject), { recursive: true });
  execFileSync(process.execPath, [CLI, emptyDirProject], { cwd: TMP, stdio: "pipe" });
  assert(existsSync(join(TMP, emptyDirProject, "package.json")), "scaffolds into existing empty directory");

  // Invalid names fail
  const emptyName = expectFailure([], "rejects empty project name from prompt", { input: "\n" });
  assert(emptyName.stderr.includes("Project name cannot be empty."), "empty prompt shows validation error");

  expectFailure(["."], 'rejects "." as a project name');
  expectFailure([".."], 'rejects ".." as a project name');
  expectFailure(["bad/name"], "rejects project names with forward slashes");
  expectFailure(["bad\\name"], "rejects project names with backslashes");

  // Test duplicate run fails
  let duplicateFailed = false;
  try {
    execFileSync(process.execPath, [CLI, PROJECT], { cwd: TMP, stdio: "pipe" });
  } catch {
    duplicateFailed = true;
  }
  assert(duplicateFailed, "rejects existing non-empty directory");

} finally {
  cleanup();
}

// Summary
console.log(`\n  ${passed} passed, ${failed} failed\n`);
process.exit(failed > 0 ? 1 : 0);

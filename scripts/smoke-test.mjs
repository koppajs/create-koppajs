#!/usr/bin/env node

import { existsSync, readFileSync, rmSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

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
  }

  // Check src/main.ts exists
  const mainPath = join(projectDir, "src", "main.ts");
  assert(existsSync(mainPath), "src/main.ts exists");

  // Check other expected files
  assert(existsSync(join(projectDir, "index.html")), "index.html exists");
  assert(existsSync(join(projectDir, "tsconfig.json")), "tsconfig.json exists");
  assert(existsSync(join(projectDir, "vite.config.mjs")), "vite.config.mjs exists");
  assert(existsSync(join(projectDir, "src", "app-view.kpa")), "src/app-view.kpa exists");
  assert(existsSync(join(projectDir, "src", "counter-component.kpa")), "src/counter-component.kpa exists");

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

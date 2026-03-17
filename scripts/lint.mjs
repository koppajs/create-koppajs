#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { readdirSync } from "node:fs";
import { join, dirname, extname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

function collectFiles(dir) {
  return readdirSync(dir, { withFileTypes: true })
    .filter((entry) => entry.isFile() && [".js", ".mjs"].includes(extname(entry.name)))
    .map((entry) => join(dir, entry.name))
    .sort();
}

function runSyntaxCheck(file) {
  execFileSync(process.execPath, ["--check", file], {
    cwd: ROOT,
    stdio: "inherit",
  });
}

const files = [
  join(ROOT, "bin", "create-koppajs.js"),
  join(ROOT, "commitlint.config.mjs"),
  join(ROOT, "lint-staged.config.mjs"),
  ...collectFiles(join(ROOT, "scripts")),
  join(ROOT, "template", "commitlint.config.mjs"),
  join(ROOT, "template", "eslint.config.mjs"),
  join(ROOT, "template", "prettier.config.mjs"),
  join(ROOT, "template", "vite.config.mjs"),
  join(ROOT, "template", "vitest.config.mjs"),
  ...collectFiles(join(ROOT, "test")),
];

for (const file of files) {
  console.log(`\n  Syntax check: ${file.replace(`${ROOT}/`, "")}`);
  runSyntaxCheck(file);
}

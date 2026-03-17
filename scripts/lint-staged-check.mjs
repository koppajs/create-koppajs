#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { extname, join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SYNTAX_EXTENSIONS = new Set([".js", ".mjs", ".cjs"]);
const TEXT_EXTENSIONS = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
  ".kpa",
  ".md",
  ".mjs",
  ".mts",
  ".ts",
  ".txt",
  ".yaml",
  ".yml",
]);

function isBinary(buffer) {
  return buffer.includes(0);
}

function checkFormatting(filePath) {
  const buffer = readFileSync(filePath);

  if (isBinary(buffer)) {
    return [];
  }

  const content = buffer.toString("utf-8");
  const relativePath = filePath.replace(`${ROOT}/`, "");
  const violations = [];

  if (content.includes("\r")) {
    violations.push(`${relativePath}: uses CRLF line endings`);
  }

  const lines = content.split("\n");
  for (let index = 0; index < lines.length; index++) {
    if (/[ \t]+$/.test(lines[index])) {
      violations.push(`${relativePath}:${index + 1}: trailing whitespace`);
    }
  }

  if (content.length > 0 && !content.endsWith("\n")) {
    violations.push(`${relativePath}: missing final newline`);
  }

  return violations;
}

const files = process.argv
  .slice(2)
  .map((file) => resolve(ROOT, file))
  .filter((file) => existsSync(file));

const violations = [];

for (const file of files) {
  const extension = extname(file);

  if (SYNTAX_EXTENSIONS.has(extension)) {
    execFileSync(process.execPath, ["--check", file], {
      cwd: ROOT,
      stdio: "inherit",
    });
  }

  if (TEXT_EXTENSIONS.has(extension) || !extension) {
    violations.push(...checkFormatting(file));
  }
}

if (violations.length > 0) {
  console.error("\n  Staged-file guard failed:\n");
  for (const violation of violations) {
    console.error(`  - ${violation}`);
  }
  console.error("");
  process.exit(1);
}

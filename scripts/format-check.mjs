#!/usr/bin/env node

import { readdirSync, readFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SKIP_DIRS = new Set([".git", "node_modules", ".tmp-smoke", "dist"]);

function collectFiles(dir) {
  const files = [];

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      const nextDir = join(dir, entry.name);
      const relativeDir = nextDir.replace(`${ROOT}/`, "");

      if (!SKIP_DIRS.has(entry.name) && relativeDir !== ".husky/_") {
        files.push(...collectFiles(nextDir));
      }
      continue;
    }

    files.push(join(dir, entry.name));
  }

  return files;
}

function isBinary(buffer) {
  return buffer.includes(0);
}

const violations = [];

for (const file of collectFiles(ROOT)) {
  const buffer = readFileSync(file);

  if (isBinary(buffer)) {
    continue;
  }

  const content = buffer.toString("utf-8");
  const relativePath = file.replace(`${ROOT}/`, "");

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
}

if (violations.length > 0) {
  console.error("\n  Formatting guard failed:\n");
  for (const violation of violations) {
    console.error(`  - ${violation}`);
  }
  console.error("");
  process.exit(1);
}

console.log("\n  Formatting guard: all text files use LF, final newlines, and no trailing whitespace\n");

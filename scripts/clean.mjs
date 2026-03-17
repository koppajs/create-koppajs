#!/usr/bin/env node

import { existsSync, readdirSync, rmSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const STATIC_PATHS = [
  ".tmp-smoke",
  "coverage",
];

for (const path of STATIC_PATHS) {
  const absolutePath = join(ROOT, path);
  if (existsSync(absolutePath)) {
    rmSync(absolutePath, { recursive: true, force: true });
  }
}

for (const entry of readdirSync(ROOT)) {
  if (entry.endsWith(".tgz")) {
    rmSync(join(ROOT, entry), { force: true });
  }
}

console.log("\n  Cleaned temporary smoke, coverage, and package artifacts\n");

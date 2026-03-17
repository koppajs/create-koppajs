#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const WATCH_MODE = process.argv.includes("--watch");

const testFiles = readdirSync(join(ROOT, "test"), { withFileTypes: true })
  .filter((entry) => entry.isFile() && entry.name.endsWith(".test.mjs"))
  .map((entry) => join(ROOT, "test", entry.name))
  .sort();

if (testFiles.length === 0) {
  console.log("\n  No unit tests found\n");
  process.exit(0);
}

const args = ["--test"];

if (WATCH_MODE) {
  args.push("--watch");
}

args.push(...testFiles);

execFileSync(process.execPath, args, {
  cwd: ROOT,
  stdio: "inherit",
});

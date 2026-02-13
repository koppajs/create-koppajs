#!/usr/bin/env node

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync, copyFileSync, statSync } from "node:fs";
import { join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createInterface } from "node:readline";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const TEMPLATE_DIR = join(__dirname, "..", "template");
const CLI_PKG = JSON.parse(readFileSync(join(__dirname, "..", "package.json"), "utf-8"));

// ── Args ────────────────────────────────────────────────────────────

function parseArgs(argv) {
  const raw = argv.slice(2);
  return {
    help: raw.includes("--help") || raw.includes("-h"),
    version: raw.includes("--version") || raw.includes("-v"),
    projectName: raw.find((a) => !a.startsWith("-")) || null,
  };
}

// ── Help / Version ──────────────────────────────────────────────────

function printHelp() {
  console.log(`
  create-koppajs v${CLI_PKG.version}

  Scaffold a new Koppajs project.

  Usage:
    pnpm create koppajs [project-name]
    npm create koppajs [project-name]
    npx create-koppajs [project-name]

  Options:
    --help, -h       Show this help message
    --version, -v    Show version number

  Example:
    pnpm create koppajs my-app
`);
}

function printVersion() {
  console.log(CLI_PKG.version);
}

// ── Prompt ──────────────────────────────────────────────────────────

function promptProjectName() {
  return new Promise((res) => {
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    rl.question("  Project name: ", (answer) => {
      rl.close();
      res(answer.trim());
    });
  });
}

// ── Validation ──────────────────────────────────────────────────────

function validateProjectName(name) {
  if (!name) {
    console.error("\n  Error: Project name cannot be empty.\n");
    process.exit(1);
  }
  if (name === "." || name === "..") {
    console.error(`\n  Error: Invalid project name "${name}".\n`);
    process.exit(1);
  }
  if (name.includes("/") || name.includes("\\")) {
    console.error("\n  Error: Project name must not contain path separators.\n");
    process.exit(1);
  }
}

// ── Target directory ────────────────────────────────────────────────

function ensureTargetDir(targetPath) {
  if (existsSync(targetPath) && readdirSync(targetPath).length > 0) {
    const name = targetPath.split(/[/\\]/).pop();
    console.error(`\n  Error: Directory "${name}" already exists and is not empty.\n`);
    process.exit(1);
  }
  mkdirSync(targetPath, { recursive: true });
}

// ── Copy ────────────────────────────────────────────────────────────

function copyDirRecursive(src, dest) {
  mkdirSync(dest, { recursive: true });
  for (const entry of readdirSync(src)) {
    const srcPath = join(src, entry);
    const destPath = join(dest, entry);
    if (statSync(srcPath).isDirectory()) {
      copyDirRecursive(srcPath, destPath);
    } else {
      copyFileSync(srcPath, destPath);
    }
  }
}

// ── Patch package.json ──────────────────────────────────────────────

function patchPackageJson(destDir, projectName) {
  const pkgPath = join(destDir, "package.json");
  const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
  pkg.name = projectName;
  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
}

// ── Final output ────────────────────────────────────────────────────

function printNextSteps(projectName) {
  console.log("  Done! Next steps:\n");
  console.log(`    cd ${projectName}`);
  console.log("    pnpm install");
  console.log("    pnpm dev\n");
}

// ── Main ────────────────────────────────────────────────────────────

async function main() {
  const { help, version, projectName: argName } = parseArgs(process.argv);

  if (help) {
    printHelp();
    process.exit(0);
  }

  if (version) {
    printVersion();
    process.exit(0);
  }

  const projectName = argName || (await promptProjectName());

  validateProjectName(projectName);

  const targetDir = resolve(process.cwd(), projectName);

  ensureTargetDir(targetDir);

  console.log(`\n  Scaffolding Koppajs project: ${projectName}\n`);

  copyDirRecursive(TEMPLATE_DIR, targetDir);
  patchPackageJson(targetDir, projectName);
  printNextSteps(projectName);
}

main();

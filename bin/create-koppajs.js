#!/usr/bin/env node

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync, copyFileSync, statSync } from "node:fs";
import { basename, join, dirname, resolve } from "node:path";
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

  Scaffold a new KoppaJS project.

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
  return new Promise((res, rej) => {
    const rl = createInterface({ input: process.stdin, output: process.stdout });
    let answered = false;
    rl.on("close", () => {
      if (!answered) rej(new Error("Input closed before a project name was provided."));
    });
    rl.question("  Project name: ", (answer) => {
      answered = true;
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
    console.error(`\n  Error: Directory "${basename(targetPath)}" already exists and is not empty.\n`);
    process.exit(1);
  }
  mkdirSync(targetPath, { recursive: true });
}

// ── Copy ────────────────────────────────────────────────────────────

// npm excludes .gitignore from published packages — ship as _gitignore
// and rename during scaffolding (same approach as create-vite).
const RENAME_FILES = { _gitignore: ".gitignore" };

function copyDirRecursive(src, dest) {
  mkdirSync(dest, { recursive: true });
  for (const entry of readdirSync(src)) {
    const srcPath = join(src, entry);
    const destName = RENAME_FILES[entry] || entry;
    const destPath = join(dest, destName);
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

// ── Patch README ────────────────────────────────────────────────────

function patchReadme(destDir, projectName) {
  const readmePath = join(destDir, "README.md");
  let content = readFileSync(readmePath, "utf-8");
  content = content.replaceAll("__PROJECT_NAME__", projectName);
  writeFileSync(readmePath, content);
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

  console.log(`\n  Scaffolding KoppaJS project: ${projectName}\n`);

  copyDirRecursive(TEMPLATE_DIR, targetDir);
  patchPackageJson(targetDir, projectName);
  patchReadme(targetDir, projectName);
  printNextSteps(projectName);
}

main().catch((err) => {
  console.error(`\n  Error: ${err.message}\n`);
  process.exit(1);
});

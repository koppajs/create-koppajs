#!/usr/bin/env node

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync, copyFileSync, statSync } from "node:fs";
import { basename, join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createInterface } from "node:readline";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const TEMPLATE_DIR = join(__dirname, "..", "template");
const CLI_PKG = JSON.parse(readFileSync(join(__dirname, "..", "package.json"), "utf-8"));

// ── Args ────────────────────────────────────────────────────────────

export function parseArgs(argv) {
  const raw = argv.slice(2);
  return {
    help: raw.includes("--help") || raw.includes("-h"),
    version: raw.includes("--version") || raw.includes("-v"),
    projectName: raw.find((a) => !a.startsWith("-")) || null,
  };
}

// ── Help / Version ──────────────────────────────────────────────────

export function printHelp() {
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

export function printVersion() {
  console.log(CLI_PKG.version);
}

// ── Prompt ──────────────────────────────────────────────────────────

export function promptProjectName() {
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

export function validateProjectName(name) {
  if (!name) {
    throw new Error("Project name cannot be empty.");
  }
  if (name === "." || name === "..") {
    throw new Error(`Invalid project name "${name}".`);
  }
  if (name.includes("/") || name.includes("\\")) {
    throw new Error("Project name must not contain path separators.");
  }
}

// ── Target directory ────────────────────────────────────────────────

export function ensureTargetDir(targetPath) {
  if (existsSync(targetPath) && readdirSync(targetPath).length > 0) {
    throw new Error(`Directory "${basename(targetPath)}" already exists and is not empty.`);
  }
  mkdirSync(targetPath, { recursive: true });
}

// ── Copy ────────────────────────────────────────────────────────────

// npm excludes .gitignore from published packages — ship as _gitignore
// and rename during scaffolding (same approach as create-vite).
const RENAME_FILES = {
  _editorconfig: ".editorconfig",
  _gitattributes: ".gitattributes",
  _github: ".github",
  _gitignore: ".gitignore",
  _husky: ".husky",
  _npmrc: ".npmrc",
  _prettierignore: ".prettierignore",
};

export function copyDirRecursive(src, dest) {
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

export function patchPackageJson(destDir, projectName) {
  const pkgPath = join(destDir, "package.json");
  const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
  pkg.name = projectName;
  writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + "\n");
}

// ── Patch README ────────────────────────────────────────────────────

function patchTextFile(destDir, relativePath, projectName) {
  const filePath = join(destDir, relativePath);
  let content = readFileSync(filePath, "utf-8");
  content = content.replaceAll("__PROJECT_NAME__", projectName);
  writeFileSync(filePath, content);
}

export function patchReadme(destDir, projectName) {
  patchTextFile(destDir, "README.md", projectName);
}

export function patchChangelog(destDir, projectName) {
  patchTextFile(destDir, "CHANGELOG.md", projectName);
}

export function patchReleaseNotes(destDir, projectName) {
  patchTextFile(destDir, "RELEASE.md", projectName);
}

// ── Final output ────────────────────────────────────────────────────

export function printNextSteps(projectName) {
  console.log("  Done! Next steps:\n");
  console.log(`    cd ${projectName}`);
  console.log("    pnpm install");
  console.log("    pnpm dev\n");
}

// ── Main ────────────────────────────────────────────────────────────

export async function runCli(argv = process.argv, cwd = process.cwd()) {
  const { help, version, projectName: argName } = parseArgs(argv);

  if (help) {
    printHelp();
    return 0;
  }

  if (version) {
    printVersion();
    return 0;
  }

  const projectName = argName || (await promptProjectName());

  validateProjectName(projectName);

  const targetDir = resolve(cwd, projectName);

  ensureTargetDir(targetDir);

  console.log(`\n  Scaffolding KoppaJS project: ${projectName}\n`);

  copyDirRecursive(TEMPLATE_DIR, targetDir);
  patchPackageJson(targetDir, projectName);
  patchReadme(targetDir, projectName);
  patchChangelog(targetDir, projectName);
  patchReleaseNotes(targetDir, projectName);
  printNextSteps(projectName);

  return 0;
}

function isDirectExecution() {
  return Boolean(process.argv[1]) && resolve(process.argv[1]) === __filename;
}

if (isDirectExecution()) {
  runCli().catch((err) => {
    console.error(`\n  Error: ${err.message}\n`);
    process.exit(1);
  });
}

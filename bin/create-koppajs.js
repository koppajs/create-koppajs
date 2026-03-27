#!/usr/bin/env node

import { existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync, copyFileSync, statSync, realpathSync } from "node:fs";
import { basename, join, dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { createInterface } from "node:readline";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
export const TEMPLATE_DIR = join(__dirname, "..", "template");
export const TEMPLATE_OVERLAY_DIRS = Object.freeze({
  minimal: null,
  router: join(__dirname, "..", "template-overlays", "router"),
});
export const DEFAULT_TEMPLATE = "minimal";
const CLI_PKG = JSON.parse(readFileSync(join(__dirname, "..", "package.json"), "utf-8"));

// ── Args ────────────────────────────────────────────────────────────

export function parseArgs(argv) {
  const raw = argv.slice(2);
  const parsed = {
    help: raw.includes("--help") || raw.includes("-h"),
    version: raw.includes("--version") || raw.includes("-v"),
    projectName: null,
    templateName: null,
    optionError: null,
  };

  const setTemplateName = (templateName) => {
    if (!templateName) {
      parsed.optionError = "Option --template requires a value.";
      return false;
    }

    if (parsed.templateName && parsed.templateName !== templateName) {
      parsed.optionError = "Choose either --router or one --template value.";
      return false;
    }

    parsed.templateName = templateName;
    return true;
  };

  for (let index = 0; index < raw.length; index++) {
    const arg = raw[index];

    if (arg === "--help" || arg === "-h" || arg === "--version" || arg === "-v") {
      continue;
    }

    if (arg === "--router") {
      if (!setTemplateName("router")) {
        break;
      }
      continue;
    }

    if (arg === "--template" || arg === "-t") {
      const templateName = raw[index + 1];

      if (!templateName || templateName.startsWith("-")) {
        parsed.optionError = "Option --template requires a value.";
        break;
      }

      if (!setTemplateName(templateName)) {
        break;
      }

      index++;
      continue;
    }

    if (arg.startsWith("--template=")) {
      if (!setTemplateName(arg.slice("--template=".length))) {
        break;
      }
      continue;
    }

    if (arg.startsWith("-t=")) {
      if (!setTemplateName(arg.slice("-t=".length))) {
        break;
      }
      continue;
    }

    if (!arg.startsWith("-") && parsed.projectName === null) {
      parsed.projectName = arg;
    }
  }

  return parsed;
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
    --help, -h                Show this help message
    --version, -v             Show version number
    --template, -t <name>     Starter template: minimal | router
    --router                  Shortcut for --template router

  Example:
    pnpm create koppajs my-app
    pnpm create koppajs my-app --template router
`);
}

export function printVersion() {
  console.log(CLI_PKG.version);
}

// ── Prompt ──────────────────────────────────────────────────────────

function promptLine(question, closeErrorMessage, input = process.stdin, output = process.stdout) {
  return new Promise((res, rej) => {
    const rl = createInterface({ input, output });
    let answered = false;
    rl.on("close", () => {
      if (!answered) rej(new Error(closeErrorMessage));
    });
    rl.question(question, (answer) => {
      answered = true;
      rl.close();
      res(answer.trim());
    });
  });
}

export function promptProjectName(input = process.stdin, output = process.stdout) {
  return promptLine(
    "  Project name: ",
    "Input closed before a project name was provided.",
    input,
    output,
  );
}

export async function promptStarterTemplate(input = process.stdin, output = process.stdout) {
  const answer = (await promptLine(
    `  Starter template (minimal/router) [${DEFAULT_TEMPLATE}]: `,
    "Input closed before a starter template was provided.",
    input,
    output,
  )).toLowerCase();

  if (answer === "" || answer === "m") {
    return DEFAULT_TEMPLATE;
  }

  if (answer === "r") {
    return "router";
  }

  return answer;
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

export function validateStarterTemplate(templateName) {
  if (Object.hasOwn(TEMPLATE_OVERLAY_DIRS, templateName)) {
    return;
  }

  throw new Error(
    `Unknown starter template "${templateName}". Supported templates: ${Object.keys(TEMPLATE_OVERLAY_DIRS).join(", ")}.`,
  );
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

export function copyStarterTemplate(templateName, dest) {
  copyDirRecursive(TEMPLATE_DIR, dest);

  const overlayDir = TEMPLATE_OVERLAY_DIRS[templateName];

  if (overlayDir) {
    copyDirRecursive(overlayDir, dest);
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

export function shouldPromptForTemplateSelection(input = process.stdin, output = process.stdout) {
  return Boolean(input.isTTY && output.isTTY);
}

export async function runCli(
  argv = process.argv,
  cwd = process.cwd(),
  io = { input: process.stdin, output: process.stdout },
) {
  const { help, version, projectName: argName, templateName: argTemplateName, optionError } =
    parseArgs(argv);

  if (help) {
    printHelp();
    return 0;
  }

  if (version) {
    printVersion();
    return 0;
  }

  if (optionError) {
    throw new Error(optionError);
  }

  const projectName = argName || (await promptProjectName(io.input, io.output));

  validateProjectName(projectName);

  const templateName =
    argTemplateName ||
    (shouldPromptForTemplateSelection(io.input, io.output)
      ? await promptStarterTemplate(io.input, io.output)
      : DEFAULT_TEMPLATE);

  validateStarterTemplate(templateName);

  const targetDir = resolve(cwd, projectName);

  ensureTargetDir(targetDir);

  console.log(`\n  Scaffolding KoppaJS project: ${projectName} (${templateName} starter)\n`);

  copyStarterTemplate(templateName, targetDir);
  patchPackageJson(targetDir, projectName);
  patchReadme(targetDir, projectName);
  patchChangelog(targetDir, projectName);
  patchReleaseNotes(targetDir, projectName);
  printNextSteps(projectName);

  return 0;
}

function isDirectExecution() {
  if (!process.argv[1]) {
    return false;
  }

  try {
    return realpathSync(process.argv[1]) === realpathSync(__filename);
  } catch {
    return resolve(process.argv[1]) === __filename;
  }
}

if (isDirectExecution()) {
  runCli().catch((err) => {
    console.error(`\n  Error: ${err.message}\n`);
    process.exit(1);
  });
}

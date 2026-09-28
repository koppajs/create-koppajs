#!/usr/bin/env node

import { existsSync, mkdtempSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { join, dirname } from "node:path";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const CLI = join(ROOT, "bin", "create-koppajs.js");
const TMP = mkdtempSync(join(tmpdir(), "create-koppajs-template-"));
const TEMPLATE_NODE_REQUIREMENT = ">=22.12.0";
const NPM_BIN = process.platform === "win32" ? "npm.cmd" : "npm";
const PACKAGE_MANAGERS = [
  {
    name: "pnpm",
    command: process.platform === "win32" ? "pnpm.cmd" : "pnpm",
    installArgs: ["install", "--no-frozen-lockfile"],
    buildArgs: ["build"],
  },
  {
    name: "npm",
    command: NPM_BIN,
    installArgs: ["install", "--no-audit", "--no-fund"],
    buildArgs: ["run", "build"],
  },
  {
    name: "yarn-classic",
    command: NPM_BIN,
    installArgs: ["exec", "--yes", "--package=yarn@1.22.22", "--", "yarn", "install", "--non-interactive"],
    buildArgs: ["exec", "--yes", "--package=yarn@1.22.22", "--", "yarn", "build"],
  },
  {
    name: "yarn-modern",
    command: NPM_BIN,
    installArgs: ["exec", "--yes", "--package=@yarnpkg/cli-dist@4.9.4", "--", "yarn", "install", "--no-immutable"],
    buildArgs: ["exec", "--yes", "--package=@yarnpkg/cli-dist@4.9.4", "--", "yarn", "build"],
  },
];
const STARTER_VARIANTS = [
  {
    label: "minimal",
    projectName: "build-check-app",
    cliArgs: [],
  },
  {
    label: "router",
    projectName: "router-build-check-app",
    cliArgs: ["--template", "router"],
  },
];

function getNodeVersionParts(version = process.versions.node) {
  const [major = "0", minor = "0", patch = "0"] = version.split(".");

  return {
    major: Number(major),
    minor: Number(minor),
    patch: Number(patch),
  };
}

function supportsTemplateToolchain(versionParts) {
  const { major, minor } = versionParts;
  return major > 22 || (major === 22 && minor >= 12);
}

function cleanup() {
  if (existsSync(TMP)) {
    rmSync(TMP, { recursive: true, force: true });
  }
}

console.log("\n  Template build test: create-koppajs\n");

function validateGeneratedProject(starter, packageManager) {
  const projectName = `${starter.projectName}-${packageManager.name}`;
  console.log(`\n  ${starter.label} starter with ${packageManager.name}\n`);
  execFileSync(process.execPath, [CLI, projectName, ...starter.cliArgs], {
    cwd: TMP,
    stdio: "inherit",
  });

  const projectDir = join(TMP, projectName);

  execFileSync(packageManager.command, packageManager.installArgs, {
    cwd: projectDir,
    env: { ...process.env, HUSKY: "0" },
    stdio: "inherit",
  });

  execFileSync(packageManager.command, packageManager.buildArgs, {
    cwd: projectDir,
    stdio: "inherit",
  });
}

try {
  const nodeVersion = getNodeVersionParts();

  if (!supportsTemplateToolchain(nodeVersion)) {
    throw new Error(
      [
        "Generated template validation requires a Node.js version supported by",
        "the starter's upstream toolchain.",
        `Current Node.js: ${process.versions.node}`,
        `Required Node.js: ${TEMPLATE_NODE_REQUIREMENT}`,
      ].join(" "),
    );
  }

  for (const starter of STARTER_VARIANTS) {
    for (const packageManager of PACKAGE_MANAGERS) {
      validateGeneratedProject(starter, packageManager);
    }
  }
} finally {
  cleanup();
}

console.log("\n  Template build test passed\n");

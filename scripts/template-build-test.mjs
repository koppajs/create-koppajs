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
const PROJECT = "build-check-app";
const PNPM_BIN = process.platform === "win32" ? "pnpm.cmd" : "pnpm";
const TEMPLATE_NODE_REQUIREMENT =
  "20.19+, 22.13+, or 24+ (Node 23 is not supported by the current starter toolchain)";

function getNodeVersionParts(version = process.versions.node) {
  const [major = "0", minor = "0", patch = "0"] = version.split(".");

  return {
    major: Number(major),
    minor: Number(minor),
    patch: Number(patch),
  };
}

function supportsTemplateToolchain(versionParts) {
  const { major, minor, patch } = versionParts;

  if (major === 20) {
    return minor > 19 || (minor === 19 && patch >= 0);
  }

  if (major === 22) {
    return minor > 13 || (minor === 13 && patch >= 0);
  }

  return major >= 24;
}

function cleanup() {
  if (existsSync(TMP)) {
    rmSync(TMP, { recursive: true, force: true });
  }
}

console.log("\n  Template build test: create-koppajs\n");

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

  execFileSync(process.execPath, [CLI, PROJECT], {
    cwd: TMP,
    stdio: "inherit",
  });

  const projectDir = join(TMP, PROJECT);

  execFileSync(PNPM_BIN, ["install", "--frozen-lockfile"], {
    cwd: projectDir,
    env: { ...process.env, HUSKY: "0" },
    stdio: "inherit",
  });

  execFileSync(PNPM_BIN, ["check"], {
    cwd: projectDir,
    stdio: "inherit",
  });
} finally {
  cleanup();
}

console.log("\n  Template build test passed\n");

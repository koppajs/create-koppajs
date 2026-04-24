#!/usr/bin/env node

import { spawnSync } from "node:child_process";
import { existsSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, "..");
const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
const cliShimName = process.platform === "win32" ? "create-koppajs.cmd" : "create-koppajs";
const tempRoot = mkdtempSync(join(tmpdir(), "create-koppajs-package-smoke-"));
const cacheDir = join(tempRoot, "npm-cache");
const packDir = join(tempRoot, "pack");
const consumerDir = join(tempRoot, "consumer");
const EXPECTED_STARTER_VERSIONS = {
  core: "3.0.7",
  vitePlugin: "1.0.4",
  router: "0.1.2",
  typesNode: "25.6.0",
  typescript: "5.9.3",
  vite: "7.3.2",
};
const EXPECTED_PACKAGE_MANAGER = "pnpm@10.33.2";
const EXPECTED_NODE_ENGINE = ">=22.12.0";
const EXPECTED_PNPM_ENGINE = ">=10.24.0";

function runCommand(command, args, cwd, extra = {}) {
  const result = spawnSync(command, args, {
    cwd,
    env: {
      ...process.env,
      HUSKY: "0",
    },
    encoding: "utf8",
    ...extra,
  });

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    const details = [
      `Command failed: ${command} ${args.join(" ")}`,
      result.stdout.trim() !== "" ? `stdout:\n${result.stdout.trim()}` : "",
      result.stderr.trim() !== "" ? `stderr:\n${result.stderr.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n\n");

    throw new Error(details);
  }

  return result.stdout;
}

function parsePackOutput(output) {
  const candidateIndexes = [output.indexOf("["), output.indexOf("{")].filter((index) => index >= 0);
  const jsonStart = candidateIndexes.length > 0 ? Math.min(...candidateIndexes) : -1;

  if (jsonStart < 0) {
    throw new Error(`npm pack did not return JSON output.\n\nstdout:\n${output.trim()}`);
  }

  return JSON.parse(output.slice(jsonStart));
}

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function scaffoldProject(cliPath, projectName, cliArgs = []) {
  runCommand(cliPath, [projectName, ...cliArgs], consumerDir);
  return join(consumerDir, projectName);
}

function verifyProject(projectDir, projectName) {
  const pkg = readJson(join(projectDir, "package.json"));
  const readme = readFileSync(join(projectDir, "README.md"), "utf8");
  const viteConfig = readFileSync(join(projectDir, "vite.config.mjs"), "utf8");

  assert(pkg.name === projectName, `Expected package name "${projectName}".`);
  assert(pkg.packageManager === EXPECTED_PACKAGE_MANAGER, "Packed starter does not pin the current pnpm baseline.");
  assert(pkg.engines?.node === EXPECTED_NODE_ENGINE, "Packed starter does not declare the current Node baseline.");
  assert(pkg.engines?.pnpm === EXPECTED_PNPM_ENGINE, "Packed starter does not declare the current pnpm baseline.");
  assert(
    pkg.dependencies?.["@koppajs/koppajs-core"] === EXPECTED_STARTER_VERSIONS.core,
    "Packed starter does not use the current @koppajs/koppajs-core baseline.",
  );
  assert(
    pkg.devDependencies?.["@koppajs/koppajs-vite-plugin"] === EXPECTED_STARTER_VERSIONS.vitePlugin,
    "Packed starter does not use the current @koppajs/koppajs-vite-plugin baseline.",
  );
  assert(
    pkg.devDependencies?.["@types/node"] === EXPECTED_STARTER_VERSIONS.typesNode,
    "Packed starter does not use the current @types/node baseline.",
  );
  assert(
    pkg.devDependencies?.typescript === EXPECTED_STARTER_VERSIONS.typescript,
    "Packed starter does not use the current TypeScript baseline.",
  );
  assert(
    pkg.devDependencies?.vite === EXPECTED_STARTER_VERSIONS.vite,
    "Packed starter does not use the current Vite 7 baseline.",
  );
  assert(pkg.scripts?.lint === undefined, "Packed starter should not define lint scripts.");
  assert(pkg.scripts?.format === undefined, "Packed starter should not define format scripts.");
  assert(pkg.scripts?.test === undefined, "Packed starter should not define test scripts.");
  assert(pkg.scripts?.check === undefined, "Packed starter should not define check scripts.");
  assert(pkg.scripts?.validate === undefined, "Packed starter should not define validate scripts.");
  assert(pkg.devDependencies?.eslint === undefined, "Packed starter should not depend on ESLint.");
  assert(pkg.devDependencies?.prettier === undefined, "Packed starter should not depend on Prettier.");
  assert(pkg.devDependencies?.vitest === undefined, "Packed starter should not depend on Vitest.");
  assert(pkg.devDependencies?.["@playwright/test"] === undefined, "Packed starter should not depend on Playwright.");
  assert(readme.includes(projectName), "Packed starter README was not patched.");
  assert(existsSync(join(projectDir, ".gitignore")), "Packed starter is missing restored dotfiles.");
  assert(existsSync(join(projectDir, "public", "favicon.png")), "Packed starter is missing PNG favicon.");
  assert(!existsSync(join(projectDir, "public", "favicon.svg")), "Packed starter should not ship SVG favicon.");
  assert(existsSync(join(projectDir, "public", "koppajs-logo.png")), "Packed starter is missing local logo asset.");
  assert(
    !readFileSync(join(projectDir, "src", "app-view.kpa"), "utf8").includes("public-assets-"),
    "Packed starter should not reference the remote logo asset.",
  );
  assert(!existsSync(join(projectDir, ".editorconfig")), "Packed starter should not ship .editorconfig.");
  assert(!existsSync(join(projectDir, ".prettierignore")), "Packed starter should not ship .prettierignore.");
  assert(!existsSync(join(projectDir, "eslint.config.mjs")), "Packed starter should not ship ESLint config.");
  assert(!existsSync(join(projectDir, "prettier.config.mjs")), "Packed starter should not ship Prettier config.");
  assert(!existsSync(join(projectDir, "vitest.config.mjs")), "Packed starter should not ship Vitest config.");
  assert(!existsSync(join(projectDir, "playwright.config.ts")), "Packed starter should not ship Playwright config.");
  assert(!existsSync(join(projectDir, "tests")), "Packed starter should not ship tests.");
  assert(!existsSync(join(projectDir, ".github")), "Packed starter should not ship GitHub workflows.");
  assert(!existsSync(join(projectDir, ".husky")), "Packed starter should not ship Husky hooks.");
  assert(!existsSync(join(projectDir, "docs")), "Packed starter should not ship governance docs.");
  assert(!existsSync(join(projectDir, "CHANGELOG.md")), "Packed starter should not ship changelog files.");
  assert(!existsSync(join(projectDir, "pnpm-lock.yaml")), "Packed starter should not ship a lockfile.");
  assert(
    !viteConfig.includes("normalizeKpaModuleExport"),
    "Packed starter still ships the obsolete KPA export wrapper.",
  );
}

function verifyRouterProject(projectDir) {
  const pkg = readJson(join(projectDir, "package.json"));

  assert(
    pkg.dependencies?.["@koppajs/koppajs-router"] === EXPECTED_STARTER_VERSIONS.router,
    "Packed router starter does not use the current @koppajs/koppajs-router baseline.",
  );
  assert(existsSync(join(projectDir, "src", "router-page.kpa")), "Packed router starter is missing router files.");
  assert(!existsSync(join(projectDir, "docs")), "Packed router starter should not ship governance docs.");
}

try {
  mkdirSync(cacheDir, { recursive: true });
  mkdirSync(packDir, { recursive: true });
  mkdirSync(consumerDir, { recursive: true });

  writeFileSync(
    join(consumerDir, "package.json"),
    `${JSON.stringify(
      {
        name: "create-koppajs-package-smoke",
        private: true,
      },
      null,
      2,
    )}\n`,
  );

  const packOutput = runCommand(
    npmCommand,
    [
      "pack",
      "--json",
      "--silent",
      "--ignore-scripts",
      "--pack-destination",
      packDir,
      "--cache",
      cacheDir,
    ],
    repoRoot,
  );
  const parsedPackOutput = parsePackOutput(packOutput);

  if (!Array.isArray(parsedPackOutput)) {
    const summary =
      typeof parsedPackOutput?.error?.summary === "string"
        ? parsedPackOutput.error.summary
        : "Unknown npm pack error.";
    throw new Error(`npm pack did not return a tarball list.\n\n${summary}`);
  }

  const [packResult] = parsedPackOutput;

  if (!packResult || typeof packResult.filename !== "string") {
    throw new Error("npm pack did not return a tarball filename.");
  }

  const tarballPath = join(packDir, packResult.filename);

  runCommand(
    npmCommand,
    [
      "install",
      "--silent",
      "--ignore-scripts",
      "--no-package-lock",
      "--no-audit",
      "--no-fund",
      "--cache",
      cacheDir,
      tarballPath,
    ],
    consumerDir,
  );

  const cliPath = join(consumerDir, "node_modules", ".bin", cliShimName);
  const packagedEntrypointPath = join(consumerDir, "node_modules", "create-koppajs", "bin", "create-koppajs.js");

  assert(existsSync(cliPath), "Installed tarball did not expose the create-koppajs binary.");
  assert(existsSync(packagedEntrypointPath), "Installed tarball is missing the packaged CLI entrypoint.");

  const minimalProjectDir = scaffoldProject(cliPath, "packed-minimal-app");
  verifyProject(minimalProjectDir, "packed-minimal-app");

  const routerProjectDir = scaffoldProject(cliPath, "packed-router-app", ["--template", "router"]);
  verifyProject(routerProjectDir, "packed-router-app");
  verifyRouterProject(routerProjectDir);

  process.stdout.write("Packed package smoke test passed.\n");
} finally {
  rmSync(tempRoot, { recursive: true, force: true });
}

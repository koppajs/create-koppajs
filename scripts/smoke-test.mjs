#!/usr/bin/env node

import { existsSync, readFileSync, rmSync, mkdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync, spawnSync } from "node:child_process";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, "..");
const TMP = join(ROOT, ".tmp-smoke");
const CLI = join(ROOT, "bin", "create-koppajs.js");
const PROJECT = "test-app";
const ROUTER_PROJECT = "router-test-app";
const EXPECTED_STARTER_VERSIONS = {
  core: "3.0.7",
  vitePlugin: "1.0.4",
  router: "0.1.3",
  typesNode: "25.6.0",
  typescript: "5.9.3",
  vite: "7.3.2",
};
const EXPECTED_PACKAGE_MANAGER = "pnpm@10.33.2";
const EXPECTED_NODE_ENGINE = ">=22.12.0";
const EXPECTED_PNPM_ENGINE = ">=10.24.0";

let passed = 0;
let failed = 0;

function assert(condition, label) {
  if (condition) {
    console.log(`  ✓ ${label}`);
    passed++;
  } else {
    console.error(`  ✗ ${label}`);
    failed++;
  }
}

function cleanup() {
  if (existsSync(TMP)) {
    rmSync(TMP, { recursive: true, force: true });
  }
}

function expectFailure(args, label, options = {}) {
  const result = spawnSync(process.execPath, [CLI, ...args], {
    cwd: TMP,
    stdio: "pipe",
    encoding: "utf-8",
    ...options,
  });
  assert(result.status !== 0, label);
  return result;
}

console.log("\n  Smoke test: create-koppajs\n");

try {
  // Setup
  cleanup();
  mkdirSync(TMP, { recursive: true });

  // Run CLI
  execFileSync(process.execPath, [CLI, PROJECT], { cwd: TMP, stdio: "pipe" });

  const projectDir = join(TMP, PROJECT);

  // Check package.json exists and has correct name
  const pkgPath = join(projectDir, "package.json");
  assert(existsSync(pkgPath), "package.json exists");

  if (existsSync(pkgPath)) {
    const pkg = JSON.parse(readFileSync(pkgPath, "utf-8"));
    assert(pkg.name === PROJECT, `package.json name is "${PROJECT}"`);
    assert(pkg.packageManager === EXPECTED_PACKAGE_MANAGER, "package.json pins the current pnpm baseline");
    assert(pkg.engines?.node === EXPECTED_NODE_ENGINE, "package.json declares the current Node baseline");
    assert(pkg.engines?.pnpm === EXPECTED_PNPM_ENGINE, "package.json declares the current pnpm baseline");
    assert(typeof pkg.scripts?.dev === "string", 'package.json defines "dev"');
    assert(typeof pkg.scripts?.build === "string", 'package.json defines "build"');
    assert(typeof pkg.scripts?.typecheck === "string", 'package.json defines "typecheck"');
    assert(pkg.scripts?.lint === undefined, 'package.json does not define "lint"');
    assert(pkg.scripts?.format === undefined, 'package.json does not define "format"');
    assert(pkg.scripts?.test === undefined, 'package.json does not define "test"');
    assert(pkg.scripts?.check === undefined, 'package.json does not define "check"');
    assert(pkg.scripts?.validate === undefined, 'package.json does not define "validate"');
    assert(pkg.scripts?.prepare === undefined, 'package.json does not define "prepare"');
    assert(pkg.scripts?.["release:check"] === undefined, 'package.json does not define "release:check"');
    assert(
      pkg.dependencies?.["@koppajs/koppajs-core"] === EXPECTED_STARTER_VERSIONS.core,
      'starter depends on the current "@koppajs/koppajs-core" baseline',
    );
    assert(
      pkg.devDependencies?.["@koppajs/koppajs-vite-plugin"] === EXPECTED_STARTER_VERSIONS.vitePlugin,
      'starter depends on the current "@koppajs/koppajs-vite-plugin" baseline',
    );
    assert(
      pkg.devDependencies?.["@types/node"] === EXPECTED_STARTER_VERSIONS.typesNode,
      'starter depends on the current "@types/node" baseline',
    );
    assert(
      pkg.devDependencies?.typescript === EXPECTED_STARTER_VERSIONS.typescript,
      "starter depends on the current TypeScript baseline",
    );
    assert(
      pkg.devDependencies?.vite === EXPECTED_STARTER_VERSIONS.vite,
      "starter depends on the current Vite 7 baseline",
    );
    assert(pkg.devDependencies?.["@eslint/js"] === undefined, "starter does not depend on @eslint/js");
    assert(pkg.devDependencies?.eslint === undefined, "starter does not depend on ESLint");
    assert(pkg.devDependencies?.prettier === undefined, "starter does not depend on Prettier");
    assert(pkg.devDependencies?.["@playwright/test"] === undefined, "starter does not depend on Playwright");
    assert(pkg.devDependencies?.vitest === undefined, "starter does not depend on Vitest");
    assert(pkg.devDependencies?.["@vitest/coverage-v8"] === undefined, "starter does not depend on Vitest coverage");
    assert(pkg.devDependencies?.husky === undefined, "starter does not depend on Husky");
    assert(pkg.devDependencies?.["lint-staged"] === undefined, "starter does not depend on lint-staged");
    assert(pkg.devDependencies?.["@commitlint/cli"] === undefined, "starter does not depend on commitlint");
  }

  const readmePath = join(projectDir, "README.md");
  assert(existsSync(readmePath), "README.md exists");

  if (existsSync(readmePath)) {
    const readme = readFileSync(readmePath, "utf-8");
    assert(readme.includes(PROJECT), "README.md project name is patched");
    assert(!readme.includes("__PROJECT_NAME__"), "README.md placeholder is removed");
  }

  // Check src/main.ts exists
  const mainPath = join(projectDir, "src", "main.ts");
  assert(existsSync(mainPath), "src/main.ts exists");

  // Check other expected files
  assert(existsSync(join(projectDir, "index.html")), "index.html exists");
  assert(existsSync(join(projectDir, "tsconfig.json")), "tsconfig.json exists");
  assert(existsSync(join(projectDir, "vite.config.mjs")), "vite.config.mjs exists");
  assert(!existsSync(join(projectDir, ".gitignore")), ".gitignore is not shipped");
  assert(!existsSync(join(projectDir, ".gitattributes")), ".gitattributes is not shipped");
  assert(!existsSync(join(projectDir, ".npmrc")), ".npmrc is not shipped");
  assert(existsSync(join(projectDir, "src", "app-view.kpa")), "src/app-view.kpa exists");
  assert(existsSync(join(projectDir, "src", "counter-component.kpa")), "src/counter-component.kpa exists");
  assert(existsSync(join(projectDir, "public", "favicon.png")), "public/favicon.png exists");
  assert(!existsSync(join(projectDir, "public", "favicon.svg")), "public/favicon.svg is not shipped");
  assert(existsSync(join(projectDir, "public", "koppajs-logo.png")), "local KoppaJS logo exists");
  assert(!existsSync(join(projectDir, ".editorconfig")), ".editorconfig is not shipped");
  assert(!existsSync(join(projectDir, ".prettierignore")), ".prettierignore is not shipped");
  assert(!existsSync(join(projectDir, "eslint.config.mjs")), "ESLint config is not shipped");
  assert(!existsSync(join(projectDir, "prettier.config.mjs")), "Prettier config is not shipped");
  assert(!existsSync(join(projectDir, "vitest.config.mjs")), "Vitest config is not shipped");
  assert(!existsSync(join(projectDir, "playwright.config.ts")), "Playwright config is not shipped");
  assert(!existsSync(join(projectDir, "tests")), "starter tests are not shipped");
  assert(!existsSync(join(projectDir, ".github")), "GitHub workflows are not shipped");
  assert(!existsSync(join(projectDir, ".husky")), "Husky hooks are not shipped");
  assert(!existsSync(join(projectDir, "commitlint.config.mjs")), "commitlint config is not shipped");
  assert(!existsSync(join(projectDir, "CHANGELOG.md")), "CHANGELOG.md is not shipped");
  assert(!existsSync(join(projectDir, "RELEASE.md")), "RELEASE.md is not shipped");
  assert(!existsSync(join(projectDir, "AI_CONSTITUTION.md")), "AI_CONSTITUTION.md is not shipped");
  assert(!existsSync(join(projectDir, "docs")), "starter governance docs are not shipped");
  assert(!existsSync(join(projectDir, "pnpm-lock.yaml")), "starter lockfile is not shipped");
  const viteConfigPath = join(projectDir, "vite.config.mjs");
  if (existsSync(viteConfigPath)) {
    const viteConfig = readFileSync(viteConfigPath, "utf-8");
    assert(
      !viteConfig.includes("normalizeKpaModuleExport"),
      "vite.config.mjs does not include the obsolete KPA export wrapper",
    );
  }

  const appViewPath = join(projectDir, "src", "app-view.kpa");
  if (existsSync(appViewPath)) {
    const appView = readFileSync(appViewPath, "utf-8");
    assert(appView.includes('src="/koppajs-logo.png"'), "app view uses the local KoppaJS logo");
    assert(!appView.includes("public-assets-"), "app view does not reference the remote KoppaJS logo");
  }

  // Existing empty directory is allowed
  const emptyDirProject = "empty-dir-app";
  mkdirSync(join(TMP, emptyDirProject), { recursive: true });
  execFileSync(process.execPath, [CLI, emptyDirProject], { cwd: TMP, stdio: "pipe" });
  assert(existsSync(join(TMP, emptyDirProject, "package.json")), "scaffolds into existing empty directory");

  // Router starter scaffolds with overlay files and dependencies
  execFileSync(process.execPath, [CLI, ROUTER_PROJECT, "--template", "router"], {
    cwd: TMP,
    stdio: "pipe",
  });

  const routerProjectDir = join(TMP, ROUTER_PROJECT);
  const routerPkgPath = join(routerProjectDir, "package.json");
  const routerReadmePath = join(routerProjectDir, "README.md");

  assert(existsSync(routerPkgPath), "router starter package.json exists");
  assert(existsSync(join(routerProjectDir, "src", "router-page.kpa")), "router starter route component exists");
  assert(existsSync(join(routerProjectDir, "src", "not-found-page.kpa")), "router starter fallback page exists");
  assert(existsSync(join(routerProjectDir, "public", "koppajs-logo.png")), "router starter local KoppaJS logo exists");
  assert(!existsSync(join(routerProjectDir, "docs")), "router starter governance docs are not shipped");

  if (existsSync(routerPkgPath)) {
    const routerPkg = JSON.parse(readFileSync(routerPkgPath, "utf-8"));
    assert(
      routerPkg.packageManager === EXPECTED_PACKAGE_MANAGER,
      "router package.json pins the current pnpm baseline",
    );
    assert(routerPkg.engines?.node === EXPECTED_NODE_ENGINE, "router package.json declares the current Node baseline");
    assert(routerPkg.engines?.pnpm === EXPECTED_PNPM_ENGINE, "router package.json declares the current pnpm baseline");
    assert(
      routerPkg.dependencies?.["@koppajs/koppajs-router"] === EXPECTED_STARTER_VERSIONS.router,
      'router starter depends on "@koppajs/koppajs-router"',
    );
    assert(
      routerPkg.dependencies?.["@koppajs/koppajs-core"] === EXPECTED_STARTER_VERSIONS.core,
      'router starter depends on the current "@koppajs/koppajs-core" baseline',
    );
    assert(
      routerPkg.devDependencies?.["@koppajs/koppajs-vite-plugin"] === EXPECTED_STARTER_VERSIONS.vitePlugin,
      'router starter depends on the current "@koppajs/koppajs-vite-plugin" baseline',
    );
    assert(
      routerPkg.devDependencies?.["@types/node"] === EXPECTED_STARTER_VERSIONS.typesNode,
      'router starter depends on the current "@types/node" baseline',
    );
    assert(
      routerPkg.devDependencies?.typescript === EXPECTED_STARTER_VERSIONS.typescript,
      "router starter depends on the current TypeScript baseline",
    );
    assert(
      routerPkg.devDependencies?.vite === EXPECTED_STARTER_VERSIONS.vite,
      "router starter depends on the current Vite 7 baseline",
    );
  }

  if (existsSync(routerReadmePath)) {
    const routerReadme = readFileSync(routerReadmePath, "utf-8");
    assert(routerReadme.includes(ROUTER_PROJECT), "router README project name is patched");
    assert(/router starter project/i.test(routerReadme), "router README describes the router starter");
  }

  const routerAppViewPath = join(routerProjectDir, "src", "app-view.kpa");
  if (existsSync(routerAppViewPath)) {
    const routerAppView = readFileSync(routerAppViewPath, "utf-8");
    assert(routerAppView.includes('src="/koppajs-logo.png"'), "router app view uses the local KoppaJS logo");
    assert(
      !routerAppView.includes("public-assets-"),
      "router app view does not reference the remote KoppaJS logo",
    );
  }

  // Invalid names fail
  const emptyName = expectFailure([], "rejects empty project name from prompt", { input: "\n" });
  assert(emptyName.stderr.includes("Project name cannot be empty."), "empty prompt shows validation error");

  expectFailure(["."], 'rejects "." as a project name');
  expectFailure([".."], 'rejects ".." as a project name');
  expectFailure(["bad/name"], "rejects project names with forward slashes");
  expectFailure(["bad\\name"], "rejects project names with backslashes");

  const missingTemplate = expectFailure(
    ["missing-template-app", "--template"],
    "rejects missing --template values",
  );
  assert(
    missingTemplate.stderr.includes("Option --template requires a value."),
    "missing --template value shows a clear error",
  );

  const unknownTemplate = expectFailure(
    ["unknown-template-app", "--template", "unknown"],
    "rejects unknown starter templates",
  );
  assert(
    unknownTemplate.stderr.includes('Unknown starter template "unknown".'),
    "unknown template shows validation error",
  );

  // Test duplicate run fails
  let duplicateFailed = false;
  try {
    execFileSync(process.execPath, [CLI, PROJECT], { cwd: TMP, stdio: "pipe" });
  } catch {
    duplicateFailed = true;
  }
  assert(duplicateFailed, "rejects existing non-empty directory");

} finally {
  cleanup();
}

// Summary
console.log(`\n  ${passed} passed, ${failed} failed\n`);
process.exit(failed > 0 ? 1 : 0);

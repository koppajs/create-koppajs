#!/usr/bin/env node

import { existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

const REQUIRED_FILES = [
  "AI_CONSTITUTION.md",
  "ARCHITECTURE.md",
  "RELEASE.md",
  "DEVELOPMENT_RULES.md",
  "TESTING_STRATEGY.md",
  "DECISION_HIERARCHY.md",
  "ROADMAP.md",
  ".npmrc",
  "commitlint.config.mjs",
  ".husky/pre-commit",
  ".husky/commit-msg",
  "docs/meta/README.md",
  "docs/meta/change-triggers.md",
  "docs/architecture/module-boundaries.md",
  "docs/adr/README.md",
  "docs/specs/README.md",
  "docs/specs/cli-scaffolding.md",
  "docs/quality/quality-gates.md",
  "docs/quality/tooling-baseline.md",
  ".github/instructions/ai-workflow.instructions.md",
];

const missing = REQUIRED_FILES.filter((file) => !existsSync(join(ROOT, file)));

if (missing.length > 0) {
  console.error("\n  Meta layer guard failed. Missing files:\n");
  for (const file of missing) {
    console.error(`  - ${file}`);
  }
  console.error("");
  process.exit(1);
}

console.log(`\n  Meta layer guard: ${REQUIRED_FILES.length} required files present\n`);

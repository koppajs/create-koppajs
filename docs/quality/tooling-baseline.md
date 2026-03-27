# Quality Tooling Baseline

## Purpose

This document explains which repository-quality tools `create-koppajs` uses,
why they were chosen, and which seemingly common tools are intentionally not in
use yet.

## Project Context

`create-koppajs` is a dependency-light CLI scaffolder. The repository itself is
not a first-party user-facing web application; it ships a template that becomes
one after generation.

That distinction drives the tooling choices below.

## Current Tooling

### Node.js built-ins as the primary quality stack

Used because:

- the root package intentionally stays dependency-light
- the repository is small enough that custom quality scripts remain simple
- local and CI checks can run without first installing root dependencies

Current tools:

- `node --check` via `pnpm run lint`
- `node:test` via `pnpm run test:unit`
- real filesystem smoke verification via `pnpm run test:smoke`
- generated-template build verification via `pnpm run test:template-build`
- packed-package smoke verification via `pnpm run test:package`
- `npm pack --dry-run` via `pnpm run pack:dry-run`
- repository metadata and CLI contract checks via `pnpm run check`
- the full CI and release gate via `pnpm run validate`

This applies to the repository root only. The generated starter intentionally
ships a richer frontend-oriented toolchain defined directly by the starter
template contract in `template/` and `template-overlays/`.

### Git hooks and commit policy

The repository now also uses a small local Git workflow layer:

- Husky to install hooks after `pnpm install`
- lint-staged plus `lint-staged.config.mjs` and
  `scripts/lint-staged-check.mjs` for fast staged-file checks
- commitlint for Conventional Commit validation

These tools are intentionally scoped to commit-time ergonomics. They do not
replace the repository's core built-in validation scripts.

### EditorConfig

`.editorconfig` defines the baseline for:

- UTF-8 text files
- LF line endings
- final newlines
- consistent default indentation

### Repository formatting guard

`pnpm run format:check` uses a repository script instead of an external
formatter. It currently enforces:

- LF line endings
- no trailing whitespace
- final newline on text files

This is intentionally narrower than a full opinionated formatter.

## Tools Intentionally Not Used Today

### Playwright

Not used because:

- the repository itself is a CLI, not a supported browser UI
- the sample UI lives inside the generated template, not the repository runtime
- the current risk is better covered by scaffolding tests plus generated-app
  build verification

Revisit only if this repository gains a stable UI surface of its own.

### Stylelint

Not used because:

- styling in the repository is small and mostly lives in starter files
- some styling is embedded in `.kpa` component files, which would require
  custom syntax handling for partial value
- current risk is better managed through generated-template build verification
  and explicit review of starter changes

Revisit if starter styling grows substantially or if `.kpa`-aware style linting
becomes a clear, maintainable fit.

### ESLint / Prettier

Not used at the repository root today because:

- the root code surface is very small
- Node.js built-ins already cover syntax and tests without dependency overhead
- the repository benefits more from contract tests than from large rule sets

Revisit only if the root codebase grows enough that custom scripts and review
no longer provide a clear, maintainable baseline.

## Expected Workflows

### Fast local baseline

```bash
pnpm run check
```

### Template-sensitive changes

```bash
pnpm run test:template-build
```

### Publish-sensitive changes

```bash
pnpm run test:package
```

### CI and release baseline

```bash
pnpm run validate
```

### Cleanup

```bash
pnpm run clean
```

## Evolution Rules

When adding a new quality tool or configuration:

- document why built-in tooling is no longer sufficient
- update this file, `TESTING_STRATEGY.md`, and `docs/quality/quality-gates.md`
- add an ADR if the tool meaningfully changes repository workflow or policy

When considering Playwright, Stylelint, or root-level ESLint/Prettier, justify the addition
against the actual repository surface rather than generic best-practice
expectations.

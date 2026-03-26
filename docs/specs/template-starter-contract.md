# Spec: Template Starter Contract

## Status

Accepted

## Description

The bundled `template/` directory defines the exact starter project users
receive after successful scaffolding. It is part of the public product surface
of `create-koppajs`, not an internal fixture.

## Behavior

When scaffolding succeeds, the generated project must be a self-contained
KoppaJS starter that:

1. includes a minimal Vite-based frontend application
2. includes the current repository-approved quality baseline
3. includes the starter governance and documentation baseline
4. can be installed and validated without depending on unpublished root
   repository files

## Inputs

- the versioned `template/` directory shipped with the npm package
- the target directory prepared by the CLI
- the selected project name used to patch identity files after copy

## Outputs

- a generated application repository with source, tests, docs, workflows, and
  release files
- a starter `package.json` whose `name` matches the requested project name
- starter docs whose project-name placeholders are replaced where documented

## Constraints

- The starter must remain self-contained after scaffolding.
- The starter must include a minimal KoppaJS application surface:
  `index.html`, `src/main.ts`, `src/app-view.kpa`,
  `src/counter-component.kpa`, and `src/style.css`.
- The starter must include its runtime and build configuration:
  `package.json`, `tsconfig.json`, `vite.config.mjs`, and
  `vitest.config.mjs`.
- The starter must include its quality baseline: ESLint, Prettier, Vitest,
  Playwright, Husky, lint-staged, and commitlint configuration.
- The starter must include its governance baseline:
  `AI_CONSTITUTION.md`, `ARCHITECTURE.md`, `DEVELOPMENT_RULES.md`,
  `TESTING_STRATEGY.md`, `DECISION_HIERARCHY.md`, `CONTRIBUTING.md`,
  `ROADMAP.md`, `CHANGELOG.md`, and `RELEASE.md`.
- The starter must include the supporting documentation directories:
  `docs/architecture/`, `docs/adr/`, `docs/specs/`, and `docs/quality/`.
- The starter must expose `check`, `validate`, and `release:check` scripts in
  `template/package.json`.
- The starter must remain compatible with its declared Node.js and pnpm engine
  constraints.

## Edge Cases

- Publish-safe entries such as `_github` and `_husky` are stored with leading
  underscores in `template/` and restored by the CLI during scaffolding.
- Only files that intentionally contain `__PROJECT_NAME__` may rely on the CLI
  patch step.
- Template validation depends on a starter-supported Node.js line and must fail
  fast on unsupported runtimes rather than producing misleading build results.

## Acceptance Criteria

1. A scaffolded project contains the minimal KoppaJS application files and a
   working project manifest.
2. The scaffolded project contains its own docs, workflows, hooks, and release
   files without depending on root-repository scripts after generation.
3. The scaffolded project restores publish-safe dotfiles and dotdirectories to
   their final names.
4. The scaffolded project defines `pnpm check` and `pnpm validate` workflows.
5. The scaffolded project passes its own `pnpm check` baseline on a
   starter-supported Node.js runtime.

## Evolution Phase

Stable

## Completeness Level

High

## Known Gaps

- Root smoke coverage validates a representative starter file set rather than a
  complete manifest diff.
- The starter contract is split across this spec and the starter repository's
  own meta layer; both must move together when the template changes.

## Deferred Complexity

- multiple starter variants
- package-manager-specific template branches
- remote template retrieval or remote post-scaffold setup

## Technical Debt Items

- Strengthen template-contract verification only if starter churn or release
  regressions justify a full generated-file manifest check.
- Keep the starter governance docs aligned with this root-level contract when
  the template's own meta layer evolves.

## Change Management

When this spec changes:

- update `README.md` if generated output or ownership boundaries changed
- update `ARCHITECTURE.md` and `docs/architecture/*` if starter structure or
  dependency directions changed
- update `scripts/smoke-test.mjs` or `scripts/template-build-test.mjs` when the
  protected starter contract changes
- update `CHANGELOG.md` when the generated starter contract changes in a
  user-visible way

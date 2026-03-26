# Spec: Template Starter Contract

## Status

Accepted

## Description

The bundled `template/` directory and supported `template-overlays/`
directories define the exact starter projects users receive after successful
scaffolding. They are part of the public product surface of `create-koppajs`,
not internal fixtures.

## Behavior

When scaffolding succeeds, the generated project must be a self-contained
KoppaJS starter that:

1. includes a Vite-based frontend application aligned with the selected starter
2. includes the current repository-approved quality baseline
3. includes the starter governance and documentation baseline
4. can be installed and validated without depending on unpublished root
   repository files

## Inputs

- the versioned `template/` directory shipped with the npm package
- the selected `template-overlays/<name>/` directory when a non-default starter
  is requested
- the target directory prepared by the CLI
- the selected project name used to patch identity files after copy

## Outputs

- a generated application repository with source, tests, docs, workflows, and
  release files
- a starter `package.json` whose `name` matches the requested project name
- starter docs whose project-name placeholders are replaced where documented

## Constraints

- The starter must remain self-contained after scaffolding.
- Every starter must include a base KoppaJS application surface:
  `index.html`, `src/main.ts`, `src/app-view.kpa`,
  `src/counter-component.kpa`, and `src/style.css`.
- The `router` starter must additionally include `src/home-page.kpa`,
  `src/router-page.kpa`, `src/not-found-page.kpa`, and
  `docs/specs/router-navigation.md`.
- The starter must include its runtime and build configuration:
  `package.json`, `tsconfig.json`, `vite.config.mjs`, and
  `vitest.config.mjs`.
- The `router` starter `package.json` must declare
  `@koppajs/koppajs-router`.
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
- Supported starter overlays may replace only the files that intentionally
  differ from the base starter.
- Only files that intentionally contain `__PROJECT_NAME__` may rely on the CLI
  patch step.
- Template validation depends on a starter-supported Node.js line and must fail
  fast on unsupported runtimes rather than producing misleading build results.

## Acceptance Criteria

1. The default `minimal` starter contains the base KoppaJS application files
   and a working project manifest.
2. The opt-in `router` starter contains the base files plus its route pages,
   router docs, router dependency, and router lockfile.
3. The scaffolded project contains its own docs, workflows, hooks, and release
   files without depending on root-repository scripts after generation.
4. The scaffolded project restores publish-safe dotfiles and dotdirectories to
   their final names.
5. The scaffolded project defines `pnpm check` and `pnpm validate` workflows.
6. The scaffolded project passes its own `pnpm check` baseline on a
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

- package-manager-specific template branches
- remote template retrieval or remote post-scaffold setup
- additional starter variants beyond the shipped `minimal` and `router`

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

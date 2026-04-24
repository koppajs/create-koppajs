# Spec: Template Starter Contract

## Status

Accepted

## Description

The bundled `template/` directory and supported `template-overlays/`
directories define the exact starter projects users receive after successful
scaffolding. They are part of the public product surface of `create-koppajs`,
not internal fixtures. They are the single source of truth for current starter
output.

## Behavior

When scaffolding succeeds, the generated project must be a self-contained
KoppaJS starter that:

1. includes a Vite-based frontend application aligned with the selected starter
2. includes only the scripts and dependencies needed to run, build, typecheck,
   and preview the app
3. can be installed and validated without depending on unpublished root
   repository files

## Inputs

- the versioned `template/` directory shipped with the npm package
- the selected `template-overlays/<name>/` directory when a non-default starter
  is requested
- the target directory prepared by the CLI
- the selected project name used to patch identity files after copy

## Outputs

- a generated application repository with source and build tooling
- a starter `package.json` whose `name` matches the requested project name
- a starter README whose project-name placeholder is replaced by the CLI

## Constraints

- The starter must remain self-contained after scaffolding.
- Every starter must include a base KoppaJS application surface:
  `index.html`, `src/main.ts`, `src/app-view.kpa`,
  `src/counter-component.kpa`, and `src/style.css`.
- Every starter must include the local KoppaJS logo asset at
  `public/koppajs-logo.png` and must not depend on the remote logo URL at
  runtime.
- The `router` starter must additionally include `src/home-page.kpa`,
  `src/router-page.kpa`, and `src/not-found-page.kpa`.
- The starter must include its runtime and build configuration:
  `package.json`, `tsconfig.json`, and `vite.config.mjs`.
- The `router` starter `package.json` must declare
  `@koppajs/koppajs-router`.
- The starter must expose `dev`, `build`, `typecheck`, and `serve` scripts in
  `template/package.json`.
- The starter must not include root-repository governance, release automation,
  GitHub workflow, Git hook, changelog, release-note, or lockfile artifacts.
- The starter must not include ESLint, Prettier, Vitest, Playwright, lint
  scripts, format scripts, test scripts, or generated starter tests.
- The starter must remain compatible with its declared Node.js and pnpm engine
  constraints.

## Edge Cases

- Publish-safe entries such as `_gitignore`, `_gitattributes`, and `_npmrc`
  are stored with leading underscores in `template/` and restored by the CLI
  during scaffolding.
- Supported starter overlays may replace only the files that intentionally
  differ from the base starter.
- Only files that intentionally contain `__PROJECT_NAME__` may rely on the CLI
  patch step.
- Template validation depends on Node.js `>=22.12.0` and must fail fast on
  unsupported runtimes rather than producing misleading build results.

## Acceptance Criteria

1. The default `minimal` starter contains the base KoppaJS application files
   and a working project manifest.
2. The opt-in `router` starter contains the base files plus its route pages and
   router dependency.
3. The scaffolded project omits repository governance, workflows, hooks,
   release files, and lockfiles while remaining self-contained after
   generation.
4. The scaffolded project restores publish-safe dotfiles to their final names.
5. The scaffolded project defines `pnpm build`, `pnpm typecheck`, and
   `pnpm serve` workflows.
6. The scaffolded project passes its own `pnpm build` baseline on Node.js
   `>=22.12.0`.

## Evolution Phase

Stable

## Completeness Level

High

## Known Gaps

- Root smoke coverage validates a representative starter file set rather than a
  complete manifest diff.

## Deferred Complexity

- package-manager-specific template branches
- remote template retrieval or remote post-scaffold setup
- additional starter variants beyond the shipped `minimal` and `router`

## Technical Debt Items

- Revisit whether a full generated-file manifest check is worthwhile if
  starter churn increases.

## Change Management

When this spec changes:

- update `README.md` if generated output or ownership boundaries changed
- update `ARCHITECTURE.md` and `docs/architecture/*` if starter structure or
  dependency directions changed
- update `scripts/smoke-test.mjs` or `scripts/template-build-test.mjs` when the
  protected starter contract changes
- update `CHANGELOG.md` when the generated starter contract changes in a
  user-visible way

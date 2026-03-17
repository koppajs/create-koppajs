# Development Rules

## Purpose

These rules describe how code and documentation should evolve in
`create-koppajs`.

## General Rules

- Prefer explicit, readable code over clever compression.
- Keep the scaffolder small and dependency-light.
- Use Node.js built-ins unless an external dependency is clearly justified.
- Treat generated project files as a supported product surface.
- Make the minimum change that fully solves the problem.

## Code Patterns

### Root CLI

- Use ECMAScript modules.
- Keep helpers focused on one responsibility.
- Favor straightforward synchronous file operations for the CLI's short-lived
  setup flow.
- Prefer pure argument and validation helpers when extracting logic.
- Keep console output intentional and user-facing.

### Template

- Treat `template/` as canonical starter source, not test data.
- Keep the starter understandable for new users.
- Avoid introducing placeholder tokens unless the CLI explicitly patches them.
- Prefer template changes that can be explained in the generated README or spec.

## Naming Conventions

- Verb-first function names for CLI actions: `parseArgs`, `validateProjectName`,
  `patchReadme`
- Uppercase constants for repository-level paths and maps:
  `TEMPLATE_DIR`, `RENAME_FILES`
- Specs and ADRs use zero-padded numeric prefixes:
  `0001-...`, `0002-...`

## Architectural Constraints

- The CLI must only write inside the chosen target directory.
- The CLI must not fetch remote templates or depend on online services.
- The CLI must not mutate the source `template/` directory at runtime.
- Post-copy mutations are limited and must be documented in the spec.
- Any new persistent contract with users must be reflected in docs and tests.

## Dependency Rules

- New root runtime dependencies require an ADR unless the dependency is purely a
  development tool with no impact on runtime behavior.
- Prefer Node.js built-ins for repository quality tooling unless a missing
  capability justifies an external dependency.
- Template dependencies belong in `template/package.json`, not the root
  package.
- If packaging behavior changes, verify that `package.json` `files` still ships
  the required assets.

## Allowed Patterns

- Small orchestration helpers in the CLI entry file
- Recursive file copy for the template
- Node.js built-in test runner coverage for CLI helpers and contract checks
- Lightweight smoke tests using temporary directories and real filesystem I/O
- Small repository-quality scripts in `scripts/` for syntax, formatting, and
  meta-layer guards
- Lightweight hook-time validation for staged files and commit messages
- Inline workflow shell for simple CI and release checks

## Forbidden Or Discouraged Patterns

- Hidden code generation paths that make the starter hard to inspect
- Silent public API changes
- Runtime network calls during scaffolding
- Broad unrelated refactors mixed into behavior changes
- Placeholder tokens without a documented owner and patch step

## Documentation Rules

- Behavior changes require a spec update.
- Architectural changes require an architecture update.
- Major decisions require an ADR.
- Changes to scripts, workflows, or quality gates require updates to
  `TESTING_STRATEGY.md` or `docs/quality/*`.
- Changes to release flow require updates to `RELEASE.md`.
- If contributor workflow changes, update `CONTRIBUTING.md` and
  `.github/instructions/*`.

## Change Checklist

Before finishing a change, confirm:

1. The affected spec still matches the code.
2. The test or quality gate coverage still matches the risk of the change.
3. Public contract changes are documented in the changelog and README where
   relevant.
4. New architecture or process choices are recorded in the meta layer.

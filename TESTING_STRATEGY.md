# Testing Strategy

## Goal

Testing in `create-koppajs` protects the scaffolder's user-facing contract, not
just individual lines of code.

Because the repository is small, the strategy favors fast behavioral checks over
heavy test infrastructure.

## Current Test Pyramid

### 1. Static validity and repository guards

- `pnpm run check:meta`
- `pnpm run lint`
- `pnpm run format:check`

Purpose:

- catch missing governance files
- catch syntax regressions in shipped JS entry points and test files
- keep text-file formatting and line-ending hygiene consistent

### 2. Unit and helper-level integration tests

- `npm run test:unit`

Purpose:

- verify argument parsing
- verify project name validation
- verify target-directory safety behavior
- verify template copy and patch helper behavior

### 3. CLI contract checks

- `pnpm run check:cli`

Purpose:

- verify the published executable responds correctly to metadata flags

### 4. Smoke integration test

- `npm run test:smoke`

Purpose:

- scaffold a real project into a temporary directory
- verify required files exist
- verify `package.json` is patched with the requested project name
- verify `README.md` placeholder replacement happens correctly
- verify representative invalid project names fail
- verify scaffolding into an existing empty directory succeeds
- verify duplicate scaffolding into a non-empty directory fails

### 5. Generated-template build validation

- `pnpm run test:template-build`

Purpose:

- scaffold a real starter project
- install the generated application's dependencies
- confirm the generated app passes its own `pnpm check` baseline

Runtime note:

- this validation must run on Node.js 22 or newer

This is heavier than the default local check because it relies on registry
access. It is therefore available locally and enforced in CI/release, but kept
out of the default `pnpm run check` loop.

### 6. Packed-package smoke validation

- `pnpm run test:package`

Purpose:

- create a tarball from the current repository state
- install that tarball into a temporary consumer directory
- invoke the packaged `create-koppajs` binary from the installed package
- verify the published payload still scaffolds the supported starters

This protects the shipped npm package path instead of only the workspace copy of
the CLI.

## When To Add Unit Tests

Add unit-style tests when:

- pure helpers become non-trivial
- validation rules multiply
- small decision branches are easier to verify directly than through a full
  scaffold run

Unit tests should focus on pure logic such as argument parsing, validation, or
patching behavior. They should not replace end-to-end smoke coverage.

## When To Add Integration Tests

Add or extend integration tests when changing:

- generated file structure
- placeholder patching behavior
- target directory safety checks
- prompt and input flow
- packaging assumptions such as file rename rules

Integration tests should use the real filesystem with temporary directories
whenever practical.

## Playwright And Browser E2E Policy

This repository does not expose a first-party user-operated UI. It is a CLI
that ships a template containing example UI code.

Because of that:

- Playwright is intentionally not part of the repository toolchain today
- browser E2E infrastructure would add maintenance cost to the wrong layer
- generated-template build verification is a better fit for the current risks

Revisit this only if the repository itself gains a stable, testable UI surface
such as a live preview app, Storybook, or documentation site with supported
user journeys.

## Mocking Policy

- Prefer real filesystem operations over filesystem mocks.
- Avoid mocking Node built-ins for the main scaffolding flow.
- Only mock process or I/O boundaries when reproducing a failure mode that is
  otherwise impractical.

## Coverage Expectations

This repository optimizes for scenario coverage rather than line-percentage
targets.

Every user-visible change should protect the relevant scenarios:

- happy path scaffold
- invalid input or invalid target directory
- patching of generated identity files
- command metadata behavior

For higher-risk template or release changes, add validation for the affected
contract rather than chasing a numeric coverage threshold.

## Git Workflow Validation

This repository also enforces a lightweight local Git workflow baseline:

- staged-file hygiene through `.husky/pre-commit` plus `lint-staged`
- Conventional Commit validation through `.husky/commit-msg` plus `commitlint`

These hooks are intentionally faster and narrower than the full repository
checks. Heavy validation still belongs in `pnpm run check`,
`pnpm run test:template-build`, `pnpm run test:package`, and CI.

## Required Updates When Behavior Changes

- Update the relevant spec in `docs/specs/`
- Extend `scripts/smoke-test.mjs` or add a new test when the current checks no
  longer cover the changed behavior
- Update CI expectations if the quality gate changes
- Update the quality-tooling documentation if repository-level checks or tool
  choices change

## Release And CI Gates

The repository quality gates currently include:

- `pnpm run check`
- `pnpm run test:template-build`
- `pnpm run test:package`
- `pnpm run validate`

GitHub Actions CI runs `pnpm run validate` on Node 22 and 24. The release
workflow reruns `pnpm run validate` on the maintainer default from `.nvmrc`
before publish.

See [docs/quality/quality-gates.md](./docs/quality/quality-gates.md) for the
current merge and release gate definitions, and
[docs/quality/tooling-baseline.md](./docs/quality/tooling-baseline.md) for the
current tool selection.

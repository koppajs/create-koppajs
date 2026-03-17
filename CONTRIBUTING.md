# Contributing

## Purpose

`create-koppajs` is the official KoppaJS scaffolder. Contributions should keep
the tool small, explicit, and reliable.

The repository's job is narrow but important:

- ship a stable CLI
- ship a clear starter template
- protect the generated project contract

## Read Before Editing

Start here before changing code, workflows, or template files:

1. [DECISION_HIERARCHY.md](./DECISION_HIERARCHY.md)
2. [AI_CONSTITUTION.md](./AI_CONSTITUTION.md)
3. [ARCHITECTURE.md](./ARCHITECTURE.md)
4. [DEVELOPMENT_RULES.md](./DEVELOPMENT_RULES.md)
5. [TESTING_STRATEGY.md](./TESTING_STRATEGY.md)
6. Relevant specs in [docs/specs](./docs/specs)
7. Relevant ADRs in [docs/adr](./docs/adr)

## Requirements

- Node.js 20 or newer for the CLI and repository scripts
- pnpm 10 or newer for dependency installation and hook setup

When validating the generated starter with `pnpm test:template-build` or
`pnpm release:check`, use a Node.js version supported by the starter toolchain.
The current supported lines are 20.19+, 22.13+, and 24+.

The repository's built-in core checks can run without installing root
dependencies, but the local Git hook and Conventional Commit workflow require:

```bash
pnpm install
```

## Repository Map

- `bin/create-koppajs.js`: CLI entry point and scaffolding logic
- `template/`: bundled starter project copied into new apps
- `scripts/smoke-test.mjs`: behavioral validation of the scaffolded output
- `.github/workflows/`: CI and release automation
- `docs/`: architecture, specs, ADRs, quality guidance, and meta docs

## Local Workflow

### Core checks

```bash
pnpm check
```

This runs:

- `pnpm check:meta`
- `pnpm lint`
- `pnpm format:check`
- `pnpm check:cli`
- `pnpm test`
- `pnpm pack:dry-run`

For targeted work, the smaller commands are:

```bash
pnpm lint
pnpm format:check
pnpm test:unit
pnpm test:smoke
pnpm check:cli
pnpm pack:dry-run
```

### Generated-template build verification

Use this when changing the template, starter dependencies, or build setup:

```bash
pnpm test:template-build
```

This scaffolds a temporary app, installs its dependencies, and builds it.
Because the generated starter follows the current upstream frontend toolchain,
Node 23 is intentionally not treated as a supported validation runtime here.

### Optional watch mode

```bash
pnpm test:watch
```

## Commit Policy

Commit messages use Conventional Commits.

Examples:

```text
feat: align template with official example
docs: add repository release guide
fix: patch generated release placeholders
```

Commit messages are validated locally by `.husky/commit-msg` when dependencies
have been installed.

## Change Rules

### If you change CLI behavior

- update the relevant spec in `docs/specs/`
- update tests or smoke coverage
- update `README.md` if usage changed

### If you change the generated template

- treat the change as user-facing
- update `ARCHITECTURE.md` or `docs/architecture/*` if boundaries changed
- update specs, `README.md`, and `CHANGELOG.md` when the generated contract
  changed

### If you change workflow, policy, or architecture

- update the relevant root meta docs
- add or update an ADR for lasting decisions
- update `.github/instructions/*` if the contributor or AI workflow changed

## Pull Request Expectations

- keep changes scoped and explain the user-visible effect
- do not mix unrelated refactors into the same change
- mention any public contract changes clearly
- include the meta-layer updates in the same pull request

## Release Process

Releases are tag-driven.

High-level flow:

1. ensure `package.json` version is correct
2. update `CHANGELOG.md` for user-visible changes
3. push a matching `vX.Y.Z` tag
4. let GitHub Actions validate and publish

See [docs/quality/quality-gates.md](./docs/quality/quality-gates.md) and
[docs/quality/tooling-baseline.md](./docs/quality/tooling-baseline.md), and
[docs/adr/0003-tag-driven-release-publishing.md](./docs/adr/0003-tag-driven-release-publishing.md),
[docs/adr/0005-adopt-commit-message-conventions.md](./docs/adr/0005-adopt-commit-message-conventions.md),
and [RELEASE.md](./RELEASE.md) for the governing release rules.

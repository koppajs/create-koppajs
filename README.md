# create-koppajs

`create-koppajs` is the official KoppaJS CLI scaffolder. It creates a new
project by copying the versioned base starter in `template/`, optionally
applying a supported starter overlay from `template-overlays/`, and patching a
small, explicit set of identity files.

## Purpose

This repository exists to do one job well:

- create a fresh project directory
- copy the current supported KoppaJS starter baseline
- optionally add a supported starter variant such as `router`
- preserve a stable, inspectable bootstrap path for new KoppaJS applications

It is not a runtime package and it does not own application behavior after
generation.

## Repository Classification

- Repo type: CLI scaffolding package with a bundled starter family
- Runtime responsibility: one-shot filesystem scaffolding through
  `bin/create-koppajs.js`
- Build-time responsibility: publish the starter assets, protect the contract,
  and validate tagged releases
- UI surface: none at the repository root; the generated starter owns the UI
- Maturity level: stable, contract-governed, maintenance-first

## Ownership Boundaries

- `bin/create-koppajs.js` owns argument parsing, prompting, validation, starter
  selection, template copy, placeholder patching, and next-step output.
- `template/` owns the default `minimal` starter baseline.
- `template-overlays/` owns the files that differ for opt-in starter variants.
- `scripts/` and `.github/workflows/` own repository-quality and release
  verification.
- Root governance files own the repository doctrine and must stay aligned with
  code and workflows.

The root package must not take on runtime concerns that belong in generated
applications, and generated applications must not depend on unpublished root
files after scaffold completion.

## Public Contract

The stable public contract of this repository is:

- the `create-koppajs` command and its `--help` / `--version` flags
- the optional project-name argument and prompt fallback when omitted
- the optional `--template <name>` and `--router` starter-selection flags
- the interactive starter-template prompt when no template flag is provided in
  an interactive terminal
- rejection of invalid project names, invalid template names, and non-empty
  target directories
- recursive copying of the bundled `template/` directory plus any selected
  overlay
- restoration of publish-safe dotfiles and dotdirectories during copy
- patching of generated `package.json`, `README.md`, `CHANGELOG.md`, and
  `RELEASE.md`
- the generated starter baselines defined by `template/` and
  `template-overlays/`
- the npm package payload: `bin/`, `template/`, `template-overlays/`,
  `README.md`, `CHANGELOG.md`, and `LICENSE`

The governing specs for that contract are:

- [docs/specs/cli-scaffolding.md](./docs/specs/cli-scaffolding.md)
- [docs/specs/template-starter-contract.md](./docs/specs/template-starter-contract.md)

## Usage

Default starter:

```bash
pnpm create koppajs my-app
```

Router starter:

```bash
pnpm create koppajs my-app --template router
```

Alternative entrypoints:

```bash
npm create koppajs my-app
```

```bash
npx create-koppajs my-app
```

If the target directory name is omitted, the CLI prompts for one. If no
template flag is provided in an interactive terminal, the CLI also prompts for
starter selection. Non-interactive runs default to `minimal`.

After generation:

```bash
cd my-app
pnpm install
pnpm dev
```

## Requirements

- for `create-koppajs`: Node.js `>=20`
- for generated starter projects: pnpm `>=10` and a starter-supported Node.js
  line, currently `20.19+`, `22.13+`, or `24+`

## Generated Starters

The generated project includes one of two supported starters:

- `minimal` by default: a small KoppaJS application built on Vite and
  TypeScript
- `router` as opt-in: the same baseline plus `@koppajs/koppajs-router`, a
  simple two-page navigation flow, and an explicit fallback route

Every starter also includes:

- quality tooling through ESLint, Prettier, Vitest, and Playwright
- local workflow guards through Husky, lint-staged, and commitlint
- starter governance files, ADR/spec structure, and release-process documents
- GitHub workflows for CI and tagged releases

The root repository treats those starters as versioned product surface, not
test data.

## Ecosystem Fit

`create-koppajs` is the canonical entry point for starting a new KoppaJS
application. It complements:

- `@koppajs/koppajs-core` for runtime behavior
- `@koppajs/koppajs-router` for optional route orchestration in scaffolded apps
- `@koppajs/koppajs-vite-plugin` for build integration
- the maintained KoppaJS starter conventions reflected in `template/` and
  `template-overlays/`

The repository stays intentionally narrow so the CLI, starter contract, and
governance baseline can evolve together without hidden behavior.

## Governance

The root meta layer defines how this repository changes:

- [AI_CONSTITUTION.md](./AI_CONSTITUTION.md)
- [ARCHITECTURE.md](./ARCHITECTURE.md)
- [DECISION_HIERARCHY.md](./DECISION_HIERARCHY.md)
- [DEVELOPMENT_RULES.md](./DEVELOPMENT_RULES.md)
- [TESTING_STRATEGY.md](./TESTING_STRATEGY.md)
- [RELEASE.md](./RELEASE.md)
- [ROADMAP.md](./ROADMAP.md)
- [docs/meta/README.md](./docs/meta/README.md)
- [docs/architecture/README.md](./docs/architecture/README.md)
- [docs/quality/README.md](./docs/quality/README.md)

Tagged releases are documented in [CHANGELOG.md](./CHANGELOG.md). Contributor
workflow rules live in [CONTRIBUTING.md](./CONTRIBUTING.md).

## License

Apache License 2.0 — © 2026 KoppaJS, Bastian Bensch

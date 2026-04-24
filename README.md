<a id="readme-top"></a>

<div align="center">
  <img src="https://public-assets-1b57ca06-687a-4142-a525-0635f7649a5c.s3.eu-central-1.amazonaws.com/koppajs/koppajs-logo-text-900x226.png" width="500" alt="KoppaJS Logo">
</div>

<br>

<div align="center">
  <a href="https://www.npmjs.com/package/create-koppajs"><img src="https://img.shields.io/npm/v/create-koppajs?style=flat-square" alt="npm version"></a>
  <a href="https://github.com/koppajs/create-koppajs/actions"><img src="https://img.shields.io/github/actions/workflow/status/koppajs/create-koppajs/ci.yml?branch=main&style=flat-square" alt="CI Status"></a>
  <a href="./LICENSE"><img src="https://img.shields.io/badge/license-Apache--2.0-blue?style=flat-square" alt="License"></a>
</div>

<br>

<div align="center">
  <h1 align="center">create-koppajs</h1>
  <h3 align="center">Official project scaffolder for KoppaJS</h3>
  <p align="center">
    <i>Generate a ready-to-run KoppaJS starter in one command.</i>
  </p>
</div>

<br>

<div align="center">
  <p align="center">
    <a href="https://github.com/koppajs/koppajs-documentation">Documentation</a>
    &middot;
    <a href="https://github.com/koppajs/koppajs-core">KoppaJS Core</a>
    &middot;
    <a href="https://github.com/koppajs/koppajs-vite-plugin">Vite Plugin</a>
    &middot;
    <a href="https://github.com/koppajs/koppajs-router">Router</a>
    &middot;
    <a href="https://github.com/koppajs/create-koppajs/issues">Issues</a>
  </p>
</div>

<br>

<details>
<summary>Table of Contents</summary>
  <ol>
    <li><a href="#purpose">Purpose</a></li>
    <li><a href="#repository-classification">Repository Classification</a></li>
    <li><a href="#ownership-boundaries">Ownership Boundaries</a></li>
    <li><a href="#public-contract">Public Contract</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#requirements">Requirements</a></li>
    <li><a href="#generated-starters">Generated Starters</a></li>
    <li><a href="#ecosystem-fit">Ecosystem Fit</a></li>
    <li><a href="#architecture-governance">Architecture & Governance</a></li>
    <li><a href="#community-contribution">Community & Contribution</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

---

## Purpose

This repository exists to do one job well:

- create a fresh project directory
- copy the current supported KoppaJS starter baseline
- optionally add a supported starter variant such as `router`
- preserve a stable, inspectable bootstrap path for new KoppaJS applications

It is not a runtime package and it does not own application behavior after
generation.

---

## Repository Classification

- Repo type: CLI scaffolding package with a bundled starter family
- Runtime responsibility: one-shot filesystem scaffolding through
  `bin/create-koppajs.js`
- Build-time responsibility: publish the starter assets, protect the contract,
  and validate tagged releases
- UI surface: none at the repository root; the generated starter owns the UI
- Maturity level: stable, contract-governed, maintenance-first

---

## Ownership Boundaries

- `bin/create-koppajs.js` owns argument parsing, prompting, validation, starter
  selection, template copy, placeholder patching, and next-step output.
- `template/` owns the default `minimal` starter baseline and is the single
  source of truth for that starter.
- `template-overlays/` owns the files that differ for opt-in starter variants.
  Together with `template/`, they define the only source of truth for
  generated starter output.
- `scripts/` and `.github/workflows/` own repository-quality and release
  verification.
- Root governance files own the repository doctrine and must stay aligned with
  code and workflows.

The root package must not take on runtime concerns that belong in generated
applications, and generated applications must not depend on unpublished root
files after scaffold completion.

---

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
- patching of generated `package.json` and `README.md`
- the generated starter baselines defined by `template/` and
  `template-overlays/`
- the npm package payload: `bin/`, `template/`, `template-overlays/`,
  `README.md`, `CHANGELOG.md`, and `LICENSE`

The governing specs for that contract are:

- [docs/specs/cli-scaffolding.md](./docs/specs/cli-scaffolding.md)
- [docs/specs/template-starter-contract.md](./docs/specs/template-starter-contract.md)

---

## Usage

Default starter:

```bash
pnpm create koppajs@latest my-app
```

Router starter:

```bash
pnpm create koppajs@latest my-app --template router
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

---

## Requirements

- for `create-koppajs`: Node.js `>=22.12.0` and pnpm `>=10.24.0`
- for generated starter projects: Node.js `>=22.12.0` and pnpm `>=10.24.0`

---

## Generated Starters

The generated project includes one of two supported starters:

- `minimal` by default: a small KoppaJS application built on Vite and
  TypeScript
- `router` as opt-in: the same baseline plus `@koppajs/koppajs-router`, a
  simple two-page navigation flow, and an explicit fallback route

Every starter also includes:

- a focused README with setup, scripts, and project structure

The generated project intentionally excludes repository governance files,
release automation, GitHub workflows, Git hooks, changelog files, lockfiles,
default dotfiles, and lint/format/test tooling. Those files belong to this
scaffolder repository or to project-specific app decisions, not to every new
application created from it.

The root repository treats those starters as versioned product surface, not
test data. `template/` plus the supported overlays are the only source of truth
for starter behavior.

---

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

---

## Architecture & Governance

Project intent, contributor rules, and documentation contracts live in the local repo meta layer:

- [AI_CONSTITUTION.md](./AI_CONSTITUTION.md)
- [ARCHITECTURE.md](./ARCHITECTURE.md)
- [DECISION_HIERARCHY.md](./DECISION_HIERARCHY.md)
- [DEVELOPMENT_RULES.md](./DEVELOPMENT_RULES.md)
- [TESTING_STRATEGY.md](./TESTING_STRATEGY.md)
- [RELEASE.md](./RELEASE.md)
- [ROADMAP.md](./ROADMAP.md)
- [CHANGELOG.md](./CHANGELOG.md)
- [CONTRIBUTING.md](./CONTRIBUTING.md)
- [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md)
- [docs/specs/README.md](./docs/specs/README.md)
- [docs/specs/repository-documentation-contract.md](./docs/specs/repository-documentation-contract.md)
- [docs/architecture/README.md](./docs/architecture/README.md)
- [docs/meta/README.md](./docs/meta/README.md)
- [docs/quality/README.md](./docs/quality/README.md)

The file-shape contract for `README.md`, `CHANGELOG.md`, `CODE_OF_CONDUCT.md`, and `CONTRIBUTING.md` is defined in [docs/specs/repository-documentation-contract.md](./docs/specs/repository-documentation-contract.md).

Run the local document guard before committing:

```bash
pnpm run check:docs
```

---

## Community & Contribution

Issues and pull requests are welcome:

https://github.com/koppajs/create-koppajs/issues

Contributor workflow details live in [CONTRIBUTING.md](./CONTRIBUTING.md).

Community expectations live in [CODE_OF_CONDUCT.md](./CODE_OF_CONDUCT.md).

---

## License

Apache License 2.0 — © 2026 KoppaJS, Bastian Bensch

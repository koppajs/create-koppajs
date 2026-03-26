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
    <i>Generate a ready-to-run KoppaJS starter with the current quality baseline in one command.</i>
  </p>
</div>

<br>

<div align="center">
  <p align="center">
    <a href="https://github.com/koppajs/koppajs-documentation">Documentation</a>
    &middot;
    <a href="https://github.com/koppajs/koppajs-core">KoppaJS Core</a>
    &middot;
    <a href="https://github.com/koppajs/koppajs-example">Example Project</a>
    &middot;
    <a href="https://github.com/koppajs/create-koppajs/issues">Issues</a>
  </p>
</div>

<br>

<details>
<summary>Table of Contents</summary>
  <ol>
    <li><a href="#what-is-this">What is this?</a></li>
    <li><a href="#features">Features</a></li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#what-gets-generated">What gets generated</a></li>
    <li><a href="#requirements">Requirements</a></li>
    <li><a href="#architecture--governance">Architecture & Governance</a></li>
    <li><a href="#community--contribution">Community & Contribution</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

---

## What is this?

`create-koppajs` is the official scaffolder for new KoppaJS projects.

Its responsibility is intentionally narrow:

- create a fresh project directory
- copy the current supported starter template
- give consumers a clean baseline for local development, testing, and release

The generated project is aligned with the official KoppaJS example and carries
the same quality and governance baseline expected from active KoppaJS work.

---

## Features

- one-command project bootstrap through `pnpm create`, `npm create`, or `npx`
- starter template with Vite, TypeScript, ESLint, Prettier, Vitest, and
  Playwright
- generated meta-layer documents, release notes baseline, and GitHub workflows
- no prerequisite global install and no manual starter assembly

---

## Usage

```bash
pnpm create koppajs my-app
```

```bash
npm create koppajs my-app
```

```bash
npx create-koppajs my-app
```

Then:

```bash
cd my-app
pnpm install
pnpm dev
```

If you omit the target directory name, the CLI prompts for one.

---

## What gets generated

```text
my-app/
├── .github/
├── .husky/
├── docs/
├── tests/
├── CHANGELOG.md
├── RELEASE.md
├── AI_CONSTITUTION.md
├── ARCHITECTURE.md
├── package.json
├── .gitignore
├── README.md
├── vite.config.mjs
├── vitest.config.mjs
├── playwright.config.ts
├── tsconfig.json
├── pnpm-lock.yaml
├── LICENSE
├── public/
│   └── favicon.svg
└── src/
    ├── main.ts
    ├── style.css
    ├── app-view.kpa
    └── counter-component.kpa
```

- Vite as dev server and bundler
- TypeScript, ESLint, Prettier, Vitest, and Playwright
- Husky, lint-staged, Conventional Commit enforcement, and GitHub workflows
- meta-layer documents, ADR/spec scaffolding, and release process files
- a minimal example app aligned with the official `koppajs-example` starter

---

## Requirements

- to run `create-koppajs`: Node.js >= 20
- for generated starter projects: pnpm >= 10 and a starter-supported Node.js
  line, currently 20.19+, 22.13+, or 24+

---

## Architecture & Governance

`create-koppajs` remains a scaffolding tool, not a runtime package. Its job is
to generate a trustworthy starting point, not to own application logic.

The repo ships the same governance surface expected elsewhere in the KoppaJS
ecosystem:

- [AI_CONSTITUTION.md](./AI_CONSTITUTION.md)
- [ARCHITECTURE.md](./ARCHITECTURE.md)
- [DECISION_HIERARCHY.md](./DECISION_HIERARCHY.md)
- [DEVELOPMENT_RULES.md](./DEVELOPMENT_RULES.md)
- [TESTING_STRATEGY.md](./TESTING_STRATEGY.md)
- [RELEASE.md](./RELEASE.md)
- [ROADMAP.md](./ROADMAP.md)
- [docs/meta/README.md](./docs/meta/README.md)

Tagged releases are documented in `CHANGELOG.md`, and the template itself is
validated through CLI checks, smoke tests, and a generated-project build test.

---

## Community & Contribution

Issues and pull requests are welcome:

https://github.com/koppajs/create-koppajs/issues

Contributor workflow details live in [CONTRIBUTING.md](./CONTRIBUTING.md).

---

## License

Apache License 2.0 — © 2026 KoppaJS, Bastian Bensch

<a id="readme-top"></a>

<div align="center">
  <img src="https://public-assets-1b57ca06-687a-4142-a525-0635f7649a5c.s3.eu-central-1.amazonaws.com/koppajs/koppajs-logo-text-900x226.png" width="500" alt="KoppaJS Logo">
</div>

<br>

<div align="center">
  <a href="./LICENSE"><img src="https://img.shields.io/badge/license-Apache--2.0-blue?style=flat-square" alt="License"></a>
</div>

<br>

<div align="center">
  <h1 align="center">__PROJECT_NAME__</h1>
  <h3 align="center">KoppaJS starter project</h3>
  <p align="center">
    <i>Scaffolded from the current official KoppaJS starter baseline.</i>
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
  </p>
</div>

<br>

<details>
<summary>Table of Contents</summary>
  <ol>
    <li><a href="#what-is-this">What is this?</a></li>
    <li><a href="#requirements">Requirements</a></li>
    <li><a href="#getting-started">Getting Started</a></li>
    <li><a href="#quality-workflow">Quality Workflow</a></li>
    <li><a href="#release-workflow">Release Workflow</a></li>
    <li><a href="#project-structure">Project Structure</a></li>
    <li><a href="#meta-layer">Meta Layer</a></li>
    <li><a href="#community--contribution">Community & Contribution</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

---

## What is this?

This project was scaffolded from the current official minimal starter baseline
for KoppaJS.

It keeps the runtime intentionally small:

- one HTML shell
- one TypeScript bootstrap file
- one root view
- one stateful child component

It also carries a small quality baseline so the starter stays runnable and trustworthy:

- ESLint for source and tooling files
- Prettier plus `.editorconfig` for supported text formats
- Vitest for local unit and integration coverage
- Playwright for a real-browser smoke test
- Husky plus lint-staged for fast staged-file checks
- Conventional Commits enforcement via `commitlint`
- a tag-driven GitHub release baseline with `CHANGELOG.md` and `RELEASE.md`

Use it as a starting point for new KoppaJS projects or as a reference for how components are registered, composed, and validated.

> **Note:** This repository uses published npm packages, so it works as a standalone starter after `pnpm install`.

---

## Requirements

- Node.js 20.19+, 22.13+, or 24+
- pnpm >= 10

Node 23 is intentionally not treated as supported here because the current
upstream frontend toolchain excludes it.

---

## Getting Started

```bash
pnpm install
pnpm dev
```

Install the Playwright browser once if you want to run the browser smoke test locally:

```bash
pnpm exec playwright install chromium
```

Useful commands:

```bash
pnpm lint
pnpm format:check
pnpm typecheck
pnpm test:run
pnpm test:coverage
pnpm build
pnpm serve
pnpm release:check
```

Commit messages follow Conventional Commits, for example:

```text
feat: add release workflow
docs: update starter governance
fix: align counter button labels
```

---

## Quality Workflow

Fast local baseline:

```bash
pnpm check
```

Full validation, including Playwright:

```bash
pnpm validate
```

Standalone browser smoke test:

```bash
pnpm test:e2e
```

---

## Release Workflow

Tagged releases are documented in `CHANGELOG.md`.
The maintainer procedure lives in `RELEASE.md`.

Release tags must use the form `vX.Y.Z` and match `package.json`.
The included automation creates GitHub Releases only. If your project later
needs npm publishing or deployment-specific release steps, update `RELEASE.md`
and `.github/workflows/release.yml` together.

---

## Project Structure

```text
__PROJECT_NAME__/
├── .editorconfig
├── .github/
├── .gitignore
├── .husky/
├── .npmrc
├── .prettierignore
├── CHANGELOG.md
├── commitlint.config.mjs
├── AI_CONSTITUTION.md
├── ARCHITECTURE.md
├── CONTRIBUTING.md
├── DECISION_HIERARCHY.md
├── DEVELOPMENT_RULES.md
├── RELEASE.md
├── ROADMAP.md
├── TESTING_STRATEGY.md
├── eslint.config.mjs
├── index.html
├── package.json
├── playwright.config.ts
├── pnpm-lock.yaml
├── prettier.config.mjs
├── tsconfig.json
├── vite.config.mjs
├── vitest.config.mjs
├── docs/
│   ├── adr/
│   ├── architecture/
│   ├── meta/
│   ├── quality/
│   └── specs/
├── public/
│   └── favicon.svg
├── src/
│   ├── main.ts
│   ├── style.css
│   ├── app-view.kpa
│   └── counter-component.kpa
└── tests/
    ├── e2e/
    ├── integration/
    └── unit/
```

---

## Meta Layer

The repository includes an explicit meta layer so architecture, testing, and contributor rules evolve together with the codebase.

Start here:

- `DECISION_HIERARCHY.md`
- `AI_CONSTITUTION.md`
- `ARCHITECTURE.md`
- `DEVELOPMENT_RULES.md`
- `TESTING_STRATEGY.md`
- `CHANGELOG.md`
- `RELEASE.md`
- `docs/quality/quality-gates.md`
- `docs/adr/`
- `docs/specs/`

---

## Community & Contribution

Contribution workflow details live in `CONTRIBUTING.md`.
Update this section with your own repository links once the project has a
canonical home.

---

## License

Apache License 2.0 — © 2026 KoppaJS, Bastian Bensch

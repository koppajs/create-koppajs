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
    <li><a href="#usage">Usage</a></li>
    <li><a href="#generated-starters">Generated Starters</a></li>
    <li><a href="#requirements">Requirements</a></li>
    <li><a href="#ecosystem-fit">Ecosystem Fit</a></li>
    <li><a href="#community-contribution">Community & Contribution</a></li>
    <li><a href="#license">License</a></li>
  </ol>
</details>

---

## Usage

Create a project with the default starter:

```bash
pnpm create koppajs@latest my-app
```

Or choose the router starter:

```bash
pnpm create koppajs@latest my-app --template router
```

Then start your app:

```bash
cd my-app
pnpm install
pnpm dev
```

`npm create koppajs my-app` and `npx create-koppajs my-app` are also supported.

Omit the project name to be prompted for one. In an interactive terminal, the
CLI asks which starter to use unless you pass `--template` or the `--router`
shortcut; non-interactive runs default to `minimal`. Invalid names, unknown
starters, and non-empty target directories are rejected. Use `--help` for all
options or `--version` to check the CLI version.

---

## Generated Starters

- **minimal** (default): a small KoppaJS app with Vite and TypeScript.
- **router**: the same foundation plus `@koppajs/koppajs-router`, two pages,
  navigation, and a not-found fallback.

Both starters include their own setup README. They do not add this repository's
release workflows, governance files, lockfile, or lint and test tooling to your
new project.

---

## Requirements

Node.js `>=22.12.0` and pnpm `>=10.24.0` are required for the CLI and the
generated starters.

---

## Ecosystem Fit

`create-koppajs` scaffolds the app; the generated project owns its runtime.
KoppaJS Core powers the app, the Vite plugin builds it, and the optional router
handles navigation. For implementation details, see the
[architecture](https://github.com/koppajs/create-koppajs/blob/main/ARCHITECTURE.md)
and [CLI specification](https://github.com/koppajs/create-koppajs/blob/main/docs/specs/cli-scaffolding.md).

---

## Community & Contribution

Issues and pull requests are welcome:

https://github.com/koppajs/create-koppajs/issues

Contributor workflow details live in the GitHub repository:

https://github.com/koppajs/create-koppajs/blob/main/CONTRIBUTING.md

Community expectations live in the GitHub repository:

https://github.com/koppajs/create-koppajs/blob/main/CODE_OF_CONDUCT.md

---

## License

Apache License 2.0 — © 2026 KoppaJS, Bastian Bensch

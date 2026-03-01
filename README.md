<a id="readme-top"></a>

<div align="center">
	<img src="https://public-assets-1b57ca06-687a-4142-a525-0635f7649a5c.s3.eu-central-1.amazonaws.com/koppajs/koppajs-logo-text-900x226.png" width="500" alt="KoppaJS Logo">
</div>

<br>

<div align="center">
	<a href="https://www.npmjs.com/package/create-koppajs"><img src="https://img.shields.io/npm/v/create-koppajs?style=flat-square" alt="npm version"></a>
	<a href="./LICENSE"><img src="https://img.shields.io/badge/license-Apache--2.0-blue?style=flat-square" alt="License"></a>
</div>

<br>

<div align="center">
	<h1 align="center">create-koppajs</h1>
	<h3 align="center">Scaffold a new KoppaJS project in seconds</h3>
	<p align="center">
		<i>The fastest way to start building with KoppaJS.</i>
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
		<a href="https://github.com/koppajs/create-koppajs/issues">Issues</a>
	</p>
</div>

<br>

<details>
<summary>Table of Contents</summary>
	<ol>
		<li><a href="#what-is-this">What is this?</a></li>
		<li><a href="#usage">Usage</a></li>
		<li><a href="#what-gets-generated">What gets generated</a></li>
		<li><a href="#requirements">Requirements</a></li>
		<li><a href="#community--contribution">Community & Contribution</a></li>
		<li><a href="#license">License</a></li>
	</ol>
</details>

---

## What is this?

`create-koppajs` is the **official project scaffolder** for KoppaJS.

It creates a ready-to-run starter project with a single command — no configuration, no dependencies to install first, no boilerplate to write by hand.

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

If you omit the project name, the CLI will prompt you for one.

---

## What gets generated

```
my-app/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.mjs
├── .gitignore
├── LICENSE
├── README.md
├── public/
│   └── favicon.svg
└── src/
    ├── main.ts
    ├── style.css
    ├── app-view.kpa
    └── counter-component.kpa
```

- **Vite** as dev server and bundler
- **TypeScript** support out of the box
- **Two sample components** (app view + counter) to get started
- **Zero unnecessary dependencies**

---

## Requirements

- Node.js >= 20

---

## Community & Contribution

Issues and pull requests are welcome:

https://github.com/koppajs/create-koppajs/issues

---

## License

Apache-2.0 — © 2026 KoppaJS, Bastian Bensch
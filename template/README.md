<a id="readme-top"></a>

<div align="center">
	<img src="https://public-assets-1b57ca06-687a-4142-a525-0635f7649a5c.s3.eu-central-1.amazonaws.com/koppajs/koppajs-logo-text-900x226.png" width="500" alt="Koppajs Logo">
</div>

<br>

<div align="center">
	<a href="./LICENSE"><img src="https://img.shields.io/github/license/koppajs/koppajs-example?style=flat-square" alt="License"></a>
</div>

<br>

<div align="center">
	<h1 align="center">@koppajs/koppajs-example</h1>
	<h3 align="center">Minimal starter template for Koppajs</h3>
	<p align="center">
		<i>Everything you need to start building — nothing you don't.</i>
	</p>
</div>

<br>

<div align="center">
	<p align="center">
		<a href="https://github.com/koppajs/koppajs-documentation">Documentation</a>
		&middot;
		<a href="https://github.com/koppajs/koppajs-core">Koppajs Core</a>
		&middot;
		<a href="https://github.com/koppajs/koppajs-vite-plugin">Vite Plugin</a>
		&middot;
		<a href="https://github.com/koppajs/koppajs-example/issues">Issues</a>
	</p>
</div>

<br>

<details>
<summary>Table of Contents</summary>
	<ol>
		<li><a href="#what-is-this">What is this?</a></li>
		<li><a href="#requirements">Requirements</a></li>
		<li><a href="#getting-started">Getting Started</a></li>
		<li><a href="#project-structure">Project Structure</a></li>
		<li><a href="#community--contribution">Community & Contribution</a></li>
		<li><a href="#license">License</a></li>
	</ol>
</details>

---

## What is this?

This is the **official minimal starter template** for Koppajs.

It provides a clean, ready-to-run project with:

- a single app view with a counter component
- Vite as dev server and bundler
- TypeScript support
- zero unnecessary dependencies

Use it as a starting point for new Koppajs projects or as a reference for how components are registered and composed.

---

## Requirements

- Node.js >= 20
- pnpm

---

## Getting Started

**Install dependencies:**

```bash
pnpm install
```

**Start the dev server:**

```bash
pnpm dev
```

**Build for production:**

```bash
pnpm build
```

**Preview the production build:**

```bash
pnpm serve
```

---

## Project Structure

```
koppajs-example/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.mjs
├── public/
│   └── favicon.svg
└── src/
    ├── main.ts
    ├── style.css
    ├── app-view.kpa
    └── counter-component.kpa
```

---

## Community & Contribution

Issues and pull requests are welcome:

https://github.com/koppajs/koppajs-example/issues

---

## License

Apache License 2.0 — © 2025 Koppajs, Bastian Bensch
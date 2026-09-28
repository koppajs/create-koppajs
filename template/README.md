# __PROJECT_NAME__

KoppaJS starter project scaffolded with `create-koppajs`.

## Requirements

- Node.js >= 22.12.0

## Getting Started

Choose a package manager and use it consistently for this project:

| Package manager | Install | Start development server |
| --------------- | ------- | ------------------------ |
| pnpm | `pnpm install` | `pnpm dev` |
| npm | `npm install` | `npm run dev` |
| Yarn | `yarn install` | `yarn dev` |

The first install creates a lockfile for the package manager you chose; commit
that lockfile and avoid mixing lockfiles from different package managers.

## Scripts

Use your chosen package manager to run `build`, `typecheck`, and `serve` (for
example, `npm run build`, `pnpm build`, or `yarn build`).

## Project Structure

```text
__PROJECT_NAME__/
├── README.md
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.mjs
├── public/
│   ├── favicon.png
│   └── koppajs-logo.png
└── src/
    ├── app-view.kpa
    ├── counter-component.kpa
    ├── main.ts
    └── style.css
```

## Useful Links

- [KoppaJS documentation](https://github.com/koppajs/koppajs-documentation)
- [KoppaJS core](https://github.com/koppajs/koppajs-core)
- [KoppaJS Vite plugin](https://github.com/koppajs/koppajs-vite-plugin)

# __PROJECT_NAME__

KoppaJS router starter project scaffolded with `create-koppajs`.

## Requirements

- Node.js >= 22.12.0
- pnpm >= 10.24.0

## Getting Started

```bash
pnpm install
pnpm dev
```

## Scripts

```bash
pnpm build
pnpm typecheck
pnpm serve
```

## Routing

The starter wires `@koppajs/koppajs-router` in `src/main.ts`.

The route table contains:

- `/` -> `home-page`
- `/router` -> `router-page`
- `*` -> `not-found-page`

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
    ├── home-page.kpa
    ├── main.ts
    ├── not-found-page.kpa
    ├── router-page.kpa
    └── style.css
```

## Useful Links

- [KoppaJS documentation](https://github.com/koppajs/koppajs-documentation)
- [KoppaJS core](https://github.com/koppajs/koppajs-core)
- [KoppaJS router](https://github.com/koppajs/koppajs-router)
- [KoppaJS Vite plugin](https://github.com/koppajs/koppajs-vite-plugin)

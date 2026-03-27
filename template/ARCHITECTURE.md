# Architecture

This repository is a minimal KoppaJS application starter. It intentionally demonstrates a small end-to-end path: HTML shell, TypeScript bootstrap, a root KoppaJS view, and a single interactive child component. The repository also carries a small quality and release automation layer so the starter stays runnable, trustworthy, and maintainable as it evolves.

## System overview

- `index.html` provides the document shell, loads global CSS, declares the `<app-view>` root element, and imports the TypeScript entrypoint.
- `src/main.ts` imports `@koppajs/koppajs-core`, registers local components with `Core.take(...)`, and invokes `Core()` exactly once to bootstrap the app.
- `src/app-view.kpa` is the root UI shell. It arranges the page and composes the interactive example component.
- `src/counter-component.kpa` is the example stateful leaf component. It owns its own `count` state and button event handlers.
- `src/style.css` contains the global reset only.
- `public/` contains static assets referenced by the HTML shell or components.
- `vite.config.mjs` wires the KoppaJS Vite plugin into the build without local compatibility layers.
- `vitest.config.mjs` reuses the Vite config so integration tests exercise the same `.kpa` loading path as the application.
- `playwright.config.ts` runs a Chromium smoke test against `vite preview`, which keeps the minimal UI starter covered by one real browser path.
- `CHANGELOG.md` records official tagged milestones for the repository.
- `RELEASE.md` documents the maintainer release path across `develop`, `release/*`, and `main`.
- `commitlint.config.mjs` defines the repository's commit message convention.
- `.github/workflows/release.yml` reruns validation for `vX.Y.Z` tags, checks version alignment, and creates GitHub Releases.
- `tests/integration/` covers application bootstrap wiring without requiring a full browser run.
- `tests/e2e/` covers the observable starter flow in a real browser.
- `tsconfig.json` enforces strict TypeScript rules for source, tests, and TypeScript config files. `.kpa` compilation is still handled by the KoppaJS Vite plugin.

More detailed boundaries live in [docs/architecture/module-boundaries.md](./docs/architecture/module-boundaries.md).

## Runtime flow

1. The browser loads [`index.html`](./index.html).
2. The document loads [`src/style.css`](./src/style.css) and [`src/main.ts`](./src/main.ts).
3. [`src/main.ts`](./src/main.ts) registers `app-view` and `counter-component` with KoppaJS Core, then calls `Core()`.
4. KoppaJS instantiates `<app-view>`.
5. [`src/app-view.kpa`](./src/app-view.kpa) renders the starter shell and nests `<counter-component>`.
6. [`src/counter-component.kpa`](./src/counter-component.kpa) handles button clicks, mutates local state, and re-renders the displayed value.

## Quality automation layer

- `eslint.config.mjs` lint-checks TypeScript source plus the TypeScript- and JavaScript-based tooling files.
- `prettier.config.mjs` and `.editorconfig` keep supported text files consistent without introducing formatter-specific rules into ESLint.
- `.npmrc` enforces the declared engine floor during installs.
- `.husky/pre-commit` runs `lint-staged` so staged files get a fast local quality pass before commit.
- `.husky/commit-msg` validates commit headers with `commitlint`.
- `.github/workflows/ci.yml` runs the full repository validation flow on GitHub.
- `.github/workflows/release.yml` runs tagged release validation and creates GitHub Releases for matching versions.
- Stylelint is intentionally absent for now because the important styles live inside `.kpa` blocks and the repository does not yet have a low-friction, first-class way to lint those embedded blocks without giving a misleading sense of coverage.

## Module responsibilities

| Module                          | Responsibility                                                            | Must not do                                                           |
| ------------------------------- | ------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| `index.html`                    | Declare root tag and static assets                                        | Hold business logic or feature wiring                                 |
| `CHANGELOG.md`                  | Record official tagged release notes                                      | Become a scratchpad for speculative work or duplicate repository docs |
| `RELEASE.md`                    | Define the maintainer release procedure                                   | Drift away from actual branch, tag, or workflow behavior              |
| `commitlint.config.mjs`         | Define commit message validation rules                                    | Expand into unrelated repository lint policy                          |
| `src/main.ts`                   | Bootstrap and component registration                                      | Accumulate feature logic, state, or DOM manipulation                  |
| `src/app-view.kpa`              | Root layout and composition                                               | Own unrelated business workflows or register components               |
| `src/counter-component.kpa`     | Local interactive example state                                           | Reach into global DOM or mutate app shell concerns                    |
| `src/style.css`                 | Global reset/base rules                                                   | Contain feature-specific visuals that belong to components            |
| `public/`                       | Static assets                                                             | Store generated build output or source code                           |
| `tests/integration/`            | Wiring tests across bootstrap boundaries                                  | Full browser assertions already covered by Playwright                 |
| `tests/e2e/`                    | Real browser smoke coverage of the starter UI                             | Deep implementation-detail assertions or brittle CSS-driven flows     |
| `vite.config.mjs`               | Build and dev server integration through the upstream KoppaJS Vite plugin | Application runtime logic                                             |
| `vitest.config.mjs`             | Unit and integration test runner configuration                            | Runtime feature code                                                  |
| `playwright.config.ts`          | Browser smoke-test orchestration against preview output                   | Application runtime logic                                             |
| `.github/workflows/release.yml` | Tagged release validation and GitHub Release creation                     | Publish to npm while the repository remains private                   |

## Invariants

- There is exactly one application bootstrap path.
- The root tag in `index.html` must match a component registered in `src/main.ts`.
- `Core()` is called once from `src/main.ts`.
- Official releases require matching versions across `package.json`, `CHANGELOG.md`, and `vX.Y.Z` tags.
- Maintainer commits are expected to follow Conventional Commits.
- No routing, persistence, network calls, or global client-side state are part of the baseline starter.
- Stateful behavior remains local unless a documented new subsystem justifies centralization.
- `pnpm check` remains fast enough for routine local use.
- Playwright coverage stays focused on critical smoke coverage unless the UI grows into a broader workflow surface.
- The repository remains `private` until an explicit decision changes the release target.

## Extension guidance

- Add new components under `src/` and compose them from `app-view.kpa` or other components.
- Extract shared logic into `.ts` modules when it becomes reusable or deserves focused testing.
- Add a spec before introducing new user-visible behavior.
- Add an ADR before introducing architecture-changing capabilities such as routing, data fetching, persistence, state containers, SSR, or a new testing stack.

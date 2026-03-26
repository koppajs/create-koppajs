# Architecture

This repository is a small KoppaJS router starter. It demonstrates a clear
bootstrap path: HTML shell, TypeScript entrypoint, one root app shell
component, one router instance, two primary routes, and one explicit not-found
route. The repository also carries the same quality and release automation
baseline as the minimal starter so the example remains production-like.

## System overview

- `index.html` provides the document shell, loads global CSS, declares the
  `<app-view>` root element, and imports the TypeScript entrypoint.
- `src/main.ts` registers local components with `Core.take(...)`, calls
  `Core()` once, waits for the route outlet to exist, and initializes one
  `KoppajsRouter` instance.
- `src/app-view.kpa` is the root shell. It renders the hero area, the primary
  navigation, and the `#app-outlet` container that receives route content.
- `src/home-page.kpa` is the default route and composes `counter-component`.
- `src/router-page.kpa` is the second route and explains the router wiring.
- `src/not-found-page.kpa` is the explicit catch-all route.
- `src/counter-component.kpa` remains the example local-state component.
- `src/style.css` defines global tokens, base layout, and the background.
- `tests/integration/` verifies bootstrap wiring and router startup.
- `tests/e2e/` verifies the user-visible route flow and counter behavior.

More detailed boundaries live in [docs/architecture/module-boundaries.md](./docs/architecture/module-boundaries.md).

## Runtime flow

1. The browser loads [`index.html`](./index.html).
2. The document loads [`src/style.css`](./src/style.css) and [`src/main.ts`](./src/main.ts).
3. [`src/main.ts`](./src/main.ts) registers `app-view`, `home-page`,
   `router-page`, `not-found-page`, and `counter-component`, then calls
   `Core()`.
4. KoppaJS instantiates `<app-view>`.
5. [`src/app-view.kpa`](./src/app-view.kpa) renders the app shell, navigation,
   and `#app-outlet`.
6. `src/main.ts` initializes `KoppajsRouter` with the route table and outlet.
7. The router renders the matching route component into `#app-outlet`,
   synchronizes active links, and updates the current browser URL.

## Quality automation layer

- `eslint.config.mjs` lint-checks TypeScript source plus tooling files.
- `prettier.config.mjs` and `.editorconfig` keep supported text files consistent.
- `.npmrc` enforces the declared engine floor during installs.
- `.husky/pre-commit` runs `lint-staged`.
- `.husky/commit-msg` validates commit headers with `commitlint`.
- `.github/workflows/ci.yml` runs the full repository validation flow on GitHub.
- `.github/workflows/release.yml` runs tagged release validation and creates GitHub Releases.

## Module responsibilities

| Module                      | Responsibility                                                   | Must not do                                            |
| --------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------ |
| `index.html`                | Declare the root tag and static assets                           | Hold feature logic or router setup                     |
| `src/main.ts`               | Bootstrap the app, register components, and start one router     | Accumulate page copy or unrelated UI state             |
| `src/app-view.kpa`          | Render the shared shell, nav, and router outlet                  | Own route resolution or register components            |
| `src/home-page.kpa`         | Render the landing route and compose the counter example         | Reach into router internals or mutate global DOM state |
| `src/router-page.kpa`       | Render the second route and explain the router baseline          | Own bootstrap logic or global navigation state         |
| `src/not-found-page.kpa`    | Render the explicit fallback route                               | Replace route matching or bootstrap responsibilities   |
| `src/counter-component.kpa` | Demonstrate local interactive state                              | Reach into route orchestration or app-shell concerns   |
| `src/style.css`             | Hold global tokens and truly global base styles                  | Duplicate component-local visuals                      |
| `tests/integration/`        | Verify bootstrap and router-start boundaries                     | Duplicate full browser smoke expectations              |
| `tests/e2e/`                | Verify visible navigation and counter behavior in a real browser | Assert brittle implementation details                  |

## Invariants

- There is exactly one bootstrap entrypoint.
- The root tag in `index.html` must match a component registered in `src/main.ts`.
- `Core()` is called once from `src/main.ts`.
- The starter owns exactly one router instance.
- The route table contains an explicit `*` fallback route.
- Route rendering happens through `#app-outlet`.
- Official releases require matching versions across `package.json`,
  `CHANGELOG.md`, and `vX.Y.Z` tags.

## Extension guidance

- Add new route components under `src/` and register them from `src/main.ts`.
- Keep route definitions in one obvious place.
- Extract reusable route helpers into `.ts` modules only when logic becomes
  shared or branch-heavy.
- Add a spec before changing visible navigation behavior.
- Add an ADR before changing the routing model, adding data fetching,
  persistence, or another major subsystem.

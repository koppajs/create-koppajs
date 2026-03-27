# Module Boundaries

## Repository boundary model

This repository is intentionally shallow. Its boundaries are designed to keep the starter easy to understand.

| Path                            | Responsibility                                                            | Allowed dependencies                               | Must not depend on                                                |
| ------------------------------- | ------------------------------------------------------------------------- | -------------------------------------------------- | ----------------------------------------------------------------- |
| `index.html`                    | Document shell, root element, asset references                            | Static assets, `src/main.ts`, `src/style.css`      | Feature logic, extra scripts, framework-specific behavior         |
| `CHANGELOG.md`                  | Tagged release history                                                    | Release notes, versioned milestones                | Unreleased planning notes or unrelated contributor guidance       |
| `RELEASE.md`                    | Maintainer release procedure                                              | `package.json`, `CHANGELOG.md`, GitHub workflows   | Runtime code or undocumented branch conventions                   |
| `commitlint.config.mjs`         | Commit message rules                                                      | Conventional commit policy                         | Source-code linting or release branching rules                    |
| `src/main.ts`                   | Application bootstrap and component registration                          | `@koppajs/koppajs-core`, local `.kpa` modules      | UI business logic, ad hoc DOM manipulation, network code          |
| `src/app-view.kpa`              | Root page layout and composition                                          | Local markup, local CSS, child components          | Global bootstrap concerns, unrelated feature orchestration        |
| `src/counter-component.kpa`     | Example local state and interaction                                       | Local markup, local methods, local CSS             | Shared infrastructure, global state, direct root DOM coordination |
| `src/style.css`                 | Global reset and truly global base rules                                  | Standard CSS                                       | Component-specific visual rules                                   |
| `public/`                       | Static assets served as-is                                                | Static files only                                  | Source code or generated artifacts                                |
| `tests/integration/`            | Bootstrap and boundary-level integration tests                            | Vitest, local modules, selective mocks             | Browser-only smoke assertions                                     |
| `tests/e2e/`                    | Real-browser smoke coverage                                               | Playwright, preview server                         | Implementation-detail assertions                                  |
| `vite.config.mjs`               | Build and dev server integration through the upstream KoppaJS Vite plugin | Vite and the KoppaJS Vite plugin                   | Application runtime logic                                         |
| `vitest.config.mjs`             | Vitest orchestration merged with the Vite config                          | Vitest and Vite config                             | Application runtime logic                                         |
| `playwright.config.ts`          | Playwright orchestration against preview output                           | Playwright and preview server script               | Application runtime logic                                         |
| `.github/workflows/release.yml` | Tag-triggered validation and GitHub Release creation                      | GitHub Actions, `package.json`, validation scripts | npm publishing while `package.json` is `private`                  |
| `tsconfig.json`                 | TypeScript compiler behavior for source, tests, and TS config files       | TypeScript compiler options                        | Application runtime logic                                         |

## Boundary rules

- Registration happens in `src/main.ts`, not inside component modules.
- `app-view.kpa` may compose child components but should not become a global state hub by accident.
- Component-local behavior stays inside the component until reuse or complexity makes extraction worthwhile.
- Shared logic, once introduced, belongs in dedicated `.ts` modules with tests when justified.
- Vitest owns helper-level and bootstrap-level confidence; Playwright owns browser smoke confidence.
- Pre-commit checks stay limited to staged-file hygiene. Heavy validation belongs to `pnpm validate` and CI.
- Commit-message validation lives in `.husky/commit-msg` and `commitlint.config.mjs`, not in ad hoc contributor lore.
- Release metadata stays aligned across `package.json`, `CHANGELOG.md`, `RELEASE.md`, and `.github/workflows/release.yml`.

## Escalation rules

Before crossing existing boundaries, add a spec and ADR if the change introduces:

- routing,
- shared state,
- async workflows,
- persistence,
- more than one root entrypoint,
- npm publishing or deployment automation,
- new top-level source folders.

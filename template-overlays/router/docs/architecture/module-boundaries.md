# Module Boundaries

## Repository boundary model

This repository is intentionally shallow. Its boundaries keep the starter easy to inspect.

| Path                        | Responsibility                                                    | Allowed dependencies                                                     | Must not depend on                                  |
| --------------------------- | ----------------------------------------------------------------- | ------------------------------------------------------------------------ | --------------------------------------------------- |
| `index.html`                | Document shell, root element, asset references                    | Static assets, `src/main.ts`, `src/style.css`                            | Feature logic, router setup, extra scripts          |
| `src/main.ts`               | Application bootstrap, component registration, and router startup | `@koppajs/koppajs-core`, `@koppajs/koppajs-router`, local `.kpa` modules | Page copy, route component visuals, unrelated state |
| `src/app-view.kpa`          | Shared shell, primary navigation, and route outlet                | Local markup, local CSS                                                  | Route matching, component registration              |
| `src/home-page.kpa`         | Landing-route content and counter composition                     | Local markup, local CSS, `counter-component`                             | Router setup or global shell orchestration          |
| `src/router-page.kpa`       | Second-route content                                              | Local markup and local CSS                                               | Bootstrap or route resolution concerns              |
| `src/not-found-page.kpa`    | Explicit fallback-route content                                   | Local markup and local CSS                                               | Route matching rules or global state                |
| `src/counter-component.kpa` | Example local state and interaction                               | Local markup, local methods, local CSS                                   | Route orchestration or app-shell concerns           |
| `src/style.css`             | Global tokens and truly global base rules                         | Standard CSS                                                             | Route-specific or component-specific visual rules   |
| `tests/integration/`        | Bootstrap and router boundary verification                        | Vitest, local modules, selective mocks                                   | Browser-only smoke assertions                       |
| `tests/e2e/`                | Real-browser smoke coverage                                       | Playwright, preview server                                               | Implementation-detail assertions                    |
| `vite.config.mjs`           | Build and dev server integration                                  | Vite and the KoppaJS Vite plugin                                         | Application runtime logic                           |

## Boundary rules

- Registration and route configuration happen in `src/main.ts`.
- `app-view.kpa` may compose navigation and the outlet but must not become a second router.
- Route components own their own copy and layout.
- Shared logic belongs in dedicated `.ts` modules once reuse or complexity justifies it.
- Vitest owns helper-level and bootstrap-level confidence; Playwright owns browser smoke confidence.

## Escalation rules

Before crossing existing boundaries, add a spec and ADR if the change introduces:

- nested or parameterized routing beyond the current baseline,
- shared state,
- async workflows,
- persistence,
- more than one root entrypoint,
- npm publishing or deployment automation,
- new top-level source folders.

# Development Rules

## Scope

These rules describe how code and documentation are expected to evolve in this repository.

## Source layout rules

- Keep `index.html` as a static shell with asset references and the single root element.
- Keep `src/main.ts` limited to bootstrap concerns: imports, `Core.take(...)`
  registrations, route definitions, and initialization of the single router instance.
- Use `.kpa` files for UI composition, local component state, and component-scoped CSS.
- Keep the route outlet inside `app-view.kpa` and keep route rendering consumer-owned.
- If logic becomes reusable, asynchronous, or branch-heavy, move it into `.ts` modules under `src/`.
- Keep `public/` for static assets only.

## Naming conventions

- Custom element names must be kebab-case.
- Root-level application components should use `app-` prefixes when they represent app shells or app-wide structure.
- Route component filenames should match their registered component tags or route purpose.
- New files and folders should use descriptive names over abbreviations.

## Dependency rules

- Runtime dependencies must be justified by a concrete need in a spec or ADR.
- Prefer browser APIs and KoppaJS primitives before adding helper libraries.
- Keep this repository wired to published npm packages unless there is an explicit ADR stating otherwise.
- Build tooling changes must update contributor docs and architecture docs in the same change.
- Quality tooling must stay proportionate to the starter.

## Coding patterns

- Favor simple, local state over premature abstraction.
- Keep route definitions obvious and close to router initialization.
- Avoid hidden side effects during import.
- Keep CSS local to components unless the style truly applies application-wide.
- Preserve strict TypeScript settings; do not weaken `tsconfig.json` to work around errors.
- Give interactive controls stable accessible names so smoke tests can target public semantics instead of brittle selectors.

## Forbidden without a spec and ADR

- Replacing the starter's single-router model with a second navigation system
- Adding global state containers
- Adding network or persistence layers
- Introducing SSR, multi-page bootstraps, or multiple root entries
- Switching dependency sourcing from npm packages to local monorepo links
- Expanding the starter into a feature-rich demo application
- Adding heavyweight hooks that run the entire suite on every commit

## Documentation obligations

- Update [ARCHITECTURE.md](./ARCHITECTURE.md) when source layout or runtime flow changes.
- Update [TESTING_STRATEGY.md](./TESTING_STRATEGY.md) when quality gates or tooling change.
- Update or create a spec in [docs/specs](./docs/specs) for user-visible changes.
- Add an ADR in [docs/adr](./docs/adr) for durable technical decisions.
- Update [docs/quality/quality-gates.md](./docs/quality/quality-gates.md) when scripts, hooks, CI checks, or browser-smoke expectations change.

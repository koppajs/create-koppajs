# Testing Strategy

## Current state

This repository carries a small automated testing stack aligned with the router starter's actual risk profile:

- `pnpm test:run` for unit and integration tests in Vitest
- `pnpm test:coverage` for local coverage reporting
- `pnpm test:e2e` for a Playwright smoke test against `vite preview`
- `pnpm check` for the fast repository baseline
- `pnpm validate` for the full local and CI validation path
- `pnpm release:check` for tagged release candidates
- `commitlint` through `.husky/commit-msg` for commit message validation

## Philosophy

- Test the smallest meaningful unit that gives confidence.
- Prefer extracting logic into `.ts` modules when it becomes complex enough to warrant focused unit tests.
- Avoid brittle tests that mirror implementation details instead of observable behavior.
- Reuse the real Vite loading path in automated tests whenever `.kpa` handling is part of the risk surface.

## Test pyramid for this repository

### Unit tests

Use unit tests for isolated logic that can fail independently of the browser runtime.

### Integration or component tests

Use integration tests when bootstrap, component registration, and router startup
must be verified together but a full browser run would be disproportionate.

Typical triggers:

- bootstrap registration in `src/main.ts`
- router startup wiring and route table shape
- build-time behavior that depends on the Vite plugin

### End-to-end tests

Keep Playwright intentionally user-facing and smoke-level.

Typical triggers:

- root UI rendering
- route navigation between starter pages
- critical starter interactions such as the counter behavior
- preview/build regressions that would not be caught by Vitest alone

## Coverage expectations

- There is no blanket repository percentage target right now.
- New non-trivial logic should come with focused tests.
- When a subsystem introduces more branching logic, async behavior, or shared state, test automation stops being optional.

## Quality gates by change size

- Documentation-only change: verify links and document consistency.
- Small style or copy change: run `pnpm check`.
- Source or config change: run `pnpm check`.
- UI, bootstrap, or browser-sensitive change: run `pnpm validate`.
- Version, changelog, or release workflow change: run `pnpm release:check`.

## Maintenance rule

Whenever test tooling, quality gates, or expected confidence levels change,
update this file and [docs/quality/quality-gates.md](./docs/quality/quality-gates.md) in the same change.

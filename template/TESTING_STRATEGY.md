# Testing Strategy

## Current state

This repository now has a small automated testing stack aligned with the actual starter risk profile:

- `pnpm test:run` for unit and integration tests in Vitest
- `pnpm test:coverage` for local coverage reporting
- `pnpm test:e2e` for a Playwright smoke test against `vite preview`
- `pnpm check` for the fast repository baseline
- `pnpm validate` for the full local and CI validation path
- `pnpm release:check` for tagged release candidates
- `commitlint` through `.husky/commit-msg` for commit message validation
- `pnpm typecheck`
- `pnpm build`

## Philosophy

- Test the smallest meaningful unit that gives confidence.
- Prefer extracting logic into `.ts` modules when it becomes complex enough to warrant focused unit tests.
- Add test infrastructure only when the repository's behavior justifies it; do not add tools for ceremony alone.
- Avoid brittle tests that mirror implementation details instead of observable behavior.
- Reuse the real Vite loading path in automated tests whenever `.kpa` handling is part of the risk surface.

## Test pyramid for this repository

### Unit tests

Use unit tests for isolated logic that can fail independently of the browser runtime. Today that includes the repo-local `.kpa` export normalization helper in `vite.config.mjs`.

Typical triggers:

- value transformations
- branching business rules
- reusable helpers
- local tooling helpers

### Integration or component tests

Use integration tests when multiple local boundaries must be verified together but a full browser run would be disproportionate.

Typical triggers:

- bootstrap registration in `src/main.ts`
- build-time behavior that depends on the Vite plugin
- shared state or lifecycle interactions that are not yet broad enough for end-to-end coverage

### End-to-end tests

This repository has a real interactive UI, so it carries one Playwright smoke test already. Keep that layer intentionally small and user-facing.

Typical triggers:

- root UI rendering
- critical starter interactions such as the counter behavior
- preview/build regressions that would not be caught by Vitest alone

Escalate E2E coverage beyond smoke scope only when the starter gains broader workflows such as routing, async data flows, persistence, or deployment-sensitive behavior.

## Mocking policy

- Prefer testing pure extracted logic without mocks.
- Mock only at external boundaries such as HTTP, storage, or browser APIs that are expensive or nondeterministic.
- Use selective mocks in integration tests only to observe bootstrap boundaries that would otherwise be opaque.

## Coverage expectations

- There is no blanket repository percentage target right now.
- New non-trivial logic should come with focused tests.
- When a subsystem introduces branching logic, asynchronous behavior, or state shared across components, test automation stops being optional.
- Coverage reports are a decision aid, not a target game. Raise thresholds only when the code surface justifies them.

## Quality gates by change size

- Documentation-only change: verify links and document consistency.
- Small style or copy change: run `pnpm check`.
- Source or config change: run `pnpm check`.
- UI, bootstrap, or browser-sensitive change: run `pnpm validate`.
- Version, changelog, or release workflow change: run `pnpm release:check`.
- Commit convention change: validate `commitlint.config.mjs` and `.husky/commit-msg` together.
- New subsystem or new state model: add tests appropriate to the risk level and update this strategy.

## Style linting position

Stylelint is intentionally not part of the current baseline.

- The meaningful styling surface lives inside `.kpa` files.
- Adding Stylelint only for `src/style.css` would mostly lint the global reset and miss the component-local styles that matter.
- Revisit this decision only when KoppaJS gains a low-friction way to lint embedded `.kpa` CSS blocks or when the repository starts moving substantial styles into standalone CSS files.

## Maintenance rule

Whenever test tooling, quality gates, or expected confidence levels change, update this file and [docs/quality/quality-gates.md](./docs/quality/quality-gates.md) in the same change.

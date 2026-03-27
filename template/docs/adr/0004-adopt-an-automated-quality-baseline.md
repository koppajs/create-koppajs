# ADR 0004: Adopt an automated quality baseline

## Context

The repository already had a living meta layer and a real interactive UI, but its practical quality gates were still limited to `pnpm typecheck`, `pnpm build`, and manual smoke testing. That left bootstrap wiring and browser-visible starter behavior exposed to easy regression.

## Decision

Adopt a proportional automated quality baseline for the starter:

- ESLint for TypeScript source and tooling files,
- Prettier and `.editorconfig` for supported text formats,
- Vitest for unit and integration coverage of local tooling and bootstrap behavior,
- Playwright for one Chromium smoke path against `vite preview`,
- Husky and lint-staged for fast staged-file checks,
- GitHub Actions CI that runs the same validation flow as local contributors.

Do not add Stylelint yet. The meaningful styles live inside `.kpa` blocks, and a CSS-file-only lint setup would give false confidence while adding maintenance overhead.

## Consequences

- The starter gets repeatable local and CI validation without inflating the runtime architecture.
- Browser-visible regressions are caught automatically instead of relying only on manual smoke tests.
- Contributors have a clearer script contract: `check` for the fast baseline and `validate` for the full suite.
- Future maintainers must keep the test, hook, CI, and documentation layers aligned when the quality stack changes.
- Stylelint remains an explicit future decision instead of an accidental omission.

## Alternatives considered

- Staying on `typecheck + build + manual smoke test`
- Adding a heavier test and lint stack, including Stylelint, before the repository has enough surface area to justify it

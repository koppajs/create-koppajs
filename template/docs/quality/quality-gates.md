# Quality Gates

## Baseline gates

For the current repository scope, the baseline gates are:

- staged files: `lint-staged` via `.husky/pre-commit`
- commit messages: `commitlint` via `.husky/commit-msg`
- fast local repository check: `pnpm check`
- full repository validation: `pnpm validate`
- release candidate verification: `pnpm release:check`
- `pnpm typecheck`
- `pnpm build`
- `pnpm test:run`
- `pnpm test:e2e` for UI, bootstrap, or preview-sensitive changes
- tagged release automation: `.github/workflows/release.yml` reruns validation and checks tag/version alignment

## Gate escalation rules

Raise the quality bar when the repository grows:

- New extracted logic modules: add unit tests.
- Multi-component behavior: add integration or component tests.
- Routing, async workflows, persistence, or deployment-sensitive behavior: expand end-to-end coverage beyond the current smoke scope.
- If component-local `.kpa` styling grows more complex and a credible linting path appears, revisit the current decision to omit Stylelint.

## Review checklist

- Do setup instructions still work from a clean checkout?
- Does the documented architecture still match the code layout?
- Do specs still match observable behavior?
- Are current quality gates enough for the newest change?
- Do `CHANGELOG.md`, `RELEASE.md`, and the release workflow still agree on the release path?
- Do commit message rules and contributor examples still match `commitlint.config.mjs`?
- Are hooks still fast enough to help rather than hinder contributors?

## Ownership rule

Anyone changing code, tooling, or workflow is responsible for updating the quality gates if the risk profile changes.

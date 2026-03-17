# Spec: Quality workflow

## Status

Approved

## Purpose

Keep the starter's tooling, tests, and contributor workflow consistent enough that regressions are caught early without turning a minimal example into a heavyweight platform.

## Behavior

- The repository exposes a fast local validation path through `pnpm check`.
- The repository exposes a fuller validation path through `pnpm validate`, which adds a real-browser smoke test.
- Staged files run through a fast `lint-staged` pre-commit hook.
- Commit messages are validated by `commitlint` in a `commit-msg` hook.
- Source, config, and test changes are checked by ESLint, Prettier, TypeScript, and Vitest.
- The real UI smoke path is checked by Playwright against `vite preview`.
- CI runs the same full validation flow as local contributors.
- Tagged releases rerun the full validation flow and verify tag/version alignment before a GitHub Release is created.
- Stylelint is intentionally absent until the repository has a credible way to lint embedded `.kpa` CSS without covering only the least relevant styling surface.

## Inputs

- Source, config, test, and documentation changes
- Staged files at commit time
- Commit messages at commit time
- Pull requests and pushes that trigger CI
- Version, changelog, and tag pushes that trigger the release workflow

## Outputs

- Consistent formatting on supported file types
- Conventional commit history for maintainable review and release preparation
- Type-safe source and TypeScript tooling files
- Automated confidence for the `.kpa` export workaround, bootstrap wiring, and the starter UI smoke path
- A guarded GitHub release path that fails when the pushed tag does not match `package.json`
- Fast feedback before commit and in CI

## Constraints

- Hooks must stay fast enough for normal local use.
- Playwright coverage must remain focused on smoke-level user journeys until the UI surface grows.
- Tooling should stay aligned with the starter's actual risk profile rather than generic best-practice checklists.
- Release automation must stay consistent with the repository remaining `private`; it may create GitHub Releases but must not imply npm publishing.
- Commit rules should stay simple enough that contributors can apply them without release tooling knowledge.

## Edge cases

- If browser binaries are not installed locally, contributors must install Chromium before running `pnpm test:e2e` or `pnpm validate`.
- If Stylelint is introduced later, it must cover the meaningful styling surface rather than only `src/style.css`.
- If the UI grows beyond a simple smoke surface, expand Playwright coverage deliberately and update this spec.
- If a pushed tag does not match `package.json`, the release workflow must fail before creating a release artifact.
- Auto-generated merge, revert, `fixup!`, and `squash!` commits may be exempted by the hook logic.

## Acceptance criteria

- `pnpm check` runs lint, format verification, type checking, Vitest, and build successfully on a clean checkout.
- `pnpm validate` reuses the built output to run the Playwright smoke test successfully.
- A commit with a staged lint or formatting error is blocked by the pre-commit hook.
- A non-conventional commit message is blocked by the `commit-msg` hook.
- A pushed `vX.Y.Z` tag is rejected by release automation when `package.json` contains a different version.

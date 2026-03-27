# AI Workflow Instructions

This file is for AI contributors and code assistants working in this
repository.

## Read First

Before editing code or workflows, read:

1. `DECISION_HIERARCHY.md`
2. `AI_CONSTITUTION.md`
3. `ARCHITECTURE.md`
4. the relevant file in `docs/specs/`
5. the relevant ADRs in `docs/adr/`
6. `CHANGELOG.md` and `RELEASE.md` for release-related work

## Working Rules

- Do not silently change the CLI contract or template structure.
- Prefer the current repository pattern of explicit helper functions and direct
  file copying.
- Keep the root package dependency-light unless a documented ADR justifies more.
- Treat `template/` as shipped product surface.
- Update docs in the same change when behavior, architecture, or process
  changes.
- If you introduce a new lasting technical direction, add an ADR.

## Verification Rules

- Run `pnpm run check` for normal repository changes.
- Run `pnpm run validate` when template files, template dependencies, publish
  payload, generated build configuration, or release workflow behavior changes.
- Use `pnpm run test:template-build` or `pnpm run test:package` directly only
  when you are narrowing a failure inside the full validation flow.
- For CLI or template behavior changes, update the spec first or in the same
  change.
- If you create commits, use Conventional Commits that satisfy `commitlint`.
- When the meta layer becomes outdated, fix it before considering the task
  complete.

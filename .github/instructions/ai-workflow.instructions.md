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

- Run `npm run check` for normal repository changes.
- Run `npm run test:template-build` when template files, template dependencies,
  or generated build configuration changes.
- Run `npm run release:check` when versioning, changelog, release workflow, or
  published-template release guarantees change.
- For CLI or template behavior changes, update the spec first or in the same
  change.
- If you create commits, use Conventional Commits that satisfy `commitlint`.
- When the meta layer becomes outdated, fix it before considering the task
  complete.

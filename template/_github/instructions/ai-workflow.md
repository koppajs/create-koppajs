# AI Workflow Instructions

## Read before editing

For any non-trivial change, read these documents in order:

1. `DECISION_HIERARCHY.md`
2. `AI_CONSTITUTION.md`
3. `ARCHITECTURE.md`
4. the relevant spec in `docs/specs/`
5. the relevant ADR in `docs/adr/`
6. `DEVELOPMENT_RULES.md`
7. `TESTING_STRATEGY.md`

For release-related work also read `CHANGELOG.md` and `RELEASE.md`.

## Required behavior

- Prefer existing repository patterns over new abstractions.
- Do not silently change public component tags, startup flow, or dependency sourcing.
- Use `spec -> quality plan -> implementation -> documentation`.
- Update the meta layer in the same change when architecture, rules, or workflows change.
- Record durable technical decisions in ADRs.
- Keep hooks fast and put heavier validation into `pnpm validate` and CI.
- If versioning, changelog, or release automation changes, update `CHANGELOG.md`, `RELEASE.md`, and the affected workflow in the same change.
- If you create commits, use Conventional Commits that satisfy `commitlint`.

## Required validation

- Run `pnpm check` for source, config, test, or tooling changes.
- Run `pnpm validate` when UI behavior, bootstrap wiring, browser-facing assets, or quality tooling changes.
- Run `pnpm release:check` when versioning, changelog, or release workflow behavior changes.
- If a local browser check cannot be run, say so explicitly instead of implying it passed.

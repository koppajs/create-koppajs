# ADR 0006: Adopt commit message conventions

## Context

The repository now has staged-file checks, CI validation, and a documented
release process, but commit history still had no enforced structure.

That makes release review, changelog preparation, and future maintenance harder
than necessary, especially for an official starter that should model a clear
workflow for contributors.

`koppajs-core` already enforces conventional commit messages with `commitlint`.
The same baseline is appropriate here because it adds little overhead while
improving traceability.

## Decision

Adopt Conventional Commits enforcement through `commitlint`:

- add `@commitlint/cli` and `@commitlint/config-conventional`,
- validate commit messages in `.husky/commit-msg`,
- keep the rule set intentionally small,
- enforce a maximum header length of 72 characters,
- allow the existing fast `pre-commit` hook to stay focused on staged files.

## Consequences

- Contributors now need to use structured commit headers such as
  `feat: add release workflow` or `docs: update quality workflow`.
- Invalid commit messages are rejected before the commit is created.
- The repository gains a cleaner history for release review and maintenance.
- If the project later needs custom commit types or scopes, the change should go
  through `commitlint.config.mjs` and matching documentation updates.

## Alternatives considered

- Keeping commit messages informal
- Enforcing commit conventions only socially without a hook
- Adding heavier release automation before stabilizing the commit baseline

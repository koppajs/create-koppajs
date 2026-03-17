# ADR 0005: Adopt Commit Message Conventions

## Status

Accepted

## Context

`create-koppajs` now carries a stronger release baseline, a living meta layer,
and a bundled starter that mirrors the current official `koppajs-example`
quality posture. That makes release review and changelog preparation easier
when commit history stays structured as well.

`koppajs-core` already enforces Conventional Commits with `commitlint`. The
same baseline is appropriate here because it improves traceability with little
runtime impact on the scaffolder itself.

## Decision

Adopt Conventional Commit validation through `commitlint`:

- add `@commitlint/cli` and `@commitlint/config-conventional`
- validate commit messages in `.husky/commit-msg`
- keep the rule set intentionally small
- enforce a maximum header length of 72 characters
- keep `pre-commit` focused on fast staged-file checks only

## Consequences

- Contributors now need structured commit headers such as
  `feat: align starter template` or `docs: update release workflow`.
- Invalid commit messages are rejected before the commit is created when hooks
  are installed.
- Release review and maintenance gain a more searchable history.
- If custom commit types or scopes become necessary later, the change must be
  made through `commitlint.config.mjs` and matching documentation updates.

## Alternatives considered

- Keeping commit messages informal
- Enforcing commit conventions only socially without a hook
- Adding heavier release automation before stabilizing commit history

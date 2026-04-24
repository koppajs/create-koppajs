# ADR 0007: Keep Generated Starters Lean

## Status

Accepted

## Context

The generated `minimal` and `router` starters had inherited repository
governance, release, hook, workflow, ADR, changelog, and lockfile artifacts from
the scaffolder's own maintenance baseline. That made `pnpm create koppajs
my-app` produce a new application repository with files that belong to
`create-koppajs` maintainers, not necessarily to every application author.

The CLI already treats `template/` and `template-overlays/` as the source of
truth for generated output, so template contents must be intentionally scoped.

## Decision

Generated starters should stay focused on a runnable KoppaJS application:

- app source, Vite, TypeScript, and KoppaJS configuration
- starter README and package manifest

Generated starters must not include scaffolder governance files, GitHub
workflows, Git hooks, commitlint or lint-staged setup, changelog or release
files, ADR/spec documentation trees, pre-generated lockfiles, lint tooling,
format tooling, test tooling, or starter tests.

The CLI patches only generated `package.json` and `README.md`.

## Consequences

- New applications start with fewer repository-policy assumptions.
- The generated file tree is easier to inspect and maintain.
- Applications can add their own CI, release, hook, and governance systems when
  they need them.
- Template build validation now installs without a checked-in starter lockfile
  and validates `pnpm build`.

## Alternatives Considered

- Keep the existing governance-heavy starter and document why the extra files
  are present.
- Add a new `lean` starter while keeping the current default unchanged.
- Keep the extra files in `template/` but exclude them in CLI copy logic.

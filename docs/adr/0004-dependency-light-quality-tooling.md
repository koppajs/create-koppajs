# ADR 0004: Repository Quality Tooling Stays Dependency-Light

## Status

Accepted

## Context

`create-koppajs` is a small CLI repository whose root package intentionally
avoids runtime and development dependency sprawl. The main risks are broken CLI
behavior, stale governance docs, packaging mistakes, and generated-template
regressions.

Many common tools such as ESLint, Prettier, Playwright, Stylelint, or Husky can
be valuable in larger applications, but each would add setup and maintenance
cost. For this repository, that cost needs to be justified by real project
surface area rather than habit.

## Decision

Use Node.js built-ins and small repository scripts as the primary quality
stack:

- `node --check` for syntax validation
- `node:test` for unit and helper-level integration tests
- real filesystem smoke tests for CLI contract validation
- generated-template build verification for starter buildability
- `npm pack --dry-run` for publish-surface validation
- small repository scripts for meta-layer guards and formatting hygiene

Do not add Playwright, Stylelint, Husky, lint-staged, ESLint, or Prettier
unless the repository grows enough that the benefit clearly exceeds the added
tooling weight.

## Consequences

- Local and CI checks stay available without first installing root dependencies.
- The quality stack remains easy to understand and maintain.
- The project relies more on focused contract tests and explicit docs than on
  broad generic rule sets.
- If the repository surface grows, the team must revisit this decision
  deliberately rather than accreting tools by default.

## Alternatives considered

- Adopt a standard modern frontend/tooling stack immediately
- Add only formatting tools while leaving tests unchanged
- Keep the previous minimal checks without expanding unit or build validation

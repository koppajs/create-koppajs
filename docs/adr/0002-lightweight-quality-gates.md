# ADR 0002: Lightweight Quality Gates Protect The CLI Contract

## Status

Accepted

## Context

The repository is intentionally small. Its primary risks are broken CLI
execution, incorrect generated files, and release mistakes. A heavy test stack
would add maintenance cost without clearly improving confidence at the current
size.

## Decision

Use a lightweight quality model based on:

- presence checks for required meta-layer source-of-truth files
- syntax validation of the shipped CLI entry
- direct checks for `--help` and `--version`
- a smoke test that scaffolds a project and validates critical outputs
- CI execution on Node.js 20 and 22

## Consequences

- Feedback stays fast and the toolchain remains simple.
- Quality gates focus on user-visible behavior instead of implementation
  details.
- The repository also protects against deleting its core governance docs by
  accident.
- Some edge cases may still require additional tests as the CLI grows.
- Template buildability is not currently automated and must be reviewed when
  template risk increases.

## Alternatives considered

- Add a full test framework immediately with broad unit coverage
- Rely only on manual testing before release
- Use snapshot-only tests for the generated project output

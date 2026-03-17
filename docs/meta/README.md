# Meta Layer Guide

## Purpose

The meta layer is the repository's architecture memory and governance system.
It explains how `create-koppajs` is built, how decisions are recorded, and how
humans and AI contributors are expected to work.

## Reading Order

1. [../../DECISION_HIERARCHY.md](../../DECISION_HIERARCHY.md)
2. [../../AI_CONSTITUTION.md](../../AI_CONSTITUTION.md)
3. [../../ARCHITECTURE.md](../../ARCHITECTURE.md)
4. [../../RELEASE.md](../../RELEASE.md) for release-path work
5. [../../DEVELOPMENT_RULES.md](../../DEVELOPMENT_RULES.md)
6. [../../TESTING_STRATEGY.md](../../TESTING_STRATEGY.md)
7. [../architecture/module-boundaries.md](../architecture/module-boundaries.md)
8. [../quality/quality-gates.md](../quality/quality-gates.md)
9. [../quality/tooling-baseline.md](../quality/tooling-baseline.md)
10. [../specs/README.md](../specs/README.md)
11. [../adr/README.md](../adr/README.md)

## What Lives Where

- Root documents define repository-wide rules and priorities.
- `docs/architecture/` stores deeper structural maps and invariants.
- `docs/adr/` stores decision records for meaningful technical choices.
- `docs/specs/` stores behavioral source-of-truth documents.
- `docs/quality/` stores quality gates and verification expectations.

## Maintenance Rule

The meta layer must be updated in the same change as the code or workflow it
describes. If a contributor cannot point to the document that governs a change,
the meta layer is incomplete and must be extended.

See [change-triggers.md](./change-triggers.md) for the required update matrix.

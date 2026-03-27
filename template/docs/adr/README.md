# Architecture Decision Records

This directory stores durable architectural and workflow decisions.

## When to write an ADR

Write an ADR when a change:

- changes repository structure,
- introduces or removes a subsystem,
- changes dependency sourcing or build tooling,
- changes public starter behavior in a lasting way,
- adds a new rule that future contributors must follow.

## Format

Use [`TEMPLATE.md`](./TEMPLATE.md). Every ADR must contain:

- Context
- Decision
- Consequences
- Alternatives considered

## Naming

- Prefix files with a four-digit sequence number.
- Use a short kebab-case slug.
- Never rewrite history silently; supersede older ADRs with new ones when decisions change.

## Current ADRs

- [`0001-keep-the-starter-minimal.md`](./0001-keep-the-starter-minimal.md)
- [`0002-adopt-a-living-meta-layer.md`](./0002-adopt-a-living-meta-layer.md)
- [`0003-rely-on-upstream-kpa-es-module-output.md`](./0003-rely-on-upstream-kpa-es-module-output.md)
- [`0004-adopt-an-automated-quality-baseline.md`](./0004-adopt-an-automated-quality-baseline.md)
- [`0005-adopt-a-tag-driven-release-baseline.md`](./0005-adopt-a-tag-driven-release-baseline.md)
- [`0006-adopt-commit-message-conventions.md`](./0006-adopt-commit-message-conventions.md)

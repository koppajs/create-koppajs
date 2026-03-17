# Decision Hierarchy

When repository documents conflict, use this order of precedence.

1. Approved specifications in [`docs/specs/`](./docs/specs)
2. Architecture Decision Records in [`docs/adr/`](./docs/adr)
3. [`AI_CONSTITUTION.md`](./AI_CONSTITUTION.md)
4. [`ARCHITECTURE.md`](./ARCHITECTURE.md) and supporting architecture docs in [`docs/architecture/`](./docs/architecture)
5. [`DEVELOPMENT_RULES.md`](./DEVELOPMENT_RULES.md) and [`TESTING_STRATEGY.md`](./TESTING_STRATEGY.md)
6. Quality and maintenance guidance in [`docs/quality/`](./docs/quality) and [`docs/meta/`](./docs/meta)
7. Contributor guidance and examples in [`CONTRIBUTING.md`](./CONTRIBUTING.md), [`README.md`](./README.md), and inline comments

## Interpretation rules

- The most specific document wins when two documents have the same rank.
- A newer document does not override a higher-ranked document by default.
- If a lower-ranked document is wrong, fix it instead of following it.
- If no applicable spec exists for a non-trivial change, create or update one before implementation.
- If a change would invalidate an ADR, create a superseding ADR instead of silently drifting away from it.

## Required reading order for non-trivial changes

1. This file
2. [AI_CONSTITUTION.md](./AI_CONSTITUTION.md)
3. [ARCHITECTURE.md](./ARCHITECTURE.md)
4. Relevant spec in [docs/specs](./docs/specs)
5. Relevant ADR in [docs/adr](./docs/adr)
6. [DEVELOPMENT_RULES.md](./DEVELOPMENT_RULES.md) and [TESTING_STRATEGY.md](./TESTING_STRATEGY.md)

## Escalation rule

When a change creates a new lasting rule, boundary, or tradeoff, encode it as a spec or ADR rather than relying on chat history or commit messages.

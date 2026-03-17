# AI Constitution

## Purpose

This repository is a KoppaJS starter scaffolded from the official minimal Vite
and TypeScript baseline. Its job is to stay small, understandable, runnable,
and trustworthy.

## Core principles

- Optimize for clarity over feature breadth.
- Keep the bootstrap path obvious: one HTML shell, one TypeScript entrypoint, one root view.
- Prefer published npm packages over local `file:` links in this repository.
- Keep the starter close to real production usage, but do not turn it into a framework showcase.
- Treat the meta layer as part of the product. If architecture or workflow changes, the documentation must change in the same update.

## Architectural philosophy

- `index.html` is the static document shell only.
- `src/main.ts` is the only bootstrap module and the only place that registers root-level components with `Core.take(...)`.
- `.kpa` files are the primary unit for simple UI composition, local state, and component-scoped styling.
- When logic becomes reusable, branch-heavy, or worth unit testing, extract it from `.kpa` blocks into `.ts` modules.
- Global CSS stays minimal. Component visuals belong inside component-local CSS blocks unless they are true application-wide primitives.

## Collaboration rules for humans and AI

1. Read [DECISION_HIERARCHY.md](./DECISION_HIERARCHY.md), [ARCHITECTURE.md](./ARCHITECTURE.md), [DEVELOPMENT_RULES.md](./DEVELOPMENT_RULES.md), [TESTING_STRATEGY.md](./TESTING_STRATEGY.md), and any relevant spec or ADR before editing code.
2. Follow `spec -> quality plan -> implementation -> documentation` for any non-trivial change.
3. Do not silently change public component tags, bootstrap flow, dependency sourcing, or the starter's setup instructions.
4. Prefer existing repository patterns over inventing new structure.
5. If a change affects architecture, module boundaries, build tooling, testing, or contributor workflow, update the meta layer in the same change.
6. Record durable architectural decisions in `docs/adr/`.
7. If code and documentation disagree, resolve the mismatch before merging further changes.

## Change triggers

- New subsystem or folder: update [ARCHITECTURE.md](./ARCHITECTURE.md) and [docs/architecture/module-boundaries.md](./docs/architecture/module-boundaries.md).
- New enduring technical decision: add or update an ADR in [docs/adr](./docs/adr).
- New development convention: update [DEVELOPMENT_RULES.md](./DEVELOPMENT_RULES.md).
- New quality gate or test level: update [TESTING_STRATEGY.md](./TESTING_STRATEGY.md) and [docs/quality/quality-gates.md](./docs/quality/quality-gates.md).
- New user-visible capability: create or update a spec in [docs/specs](./docs/specs).

## Definition of done

A change is not complete until:

- the code or docs are aligned with the actual repository state,
- applicable specs and ADRs are updated,
- required quality checks have run,
- contributor-facing guidance still matches the project.

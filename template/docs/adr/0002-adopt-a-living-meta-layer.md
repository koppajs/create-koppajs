# ADR 0002: Adopt a living meta layer

## Context

The repository previously lacked a formal architecture memory, contributor governance, testing philosophy, decision hierarchy, and AI workflow guidance. That made it easy for the implementation and the documentation to drift apart.

## Decision

The project will maintain an in-repository meta layer consisting of:

- root governance documents,
- architecture support documents under `docs/architecture/`,
- ADRs under `docs/adr/`,
- specs under `docs/specs/`,
- quality and maintenance guidance under `docs/quality/` and `docs/meta/`,
- AI-specific workflow guidance under `.github/instructions/`.

Whenever architecture, module boundaries, workflow, or quality expectations change, the relevant meta documents must be updated in the same change.

## Consequences

- Contributors and AI agents have a single source of truth inside the repository.
- Architectural drift becomes easier to detect.
- Every meaningful change carries a small documentation obligation.
- The repository gains governance overhead, but the overhead is intentionally light and local.

## Alternatives considered

- Relying on README-only guidance
- Keeping architectural decisions in issues or chat history instead of versioned documents

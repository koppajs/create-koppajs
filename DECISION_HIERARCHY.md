# Decision Hierarchy

When documents or examples conflict, use this order of precedence.

## Precedence Order

1. Approved specifications in `docs/specs/`
2. Accepted ADRs in `docs/adr/`
3. Root architecture and constitution documents:
   `AI_CONSTITUTION.md`, `ARCHITECTURE.md`
4. Root execution rules:
   `DEVELOPMENT_RULES.md`, `TESTING_STRATEGY.md`
5. Supporting governance and quality docs in `docs/meta/`,
   `docs/architecture/`, and `docs/quality/`
6. Contributor guidance and usage docs:
   `CONTRIBUTING.md`, `README.md`, `template/README.md`, `CHANGELOG.md`
7. Inline comments, examples, and historical habits

## How To Resolve Conflicts

1. Stop and identify the highest-precedence document that speaks to the issue.
2. Align code and lower-precedence docs to that source of truth.
3. If no higher-precedence document exists, create or update the appropriate
   spec or ADR instead of improvising.
4. If the conflict reveals a new design decision, record it in an ADR.

## Special Rules

- Released user-visible behavior should not be changed accidentally just because
  a lower-precedence document is vague.
- README examples are helpful, but they do not overrule specs or ADRs.
- If implementation and docs disagree, fix the mismatch in the same change or
  explicitly document why it cannot be done yet.

## Meta-Layer Maintenance Rule

No change is complete if the highest-precedence document for that behavior is
left outdated.

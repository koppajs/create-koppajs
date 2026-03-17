# Specifications

Specs define expected behavior before or alongside implementation. They are the highest-precedence project documents.

## When a spec is required

Create or update a spec when a change:

- introduces or changes user-visible behavior,
- adds a subsystem,
- changes public setup or bootstrap behavior,
- changes a feature in a way that needs explicit acceptance criteria.

## Required structure

Use [`TEMPLATE.md`](./TEMPLATE.md). Each spec should define:

- purpose
- behavior
- inputs
- outputs
- constraints
- edge cases
- acceptance criteria

## Lifecycle

- Draft or update the relevant spec before implementing a non-trivial change.
- Keep the spec narrow and testable.
- If implementation diverges from the spec, reconcile them immediately.

## Current specs

- [`app-bootstrap.md`](./app-bootstrap.md)
- [`counter-component.md`](./counter-component.md)
- [`quality-workflow.md`](./quality-workflow.md)

# Spec System

## Purpose

Specifications define the expected behavior of the stable, user-visible
surfaces in this repository. They are the highest-precedence design documents
after explicit user direction.

## What A Spec Must Cover

Every accepted spec must include:

- description
- behavior
- inputs
- outputs
- constraints
- edge cases
- acceptance criteria
- evolution phase
- completeness level
- known gaps
- deferred complexity
- technical debt items

## When To Create Or Update A Spec

- before changing user-visible CLI behavior
- before changing the generated starter contract
- when introducing a new subsystem or workflow with stable expectations
- when existing behavior has become implicit and needs a written source of
  truth

## Current Specs

- [cli-scaffolding.md](./cli-scaffolding.md)
- [template-starter-contract.md](./template-starter-contract.md)

## Template

Use [SPEC_TEMPLATE.md](./SPEC_TEMPLATE.md) for new specs.

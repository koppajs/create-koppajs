# ADR Guide

## Purpose

Architecture Decision Records capture decisions that are important enough to
outlive a single pull request or code review thread.

## When To Write An ADR

Create an ADR when changing or establishing:

- the scaffolding architecture
- the template distribution model
- dependency policy for the root package
- testing philosophy or quality gates
- release or publishing workflow
- any new subsystem or major boundary

## File Naming

Use zero-padded numeric prefixes:

- `0001-short-title.md`
- `0002-another-decision.md`

Do not renumber accepted ADRs.

## Required Sections

Every ADR must contain:

- Context
- Decision
- Consequences
- Alternatives considered

Optional but useful:

- Status
- Date
- Follow-up actions

## Relationship To Other Docs

- Specs define what behavior should be.
- ADRs define why a lasting technical direction was chosen.
- Architecture docs explain how the current system is organized.

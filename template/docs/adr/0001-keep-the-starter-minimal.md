# ADR 0001: Keep the starter minimal

## Context

This repository starts from the maintained minimal starter baseline for KoppaJS
applications. Its primary audience needs a runnable reference with as little
incidental complexity as possible.

## Decision

The starter remains intentionally small:

- one HTML shell,
- one TypeScript bootstrap file,
- one root KoppaJS view,
- one stateful child component,
- published npm packages instead of local monorepo `file:` dependencies,
- no routing, persistence, shared state, or extra demo subsystems by default.

Any expansion beyond that baseline requires a spec and ADR.

## Consequences

- New users get a fast, low-noise example.
- The repository stays easy to audit and maintain.
- More advanced features must be introduced deliberately rather than accumulating ad hoc.
- Some capabilities are intentionally absent until justified.

## Alternatives considered

- A feature-rich demo app that showcases many KoppaJS patterns at once
- A monorepo-linked starter that depends on local sibling packages

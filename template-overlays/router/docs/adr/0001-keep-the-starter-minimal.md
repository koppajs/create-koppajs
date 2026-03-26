# ADR 0001: Keep the router starter focused

## Context

This repository starts from the maintained KoppaJS router starter baseline.
Its audience needs a runnable reference that demonstrates routing without
turning into a broad showcase application.

## Decision

The router starter remains intentionally small:

- one HTML shell,
- one TypeScript bootstrap file,
- one root KoppaJS view,
- one router instance,
- two primary routes plus one explicit fallback route,
- one stateful child component,
- published npm packages instead of local monorepo `file:` dependencies.

Any expansion beyond that baseline requires a spec and ADR.

## Consequences

- New users get a fast example of routing without a lot of incidental complexity.
- The repository stays easy to audit and maintain.
- More advanced route features must be introduced deliberately rather than accumulating ad hoc.

## Alternatives considered

- A feature-rich demo app that showcases many KoppaJS patterns at once
- A monorepo-linked starter that depends on local sibling packages

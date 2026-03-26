# Spec: Router navigation

## Status

Approved

## Purpose

Define the starter's router baseline so the generated project demonstrates a small but real navigation flow.

## Behavior

- The starter initializes one `KoppajsRouter` instance from `src/main.ts`.
- The router renders matched route components into `#app-outlet`.
- Primary navigation links use `data-route` and participate in active-link state updates.
- The starter includes a home route, a second content route, and an explicit `*` fallback route.

## Inputs

- Route definitions declared in `src/main.ts`
- Browser URL and History API state
- User clicks on matching `data-route` links

## Outputs

- URL changes that stay aligned with the rendered route component
- Active navigation state on the current route link
- A predictable not-found page for unmatched paths

## Constraints

- The route table must stay small and inspectable.
- The fallback route must be explicit rather than implicit.
- Route content stays in consumer-owned `.kpa` files, not inside the router package.

## Acceptance criteria

- Visiting `/` renders the home route.
- Visiting `/router` renders the second route.
- Visiting an unmatched path renders the fallback route.
- The active navigation link exposes `aria-current="page"` for the current route.

# Roadmap

This roadmap describes intended directions, not guaranteed delivery dates.

## Current priorities

- Keep the router starter focused and production-like.
- Preserve a clear bootstrap path for new KoppaJS users.
- Keep the meta layer synchronized with the actual repository.

## Near-term opportunities

- Add route-level examples only when they demonstrate a real starter need.
- Strengthen route-related tests if the starter gains redirects, params, or nested routes.
- Keep documentation aligned with the actual router wiring.

## Longer-term expansion triggers

These should happen only with a spec and ADR:

- async data fetching
- persistence
- richer route hierarchies
- shared state beyond local component state
- CI automation changes

## Meta-layer maintenance

Every release or architecture-changing change should answer:

- Does the architecture document still match the code?
- Did any new decision deserve an ADR?
- Did testing expectations change?
- Did contributor instructions stay accurate?

# Roadmap

This roadmap describes intended directions, not guaranteed delivery dates.

## Current priorities

- Keep the starter minimal and production-like.
- Preserve a clear bootstrap path for new KoppaJS users.
- Keep the meta layer synchronized with the actual repository.

## Near-term opportunities

- Add a lightweight automated test runner when the repository gains logic that warrants it.
- Replace or harden any documentation that still assumes old monorepo-linked dependencies.
- Add more feature specs only when new starter capabilities are intentionally introduced.

## Longer-term expansion triggers

These should happen only with a spec and ADR:

- routing
- async data fetching
- persistence
- richer component examples
- CI automation

## Meta-layer maintenance

Every release or architecture-changing change should answer:

- Does the architecture document still match the code?
- Did any new decision deserve an ADR?
- Did testing expectations change?
- Did contributor instructions stay accurate?

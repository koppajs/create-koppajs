# Change Log

All notable changes to **create-koppajs** are documented in this file.

This project uses a **manual, tag-driven release process**.
Only tagged versions represent official releases.

This changelog documents **intentional milestones and guarantees**,
not every internal refactor.

---

## [Unreleased]

This section is intentionally empty.

Changes will only appear here when they:

- affect CLI behavior,
- change the generated project template,
- or modify documented guarantees.

---

## [1.0.1] — License & Metadata Fix

**2026-03-01**

Patch release to align license with the rest of the KoppaJS ecosystem.
No CLI or template changes.

### Changed

- License changed from MIT to Apache License 2.0 (consistent with all KoppaJS projects)
- Static license badge updated in README
- Copyright year updated to 2026

---

## [1.0.0] — Initial Stable Release

**2026-03-01**

First stable release of the official KoppaJS project scaffolder.

### Features

- CLI scaffolder: `pnpm create koppajs my-app`
- Interactive project name prompt when omitted
- Complete starter template with Vite, TypeScript, and sample `.kpa` components
- Supports `pnpm`, `npm`, and `npx`
- Smoke test suite for generated project validation

### Tooling

- CI workflow for syntax check and smoke test
- Tag-driven release workflow for npm publication
- Code of Conduct and Contributing guidelines

---

## Versioning Policy

- Semantic Versioning (SemVer) is followed pragmatically
- **Breaking changes** include:
  - CLI behavior changes
  - template structure changes
- Internal refactors without observable behavior change
  do **not** require a major version bump

---

_This changelog documents intent.
If something is not written here, it is not guaranteed._

# Change Log

All notable changes to **__PROJECT_NAME__** are documented in this file.

This project uses a **manual, tag-driven release process**.
Only tagged versions represent official releases.

This changelog documents **intentional milestones and guarantees**,
not every internal refactor.

---

## [Unreleased]

### Changed

- raised the minimum Node.js version to `>=22` and expanded CI coverage to
  Node 24
- refreshed the router starter dependency baseline to the current
  `@koppajs/koppajs-core`, `@koppajs/koppajs-vite-plugin`, and
  `@koppajs/koppajs-router` releases

---

## [1.0.0] — Initial Starter Baseline

**2026-03-17**

### Added

- a small KoppaJS router app shell with `app-view`, `home-page`,
  `router-page`, `not-found-page`, and `counter-component`
- route-based rendering through `@koppajs/koppajs-router`
- ESLint, Prettier, Vitest, Playwright, Husky, lint-staged, and commitlint
- starter governance docs, ADRs, specs, and release workflow files

---

## Versioning Policy

- Semantic Versioning (SemVer) is followed pragmatically
- **Breaking changes** include:
  - public runtime behavior changes
  - route structure changes
  - release workflow changes

---

_This changelog documents intent.
If something is not written here, it is not guaranteed._

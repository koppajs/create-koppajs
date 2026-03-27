# Change Log

All notable changes to **__PROJECT_NAME__** are documented in this file.

This project uses a manual, tag-driven release process.
Only tagged versions represent official releases.

---

## [Unreleased]

### Changed

- raised the minimum Node.js version to `>=22` and expanded CI coverage to
  Node 24
- refreshed the starter dependency baseline to the current `@koppajs/koppajs-core`
  and `@koppajs/koppajs-vite-plugin` releases
- removed the obsolete local `.kpa` export wrapper because the upstream Vite
  plugin already emits valid ES modules

---

## [1.0.0] — Initial Scaffold Baseline

**2026-03-17**

Initial scaffold created from the current official KoppaJS starter baseline.

### Included

- a minimal KoppaJS app shell with `app-view` and `counter-component`
- bootstrap through `Core.take(...)` and `Core()`
- ESLint, Prettier, Vitest, Playwright, Husky, and GitHub Actions CI
- explicit architecture, ADR, spec, testing, and contributor documentation
- a tag-driven GitHub release workflow for repository snapshots

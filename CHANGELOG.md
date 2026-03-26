# Change Log

All notable changes to **create-koppajs** are documented in this file.

This project uses a **manual, tag-driven release process**.
Only tagged versions represent official releases.

This changelog documents **intentional milestones and guarantees**,
not every internal refactor.

---

## [Unreleased]

_No unreleased changes yet._

---

## [1.2.1] — Starter Source Of Truth Cleanup

**2026-03-26**

Patch release to make the bundled templates the only starter source of truth and
to refresh the generated starter dependency baseline.

### Changed

- documented `template/` and `template-overlays/` as the only maintained source
  of truth for generated starters
- removed active ecosystem references to the retired `koppajs-example` starter
  repository
- updated generated starter dependencies to `@koppajs/koppajs-core@^3.0.3` and
  `@koppajs/koppajs-vite-plugin@^1.0.1`

---

## [1.2.0] — Starter Variants And Router Overlay

**2026-03-26**

### Added

- added an opt-in `router` starter that layers `@koppajs/koppajs-router`, a
  two-page navigation flow, and an explicit fallback route on top of the
  minimal baseline
- added overlay-based starter support through `template-overlays/` so future
  starter variants can replace only the files that actually differ

### Changed

- extended the CLI contract with `--template` and `--router`, plus interactive
  starter selection in TTY runs when no template flag is provided
- expanded smoke, unit, and generated-template build coverage to validate both
  the default minimal starter and the opt-in router starter
- updated architecture docs, specs, and ADRs to reflect multi-starter support

---

## [1.1.0] — Starter & Release Baseline Upgrade

**2026-03-17**

### Added

- Added a repository meta layer covering architecture, decision hierarchy,
  testing strategy, specs, ADRs, quality gates, and AI collaboration rules
- Added a repository-specific `RELEASE.md` aligned with the `koppajs-core`
  release model and this package's npm publish path
- Added Conventional Commit enforcement with `commitlint`, Husky, and
  `lint-staged`
- Added repository-level quality scripts for meta checks, syntax checks,
  formatting hygiene, cleanup, and package dry-run validation
- Added generated-template build verification and wired it into CI and releases

### Changed

- Updated contributing guidance to match the actual scripts, workflows, and
  repository responsibilities
- Expanded smoke coverage for README patching, invalid project names, and
  scaffolding into an existing empty directory
- Documented the CI meta-layer presence guard in the quality and architecture
  docs
- Added importable CLI helper coverage with the Node.js built-in test runner
- Synced the bundled starter template to the current `koppajs-example`
  technical baseline, including quality tooling, meta docs, tests, and release
  files
- Switched root CI and release workflows to pnpm-based dependency installation
  so the new hook and commit tooling actually runs in automation
- Isolated the root pre-commit `lint-staged` config from the generated
  starter's own hook tooling so root commits stay reliable
- Clarified the starter's supported Node.js lines and added an explicit
  validation guard for unsupported runtimes such as Node 23

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

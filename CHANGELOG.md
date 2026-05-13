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

## [1.2.6] — Router Baseline Refresh

**2026-05-14**

### Changed

- updated the generated router starter dependency baseline to
  `@koppajs/koppajs-router@0.1.4`

---

## [1.2.5] — Router Baseline Refresh

**2026-05-13**

### Changed

- updated the generated router starter dependency baseline to
  `@koppajs/koppajs-router@0.1.3`

---

## [1.2.4] — Starter Dotfile Removal

**2026-04-24**

Patch release to remove the last generated dotfile defaults from new apps.

### Removed

- removed generated `.gitattributes`, `.gitignore`, and `.npmrc` files from
  generated minimal and router starters
- removed the remaining CLI copy-time dotfile rename behavior because the
  generated starter no longer ships underscore-prefixed dotfile placeholders

### Changed

- updated pnpm usage examples to `pnpm create koppajs@latest` so users bypass
  stale pnpm create/dlx cache entries after a new release

---

## [1.2.3] — Lean Starter Maintenance

**2026-04-24**

Patch release to keep generated projects focused on runnable KoppaJS app code.
This is a maintainer-approved patch exception to the versioning policy because
the CLI invocation contract stays unchanged while the generated starter tree is
intentionally reduced.

### Changed

- trimmed generated starters to app source, README, and Vite/TypeScript build
  files
- switched generated starter views from the remote KoppaJS logo URL to a local
  `public/koppajs-logo.png` asset
- switched generated starter favicon output from `public/favicon.svg` to
  `public/favicon.png`
- stopped patching generated `CHANGELOG.md` and `RELEASE.md`; those files are
  no longer included in new apps
- refreshed the compatible generated-starter toolchain to `vite@7.3.2` and
  `@types/node@25.6.0` while keeping `typescript@5.9.3` within the current
  `@koppajs/koppajs-vite-plugin` peer range
- raised repository and generated-starter pnpm metadata to `pnpm@10.33.2`,
  with a declared minimum of `>=10.24.0`
- raised repository and generated-starter Node.js metadata to `>=22.12.0`

### Removed

- removed governance, ADR/spec docs, GitHub workflows, Husky hooks, commitlint,
  lint-staged, release files, changelog files, license files, and starter
  lockfiles from generated projects
- removed generated-starter lint, format, and test tooling, including ESLint,
  Prettier, Vitest, Playwright, their configs, scripts, dependencies, and test
  files

---

## [1.2.2] — Node & Validation Baseline Alignment

**2026-03-27**

### Changed

- raised the repository and bundled starter minimum Node.js version to `>=22`
  and expanded CI coverage to Node 24
- aligned CI and release validation around `pnpm validate`, added a packed-CLI
  smoke test, and switched release automation to the maintainer default from
  `.nvmrc`
- refreshed bundled starter dependencies to the current `@koppajs/koppajs-core`,
  `@koppajs/koppajs-vite-plugin`, and `@koppajs/koppajs-router` baselines
- removed the obsolete starter-local `.kpa` export wrapper now that the Vite
  plugin emits valid ES modules itself

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

# Architecture

## System Overview

`create-koppajs` is a small Node.js CLI that scaffolds a new KoppaJS project by
copying a versioned starter template bundled inside the published package.

The repository has two runtimes:

- The scaffolder runtime: the root package executed through
  `bin/create-koppajs.js`
- The generated application runtime: the project inside `template/`, which is
  copied into a user's new project directory

The root package does not build the template or fetch remote assets during
scaffolding. It copies files directly, then applies a minimal set of patches to
project identity files.

## Repository Classification

- Repo type: CLI scaffolding package with a bundled application template
- Runtime responsibility: one-shot project creation through the root CLI
- Build-time responsibility: package the template, protect the contract, and
  publish tagged releases
- UI presence: no root UI; the generated starter owns the browser-facing UI
- Maturity level: stable, maintenance-first, and contract-driven

## Repository Modules

### `bin/create-koppajs.js`

Owns the full scaffolding workflow:

- parse command-line arguments
- print help and version output
- prompt for a project name when no positional argument is provided
- validate the requested project name
- ensure the target directory is safe to use
- copy the template recursively
- rename publish-safe files such as `_gitignore` -> `.gitignore`,
  `_github` -> `.github`, and `_husky` -> `.husky`
- patch the generated `package.json`, `README.md`, `CHANGELOG.md`, and
  `RELEASE.md`
- print next-step instructions

### `template/`

Contains the versioned starter project that becomes the generated application.
It is shipped with the npm package and copied into the target directory almost
verbatim.

Current starter characteristics:

- Vite-based frontend application
- TypeScript-enabled
- Depends on `@koppajs/koppajs-core`
- Uses `@koppajs/koppajs-vite-plugin`
- Ships a minimal sample app with `.kpa` component files
- Mirrors the current `koppajs-example` quality baseline with ESLint,
  Prettier, Vitest, Playwright, Husky, lint-staged, and commitlint
- Includes a starter meta layer, ADR/spec structure, and release documentation

### `scripts/smoke-test.mjs`

Provides behavioral verification for the scaffolder by creating a temporary
project, checking the generated file set, verifying README and package patching,
covering representative invalid project names, confirming scaffolding into an
existing empty directory works, and confirming duplicate scaffolding fails.

### `test/`

Contains Node.js built-in test runner coverage for importable CLI helpers such
as argument parsing, validation, directory safety, and patching behavior.

### `scripts/`

Contains repository-quality utilities in addition to smoke tests:

- `check-meta-layer.mjs` verifies required governance files exist
- `lint.mjs` syntax-checks the shipped CLI, repository scripts, tests, and the
  template Vite config
- `format-check.mjs` enforces LF endings, trailing-whitespace removal, and
  final newlines across text files
- `lint-staged-check.mjs` provides fast staged-file syntax and formatting
  validation for local commits
- `run-unit-tests.mjs` runs Node.js built-in unit tests in a platform-robust
  way
- `template-build-test.mjs` scaffolds a project, installs dependencies, and
  runs the generated starter's own `pnpm check` baseline on a
  starter-supported Node.js runtime
- `clean.mjs` removes temporary smoke, coverage, and package artifacts

### `lint-staged.config.mjs`

Defines the root repository's staged-file checks. This config intentionally
stays separate from the generated starter's own `lint-staged` configuration so
commits in the root repository do not accidentally execute template-local
frontend tooling.

### `.github/workflows/`

Defines automation around the product contract:

- `ci.yml` installs dependencies with pnpm, runs the repository quality gate on
  Node 20 and 22, and performs a generated-template build on Node 22
- `release.yml` installs dependencies with pnpm, reruns the repository quality
  gate, builds the generated template on Node 22, and verifies that the Git tag
  version matches `package.json`

### Meta Layer

The repository-level governance lives in:

- root documents such as `AI_CONSTITUTION.md` and `DEVELOPMENT_RULES.md`
- supporting docs in `docs/meta`, `docs/architecture`, `docs/adr`,
  `docs/specs`, and `docs/quality`

## Public Contract Surface

The repository has four contract-bearing surfaces:

- CLI interface: `create-koppajs`, the `--help` and `--version` flags, the
  project-name argument, and the interactive prompt fallback
- Scaffolding behavior: validation, safe target-directory handling, template
  copy, dotfile restoration, and minimal post-copy patching
- Generated starter payload: the exact file tree and starter baseline shipped in
  `template/`
- Release payload: the published npm package contents and the tag-driven release
  workflow that validates them

## Execution Flow

1. A user runs `create-koppajs`, optionally with a project name.
2. The CLI parses flags and exits early for `--help` or `--version`.
3. If no name is provided, the CLI prompts on stdin/stdout.
4. The CLI validates the requested name.
5. The target directory is resolved relative to the current working directory.
6. The CLI refuses to continue if the target directory exists and is non-empty.
7. The template is copied recursively into the target directory.
8. Four post-copy mutations occur:
   - `package.json` gets the requested project name
   - `README.md` replaces `__PROJECT_NAME__`
   - `CHANGELOG.md` replaces `__PROJECT_NAME__`
   - `RELEASE.md` replaces `__PROJECT_NAME__`
9. The CLI prints next steps and exits successfully.

## Data And Dependency Flow

- Root package dependencies:
  - Node.js built-ins at runtime
  - lightweight dev-only commit workflow tooling
- Generated project dependencies:
  - defined entirely in `template/package.json`
- Release dependencies:
  - GitHub Actions plus npm registry access in `release.yml`

The root package must not depend on the generated project's runtime
dependencies, and the generated project must not rely on root-only scripts
after scaffolding.

## Important Invariants

- The npm package must include `bin/`, `template/`, `CHANGELOG.md`,
  `README.md`, and `LICENSE`.
- publish-safe template entries such as `_gitignore`, `_github`, `_husky`,
  `_editorconfig`, `_npmrc`, and `_prettierignore` must remain renamed during
  copy.
- `template/README.md`, `template/CHANGELOG.md`, and `template/RELEASE.md`
  must contain `__PROJECT_NAME__` if the generated docs are expected to include
  the new project name.
- Scaffolding must not modify files outside the chosen target directory.
- The root package remains usable with Node.js 20+.
- The CLI must work without network access.
- Template structure changes are user-visible and require spec/changelog review.

## Architectural Boundaries

The repository intentionally separates responsibilities:

- Root CLI code decides how scaffolding works.
- Template files decide what a new KoppaJS app looks like.
- Node tests and smoke tests verify the contract between those two layers.
- Workflow files define CI and release guarantees.

See [docs/architecture/module-boundaries.md](./docs/architecture/module-boundaries.md)
for a boundary-level map and allowed dependency directions.

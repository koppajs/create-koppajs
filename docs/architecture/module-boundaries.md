# Module Boundaries

## Boundary Map

### Root CLI package

Files:

- `package.json`
- `bin/create-koppajs.js`
- `template/`
- `template-overlays/`
- `commitlint.config.mjs`
- `.husky/*`
- `scripts/smoke-test.mjs`

Responsibilities:

- define the published CLI entry point
- own scaffolding logic, starter selection, and overlay application
- own repository-level quality checks
- own local commit-policy enforcement

Allowed dependencies:

- Node.js built-ins
- development-time GitHub Actions automation

Must not depend on:

- generated project runtime dependencies
- network services during scaffolding

### Generated project templates

Files:

- `template/package.json`
- `template/index.html`
- `template/_github/*`
- `template/_husky/*`
- `template/docs/*`
- `template/tests/*`
- `template/src/*`
- `template-overlays/*`
- `template/vite.config.mjs`
- `template/tsconfig.json`

Responsibilities:

- define the supported starter apps users receive
- demonstrate the maintained KoppaJS starter baselines

Allowed dependencies:

- only what the generated project needs to run and build

Must not depend on:

- root repository scripts after scaffold completion
- unpublished local files from this repository

### CI and release automation

Files:

- `.github/workflows/ci.yml`
- `.github/workflows/release.yml`

Responsibilities:

- verify the CLI contract before merge or release
- validate every shipped starter before publishing tagged releases

Must not become the only source of process truth. Workflow intent also belongs
in the meta layer.

## Dependency Direction

Allowed direction:

- root CLI -> bundled template files
- root CLI -> bundled template overlay files
- smoke test -> root CLI
- workflows -> root scripts and commands

Disallowed direction:

- generated starter -> root CLI internals after generation
- root CLI -> remote template source during scaffold
- contributor guidance -> contradicting architecture or specs

## Public Contract Boundaries

The following boundaries matter most for maintenance:

- CLI interface boundary: flags, arguments, prompts, exit conditions
- Template boundary: generated file names, overlay behavior, placeholder
  patching, starter deps, and starter governance files
- Release boundary: tag version must match `package.json`
- Commit-policy boundary: local hook behavior must match documented
  Conventional Commit rules

Changes across these boundaries require spec review and usually changelog
updates.

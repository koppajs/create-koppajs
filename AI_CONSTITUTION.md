# AI Constitution

## Purpose

This repository ships the official `create-koppajs` scaffolder. Its job is to
reliably create a new KoppaJS project from a versioned in-repository template
with as little hidden behavior as possible.

This constitution defines the non-negotiable principles for humans and AI
contributors working in this repository.

## Core Principles

### 1. Explicit behavior over hidden magic

- The CLI must stay easy to trace from input to output.
- Scaffolding behavior must remain inspectable in the repository.
- Prefer straightforward functions and file operations over indirection.

### 2. The generated project is part of the public contract

- The contents of `template/` are product surface, not internal trivia.
- Changes to generated files, file names, placeholder tokens, or default
  dependencies must be treated as user-facing changes.
- Public contract changes require documentation updates and changelog review.

### 3. Stable scaffolding beats clever abstractions

- Keep the root package dependency-light and operationally simple.
- Prefer copying versioned template files over generating large file trees from
  opaque code paths.
- Introduce new abstractions only when they clearly reduce maintenance risk.

### 4. Documentation is part of the implementation

- Architecture, testing, and specification documents must match the code.
- When behavior changes, the relevant meta-layer documents must change in the
  same work.
- If the docs and implementation disagree, treat the mismatch as a defect.

### 5. Small surface area, high confidence

- Favor a narrow, well-tested CLI surface over feature growth without
  operational clarity.
- Protect the current guarantees first: name resolution, safe directory
  creation, template copying, placeholder patching, and release integrity.

## Collaboration Rules For AI And Developers

### Required reading order before edits

1. [DECISION_HIERARCHY.md](./DECISION_HIERARCHY.md)
2. [ARCHITECTURE.md](./ARCHITECTURE.md)
3. Relevant spec in [docs/specs](./docs/specs)
4. Relevant ADRs in [docs/adr](./docs/adr)
5. [DEVELOPMENT_RULES.md](./DEVELOPMENT_RULES.md)
6. [TESTING_STRATEGY.md](./TESTING_STRATEGY.md)
7. [RELEASE.md](./RELEASE.md) for release-path changes

### Required workflow

1. Understand the current contract before changing it.
2. If behavior changes, update or add the relevant spec first.
3. Update tests or quality gates to describe the new expected behavior.
4. Implement the change using existing repository patterns unless there is a
   documented reason not to.
5. Update architecture, ADRs, and contributor guidance in the same change when
   the system design or workflow changes.

### Collaboration constraints

- Never silently change the CLI interface, generated file tree, or release
  process.
- Never silently change the repository's commit convention or local hook
  behavior.
- Prefer the repository's existing patterns over inventing new local
  conventions.
- Keep unrelated edits out of the same change.
- Surface tradeoffs explicitly when a decision affects template stability,
  release guarantees, or contributor workflow.

## Public Contract Guardrails

The following are treated as public contract unless a spec or ADR says
otherwise:

- The `create-koppajs` command and its `--help` / `--version` flags
- Accepting an optional project name argument and prompting when omitted
- Rejecting empty names, `.` / `..`, and names with path separators
- Refusing to scaffold into a non-empty target directory
- Copying the versioned `template/` directory into the target project
- Rewriting the generated `package.json` name
- Replacing `__PROJECT_NAME__` in the generated starter README
- The tag-driven npm release workflow
- The Conventional Commit policy enforced by `commitlint`

## Meta-Layer Self-Evolution

The meta layer is mandatory maintenance work, not optional cleanup.

When any of the following change, update the matching documents in the same
pull request:

- Architecture or module boundaries -> `ARCHITECTURE.md`,
  `docs/architecture/*`
- Behavior or user-visible flow -> `docs/specs/*`, `README.md`,
  `CHANGELOG.md` as needed
- Quality gates or testing approach -> `TESTING_STRATEGY.md`,
  `docs/quality/*`, CI workflow docs as needed
- Major technical decision -> new ADR in `docs/adr/`
- Release behavior -> `RELEASE.md`, `CHANGELOG.md`, and affected workflows
- Collaboration or governance rules -> this file, `CONTRIBUTING.md`,
  `.github/instructions/*`

If a change does not fit the current meta layer cleanly, extend the meta layer
before or alongside the code change.

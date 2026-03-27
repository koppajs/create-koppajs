# Contributing

## Setup

Requirements:

- Node.js >= 22
- pnpm 10 or newer

Install and run:

```bash
pnpm install
pnpm dev
```

Install the Playwright browser once if you plan to run browser smoke tests locally:

```bash
pnpm exec playwright install chromium
```

Useful commands:

```bash
pnpm lint
pnpm format:check
pnpm typecheck
pnpm test:run
pnpm test:coverage
pnpm test:e2e
pnpm check
pnpm validate
pnpm release:check
pnpm build
pnpm serve
```

Commit messages use Conventional Commits.
Examples:

```text
feat: add release baseline
docs: update contributing guide
fix: align bootstrap docs
```

## Workflow

1. Read [DECISION_HIERARCHY.md](./DECISION_HIERARCHY.md), [ARCHITECTURE.md](./ARCHITECTURE.md), and any relevant spec or ADR before changing source files.
2. For non-trivial work, update or create the relevant spec in [docs/specs](./docs/specs) first.
3. If the change alters architecture, tooling, public tags, or repository workflow, add or update an ADR in [docs/adr](./docs/adr).
4. Implement the smallest change that satisfies the spec.
5. Run the applicable quality gates from [TESTING_STRATEGY.md](./TESTING_STRATEGY.md). Use `pnpm check` for the local baseline and `pnpm validate` before merge when the UI, bootstrap, or tooling changed.
6. If the change touches versioning, changelog, or release automation, update `CHANGELOG.md`, `RELEASE.md`, and the affected workflow in the same change.
7. Update architecture, development, testing, and README docs when the actual project state changes.

## Releases

- Release notes live in [`CHANGELOG.md`](./CHANGELOG.md).
- The maintainer release procedure lives in [`RELEASE.md`](./RELEASE.md).
- Releases are prepared on `develop`, moved through `release/*`, merged into `main`, and tagged as `vX.Y.Z`.
- The release workflow creates GitHub Releases only. The repository starts
  `private`, so no npm publish step is configured by default.
- Run `pnpm release:check` before cutting a release tag.

## Commit policy

- Commit messages are validated by `.husky/commit-msg` using `commitlint`.
- Use Conventional Commits such as `feat: ...`, `fix: ...`, `docs: ...`, `test: ...`, `ci: ...`, or `chore: ...`.
- Keep the commit header at 72 characters or fewer.
- Merge, revert, `fixup!`, and `squash!` commits may bypass validation when Git creates them automatically.

## Pull request expectations

- Keep the starter minimal unless expansion is explicitly approved.
- Explain user-visible behavior changes and architecture-impacting decisions.
- Do not silently swap dependency sources, add build tools, or introduce new subsystems.
- Keep docs and code aligned in the same change.
- Keep hooks fast; heavy validation belongs in `pnpm validate` and CI, not in `pre-commit`.

## AI-assisted contributions

AI contributors follow the same rules as humans:

- read governing docs before editing,
- prefer existing patterns,
- do not invent architecture casually,
- update the meta layer whenever structure or rules change.

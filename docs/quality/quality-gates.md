# Quality Gates

## Merge Gate

Changes should satisfy the following repository checks:

1. `pnpm run validate`

`pnpm run validate` currently includes:

1. `pnpm run check`
2. `pnpm run test:template-build`
3. `pnpm run test:package`

`pnpm run check` currently includes:

1. documentation contract checks, including the root README's required sections
   and reader-first order
2. required meta-layer source-of-truth files exist
3. repository syntax checks
4. repository formatting hygiene checks
5. CLI metadata command checks
6. Node.js built-in unit tests
7. smoke integration tests
8. package dry-run validation

These are enforced in `.github/workflows/ci.yml` on Node 22 and 24.

## Local Git Gates

When root dependencies are installed, local contributor workflow also includes:

1. staged-file validation through `.husky/pre-commit` and `lint-staged`
2. Conventional Commit validation through `.husky/commit-msg` and `commitlint`

These gates are intentionally lighter than the full repository check.

## Release Gate

For local maintainer validation, run:

1. `pnpm run validate`

`pnpm run release:check` remains available as an alias for
`pnpm run validate`.

Before publish, the release workflow must:

1. rerun `pnpm run validate` on the maintainer default from `.nvmrc`
2. verify that the pushed tag matches the version in `package.json`
3. create a GitHub Release
4. publish to npm using the configured token

These are implemented in `.github/workflows/release.yml`.

## Manual Review Expectations

Automated checks are intentionally light. Reviewers should also verify the
following when relevant:

- the generated README still reads correctly after placeholder replacement
- template file changes are reflected in `README.md`, specs, and changelog
- both starters' pnpm, npm, Yarn Classic, and Yarn Modern installs and builds
  are covered by `pnpm run test:template-build`
- publish-payload and npm metadata changes are covered by `pnpm run test:package`,
  including the installed tarball's discoverability keywords
- release and commit workflow docs still match `RELEASE.md`,
  `commitlint.config.mjs`, and `.husky/*`
- release process changes are recorded in ADRs and contributor docs
- documentation and workflows still match the actual repository layout

## Trigger For Stronger Gates

Add stronger automation when:

- the template gains more moving parts
- the CLI adds more branching behavior
- release complexity grows
- manual review repeatedly misses the same class of issue

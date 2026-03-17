# ADR 0005: Adopt a tag-driven release baseline

## Context

The repository had gained a real quality baseline, governance documents, and a
`develop`/`main` branch model, but it still lacked an explicit release contract.
That left version bumps, changelog updates, and GitHub tagging behavior too
implicit for a maintained official starter.

`koppajs-core` already uses a documented tag-driven release path with guarded
automation. This starter benefits from the same clarity, but its release target
is different because the repository currently stays `private` and is not
published to npm.

## Decision

Adopt a manual, tag-driven release baseline for this repository:

- maintain `CHANGELOG.md` for official tagged milestones,
- document the maintainer procedure in `RELEASE.md`,
- create a GitHub Actions release workflow that runs on `vX.Y.Z` tags,
- rerun full repository validation during the release workflow,
- fail the workflow when the pushed tag does not match `package.json`,
- create GitHub Releases only while the repository remains `private`.

Release content is prepared on `develop`, moved through `release/*`, merged into
`main`, tagged on `main`, and merged back into `develop` after a successful
release.

## Consequences

- The repository now has an explicit versioning and release contract.
- Maintainers must update `package.json`, `CHANGELOG.md`, and `RELEASE.md` in
  sync when release practice changes.
- Tagged releases are guarded against accidental version mismatches.
- The release workflow improves traceability without forcing npm publishing.
- If this repository later becomes publishable, a new ADR must extend or
  replace this baseline rather than silently changing the release target.

## Alternatives considered

- Keeping releases informal and undocumented
- Adding automated versioning via Changesets or semantic-release
- Copying the npm publish path from `koppajs-core` even though this repository
  is currently `private`

# ADR 0003: Releases Are Tag-Driven And Version-Matched

## Status

Accepted

## Context

The package is published to npm and should produce auditable releases that
match repository history. A release flow is needed that is simple to operate
and prevents accidental mismatches between the Git tag and published package
version.

## Decision

Publish releases from Git tags that match `v*.*.*`.

Before publishing, the release workflow must:

- run the repository quality gate
- verify that the tag version matches `package.json`
- create a GitHub Release
- publish the package to npm

## Consequences

- Releases are easy to trace back to a specific tag.
- Publishing remains explicit and controlled.
- Maintainers must keep `package.json`, tags, and changelog intent aligned.
- Emergency manual publishing is discouraged because it bypasses the defined
  release contract.

## Alternatives considered

- Publish automatically on every merge to `main`
- Publish manually from local machines without workflow enforcement
- Derive package version entirely from Git metadata during CI

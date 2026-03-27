# ADR 0003: Rely on upstream KPA ES module output

## Context

The starter depends on `@koppajs/koppajs-vite-plugin` to transform `.kpa`
files for both development and production builds.

Earlier starter revisions carried a repo-local compatibility wrapper in
`vite.config.mjs` because the plugin emitted raw object literals instead of ES
modules.

The current upstream plugin now emits `export default ...` modules directly, so
keeping the local wrapper would only duplicate behavior and create drift
between the starter and the official plugin contract.

## Decision

Use the upstream KoppaJS Vite plugin output directly and keep `vite.config.mjs`
limited to plugin wiring.

## Consequences

- The starter stays aligned with the official Vite plugin behavior instead of
  carrying a stale local workaround.
- Build configuration stays smaller and easier to reason about.
- Future maintainers must update the starter and the plugin together if the
  `.kpa` module contract changes again.

## Alternatives considered

- Keeping a repo-local post-transform in `vite.config.mjs`
- Forking the plugin behavior inside the starter

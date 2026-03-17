# ADR 0003: Normalize KPA plugin output

## Context

The installed `@koppajs/koppajs-vite-plugin` currently transforms `.kpa` files into raw object literals during Vite loading. Rollup expects valid ES module syntax, so production builds fail unless the transformed output is wrapped in an export.

## Decision

Keep using the upstream KoppaJS Vite plugin, but add a small repo-local post-transform in `vite.config.mjs` that converts raw `.kpa` object literals into `export default ...` modules.

This workaround remains in place until the upstream plugin emits valid module syntax on its own.

## Consequences

- The repository builds successfully without changing application source files.
- The workaround is isolated to build configuration.
- Future maintainers must remove or revise the wrapper if the upstream plugin behavior changes.
- Architecture documentation must reflect that the build stack includes this compatibility layer.

## Alternatives considered

- Patching `node_modules` directly
- Rewriting application imports around the plugin defect
- Leaving the repository in a state where `pnpm build` fails

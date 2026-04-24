# ADR 0006: Support Overlay-Based Starter Variants

## Status

Accepted

## Context

`create-koppajs` started with one bundled starter template and one project-name
prompt. The new published router package introduces a legitimate starter need:
some users want a minimal KoppaJS app, while others want a small baseline that
already demonstrates routing.

Duplicating the full starter tree for each variant would increase maintenance
cost and make it easier for the variants to drift apart in app code and starter
behavior.

## Decision

Keep `template/` as the default `minimal` starter and add
`template-overlays/<name>/` for supported starter variants.

The CLI now:

- scaffolds `template/` first
- applies the selected overlay when the starter is not `minimal`
- exposes `--template <name>` and `--router`
- defaults to `minimal` in non-interactive runs
- prompts for starter selection in interactive terminals when no template flag
  is supplied

## Consequences

- The minimal starter remains the default and stays easy to audit.
- New starters can reuse the shared baseline instead of copying the whole tree.
- Variant-specific README and source files can still override the files that
  genuinely differ.
- The CLI contract becomes slightly broader and needs stronger contract tests.

## Alternatives considered

- Replace the default starter with a router-enabled starter
- Maintain separate full template trees per starter variant
- Keep one starter only and require users to wire the router manually every time

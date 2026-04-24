# Quality Guide

## Purpose

This directory defines the repository-quality baseline for `create-koppajs`.

It exists to keep three concerns explicit:

- which checks are required before merge or release
- which tooling choices are intentional
- which changes require stronger validation

## Quality Model

- Fast baseline: `pnpm run check`
- CI and release baseline: `pnpm run validate`
- Packed CLI smoke validation: `pnpm run test:package`
- Template-sensitive validation: `pnpm run test:template-build` on Node.js
  `>=22.12.0`
- Local workflow guards: Husky, lint-staged, and commitlint after
  `pnpm install`

## Documents In This Area

- [quality-gates.md](./quality-gates.md): merge, local, and release gates
- [tooling-baseline.md](./tooling-baseline.md): current tool choices and
  non-goals

## Maintenance Rule

Update this directory when scripts, hooks, CI expectations, or tool choices
change.

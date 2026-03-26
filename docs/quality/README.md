# Quality Guide

## Purpose

This directory defines the repository-quality baseline for `create-koppajs`.

It exists to keep three concerns explicit:

- which checks are required before merge or release
- which tooling choices are intentional
- which changes require stronger validation

## Quality Model

- Fast baseline: `npm run check`
- Release baseline: `npm run release:check`
- Template-sensitive validation: `npm run test:template-build` on a
  starter-supported Node.js runtime
- Local workflow guards: Husky, lint-staged, and commitlint after
  `pnpm install`

## Documents In This Area

- [quality-gates.md](./quality-gates.md): merge, local, and release gates
- [tooling-baseline.md](./tooling-baseline.md): current tool choices and
  non-goals

## Maintenance Rule

Update this directory when scripts, hooks, CI expectations, or tool choices
change.

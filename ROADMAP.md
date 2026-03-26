# Roadmap

## Purpose

This roadmap tracks the next improvements for repository governance, quality,
and long-term maintainability. It is not a promise of product dates.

## Current State

- Stable scaffolder CLI with a bundled starter template
- Generated-template verification already enforced in CI and release checks
- Lightweight CI and tag-driven release automation
- Meta layer established for architecture memory, decision records, specs, and
  AI collaboration

## Next Priorities

### 1. Keep contract docs synchronized with the starter payload

- Review root specs and README whenever `template/` changes in a user-visible
  way
- Keep the generated starter contract explicit instead of letting it drift into
  implementation-only knowledge

### 2. Extend contract tests only when behavior actually expands

- Add more smoke or helper coverage only when new CLI branches, rename rules,
  or patch targets are introduced
- Avoid speculative test infrastructure that does not protect a real contract
  edge

### 3. Keep release evidence easy to audit

- Keep changelog entries aligned with user-visible CLI and template changes
- Keep package payload, release docs, and workflow behavior aligned
- Add stronger release assertions only if manual review stops being sufficient

### 4. Keep the meta layer alive

- Review classification, boundaries, and quality docs whenever repository scope
  changes
- Seed new ADRs instead of letting major decisions live only in code review
- Create or extend specs before broadening the CLI or starter contract

## Review Trigger

Review this roadmap during release preparation or whenever repository scope
changes materially.

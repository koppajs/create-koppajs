# Roadmap

## Purpose

This roadmap tracks the next improvements for repository governance, quality,
and long-term maintainability. It is not a promise of product dates.

## Current State

- Stable scaffolder CLI with a bundled starter template
- Lightweight CI and tag-driven release automation
- Meta layer established for architecture memory, decision records, specs, and
  AI collaboration

## Next Priorities

### 1. Strengthen scaffold contract coverage

- Expand smoke coverage for invalid names and README placeholder replacement
- Consider extracting pure helpers if validation logic grows and warrants unit
  tests

### 2. Add generated-project verification

- Evaluate a CI job that scaffolds the template, installs dependencies, and
  runs the generated project's build
- Add this when template complexity or dependency churn justifies the extra time

### 3. Improve release traceability

- Keep changelog entries aligned with user-visible CLI and template changes
- Document release checklists and versioning expectations as the process
  evolves

### 4. Keep the meta layer alive

- Review root meta docs whenever architecture or workflow changes
- Seed new ADRs instead of letting major decisions live only in code review
- Create specs for new subsystems before broadening the CLI feature set

## Review Trigger

Review this roadmap during release preparation or whenever repository scope
changes materially.

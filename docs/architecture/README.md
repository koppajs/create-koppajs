# Architecture Guide

## Purpose

This directory captures the structural model of `create-koppajs`.

Use it to answer four questions before changing the repository:

- what kind of repository this is
- which runtime owns which responsibility
- where the public contract begins and ends
- which files are allowed to depend on each other

## Repository Classification

- Repo type: CLI scaffolding package with a bundled application template
- Runtime responsibility: one-shot project creation through `bin/create-koppajs.js`
- Build-time responsibility: package the template, verify release integrity, and
  enforce repository-quality gates
- UI presence: no first-party UI at the repository root; the generated starter
  owns the browser UI
- Maturity level: stable, contract-governed, maintenance-first

## Architecture Surfaces

- Root CLI surface: argument parsing, prompting, validation, filesystem copy,
  placeholder patching, and next-step output
- Generated starter surface: the exact file tree shipped in `template/`
- Quality and release surface: repository scripts, local hooks, and GitHub
  workflows that protect the contract

## Documents In This Area

- [../../ARCHITECTURE.md](../../ARCHITECTURE.md): repository-wide structural
  source of truth
- [module-boundaries.md](./module-boundaries.md): module map and allowed
  dependency directions

## Maintenance Rule

Update this directory when repository classification, ownership boundaries, or
dependency directions change.

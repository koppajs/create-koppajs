# Meta-Layer Change Triggers

Use this matrix whenever code, docs, or automation changes.

| Change type | Required meta-layer updates |
| --- | --- |
| Repository classification, ownership boundary, or public-contract framing changes | Update `ARCHITECTURE.md`, `docs/architecture/README.md`, `README.md`, and the relevant spec |
| CLI flag or prompt behavior changes | Update `docs/specs/cli-scaffolding.md`, `README.md`, and tests as needed |
| Project name validation changes | Update `docs/specs/cli-scaffolding.md`, `TESTING_STRATEGY.md`, and tests |
| Template file tree or starter dependency changes | Update `ARCHITECTURE.md`, `docs/architecture/module-boundaries.md`, relevant spec sections, `README.md`, and `CHANGELOG.md` |
| New architectural pattern or new subsystem | Update `ARCHITECTURE.md` and add an ADR |
| New dependency in the root package | Update `DEVELOPMENT_RULES.md` and add an ADR if runtime-impacting |
| Testing or CI gate changes | Update `TESTING_STRATEGY.md`, `docs/quality/README.md`, `docs/quality/quality-gates.md`, `docs/quality/tooling-baseline.md`, and workflow docs |
| Formatting, editor, or ignore baseline changes | Update `docs/quality/tooling-baseline.md`, `CONTRIBUTING.md`, and relevant ignore/config files |
| Release process changes | Update `docs/adr/`, `docs/quality/quality-gates.md`, `CONTRIBUTING.md`, and `CHANGELOG.md` if user-visible |
| Commit convention or hook changes | Update `CONTRIBUTING.md`, `docs/quality/tooling-baseline.md`, and relevant hook/config files |
| Contributor or AI workflow changes | Update `AI_CONSTITUTION.md`, `CONTRIBUTING.md`, and `.github/instructions/*` |

If a change does not fit one row cleanly, add a new row as part of the same
pull request.

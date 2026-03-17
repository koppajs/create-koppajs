# Meta-Layer Maintenance

The meta layer is a living system. Any change that alters the real system must update the corresponding governance document in the same change.

## Update matrix

| Change                                     | Required updates                                                                               |
| ------------------------------------------ | ---------------------------------------------------------------------------------------------- |
| New feature or behavior                    | Add or update a spec in `docs/specs/`; update `README.md` if setup or visible behavior changes |
| New enduring technical decision            | Add or update an ADR in `docs/adr/`                                                            |
| New module, folder, or data flow           | Update `ARCHITECTURE.md` and `docs/architecture/module-boundaries.md`                          |
| New coding pattern or dependency rule      | Update `DEVELOPMENT_RULES.md`                                                                  |
| New test tooling or quality gate           | Update `TESTING_STRATEGY.md` and `docs/quality/quality-gates.md`                               |
| New hook, CI step, or contributor workflow | Update `CONTRIBUTING.md` and `.github/instructions/ai-workflow.md`                             |
| Version, changelog, or release workflow    | Update `CHANGELOG.md`, `RELEASE.md`, `package.json`, and affected GitHub workflow files        |

## Review triggers

Perform a meta-layer review when:

- a pull request changes the repo structure,
- a new dependency is added,
- a public component tag changes,
- a build or test command changes,
- a hook or CI workflow changes,
- a subsystem such as routing or data fetching is introduced,
- a README section no longer matches the actual code.

## Periodic review checklist

- Does [ARCHITECTURE.md](../../ARCHITECTURE.md) still match the runtime flow?
- Do current specs cover the user-visible behaviors in the repo?
- Do ADRs still represent active decisions?
- Do contributor instructions still match the actual toolchain?
- Did a recent change deserve a new quality gate?
- Do `CHANGELOG.md`, `RELEASE.md`, and the release workflow still match actual branch and tag practice?
- Do commit message examples and hook behavior still match `commitlint.config.mjs`?
- Is any omitted tooling, such as Stylelint, still intentionally omitted for good reason?

If any answer is "no", update the meta layer before considering the repository aligned.

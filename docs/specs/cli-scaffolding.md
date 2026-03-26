# Spec: CLI Scaffolding

## Status

Accepted

## Description

The `create-koppajs` CLI creates a new KoppaJS starter project by copying the
bundled base template into a target folder, optionally applying a supported
starter overlay, and patching a minimal set of identity fields.

## Behavior

The CLI must:

1. parse flags and the first positional project name
2. exit successfully for `--help` and `--version`
3. prompt for a project name when no positional name is provided
4. accept `--template <name>` and `--router` as starter-selection inputs
5. default to the `minimal` starter when no template flag is provided in a
   non-interactive run
6. prompt for a starter template when no template flag is provided in an
   interactive terminal
7. validate the selected project name and starter template before any
   filesystem writes
8. refuse to scaffold into a non-empty target directory
9. copy the bundled base template into the target directory
10. apply the selected starter overlay on top of the base template when needed
11. restore publish-safe dotfiles and dotdirectories during copy
12. patch the generated `package.json`, `README.md`, `CHANGELOG.md`, and
   `RELEASE.md`
13. print next steps and exit successfully when scaffolding completes

## Inputs

- command invocation through `create-koppajs`
- optional positional project name argument
- optional `--template <name>` or `--router` flag
- `--help` or `--version` flags
- current working directory
- interactive stdin input when no project name argument is provided
- interactive stdin input for starter selection when no template flag is
  provided

## Outputs

- help text for `--help`
- version string for `--version`
- a generated project directory inside the current working directory when
  scaffolding succeeds
- next-step console output telling the user to change directory, install
  dependencies, and run the dev server

## Constraints

- The CLI must support Node.js 20+.
- The CLI must not require network access.
- The CLI must refuse empty project names.
- The CLI must reject unknown starter template names.
- The CLI must reject `--template` when no template value is provided.
- The CLI must refuse `.` and `..`.
- The CLI must refuse names containing `/` or `\\`.
- The CLI must refuse scaffolding into an existing non-empty target directory.
- The base template must be copied recursively from `template/`.
- Supported starter overlays must be copied recursively from
  `template-overlays/<name>/`.
- publish-safe template entries such as `_gitignore`, `_github`, `_husky`,
  `_editorconfig`, `_npmrc`, and `_prettierignore` must be restored to their
  dot-prefixed names in the generated project.
- The default starter template is `minimal`.
- The generated `package.json` `name` must equal the selected project name.
- The generated `README.md` must replace `__PROJECT_NAME__` with the selected
  project name.
- The generated `CHANGELOG.md` and `RELEASE.md` must replace `__PROJECT_NAME__`
  with the selected project name.

## Edge Cases

- If no positional name is provided, the CLI prompts for `Project name:`.
- If no starter flag is provided and stdin/stdout are TTYs, the CLI prompts for
  `Starter template (minimal/router) [minimal]:`.
- If stdin closes before a name is provided, the CLI exits with an error.
- If the target directory does not exist, it is created.
- If the target directory exists and is empty, scaffolding may proceed.
- If the target directory exists and contains files, scaffolding must fail.

## Acceptance Criteria

1. `create-koppajs my-app` creates a `my-app/` directory with the full default
   `minimal` starter file set.
2. The generated `package.json` contains `"name": "my-app"`.
3. The generated `README.md`, `CHANGELOG.md`, and `RELEASE.md` replace
   `__PROJECT_NAME__` with `my-app`.
4. Publish-safe starter files and folders are restored to their dot-prefixed
   names after scaffolding.
5. `create-koppajs my-app --template router` creates the router starter file
   set, including the router dependency and route files.
6. The generated starter includes its quality, test, workflow, and meta-layer
   baseline.
7. Scaffolding into an existing empty directory succeeds.
8. Representative invalid project names and invalid template selections are
   rejected.
9. Running the CLI again for the same non-empty directory fails.
10. `create-koppajs --help` and `create-koppajs --version` exit successfully.

## Evolution Phase

Stable

## Completeness Level

High

## Known Gaps

- The CLI does not currently expose flags for package-manager selection,
  overwrite confirmation, or starter-template composition beyond the supported
  overlays.

## Deferred Complexity

- package-manager-specific bootstrap flows
- overwrite or merge modes for existing directories
- additional starter variants beyond `minimal` and `router`

## Technical Debt Items

- Keep prompt and validation coverage aligned if project-name rules or starter
  options expand.
- Extend contract tests only when new CLI branches are added; avoid speculative
  option handling.

## Change Management

When this spec changes:

- update `README.md` if usage or generated output changed
- update `scripts/smoke-test.mjs` or other tests to cover the new contract
- update `ARCHITECTURE.md` if module responsibilities or invariants changed
- add an ADR if the change introduces a new lasting architectural direction

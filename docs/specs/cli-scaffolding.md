# Spec: CLI Scaffolding

## Status

Accepted

## Summary

The `create-koppajs` CLI creates a new KoppaJS starter project by copying the
bundled `template/` directory into a target folder and patching a minimal set
of identity fields.

## Inputs

- command invocation through `create-koppajs`
- optional positional project name argument
- `--help` or `--version` flags
- current working directory
- interactive stdin input when no project name argument is provided

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
- The CLI must refuse `.` and `..`.
- The CLI must refuse names containing `/` or `\\`.
- The CLI must refuse scaffolding into an existing non-empty target directory.
- The template must be copied recursively from `template/`.
- publish-safe template entries such as `_gitignore`, `_github`, `_husky`,
  `_editorconfig`, `_npmrc`, and `_prettierignore` must be restored to their
  dot-prefixed names in the generated project.
- The generated `package.json` `name` must equal the selected project name.
- The generated `README.md` must replace `__PROJECT_NAME__` with the selected
  project name.
- The generated `CHANGELOG.md` and `RELEASE.md` must replace `__PROJECT_NAME__`
  with the selected project name.

## Edge Cases

- If no positional name is provided, the CLI prompts for `Project name:`.
- If stdin closes before a name is provided, the CLI exits with an error.
- If the target directory does not exist, it is created.
- If the target directory exists and is empty, scaffolding may proceed.
- If the target directory exists and contains files, scaffolding must fail.

## Acceptance Criteria

1. `create-koppajs my-app` creates a `my-app/` directory with the full starter
   file set.
2. The generated `package.json` contains `"name": "my-app"`.
3. The generated `README.md`, `CHANGELOG.md`, and `RELEASE.md` replace
   `__PROJECT_NAME__` with `my-app`.
4. Publish-safe starter files and folders are restored to their dot-prefixed
   names after scaffolding.
5. The generated starter includes its quality, test, workflow, and meta-layer
   baseline.
6. Scaffolding into an existing empty directory succeeds.
7. Representative invalid project names are rejected.
8. Running the CLI again for the same non-empty directory fails.
9. `create-koppajs --help` and `create-koppajs --version` exit successfully.

## Change Management

When this spec changes:

- update `README.md` if usage or generated output changed
- update `scripts/smoke-test.mjs` or other tests to cover the new contract
- update `ARCHITECTURE.md` if module responsibilities or invariants changed
- add an ADR if the change introduces a new lasting architectural direction

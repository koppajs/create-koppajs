# ADR 0001: CLI Distributes An In-Repository Template

## Status

Accepted

## Context

`create-koppajs` exists to scaffold a new KoppaJS application quickly and
predictably. The repository needs a starter project that can be published to
npm, inspected in version control, and copied without requiring a remote fetch
or a template build step.

## Decision

The CLI ships a complete starter project inside `template/` and copies it into
the target directory during scaffolding.

Only a minimal set of post-copy mutations are allowed:

- rename `_gitignore` to `.gitignore`
- update the generated `package.json` name
- replace `__PROJECT_NAME__` in the generated `README.md`

## Consequences

- The generated project is transparent and easy to inspect in the repository.
- Packaging remains simple because the template is just published data.
- Template changes become user-visible contract changes and require careful
  review.
- The CLI stays lightweight because it does not need a templating engine or
  remote fetch path.

## Alternatives considered

- Generate all files programmatically inside the CLI
- Fetch a remote template repository during scaffold
- Use a more complex template engine with variable substitution across many
  files

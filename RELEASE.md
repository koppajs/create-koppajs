# Release Process for `create-koppajs`

This document describes the repository-specific release workflow for
`create-koppajs`.

The project uses a manual, tag-driven release process.
Only tagged versions are official releases.

The effective flow is:

1. Finalize the release content on `develop`
2. Update `package.json` and `CHANGELOG.md`
3. Validate the release candidate locally
4. Create a `release/*` branch from that state
5. Merge the release branch into `main`
6. Tag the release commit on `main` as `vX.Y.Z`
7. Push the tag
8. Let GitHub Actions validate and publish the release
9. Merge the updated `main` back into `develop`

---

## Release Model

This repository does not use automated versioning tools such as Changesets or
semantic-release.

The release is controlled by:

- the version in `package.json`
- the release entry in `CHANGELOG.md`
- the merge of the release-ready state into `main`
- the Git tag in the form `vX.Y.Z`
- the GitHub Actions workflow in `.github/workflows/release.yml`

Important consequences:

- A merge to `main` alone does not publish anything
- A tag triggers the release workflow
- The tag version must exactly match `package.json`
- The tag must point to the release commit on `main`
- After a successful release, `main` should be merged back into `develop`

Do not tag `develop`.
Do not tag the `release/*` branch.
Tag only the release commit that is already on `main`.

---

## Preconditions

Before cutting a release, ensure all of the following are true:

- The intended release scope is already complete on `develop`
- `package.json` contains the target version
- `CHANGELOG.md` contains the corresponding release notes
- The lockfile is up to date
- The release content has been reviewed
- The repository secrets required by GitHub Actions are configured

Tooling expectations for local verification:

- Node.js 20 or newer for the root repository checks
- pnpm 10 or newer

For `pnpm test:template-build` and `pnpm release:check`, use a Node.js version
supported by the generated starter toolchain. The current supported lines are
20.19+, 22.13+, and 24+.

This repository enforces `engine-strict=true` in `.npmrc`, so incompatible
Node.js or pnpm versions should be treated as a release blocker.

---

## Local Validation Before Branching

Before creating the release branch, validate the exact release candidate
locally.

Recommended commands:

```bash
pnpm install
pnpm release:check
```

`pnpm release:check` runs the repository quality gate and verifies that the
generated starter still passes its bundled quality baseline.

If the local runtime falls outside the starter-supported Node.js lines, switch
to a supported version before trusting release validation.

---

## Step-by-Step Release Workflow

### 1. Finalize the release on `develop`

Ensure `develop` already contains the exact release content.

Typical release preparation includes:

- updating `package.json` from the previous version to the next release version
- moving the relevant notes into the final section in `CHANGELOG.md`
- committing any last release fixes

Make sure the release-ready state is committed before creating `release/*`.

### 2. Create the `release/*` branch

Create a release branch from the validated `develop` state.

Example:

```bash
git checkout develop
git pull
git checkout -b release/X.Y.Z
```

### 3. Merge the release branch into `main`

Merge `release/*` into `main` using the repository's normal process.

The critical requirement is:

- `main` must contain the final release commit before tagging

Conceptually:

```bash
git checkout main
git pull
git merge --no-ff release/X.Y.Z
```

### 4. Tag the release commit on `main`

After the release branch has been merged, create the Git tag on the release
commit that is now on `main`.

Example:

```bash
git checkout main
git pull
git tag vX.Y.Z
```

The tag format is mandatory:

- `vX.Y.Z` is valid
- `X.Y.Z` is not valid for this workflow

### 5. Push `main` and the tag

Push the merged `main` branch and then the tag.

Example:

```bash
git push origin main
git push origin vX.Y.Z
```

### 6. Wait for the release workflow to finish

Verify that:

- the GitHub Actions release workflow passed
- the GitHub Release was created
- the npm publish step completed successfully
- the version-check step confirmed tag and `package.json` alignment

### 7. Merge `main` back into `develop`

After the release has completed successfully, merge the updated `main` back
into `develop`.

Conceptually:

```bash
git checkout develop
git pull
git merge --no-ff main
```

---

## GitHub Workflow Behavior

The workflow `.github/workflows/release.yml` runs on pushed tags matching
`vX.Y.Z`.

For each matching tag it will:

1. run the repository quality gate
2. verify that the generated starter still passes `pnpm check`
3. verify that the tag version matches `package.json`
4. create a GitHub Release with generated release notes
5. publish the package to npm

If any step fails, the release job stops immediately.

---

## Publish Payload

The npm package intentionally ships only the files needed to scaffold a starter:

- `bin/`
- `template/`
- `template-overlays/`
- `CHANGELOG.md`
- `README.md`
- `LICENSE`

Before release, verify that `npm pack --dry-run` still reflects that contract.

---

## Maintainer Checklist

Use this as the maintainer checklist for every release:

1. Verify the release scope on `develop`
2. Update `package.json`
3. Update `CHANGELOG.md`
4. Run `pnpm release:check`
5. Create `release/*` from `develop`
6. Merge `release/*` into `main`
7. Confirm the merged commit on `main` has the correct version and changelog
8. Create the `vX.Y.Z` tag on `main`
9. Push `main`
10. Push the tag
11. Watch the GitHub Actions release workflow
12. Verify the GitHub Release exists
13. Verify npm publish completed successfully
14. Merge `main` back into `develop`

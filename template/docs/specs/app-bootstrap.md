# Spec: App bootstrap

## Status

Approved

## Purpose

Provide a predictable, minimal startup path for a standalone KoppaJS application.

## Behavior

- The application starts from `index.html`.
- The HTML shell loads one global stylesheet and one module entrypoint.
- The document declares exactly one root custom element: `<app-view>`.
- `src/main.ts` registers `app-view` and `counter-component` with KoppaJS Core.
- `src/main.ts` invokes `Core()` once to bootstrap the application.

## Inputs

- Browser loading `index.html`
- Static asset and source file paths resolved by Vite

## Outputs

- A rendered `<app-view>` application shell
- A registered `<counter-component>` available to the root view

## Constraints

- There must be a single bootstrap entrypoint.
- The root tag in `index.html` must stay aligned with the component registered in `src/main.ts`.
- No hidden self-registration inside component modules.
- Bootstrap must rely on the public KoppaJS root API via `Core()` rather than non-public setup helpers.
- No extra runtime dependencies are required beyond the declared npm packages.

## Edge cases

- If a component tag changes, both `index.html` and `src/main.ts` must be updated together.
- If more bootstrap behavior is added, it must not introduce a second source of truth for initialization.

## Acceptance criteria

- Opening the app through Vite renders the root view without manual DOM scripting.
- `src/main.ts` remains the only location that calls `Core()`.
- The root view can render the counter component immediately after bootstrap.

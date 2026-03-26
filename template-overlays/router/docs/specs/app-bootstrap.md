# Spec: App bootstrap

## Status

Approved

## Purpose

Provide a predictable startup path for a KoppaJS application that includes the official router runtime.

## Behavior

- The application starts from `index.html`.
- The HTML shell loads one global stylesheet and one module entrypoint.
- The document declares exactly one root custom element: `<app-view>`.
- `src/main.ts` registers `app-view`, `home-page`, `router-page`, `not-found-page`, and `counter-component` with KoppaJS Core.
- `src/main.ts` invokes `Core()` once and starts one `KoppajsRouter` instance.

## Inputs

- Browser loading `index.html`
- Static asset and source file paths resolved by Vite

## Outputs

- A rendered `<app-view>` application shell
- A rendered route component inside `#app-outlet`
- A registered `<counter-component>` available to the home route

## Constraints

- There must be a single bootstrap entrypoint.
- The root tag in `index.html` must stay aligned with the component registered in `src/main.ts`.
- `Core()` must remain the only KoppaJS bootstrap call.
- Router initialization must happen after the route outlet exists.
- No extra runtime dependencies are required beyond the declared npm packages.

## Acceptance criteria

- Opening the app through Vite renders the root view without manual DOM scripting.
- `src/main.ts` remains the only location that calls `Core()`.
- The route outlet is initialized by the router and can render the home route immediately after bootstrap.

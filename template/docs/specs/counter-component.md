# Spec: Counter component

## Status

Approved

## Purpose

Demonstrate local interactive state in a minimal KoppaJS component.

## Behavior

- The component renders a "Counter" label, a numeric count, and increment/decrement buttons.
- The initial count is `0`.
- Clicking the increment button increases the count by `1`.
- Clicking the decrement button decreases the count by `1`.
- The displayed count updates immediately after each click.
- The increment and decrement buttons expose stable accessible names.
- The rendered count is announced politely to assistive technology when it changes.

## Inputs

- User clicks on the increment button
- User clicks on the decrement button

## Outputs

- Updated numeric text rendered in the component
- No external side effects

## Constraints

- State is local to the component.
- The component performs no persistence, networking, or cross-component coordination.
- The component remains embeddable inside the root app shell.

## Edge cases

- Negative values are allowed.
- Repeated clicks continue to update the count linearly within normal JavaScript number behavior.

## Acceptance criteria

- The counter is visible inside the app shell when the starter loads.
- The first rendered value is `0`.
- A single click on `+` changes the value from `0` to `1`.
- A single click on `-` changes the value from `0` to `-1`.
- Assistive technology can distinguish the increment and decrement actions without relying on symbol glyphs alone.

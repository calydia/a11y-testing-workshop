# Shared UI boundary design

## Context

`a11ying-ui` serves the A11ying and WCAG sites as a React design system. It currently exports React components, CMS-oriented types and utilities, a Tailwind configuration, and a global stylesheet containing brand tokens plus broad element and component styles.

Accessibility Testing Lab is an Astro-only site with a purpose-specific information architecture and specialized learning, exercise, fixture, and journey components. Several small shell components resemble components in `a11ying-ui`, but replacing them would add React and hydration without removing meaningful complexity.

## Decision

Keep Testing Lab's Astro components local. Share only framework-neutral brand foundations where central ownership provides clear maintenance value.

Testing Lab will not import the complete `a11ying-ui` global stylesheet and will not add React merely to reuse small shell components.

## Shared foundations

The intended shared boundary includes:

- Brand color tokens
- Font-family tokens
- Standard spacing tokens
- Gradient and other stable brand-level custom properties
- Potentially common logo and decorative assets when they can be exported without framework coupling
- Potentially framework-neutral focus and interaction primitives after their selectors and cascade behavior are explicitly defined

The first implementation should focus on tokens. Assets and interaction primitives are later candidates, not requirements of the initial migration.

## Local Testing Lab components

Keep these implementations within Testing Lab:

- Header and primary navigation
- Footer structure and links
- Breadcrumbs
- Skip link
- Theme toggle
- Section navigation
- Learning-path, method, exercise, fixture, and journey components

These components either have site-specific behavior or are already smaller and simpler than introducing a React rendering boundary.

## Components not adopted

Do not adopt the current shared implementations of:

- `RichText` and CMS sanitization utilities
- Search components
- Language switcher
- `MainImage`
- Generic `Box` and `Button` components where Testing Lab uses purpose-specific semantic patterns

## Recommended package evolution

Add a framework-neutral tokens-only export to `a11ying-ui`. It must not import React, global element styles, fonts, or component styles. The existing global stylesheet should consume the same tokens so A11ying and WCAG retain their current appearance.

Because `a11ying-ui` currently declares React and React DOM as package-level peer dependencies, make those peers optional before Testing Lab consumes a tokens-only subpath. React component consumers will continue providing React explicitly, while a tokens-only consumer will not need to install it.

Testing Lab can then replace its duplicated brand token declarations with the tokens-only export while retaining its local Tailwind content paths and site-specific global styles.

## Migration constraints

- No visual changes are intended during token adoption.
- Do not import `a11ying-ui/styles` into Testing Lab.
- Do not change Testing Lab component markup or behavior as part of the token migration.
- Preserve the exercise fixtures' deliberate, self-contained styling.
- Verify both light and dark themes because tokens support both site-wide color schemes.

## Verification

- Build and test `a11ying-ui` after introducing the tokens export.
- Build A11ying and WCAG to confirm their existing global stylesheet still resolves all tokens.
- Build Testing Lab after consuming the tokens-only export.
- Run Testing Lab shell, visual, and accessibility coverage appropriate to the affected global styles.
- Compare generated token values before and after migration to ensure there is no unintended brand change.


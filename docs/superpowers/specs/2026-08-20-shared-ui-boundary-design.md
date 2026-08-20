# Shared UI boundary design

## Context

`a11ying-ui` serves the A11ying and WCAG sites as a React design system. It currently exports React components, CMS-oriented types and utilities, a Tailwind configuration, and a global stylesheet containing brand tokens plus broad element and component styles.

Accessibility Testing Lab is an Astro-only site with a purpose-specific information architecture and specialized learning, exercise, fixture, and journey components. Several small shell components resemble components in `a11ying-ui`, but replacing them would add React and hydration without removing meaningful complexity.

The Sanna site is also Astro-only. Its general pages and blog use the same A11ying palette, font families, code colors, and brand gradient, but their layouts and editorial components have a distinct purpose. The existing Sanna Tailwind configuration duplicates nearly the complete brand token set, so central ownership would remove meaningful maintenance work.

## Decision

Keep Testing Lab's and Sanna's Astro components local. Share only framework-neutral brand foundations where central ownership provides clear maintenance value.

Neither Astro site will import the complete `a11ying-ui` global stylesheet or add React merely to reuse small shell components.

## Shared foundations

The intended shared boundary across A11ying, WCAG, Testing Lab, and Sanna includes:

- Brand color tokens
- Font-family tokens
- Stable spacing and focus tokens where they represent cross-site design decisions
- Gradient and other stable brand-level custom properties
- Potentially common logo and decorative assets when they can be exported without framework coupling
- Potentially framework-neutral focus and interaction primitives after their selectors and cascade behavior are explicitly defined

The first implementation should focus on tokens. Assets and interaction primitives are later candidates, not requirements of the initial migration. Application-specific utilities such as fixed menu widths, custom heights, and legacy spacing aliases may remain available for compatibility, but they are not part of the documented brand-foundation contract.

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

## Local Sanna components

Keep these implementations within Sanna:

- General-site and blog layouts
- Primary navigation and footer structure
- Theme toggle and language switcher
- General-site and blog breadcrumbs
- Blog cards, archives, pagination, topic navigation, and article presentation
- Sanna-specific typography hierarchy and editorial styles

Sanna may use shared tokens inside these components, but their markup, behavior, and composition remain locally owned so the personal site and blog can evolve independently of the reference and testing sites.

## Components not adopted

Do not adopt the current shared implementations of:

- `RichText` and CMS sanitization utilities
- Search components
- Language switcher
- `MainImage`
- Generic `Box` and `Button` components where Testing Lab uses purpose-specific semantic patterns

The same decision applies to Sanna. It will not adopt React components from `a11ying-ui` during this migration.

## Recommended package evolution

Add a framework-neutral tokens-only export to `a11ying-ui`. It must not import React, global element styles, fonts, or component styles. The existing global stylesheet should consume the same tokens so A11ying and WCAG retain their current appearance.

Because `a11ying-ui` currently declares React and React DOM as package-level peer dependencies, make those peers optional before Testing Lab consumes a tokens-only subpath. React component consumers will continue providing React explicitly, while a tokens-only consumer will not need to install it.

Testing Lab and Sanna can then replace their duplicated brand token declarations with the tokens-only export while retaining their local content paths and site-specific global styles.

## Migration constraints

- No visual changes are intended during token adoption.
- Do not import `a11ying-ui/styles` into either Astro site.
- Do not change Testing Lab or Sanna component markup or behavior as part of the token migration.
- Preserve the exercise fixtures' deliberate, self-contained styling.
- Preserve Sanna's distinct general-site and editorial blog styling.
- Verify both light and dark themes because tokens support both site-wide color schemes.

## Verification

- Build and test `a11ying-ui` after introducing the tokens export.
- Build A11ying and WCAG to confirm their existing global stylesheet still resolves all tokens.
- Build Testing Lab and Sanna after consuming the tokens-only export.
- Run Testing Lab shell, visual, and accessibility coverage appropriate to the affected global styles.
- Run Sanna's focused unit, visual, and accessibility coverage appropriate to its theme and blog shell.
- Compare generated token values before and after migration to ensure there is no unintended brand change.

# Content layout intermediate-width gutter design

## Goal

Preserve visible horizontal spacing on content-detail pages when the desktop section-navigation grid is active but the viewport is narrower than the grid's preferred width.

## Cause

At the `lg` breakpoint (`1024px`), `ContentLayout` switches to its two-column content and section-navigation grid. The grid can prefer approximately `1168px` because its `em`-based content width is evaluated at the desktop text size. At that same breakpoint, the outer article replaces its 16px margins with automatic margins. Between roughly 1024px and 1200px, the grid therefore fills the available width and can touch both viewport edges.

## Design

Give the shared `ContentLayout` article a persistent 16px horizontal gutter using internal padding and automatic centering at all viewport widths.

Preserve:

- the current `lg` breakpoint;
- content and navigation column widths;
- the 48px column gap;
- equal outer spacing;
- sticky section navigation;
- mobile stacking;
- maximum page width;
- existing vertical spacing.

The change applies to Learning path, Testing method, Exercise, and Testing journey detail pages using `ContentLayout`. Section landing pages already center a substantially narrower inner column and do not need this correction.

## Validation

Add focused browser assertions at 1024px, 1100px, 1168px, and 1200px to confirm:

- the content column begins at least 16px from the viewport edge;
- the section navigation ends at least 16px before the opposite edge;
- left and right outer spacing remain equal within normal subpixel tolerance;
- no horizontal overflow appears.

Retain the existing narrow-mobile and 1280px balanced-layout checks. Run Astro diagnostics, the production build, focused layout tests, the complete Playwright suite, and `git diff --check`.

## Out of scope

- changing grid proportions or navigation width;
- moving the desktop breakpoint;
- changing breadcrumb spacing;
- changing standalone Exercise fixtures or journey workspaces;
- changing section landing-page widths.

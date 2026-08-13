# Learning path card and navigation spacing refinement design

## Goal

Make Learning path step cards less visually oversized and reduce the Lab's desktop primary-navigation height to match the spacing used on `a11y.ing`, without changing mobile navigation or other content cards.

## Learning path step typography

Apply the refinement only inside `LearningPathSteps`:

- set step `h3` headings to `1.25rem` (20px at the default root size);
- set step summaries and estimated-time text to `1.125rem` (18px);
- preserve the existing `0.95rem` content-type label, ordered-list marker, weights, margins, borders, padding, wrapping, and light/dark colors.

The rules apply at desktop and mobile widths. They must not change headings or body text elsewhere in Learning paths, Exercises, Testing methods, or Testing journeys.

## Desktop primary-navigation spacing

The live `a11y.ing` desktop menu measures approximately 89px high. Its direct controls use 18px text, 4px vertical padding, and list items with 8px top and bottom margins. The Lab menu currently measures approximately 117px because its controls use 16px text with 12px vertical padding and list items inherit 16px vertical margins.

At the existing `lg` desktop breakpoint:

- render primary-navigation links at `1.125rem` (18px) with the corresponding 28px line height;
- reduce link vertical padding to `0.25rem` (4px);
- reduce direct navigation list-item vertical margins to `0.5rem` (8px).

Preserve current horizontal padding, link spacing, alignment, hover/focus/current-state behavior, colors, borders, wrapping, and overall navigation structure.

Do not change the mobile menu link padding or list-item margins. Mobile touch targets and the expanded-menu presentation remain unchanged.

## Architecture

Use component-local classes or styles in:

- `src/components/learning-path/LearningPathSteps.astro`;
- `src/components/MainNavigation.astro`.

Do not change global list or heading rules in `BaseLayout`, because that would affect unrelated content.

## Validation

Update focused browser coverage to assert:

- 20px Learning path step headings;
- 18px step summaries and estimated times;
- unchanged sentence-case type labels;
- desktop navigation controls at 18px with 4px vertical padding;
- desktop navigation list items with 8px vertical margins;
- a desktop navigation bar height close to the 89px reference;
- unchanged mobile link padding and usable menu interaction;
- visible hover, focus, and current-section behavior;
- no narrow-viewport overflow or automated accessibility regressions.

Run Astro diagnostics, the production build, focused Learning path and shell tests, the full Playwright suite, desktop/mobile visual review, and `git diff --check`.

## Out of scope

- other card components;
- global typography changes;
- header logo or utility-control sizing;
- mobile navigation spacing changes;
- navigation labels, order, or behavior changes.

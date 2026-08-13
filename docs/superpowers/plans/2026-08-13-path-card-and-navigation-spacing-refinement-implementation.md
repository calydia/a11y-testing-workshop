# Learning path card and navigation spacing refinement implementation plan

## Goal

Reduce Learning path step typography and match the live `a11y.ing` desktop primary-navigation height without altering mobile menu spacing or unrelated content.

## Task 1: Pin the refined presentation

- Update Learning path tests to expect 20px step headings and 18px summary/time text.
- Update shell tests to expect desktop menu links with 18px text and 4px vertical padding.
- Assert desktop menu list items use 8px vertical margins and the navigation bar is approximately 89px high.
- Preserve existing mobile interaction and accessibility assertions.

## Task 2: Refine Learning path cards

- Add component-local sizes in `LearningPathSteps.astro`.
- Keep type labels, markers, weights, margins, padding, borders, colors, and responsive wrapping unchanged.

## Task 3: Match desktop navigation spacing

- Add desktop-only link text and vertical-padding utilities in `MainNavigation.astro`.
- Add desktop-only direct-list-item vertical margins.
- Preserve current mobile menu spacing and all interaction states.

## Task 4: Verify

- Run focused Learning path and shell tests.
- Run Astro diagnostics and production build.
- Run the complete Playwright suite.
- Measure the final desktop navigation against the 89px reference.
- Visually review desktop and mobile presentation.
- Run `git diff --check`.

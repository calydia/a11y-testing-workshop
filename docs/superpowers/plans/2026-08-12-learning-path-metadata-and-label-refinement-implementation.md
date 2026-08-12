# Learning path metadata and label refinement implementation plan

## Goal

Match Learning path metadata to the shared Exercise presentation and render step-type labels in readable sentence case.

## Task 1: Pin the presentation contract

- Update `tests/learning-path.spec.js` to assert metadata is inside the content header, follows the summary, uses base-size text, and keeps the approved values.
- Assert step labels use sentence-case text with no uppercase transformation or added letter spacing.

## Task 2: Reuse shared metadata

- Update `LearningPathMeta.astro` to format the friendly duration and delegate markup to `ContentMeta.astro`.
- Render `LearningPathMeta` through the `meta` slot in `LearningPathLayout.astro`.

## Task 3: Refine step labels

- Remove uppercase transformation and letter spacing from `LearningPathSteps.astro`.
- Preserve type labels, bold weight, size, and semantic text.

## Task 4: Verify

- Run focused Learning path tests, Astro diagnostics, production build, and full Playwright suite.
- Review desktop/mobile and light/dark presentation.
- Run `git diff --check`.

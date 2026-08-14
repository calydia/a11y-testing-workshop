# Content drift refinement implementation plan

## Goal

Explain Learning-path time estimates consistently, correct the stale screen-reader path summary, and explicitly teach document-title and landmark checks through the existing page-structure method and Exercise.

## Task 1: Pin the refinement contract

### Files

- Modify: `tests/learning-path.spec.js`
- Modify: `tests/screen-reader-methods.spec.js`
- Modify: `tests/page-structure-links-exercise.spec.js`

### Work

1. Require the same total-time explanation beneath the metadata on both Learning paths.
2. Preserve the current 250- and 220-minute total assertions and compact metadata typography.
3. Require the screen-reader path summary to mention all five practice areas.
4. Require the page-structure method to cover useful document titles, discoverable main content, and restrained landmark structure.
5. Require the Exercise instructions to include title and landmark checks and record passing evidence.
6. Preserve the fixture markup and exact five-finding solution contract.
7. Assert the solution summary names the useful title and main region as valid comparisons.

## Task 2: Explain Learning-path totals

### Files

- Modify: `src/components/learning-path/LearningPathMeta.astro`

### Work

1. Add one shared explanatory sentence beneath `ContentMeta`.
2. State that the total includes setup, note-taking, reviewing results, and repetition.
3. Explain that individual step estimates cover their focused method or Exercise work.
4. Mark the explanation with a stable data attribute for focused testing.
5. Keep the note visually subordinate, compact, responsive, and compatible with both themes.
6. Do not add a schema field or change any authored duration.

## Task 3: Correct the screen-reader path summary

### Files

- Modify: `src/content/learning-paths/practical-screen-reader-testing.md`

### Work

1. Replace the stale summary with concise wording covering structure and links, image alternatives, icons and SVGs, language changes, and modal dialogs.
2. Keep the title, description, outcomes, steps, and 220-minute total unchanged.

## Task 4: Expand the page-structure method

### Files

- Modify: `src/content/testing-methods/screen-reader-page-structure-and-links.md`

### Work

1. Add title and landmark assessment to the method's summary or description as needed for accurate listing context.
2. Add explicit outcomes for judging a useful document title and finding the main content through landmark navigation.
3. Extend the procedure to inspect the title, main region, and restrained set of useful landmarks before heading and link checks.
4. Extend observations and interpretation so correct behavior can be recorded as passing evidence.
5. Add a limitation noting that landmark support and navigation commands vary and that a basic structural check does not prove every region or relationship is represented correctly.
6. Preserve existing heading/link guidance, related Exercise, name, order, and 20-minute estimate.

## Task 5: Expand the paired Exercise

### Files

- Modify: `src/content/exercises/reviewing-structure-and-links-in-a-community-resources-directory.md`

### Work

1. Add objectives for the document title and main/landmark structure.
2. Add instructions to judge the title, navigate by landmarks, find the main content, and record correct behavior as passing evidence.
3. Keep the instruction to identify exactly five accessibility findings.
4. Update the solution summary to identify the useful document title and main region as valid comparisons.
5. Leave the five finding entries, fixture, difficulty, and 20-minute estimate unchanged.

## Task 6: Verify

1. Run the new focused tests first and confirm failures at the intended missing content boundaries.
2. Implement the refinements and rerun Learning-path, method, Exercise, and axe checks.
3. Run the Astro production build.
4. Review both Learning-path metadata blocks and the refined method and Exercise at desktop and mobile widths in light and dark themes.
5. Run the complete Playwright suite on its default port 4321.
6. Run `git diff --check` and inspect the final worktree scope.

## Out of scope

- Changing totals or step estimates.
- Adding checkpoint duration metadata.
- Changing the fixture or its intentional findings.
- Renaming content or creating a new method.
- Performing the general editorial pass or legacy cleanup.

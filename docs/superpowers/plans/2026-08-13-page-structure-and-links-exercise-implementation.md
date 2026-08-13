# Page structure and links exercise implementation plan

## Goal

Publish a beginner Exercise for reviewing headings and link purpose in a standalone community-resources directory, then place it directly after its method in the Practical screen-reader testing path.

## Task 1: Pin the new content contract

### Files

- Add: `tests/page-structure-and-links-exercise.spec.js`
- Modify: `tests/exercise-architecture.spec.js`
- Modify: `tests/screen-reader-methods.spec.js`
- Modify: `tests/learning-path.spec.js`
- Modify: `tests/axe-core.spec.js`

### Work

1. Assert the new Exercise metadata, objectives, method link, standalone workflow, hints, and five-item solution.
2. Assert the exact deliberate heading and link-name patterns plus valid comparisons.
3. Pin the allowed automated accessibility result and manual-only findings.
4. Expect the Exercise in collection navigation and immediately after its method in the Learning path.
5. Expect the revised path duration and method relationship.

## Task 2: Create and register the standalone fixture

### Files

- Add: `src/components/exercise/fixtures/CommunityResourcesDirectoryFixture.astro`
- Modify: `src/exercises/fixture-registry.ts`

### Work

1. Build the approved community-resources directory with a return link, introduction, three resource cards, directory controls, and a closing section.
2. Seed exactly two heading patterns and three link-purpose patterns.
3. Include valid structure and descriptive-link comparisons.
4. Use neutral test hooks that do not reveal answers.
5. Preserve native link operation, visible focus, responsive layout, and saved-theme behavior.

## Task 3: Publish the Exercise

### Files

- Add: `src/content/exercises/reviewing-structure-and-links-in-a-community-resources-directory.md`

### Work

1. Add beginner `find-issues` metadata, a 20-minute estimate, five expected findings, and the page-structure-and-links method reference.
2. Write the approved screen-reader workflow and reporting prompt.
3. Add three progressive hints and the five pattern-level solution entries.
4. Explain valid comparisons and platform-dependent screen-reader wording.

## Task 4: Integrate the method and Learning path

### Files

- Modify: `src/content/testing-methods/screen-reader-page-structure-and-links.md`
- Modify: `src/content/learning-paths/practical-screen-reader-testing.md`

### Work

1. Link the method to the new Exercise through collection metadata.
2. Insert the Exercise directly after the method in the path.
3. Increase the path estimate by 20 minutes while preserving all later steps in their current order.

## Task 5: Verify

1. Run the focused new Exercise, method, path, architecture, and axe tests.
2. Run Astro diagnostics and the production build.
3. Run the complete Playwright suite.
4. Review desktop/mobile and light/dark fixture presentation.
5. Run `git diff --check`.

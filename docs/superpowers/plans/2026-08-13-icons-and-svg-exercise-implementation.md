# Icons and SVGs exercise implementation plan

## Goal

Publish a beginner Exercise for reviewing inline SVG graphics and icon controls in a standalone community-events dashboard, then place it directly after its method in the Practical screen-reader testing path.

## Task 1: Pin the content and accessibility contract

### Files

- Add: `tests/icons-and-svg-exercise.spec.js`
- Modify: `tests/exercise-architecture.spec.js`
- Modify: `tests/screen-reader-methods.spec.js`
- Modify: `tests/learning-path.spec.js`
- Modify: `tests/testing-journey.spec.js`
- Modify: `tests/axe-core.spec.js`

### Work

1. Assert Exercise metadata, objectives, method link, standalone workflow, hints, and five-item solution.
2. Assert exact graphic and control names for five intentional patterns and four valid comparisons.
3. Pin the approved axe boundary and separately test support-dependent accessible-name behavior.
4. Expect the Exercise in collection order and directly after its method in the Learning path.
5. Expect the revised path and downstream journey durations.

## Task 2: Create and register the dashboard fixture

### Files

- Add: `src/components/exercise/fixtures/CommunityEventsDashboardFixture.astro`
- Modify: `src/exercises/fixture-registry.ts`

### Work

1. Build the approved dashboard using code-native inline SVGs only.
2. Seed the unnamed, generic, noisy, unnamed-control, and duplicate-wording patterns.
3. Include four valid named or silent comparisons.
4. Use neutral stable test hooks that do not reveal answers.
5. Preserve native control operation, visible hover/focus, theme behavior, and responsive reflow.

## Task 3: Publish the Exercise

### Files

- Add: `src/content/exercises/reviewing-icons-and-svgs-in-a-community-events-dashboard.md`

### Work

1. Add beginner `find-issues` metadata, a 20-minute estimate, five expected findings, and the icons/SVG method reference.
2. Write the purpose-first visual, screen-reader, and markup workflow.
3. Add three progressive hints, four valid-comparison notes, and the five approved solution entries.

## Task 4: Integrate the method and Learning path

### Files

- Modify: `src/content/testing-methods/screen-reader-icons-and-svg.md`
- Modify: `src/content/learning-paths/practical-screen-reader-testing.md`

### Work

1. Add collection metadata and a visible method-to-Exercise link.
2. Insert the Exercise immediately after the icons/SVG method.
3. Increase the path estimate from 155 to 175 minutes.
4. Update the conference journey's surfaced path-duration assertion.

## Task 5: Verify

1. Run focused Exercise, method, path, journey, architecture, and axe tests.
2. Run Astro diagnostics and the production build.
3. Run the complete Playwright suite.
4. Review desktop/mobile and light/dark presentation.
5. Run `git diff --check`.

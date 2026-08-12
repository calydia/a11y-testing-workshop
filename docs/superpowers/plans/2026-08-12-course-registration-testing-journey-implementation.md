# Course registration Testing journey implementation plan

## Goal

Publish `Reviewing a course registration before launch` as a six-stage beginner Testing journey that reuses the existing standalone course-registration fixture and combines five Testing methods into one review and reporting task.

## Task 1: Add failing journey tests

### Files

- Add: `tests/testing-journey.spec.js`
- Modify: `tests/content-architecture.spec.js`
- Modify: `tests/axe-core.spec.js`

### Work

1. Expect the journey route, listing entry, breadcrumb, and section navigation.
2. Assert metadata, scenario, role, five objectives, five methods, six stages, optional Exercise, workspace route, and five deliverables.
3. Assert approved reference order and stage-specific method relationships.
4. Assert no solution leakage, required finding count, grading, or progress controls.

## Task 2: Add reusable journey presentation

### Files

- Add focused components under `src/components/journey/`.
- Modify `src/layouts/JourneyLayout.astro`.
- Modify `src/pages/journeys/[...id].astro`.

### Work

1. Reuse `ContentMeta` for difficulty and duration in the header meta slot.
2. Render scenario, role, objectives, methods, stages, optional preparation, workspace link, and deliverables from validated collection data.
3. Resolve method and Exercise references at build time into small view models.
4. Preserve authored ordering and omit empty stage-method containers.
5. Keep all presentation static and non-interactive.

## Task 3: Create the first Testing journey

### Files

- Add: `src/content/testing-journeys/reviewing-a-course-registration-before-launch.md`

### Work

1. Add beginner metadata, 90-minute estimate, scenario, role, five objectives, five methods, one optional Exercise, six stages, and five deliverables.
2. Add pacing, evidence consolidation, passing-check, prioritization, and launch-recommendation guidance.
3. Link directly to the existing standalone course-registration fixture.
4. Avoid a finding count, model answer, or Exercise solution content.

## Task 4: Refine accessibility and responsive presentation

1. Use semantic sections, lists, and one ordered stage list.
2. Ensure all links have visible focus and all long content wraps.
3. Verify light/dark themes and desktop/mobile layouts.
4. Confirm no new iframe, client state, storage, checkbox, or grading behavior.

## Task 5: Final verification

1. Run focused journey, architecture, and axe tests.
2. Run Astro diagnostics and production build to validate references.
3. Run the complete Playwright suite.
4. Visually review desktop/mobile and light/dark presentation.
5. Run `git diff --check` and confirm the fixture, Exercise, Learning path behavior, and iframe architecture remain unchanged.

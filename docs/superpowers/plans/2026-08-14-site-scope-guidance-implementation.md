# Site scope guidance implementation plan

## Goal

Help learners understand the limits of the current curriculum by placing the complete scope guidance on About and a contextual reminder at the end of both Learning paths.

## Task 1: Pin the scope-guidance contract

### Files

- Modify: `tests/site-architecture.spec.js`
- Modify: `tests/learning-path.spec.js`

### Work

1. Add a focused About-page test that requires a distinct scope heading and the approved boundaries: selected techniques, no conformance assessment, involvement of disabled people, scoped additional testing, and deliberately inaccessible practice material.
2. Add a Learning-path test that requires `Keep the scope in mind` on both paths.
3. Require each path reminder to link to `/about/` with descriptive link text.
4. Verify the reminder remains inside the authored content area and appears after the existing progression guidance.
5. Preserve existing axe and narrow-viewport coverage for all three pages.

## Task 2: Add the canonical About guidance

### Files

- Modify: `src/pages/about/index.astro`

### Work

1. Add a `What this Lab can and cannot establish` section after the existing introduction.
2. Explain that the Lab teaches selected practical techniques rather than exhaustive accessibility coverage.
3. State that completing its content is not a WCAG conformance assessment.
4. Explain that technical checks do not replace usability evaluation or involving disabled people.
5. Ask real reviews to record scope and exclusions and arrange relevant specialist or user testing according to product risk.
6. Identify deliberately inaccessible Exercise and journey workspaces as isolated practice material that should not be copied into production.
7. Use the existing About content column and typography without introducing a new callout component.

## Task 3: Add contextual Learning-path reminders

### Files

- Modify: `src/content/learning-paths/your-first-accessibility-review.md`
- Modify: `src/content/learning-paths/practical-screen-reader-testing.md`

### Work

1. Append `Keep the scope in mind` after each path's existing `Where to go next` content.
2. Describe the first path as a broad introduction rather than a complete audit, and prompt learners to record untested areas and plan additional testing.
3. State that the screen-reader path's five techniques do not cover every screen-reader experience or platform combination, and prompt relevant user and environment testing for real services.
4. Link both reminders to the full About guidance using descriptive link text.
5. Keep method procedures, path metadata, steps, estimates, and progression links unchanged.

## Task 4: Verify

1. Run the new focused tests first and confirm they fail for the intended missing guidance.
2. Implement the content and rerun the focused About, Learning-path, and axe checks.
3. Run the Astro production build.
4. Review About and the endings of both Learning paths at desktop and mobile widths in light and dark themes.
5. Run the complete Playwright suite on its default port 4321.
6. Run `git diff --check` and confirm the separate MVP audit remains untouched and uncommitted.

## Out of scope

- Rewriting method-level limitations.
- Changing Learning-path summaries or duration estimates.
- Expanding page-title or landmark testing.
- Adding new methods, Exercises, or specialist procedures.
- Removing retained workshop content.

# Screen-reader controls method and Exercise implementation plan

## Goal

Publish a beginner Testing method and standalone Exercise for testing names, roles, states, values, operation, and result announcements of common controls with a screen reader, then integrate the pair into the practical screen-reader Learning path and conference Testing journey.

## Task 1: Pin the content graph and learning contract

### Files

- Create: `tests/screen-reader-controls-exercise.spec.js`
- Modify: `tests/screen-reader-methods.spec.js`
- Modify: `tests/exercise-architecture.spec.js`
- Modify: `tests/learning-path.spec.js`
- Modify: `tests/testing-journey.spec.js`
- Modify: `tests/axe-core.spec.js`

### Work

1. Add failing assertions for the new method route, beginner metadata, 25-minute estimate, outcomes, common-control scope, procedure, interpretation, limitations, and Exercise relationship.
2. Add failing assertions for the Exercise route, beginner metadata, five findings, three hints, method relationship, standalone workflow, and closed solution.
3. Pin method and Exercise collection order.
4. Pin the new pair directly after structure and links in `Practical screen-reader testing`, including its 270-minute estimate and six-technique scope.
5. Pin the controls method in the conference journey's ordered method list, relevant stages, evidence, and 90-minute estimate.
6. Add both learner-facing routes to automated accessibility coverage.

## Task 2: Create and register the events-finder fixture

### Files

- Create: `src/components/exercise/fixtures/CommunityEventsFinderFixture.astro`
- Modify: `src/exercises/fixture-registry.ts`

### Work

1. Build one realistic community events finder with filters, category checkboxes, view radio buttons, event summaries, event-detail controls, and save controls.
2. Add the five approved findings without answer labels:
   - stale `aria-expanded` on the filter disclosure;
   - button semantics for one navigational event-detail control;
   - stale `aria-checked` on an otherwise keyboard-operable switch;
   - a separate visible `Save event` label whose accessible name is `Bookmark item`;
   - a filtered result count/list update without an appropriate status announcement.
3. Add valid comparisons: correctly exposed native checkboxes and radio buttons, a normal action button, a correct details link, and controls with correct initial states and keyboard behavior.
4. Keep state changes local and deterministic so tests can reset by reloading.
5. Preserve visible hover and focus styles, saved Lab theme, responsive reflow at 390px, and the explicit return link.
6. Register `community-events-finder` through the existing document-fixture route contract.

## Task 3: Publish the Testing method

### Files

- Create: `src/content/testing-methods/testing-controls-with-a-screen-reader.md`

### Work

1. Add published beginner metadata at order 12, a 25-minute estimate, screen-reader/browser/keyboard tooling, desktop scope, and the related Exercise.
2. Write outcomes for name, role, state/value, keyboard operation, changed-state exposure, link-versus-button purpose, and evidence recording.
3. Write an environment-first repeatable procedure that compares initial and changed output.
4. Cover native buttons, links, checkboxes, radio buttons, disclosure buttons, and a simple switch-like control.
5. Add interpretation guidance for pointer operation versus semantics, visible versus accessible labels, changed control state versus separate status updates, and platform variation.
6. Explicitly defer composite widgets and cross-platform compatibility claims.

## Task 4: Publish the Exercise

### Files

- Create: `src/content/exercises/testing-controls-in-a-community-events-finder.md`

### Work

1. Add published beginner `find-issues` metadata at order 47, a 25-minute estimate, fixture ID, method reference, and exactly five expected findings.
2. Write objectives and instructions covering initial inspection, keyboard operation, changed-state reinspection, page-result announcements, and passing checks.
3. Add the three approved progressive hints.
4. Add exactly five solution entries, one for each approved target, with expected behavior, user impact, and remediation direction.
5. Remind learners to record actual output rather than expect one prescribed speech string.

## Task 5: Integrate the Learning path

### Files

- Modify: `src/content/learning-paths/practical-screen-reader-testing.md`

### Work

1. Insert the new method and Exercise after the structure-and-links pair.
2. Increase the estimate from 220 to 270 minutes.
3. Update the summary, description, topics, outcomes, journey transition, and scope language to include common controls, semantics, state changes, and result announcements.
4. Preserve every existing pair and its authored order.

## Task 6: Integrate the conference Testing journey

### Files

- Modify: `src/content/testing-journeys/reviewing-a-community-conference-programme.md`

### Work

1. Add the new method after structure and links in the ordered method list.
2. Increase the estimate from 75 to 90 minutes.
3. Update description, topics, objectives, and evidence guidance for common controls and exposed state.
4. Extend the existing session-choice and session-details stages rather than adding a seventh stage.
5. Include the method in consolidation and preserve the journey's intermediate level and existing deliverable structure.

## Task 7: Verify the intentional and passing behavior

### Files

- Complete: `tests/screen-reader-controls-exercise.spec.js`

### Work

1. Verify the fixture return route, document boundary, and absence of teaching answers in markup.
2. Verify the disclosure opens and closes visually while `aria-expanded` remains stale.
3. Verify the incorrect details control exposes a button role and the comparison exposes a link role.
4. Verify the switch is focusable and operates with click and Space while `aria-checked` remains stale.
5. Verify the second save control's accessible name conflicts with its visible label without affecting operation.
6. Verify category checkboxes and view radio buttons expose correct names, roles, and changed state.
7. Verify filtering changes visible results without creating a live/status announcement.
8. Verify expected axe results in light and dark themes contain no unrelated violations.
9. Verify standalone theme persistence, visible focus, mobile fit, progressive hints, and five solution sections.

## Task 8: Complete project verification

### Work

1. Run the focused controls, method, Exercise, path, journey, architecture, breadcrumb, and axe tests under Node.js 24.
2. Run Astro diagnostics and the production build.
3. Run the complete Playwright suite on port 4321.
4. Review the method, Exercise, and fixture at desktop/mobile widths in light and dark themes.
5. Manually inspect initial and changed control accessibility properties and, where a screen reader is available, announcement timing.
6. Crawl generated internal links and verify the new routes appear in the sitemap.
7. Run `git diff --check` and inspect the final diff for unrelated changes.

## Out of scope

- Tabs, comboboxes, trees, grids, drag-and-drop, and other composite widgets.
- A comprehensive ARIA tutorial or multi-platform compatibility matrix.
- A new Learning path or Testing journey.
- Changes to the first Learning path or course-registration journey.
- Expanding existing keyboard, form, icon, or modal fixtures.
- Treating the deliberately incomplete fixture as production-ready interface code.

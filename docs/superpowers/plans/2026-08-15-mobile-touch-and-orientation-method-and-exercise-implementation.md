# Mobile touch and orientation method and Exercise implementation plan

## Goal

Publish a beginner Testing method and standalone community-festival Exercise for target size and spacing, orientation support, gesture alternatives, and pointer cancellation, then integrate the pair into the first Learning path.

## Task 1: Pin the content graph and learning contract

### Files

- Create: `tests/mobile-touch-orientation-exercise.spec.js`
- Modify: `tests/screen-reader-methods.spec.js`
- Modify: `tests/exercise-architecture.spec.js`
- Modify: `tests/learning-path.spec.js`
- Modify: `tests/testing-journey.spec.js`
- Modify: `tests/axe-core.spec.js`

### Work

1. Add failing assertions for the method route, beginner metadata, 25-minute estimate, target-size exceptions, orientation, gesture alternatives, pointer cancellation, real-device guidance, emulation limitations, and Exercise relationship.
2. Add failing assertions for the Exercise route, beginner metadata, 25-minute estimate, exactly five findings, three hints, method relationship, standalone workflow, passing comparisons, and closed solution.
3. Pin the method at order `11`, after motion testing and before zoom/reflow. Shift zoom to `12`, automated testing to `13`, structure and links to `14`, data tables to `15`, controls to `16`, image alternative text to `17`, and forms and validation to `18`; preserve every later method's relative sequence.
4. Pin the Exercise at order `29`, after the motion Exercise and before the high-zoom Exercise.
5. Pin the pair after motion testing and before zoom/reflow in `Your first accessibility review`, including its 420-minute estimate and updated touch-testing scope.
6. Pin both existing Testing journeys' authored methods, stages, and estimates so the new method does not enter them incidentally. Update only dynamically rendered recommended-path duration assertions from 370 to 420 minutes.
7. Add both learner-facing routes to automated accessibility coverage.

## Task 2: Create and register the festival fixture

### Files

- Create: `src/components/exercise/fixtures/CommunityFestivalTouchFixture.astro`
- Modify: `src/exercises/fixture-registry.ts`

### Work

1. Build a realistic community-festival workspace with an interactive map, authored map controls, schedule cards, saved sessions, orientation-dependent content, and a separate passing-comparisons region.
2. Ensure initial content and controls are complete in portrait, desktop, light, and dark conditions without page-level horizontal overflow.
3. Add exactly five approved targets without answer-revealing names or attributes:
   - one cluster of undersized, insufficiently spaced map controls;
   - useful content blocked only at phone-like landscape dimensions;
   - map zoom available only through a two-pointer pinch;
   - schedule navigation available only through a horizontal swipe path;
   - saved-session removal completed on pointer-down without cancellation or undo.
4. Add passing comparisons for target geometry, flexible orientation, a one-tap map action, button-supported schedule navigation, and removal completed on release with confirmation.
5. Keep all content fictional and restore fixture state on reload.
6. Preserve the explicit return link, visible focus, ordinary keyboard operation, saved theme, and responsive layout.
7. Register `community-festival-touch` as a document fixture with exactly five intentional-violation identifiers.

## Task 3: Implement orientation and pointer state

### Files

- Modify: `src/components/exercise/fixtures/CommunityFestivalTouchFixture.astro`

### Work

1. Add a real CSS narrow-landscape condition using landscape orientation plus a phone-like maximum height; do not block desktop landscape.
2. Add one native assisted-orientation control with explicit limitation text, `aria-pressed="false"`, keyboard operation, visible focus, deterministic reset, and one fixture-root simulation state.
3. Make real and assisted landscape states expose the same seeded blocking message and retain a clearly identified return or reset path.
4. Define authored map controls with exact stable target boxes and gaps that fail both the 24-by-24 baseline and spacing alternative; define a separate passing group at or above the baseline.
5. Track active pointer IDs and positions on the map. Change map scale only after a deterministic two-pointer distance change and clean up pointer state on up and cancel.
6. Add one separate map-centering action operable with a native button and a single activation.
7. Track one pointer's horizontal start and end positions for the seeded schedule. Change cards only after the approved swipe threshold; do not render previous or next buttons for this component.
8. Implement a separate schedule comparison with native previous and next buttons and correct current-card text.
9. Remove the seeded saved session immediately on pointer-down and deliberately leave it removed after move, cancel, or up.
10. Implement the passing removal so it completes on pointer-up only, aborts after pointer-cancel, and writes a confirmation message after completion.
11. Avoid stale pointer IDs, duplicated listeners, real navigation, persistent storage, or irreversible external actions.

## Task 4: Publish the Testing method

### Files

- Create: `src/content/testing-methods/testing-mobile-touch-and-orientation.md`

### Work

1. Add published beginner metadata at order `11`, a 25-minute estimate, real-device/browser/developer-tools tooling, and the related Exercise.
2. Explain the real-device-first and emulation-assisted evidence boundary.
3. Teach the WCAG 2.2 24-by-24 CSS-pixel baseline, center-circle spacing alternative, defined exceptions, and the difference between CSS and physical size.
4. Write the approved environment-first procedure covering direct touch, geometry, rotation without refresh, gesture inventory, simpler alternatives, pointer cancellation, emulation, and evidence recording.
5. Explain orientation essentiality without treating design preference or implementation convenience as essential.
6. Explain alternatives to multipoint and path-based gestures using pinch and swipe examples.
7. Explain up-event completion, abort, undo, reversal, and the essential-down-event exception without becoming an event-programming tutorial.
8. State mobile assistive-technology, physical usability, conformance, and disabled-user-testing limitations.

## Task 5: Publish the Exercise

### Files

- Create: `src/content/exercises/testing-touch-interaction-on-a-community-festival-map.md`

### Work

1. Add published beginner `find-issues` metadata at order `29`, a 25-minute estimate, fixture ID, method reference, and exactly five expected findings.
2. Write objectives and instructions covering environment evidence, real touch, target measurement, orientation, pinch, swipe, pointer cancellation, passing comparisons, reset, and limitations.
3. Add three progressive hints ending with the five approved regions without stating corrections.
4. Add exactly five closed solution entries with the condition, sequence, expected behavior, impact, exception boundary, and remediation direction.
5. State that mouse and browser emulation support preliminary checks but do not prove real-touch usability.

## Task 6: Integrate the Learning path

### Files

- Modify: `src/content/learning-paths/your-first-accessibility-review.md`

### Work

1. Insert the method and Exercise after the motion pair and before zoom and reflow.
2. Increase the estimate from 370 to 420 minutes.
3. Update summary, description, topics, and outcomes to include mobile touch and orientation without claiming comprehensive mobile assistive-technology coverage.
4. Preserve every existing pair, checkpoint, and authored sequence.

## Task 7: Verify geometry, orientation, gestures, and cancellation

### Files

- Complete: `tests/mobile-touch-orientation-exercise.spec.js`

### Work

1. Verify the fixture document boundary, return route, saved theme, responsive fit, unique IDs, and absence of answer leakage.
2. Run relevant interactions in a touch-capable Playwright context and assert explicit pointer types and IDs where synthetic multipointer sequences are needed.
3. Measure rendered rectangles and center distances to verify the seeded cluster fails and the passing group meets the approved geometry.
4. Verify portrait content remains available, a phone-like landscape viewport exposes the restriction, a desktop landscape viewport does not, and the assisted state matches the restricted layout.
5. Verify the assisted control's label, limitation text, pressed state, keyboard operation, visible focus, reset, and repeated toggling.
6. Dispatch a deterministic two-pointer pinch and verify map scale changes; confirm no single-pointer zoom buttons exist for that map.
7. Verify the passing map-centering action works with one tap.
8. Dispatch horizontal swipe and insufficient-movement sequences for the seeded schedule; confirm only the qualifying swipe changes its card and that no previous or next controls exist for it.
9. Verify the comparison schedule's native previous and next controls change its current card.
10. Verify seeded removal occurs on pointer-down and remains after move, pointer-cancel, and pointer-up.
11. Verify passing removal remains pending on pointer-down, aborts after pointer-cancel, completes on pointer-up, and exposes confirmation.
12. Verify exactly three hints and five closed solution sections and the expected axe boundary.

## Task 8: Complete project verification

### Work

1. Run focused mobile-touch, method-listing, Exercise-listing, Learning-path, journey, architecture, breadcrumb, and axe tests under Node.js 24.
2. Run Astro diagnostics and the production build.
3. Run the complete Playwright suite on the default port `4321`.
4. Review the method, Exercise, and fixture at portrait mobile, narrow landscape, desktop landscape, and desktop widths in both themes.
5. Test representative actions on a real touchscreen when available; otherwise record that visual and automated review used emulation.
6. Verify public routes in the sitemap and generated internal links.
7. Run `git diff --check` and inspect the final diff for unrelated changes.

## Out of scope

- Mobile screen-reader, assistive-touch, voice-control, switch-control, or stylus instruction.
- Hover-only content and drag-and-drop testing.
- Complex map-widget accessibility beyond the approved gesture checks.
- Treating CSS-pixel geometry or emulation as proof of physical usability.
- Responsive zoom and reflow already covered elsewhere.
- Modifying either existing Testing journey to include unrelated touch testing.
- A new mobile-specific Testing journey.
- Treating the deliberately incomplete fixture as production-ready festival software.

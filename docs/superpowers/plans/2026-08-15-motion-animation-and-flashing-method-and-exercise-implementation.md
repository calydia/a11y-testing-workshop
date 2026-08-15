# Motion, animation, and flashing method and Exercise implementation plan

## Goal

Publish a beginner Testing method and standalone parcel-tracking Exercise for automatically moving content, interaction-triggered animation, reduced-motion preferences, user controls, and safe flashing-risk identification, then integrate the pair into the first Learning path.

## Task 1: Pin the content graph and learning contract

### Files

- Create: `tests/motion-animation-exercise.spec.js`
- Modify: `tests/screen-reader-methods.spec.js`
- Modify: `tests/exercise-architecture.spec.js`
- Modify: `tests/learning-path.spec.js`
- Modify: `tests/testing-journey.spec.js`
- Modify: `tests/axe-core.spec.js`

### Work

1. Add failing assertions for the method route, beginner metadata, 20-minute estimate, reduced-motion procedure, moving-content controls, safe flashing guidance, limitations, and Exercise relationship.
2. Add failing assertions for the Exercise route, beginner metadata, 20-minute estimate, exactly five findings, three hints, method relationship, standalone workflow, passing comparisons, and closed solution.
3. Pin the method at order `10`, after forced colors and before zoom/reflow. Shift zoom to `11`, automated testing to `12`, structure and links to `13`, data tables to `14`, controls to `15`, and image alternative text to `16`; preserve all later relative ordering.
4. Pin the Exercise at order `28`, after the forced-colors Exercise and before the high-zoom Exercise.
5. Pin the pair after forced colors and before zoom/reflow in `Your first accessibility review`, including its 370-minute estimate and updated motion-testing scope.
6. Pin both existing Testing journeys' authored method lists, stages, and estimates so the new method does not enter them through incidental ordering changes. Update only dynamically rendered recommended-path duration assertions from 330 to 370 minutes.
7. Add both learner-facing routes to automated accessibility coverage.

## Task 2: Create and register the parcel-tracking fixture

### Files

- Create: `src/components/exercise/fixtures/ParcelTrackingMotionFixture.astro`
- Modify: `src/exercises/fixture-registry.ts`

### Work

1. Build a realistic parcel-tracking dashboard with delivery status, route progress, live updates, tracking details, scroll decoration, delivery confirmation, and a distinct passing-comparisons area.
2. Ensure all initial content and controls are available in light and dark themes at desktop and 390px widths.
3. Add exactly five approved targets without answer-revealing names or attributes:
   - continuously moving route progress without pause or stop;
   - an automatically scrolling updates ticker without pause, stop, or hide;
   - a large details-panel slide that remains under reduced motion;
   - scroll-linked parallax that remains under reduced motion;
   - a repeatable confirmation celebration that remains under reduced motion.
4. Add passing comparisons: a controlled vehicle animation, immediate reduced status transition, short pending indicator, non-spatial status message, and complete static content.
5. Add a visible safety note stating that the Lab does not render hazardous flashing and directing learners to the method's safe assessment guidance.
6. Preserve the explicit return link, saved theme, visible focus, usable ordinary controls, and responsive reflow.
7. Register `parcel-tracking-motion` as a document fixture with exactly five intentional-violation identifiers.

## Task 3: Implement isolated motion state and controls

### Files

- Modify: `src/components/exercise/fixtures/ParcelTrackingMotionFixture.astro`

### Work

1. Define ordinary non-flashing CSS animations for the route marker, ticker, passing vehicle, status transition, and celebration, with a spatial details transition and script-driven decorative transform.
2. Implement the real reduced condition with `@media (prefers-reduced-motion: reduce)`.
3. Add a native assisted-simulation button with explicit limitation text, `aria-pressed="false"`, keyboard operation, visible focus, deterministic reset, and one fixture-root state.
4. Group real and assisted reduced selectors so approved passing examples improve while the five targets retain their documented behavior.
5. Add a passing pause/resume control that changes its visible label and pressed state and affects only its identified vehicle animation.
6. Add an accessible details disclosure whose exposed expanded state remains correct while its panel retains the seeded spatial transition.
7. Add a short deterministic pending action that shows and removes a progress indicator without making it a learner timing task.
8. Add a confirmation action that updates a status message and restarts one celebration node deterministically on every activation.
9. Add a scoped scroll listener that updates only the decorative transform and does not multiply across state changes.
10. Ensure reload restores initial state and no timer or listener produces duplicated nodes or uncontrolled work.

## Task 4: Publish the Testing method

### Files

- Create: `src/content/testing-methods/testing-motion-animation-and-flashing.md`

### Work

1. Add published beginner metadata at order `10`, a 20-minute estimate, appropriate browser/operating-system/developer-tools tooling, and the related Exercise.
2. Distinguish system reduced motion, authored preferences, the Lab simulation, automatic movement, interaction-triggered motion, distraction, motion discomfort, and suspected flashing.
3. Write the approved environment-first procedure covering inventory, preference activation, pause/stop/hide operation, repeated interactions, scrolling, CSS/script inspection, reset, and evidence.
4. Explain flexible reduced alternatives: removal, immediate transitions, non-spatial changes, and short essential progress indicators.
5. Cover the scope and exposed state of user controls without presenting one global CSS reset as universal remediation.
6. Explain the general three-flashes boundary, general-flash and red-flash concepts, appropriate measurement, and safe escalation using authoritative WCAG guidance.
7. Explicitly instruct learners not to watch, replay, manually count, or recreate suspected hazardous flashing.
8. State the simulation, platform, conformance, and specialist-assessment limitations.

## Task 5: Publish the Exercise

### Files

- Create: `src/content/exercises/testing-motion-preferences-on-a-parcel-tracking-dashboard.md`

### Work

1. Add published beginner `find-issues` metadata at order `28`, a 20-minute estimate, fixture ID, method reference, and exactly five expected findings.
2. Write objectives and instructions covering initial motion inventory, real or assisted preference, valid pause control, panel interaction, scrolling, repeated confirmation, reset, passing checks, and limitations.
3. Include the explicit flashing-safety instruction without making it a sixth finding.
4. Add the three approved progressive hints, ending with the five affected regions without stating corrections.
5. Add exactly five closed solution entries with trigger, initial and reduced behavior, impact, and flexible remediation direction.

## Task 6: Integrate the Learning path

### Files

- Modify: `src/content/learning-paths/your-first-accessibility-review.md`

### Work

1. Insert the method and Exercise after the forced-colors pair and before zoom and reflow.
2. Increase the estimate from 330 to 370 minutes.
3. Update summary, description, topics, and outcomes to include motion testing without claiming comprehensive cognitive, neurological, or media-accessibility coverage.
4. Preserve every existing pair, checkpoint, and authored sequence.

## Task 7: Verify motion behavior and safety

### Files

- Complete: `tests/motion-animation-exercise.spec.js`

### Work

1. Verify the fixture document boundary, return route, saved theme, responsive fit, unique IDs, and absence of answer leakage.
2. Verify each initial animation has the approved non-flashing name, duration, iteration behavior, and trigger.
3. Use Playwright reduced-motion emulation to verify the five targets remain unreduced while all passing comparisons improve as designed.
4. Verify the assisted simulation produces the same intended reduced comparison and its name, explanation, pressed state, keyboard behavior, focus, reset, and repeated toggling remain correct.
5. Verify pause/resume changes only the passing vehicle's animation play state and exposes current control state.
6. Verify the details disclosure state and seeded spatial transition in normal and reduced conditions.
7. Verify scrolling changes the decoration transform in normal and reduced conditions without relying on screenshot timing.
8. Verify repeated delivery confirmation restarts the celebration and preserves an appropriate status message without duplicating nodes.
9. Verify the short pending indicator appears and is removed deterministically.
10. Scan fixture CSS and computed animation data to reject rapid alternating cycles, blinking, steps-based flashing, and short infinitely repeated opacity or color animations.
11. Verify exactly three hints and five closed solution sections.
12. Verify the outer Exercise and fixture remain within the documented axe boundary before and after preference changes.

## Task 8: Complete project verification

### Work

1. Run the focused motion, method-listing, Exercise-listing, Learning-path, journey, architecture, breadcrumb, and axe tests under Node.js 24.
2. Run Astro diagnostics and the production build.
3. Run the complete Playwright suite on the default port `4321`.
4. Review the method, Exercise, and fixture at desktop and mobile widths in light and dark themes, before and after assisted reduction.
5. Review the fixture with real reduced-motion emulation and confirm the five findings and passing comparisons without prolonged observation.
6. Manually review source animation and transition definitions against the no-hazardous-flashing boundary.
7. Verify public routes in the sitemap and generated internal links.
8. Run `git diff --check` and inspect the final diff for unrelated changes.

## Out of scope

- Rendering or interactively measuring hazardous flashing.
- A specialist flashing-analysis tool.
- Time limits, session expiry, media autoplay, and media-player accessibility.
- A complex carousel or composite-widget fixture.
- Global site motion controls or a product-wide preference simulator.
- Mobile orientation, touch targets, and gesture alternatives.
- Modifying either existing Testing journey to include unrelated motion testing.
- Adding the separately planned mobile touch and orientation pair.
- Treating the deliberately incomplete fixture as production-ready parcel-tracking code.

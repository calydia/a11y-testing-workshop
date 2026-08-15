# Forced colors method and Exercise implementation plan

## Goal

Publish a beginner Testing method and standalone public-transport journey-planner Exercise for testing forced-colors behavior through a real compatible environment or a clearly limited assisted simulation, then integrate the pair into the first Learning path.

## Task 1: Pin the content graph and learning contract

### Files

- Create: `tests/forced-colors-exercise.spec.js`
- Modify: `tests/screen-reader-methods.spec.js`
- Modify: `tests/exercise-architecture.spec.js`
- Modify: `tests/learning-path.spec.js`
- Modify: `tests/axe-core.spec.js`

### Work

1. Add failing assertions for the method route, beginner metadata, 20-minute estimate, forced-colors terminology, environment-first procedure, simulation limitation, interpretation guidance, and Exercise relationship.
2. Add failing assertions for the Exercise route, beginner metadata, 20-minute estimate, exactly five findings, three hints, method relationship, standalone workflow, passing comparisons, and closed solution.
3. Pin the method at order `9`, after text spacing and before zoom/reflow. Shift zoom to `10`, automated testing to `11`, structure and links to `12`, data tables to `13`, and controls to `14`; preserve every other method's relative sequence.
4. Pin the Exercise at order `27`, after the text-spacing Exercise and before the high-zoom Exercise.
5. Pin the pair after text spacing and before zoom/reflow in `Your first accessibility review`, including its 330-minute estimate and revised visual-testing scope.
6. Confirm neither existing Testing journey changes as an incidental consequence of the new pair.
7. Add both learner-facing routes to automated accessibility coverage.

## Task 2: Create and register the journey-planner fixture

### Files

- Create: `src/components/exercise/fixtures/PublicTransportJourneyPlannerFixture.astro`
- Modify: `src/exercises/fixture-registry.ts`

### Work

1. Build a realistic public-transport journey planner with travel-mode selection, origin and destination fields, route summaries, interchange information, route diagrams, and route actions.
2. Ensure the initial condition appears complete and usable in both Lab themes and at desktop and 390px widths.
3. Add exactly five approved targets without answer labels:
   - a selected travel mode whose visible and programmatic state is lost;
   - an essential interchange icon supplied only as a CSS background image;
   - custom journey fields whose boundaries depend on background and box shadow;
   - one route action whose focus indicator depends only on box shadow;
   - a route diagram whose alternatives depend only on authored line colors.
4. Add passing comparisons for selected state, an essential labelled inline icon, input boundaries, outline focus, route labels or patterns, and decorative styling.
5. Preserve the explicit return link, saved theme, usable ordinary controls, and responsive reflow.
6. Register `public-transport-journey-planner` as a shared document fixture with exactly five intentional-violation identifiers.

## Task 3: Implement real and assisted forced-colors states

### Files

- Modify: `src/components/exercise/fixtures/PublicTransportJourneyPlannerFixture.astro`

### Work

1. Implement the real condition with scoped `@media (forced-colors: active)` rules.
2. Add one native assisted-simulation button with `aria-pressed="false"`, an unambiguous accessible name, and nearby text that identifies it as a learning aid rather than a complete platform emulation.
3. Toggle a single fixture-root simulation state and change the button's visible label and pressed state; reset must remove the state completely.
4. Group the real and simulated selectors so both conditions expose the same five semantic learning outcomes while allowing rendered system colors to vary.
5. Keep the assisted control visible, named, keyboard operable, focused visibly, and resettable in every condition.
6. Avoid global simulation styles and avoid presenting the control as a site-level forced-colors tester.

## Task 4: Publish the Testing method

### Files

- Create: `src/content/testing-methods/testing-forced-colors-and-high-contrast.md`

### Work

1. Add published beginner metadata at order `9`, a 20-minute estimate, appropriate browser/operating-system/developer-tools tooling, and the related Exercise.
2. Distinguish CSS forced colors, Windows contrast themes, authored themes, ordinary contrast preferences, `prefers-contrast`, and broader low-vision testing.
3. Write outcomes and a repeatable procedure covering environment recording, initial review, real or assisted activation, keyboard operation, CSS inspection, reset, and evidence recording.
4. Cover text, essential graphics, control boundaries, visible focus, selected and changed states, CSS background images, diagrams, system colors, and cautious use of `forced-color-adjust`.
5. Explain expected user-agent color substitution and distinguish changed branding from lost information or operation.
6. Explain that accessibility-tree and screen-reader checks can support state inspection but cannot verify visible distinctions.
7. State the simulation's limitations and avoid prescribing one exact Windows contrast theme or visual result.

## Task 5: Publish the Exercise

### Files

- Create: `src/content/exercises/testing-forced-colors-in-a-journey-planner.md`

### Work

1. Add published beginner `find-issues` metadata at order `27`, a 20-minute estimate, fixture ID, method reference, and exactly five expected findings.
2. Write objectives and instructions covering environment choice, initial comparison, activation, keyboard use, state inspection, reset, passing checks, and evidence limitations.
3. Add the three approved progressive hints, ending with the five affected regions without exposing corrections.
4. Add exactly five closed solution entries with cause, impact, evidence, and flexible remediation direction.
5. Prefer structural cues and system-compatible styling in remediation guidance; do not recommend broad `forced-color-adjust: none` use.

## Task 6: Integrate the Learning path

### Files

- Modify: `src/content/learning-paths/your-first-accessibility-review.md`

### Work

1. Insert the method and Exercise after the text-spacing pair and before zoom and reflow.
2. Increase the estimate from 290 to 330 minutes.
3. Update summary, description, topics, and outcomes to include forced-colors testing without implying exhaustive low-vision coverage.
4. Preserve all existing pairs, the screen-reader preparation checkpoint, and the authored order.

## Task 7: Verify intentional and passing behavior

### Files

- Complete: `tests/forced-colors-exercise.spec.js`

### Work

1. Verify the document boundary, return route, saved theme, responsive fit, unique IDs, and absence of answer leakage.
2. Verify all information and operation are present in the initial state.
3. Use Playwright `forcedColors: 'active'` media emulation to verify each approved target and passing comparison without relying on exact system RGB values.
4. Verify the assisted simulation exposes the same five outcomes and that its label, explanation, `aria-pressed` state, keyboard activation, visible focus, reset, and repeated toggling are deterministic.
5. Verify the travel-mode target lacks durable visible and programmatic selected state only as the documented first finding.
6. Verify the CSS background image, field boundary, box-shadow focus indicator, and route-color distinctions are unavailable only in the changed condition.
7. Verify passing state, icon, field, focus, route, and ordinary-content comparisons remain usable.
8. Verify exactly three hints and five closed solution sections.
9. Verify the outer Exercise and fixture remain within the documented axe boundary in light, dark, simulated, and emulated forced-colors conditions.

## Task 8: Complete project verification

### Work

1. Run the focused forced-colors, method-listing, Exercise-listing, Learning-path, architecture, breadcrumb, and axe tests under Node.js 24.
2. Run Astro diagnostics and the production build.
3. Run the complete Playwright suite on the default port `4321`.
4. Review the method, Exercise, and fixture at desktop and mobile widths in light and dark themes, before and after simulation.
5. Review the fixture under Playwright's real forced-colors emulation and confirm all five findings and passing comparisons are understandable without exact-color assumptions.
6. Verify the public routes appear in the sitemap and generated internal links resolve.
7. Run `git diff --check` and inspect the final diff for unrelated changes.

## Out of scope

- Claiming that the assisted simulation duplicates Windows or every browser.
- Comprehensive `prefers-contrast` testing or one prescribed contrast theme.
- A site-wide forced-colors simulation or theme builder.
- Zoom, magnification, text-spacing, reduced-motion, flashing, orientation, target-size, or gesture testing.
- Complex charts, maps, canvas, or data visualization.
- Modifying either existing Testing journey solely to include the new method.
- Adding the separately planned motion or mobile-touch pairs.
- Treating the deliberately incomplete fixture as production-ready journey-planner code.

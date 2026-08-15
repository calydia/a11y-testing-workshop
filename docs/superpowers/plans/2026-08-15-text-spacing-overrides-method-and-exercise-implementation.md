# Text-spacing overrides method and Exercise implementation plan

## Goal

Publish a beginner Testing method and standalone Exercise for applying the complete WCAG text-spacing condition and detecting loss of content or functionality, then integrate the pair into the first Learning path and course-registration Testing journey.

## Task 1: Pin the content graph and learning contract

### Files

- Create: `tests/text-spacing-overrides-exercise.spec.js`
- Modify: `tests/screen-reader-methods.spec.js`
- Modify: `tests/exercise-architecture.spec.js`
- Modify: `tests/learning-path.spec.js`
- Modify: `tests/testing-journey.spec.js`
- Modify: `tests/axe-core.spec.js`

### Work

1. Add failing assertions for the method route, beginner metadata, 20-minute estimate, all four WCAG values, procedure, interpretation, limitations, and Exercise relationship.
2. Add failing assertions for the Exercise route, beginner metadata, exactly five findings, three hints, method relationship, standalone workflow, passing comparisons, and closed solution.
3. Pin method order `7.5` between visual accessibility and zoom/reflow, and Exercise order `25` between the visual-dashboard and high-zoom Exercises.
4. Pin the pair after visual accessibility in `Your first accessibility review`, including its 290-minute estimate and updated learning outcomes.
5. Pin the method in the course-registration journey's ordered method list, responsive-conditions stage, consolidation, evidence guidance, and 105-minute estimate while preserving six stages and five deliverables.
6. Add both learner-facing routes to automated accessibility coverage.

## Task 2: Create and register the community-services fixture

### Files

- Create: `src/components/exercise/fixtures/CommunityServicesTextSpacingFixture.astro`
- Modify: `src/exercises/fixture-registry.ts`

### Work

1. Build a realistic community support directory with service navigation, an introductory panel, an important notice, service cards, opening information, and contact actions.
2. Ensure the initial state exposes all content and functionality before the override is applied.
3. Add exactly the five approved post-override findings without answer labels:
   - a fixed-height introduction that clips its final lines;
   - a fixed-dimension service card whose heading overlaps its description;
   - a fixed-width, single-line navigation item that truncates its label;
   - an important notice whose line clamp hides paragraph content;
   - a fixed-size contact button that clips its complete label.
4. Add passing comparisons: flexible cards, wrapping navigation links, ordinary paragraphs and notices, and growing buttons.
5. Preserve saved Lab theme, responsive layout at 390px, visible focus, and the explicit return link.
6. Register `community-services-text-spacing` through the shared document-fixture route contract.

## Task 3: Implement the assisted text-spacing condition

### Files

- Modify: `src/components/exercise/fixtures/CommunityServicesTextSpacingFixture.astro`

### Work

1. Add one native button initially labelled `Apply test text spacing` with `aria-pressed="false"`.
2. On activation, inject one uniquely identified stylesheet that applies all four values with sufficient cascade priority:
   - `line-height: 1.5`;
   - `letter-spacing: 0.12em`;
   - `word-spacing: 0.16em`;
   - paragraph end margin of `2em`.
3. Change the button to `aria-pressed="true"` and visible label `Reset text spacing`.
4. On reset, remove the stylesheet and restore the initial state and label.
5. Make repeated toggling deterministic and prevent duplicate injected styles.
6. Keep the control fully visible, operable, and correctly named under the override at desktop and narrow widths.

## Task 4: Publish the Testing method

### Files

- Create: `src/content/testing-methods/testing-text-spacing-and-user-overrides.md`

### Work

1. Add published beginner metadata at order `7.5`, a 20-minute estimate, browser/developer-tools/user-style tooling, and the related Exercise.
2. Write outcomes for applying the complete condition, confirming computed values, inspecting loss, resetting to establish causation, and recording passing behavior.
3. State the four WCAG values accurately and explain that the page need not use them by default.
4. Write a repeatable environment-first procedure covering representative content and controls in initial, overridden, and reset states.
5. Cover reliable extensions, bookmarklets, user stylesheets, developer tools, and the Exercise aid without requiring a particular product.
6. Add interpretation guidance for expected layout changes, wrapping, container growth, broken override tools, and combined-condition testing.
7. Explicitly defer forced colors, zoom/reflow, text resizing, font replacement, and broad low-vision or cognitive-accessibility claims.

## Task 5: Publish the Exercise

### Files

- Create: `src/content/exercises/testing-text-spacing-on-a-community-services-page.md`

### Work

1. Add published beginner `find-issues` metadata at order `25`, a 20-minute estimate, fixture ID, method reference, and exactly five expected findings.
2. Write objectives and instructions covering the initial review, applying and confirming the condition, checking every text-bearing region, resetting, and recording passing comparisons.
3. Add the three approved progressive hints: container growth, wrapping/truncation/overlap, then the five affected regions.
4. Add exactly five solution entries, one for each approved target, with layout cause, user impact, and flexible remediation direction.
5. Explain representative passing behavior and warn that a broken override mechanism is not page evidence.

## Task 6: Integrate the Learning path

### Files

- Modify: `src/content/learning-paths/your-first-accessibility-review.md`

### Work

1. Insert the method and Exercise immediately after the visual pair and before zoom and reflow.
2. Increase the estimate from 250 to 290 minutes.
3. Update summary, description, topics, and outcomes to distinguish authored visual review from text-spacing override testing.
4. Preserve every existing pair, checkpoint, and authored sequence.

## Task 7: Integrate the course-registration Testing journey

### Files

- Modify: `src/content/testing-journeys/reviewing-a-course-registration-before-launch.md`

### Work

1. Add the method after visual accessibility and before zoom/reflow in the ordered method list.
2. Increase the estimate from 90 to 105 minutes.
3. Extend `Test responsive conditions` to apply and verify the complete text-spacing condition alongside zoom, text resizing, and reflow.
4. Include the method in consolidation and relevant evidence guidance.
5. Preserve the six stages, five deliverables, existing course-registration fixture, and forms Exercise finding boundary.
6. Treat a passing text-spacing result on the journey workspace as useful evidence rather than manufacturing another defect.

## Task 8: Verify intentional and passing behavior

### Files

- Complete: `tests/text-spacing-overrides-exercise.spec.js`

### Work

1. Verify the fixture document boundary, return route, saved theme, narrow-width fit, unique IDs, and absence of answer leakage.
2. Verify all initial content is complete before activation.
3. Verify the injected stylesheet contains all four values and appears only once.
4. Verify the assisted control's name, pressed state, keyboard operation, visible focus, and reset behavior.
5. Use geometry and overflow assertions to verify each approved target fails only after activation.
6. Verify passing comparison elements grow or wrap without losing content.
7. Verify reset restores representative initial dimensions and repeated toggles remain deterministic.
8. Verify exactly three hints and five closed solution sections.
9. Verify expected axe results in light and dark themes before and after activation contain no unrelated violations.

## Task 9: Complete project verification

### Work

1. Run the focused text-spacing, method, Exercise, path, journey, architecture, breadcrumb, and axe tests under Node.js 24.
2. Run Astro diagnostics and the production build.
3. Run the complete Playwright suite on the default port `4321`.
4. Review the method, Exercise, and fixture at desktop/mobile widths in light and dark themes, before and after activation.
5. Confirm manually that exactly five losses are visually apparent and the passing comparisons remain complete.
6. Crawl generated internal links and verify the new routes appear in the sitemap.
7. Run `git diff --check` and inspect the final diff for unrelated changes.

## Out of scope

- Forced-colors and operating-system high-contrast modes.
- Browser zoom, text-only resizing, and reflow procedures already covered elsewhere.
- Font replacement and broad custom-user-stylesheet testing.
- Motion, animation, flashing, or color-preference testing.
- Diagnosing each spacing property in isolation.
- Changes to the course-registration fixture or forms Exercise findings.
- A new Learning path or Testing journey.
- Treating the deliberately incomplete fixture as production-ready directory code.

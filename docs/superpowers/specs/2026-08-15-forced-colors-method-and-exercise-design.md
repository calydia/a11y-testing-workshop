# Forced colors method and Exercise design

## Goal

Add a beginner Testing method and paired Exercise that teach learners to identify information and functionality lost in forced-colors environments without treating ordinary visual changes as defects.

Create:

- `/methods/testing-forced-colors-and-high-contrast/`
- `/exercises/testing-forced-colors-in-a-journey-planner/`
- `/exercise-fixtures/public-transport-journey-planner/`

Estimate 20 minutes for the method and 20 minutes for the Exercise. Place the method after `Testing text spacing and user overrides` and before `Testing zoom and reflow`. Place its Exercise immediately after the text-spacing Exercise and before the zoom-and-reflow Exercise. Shift later integer orders where required while preserving their learner-facing sequence.

Connect the method and Exercise bidirectionally. Insert the pair into `Your first accessibility review` after the text-spacing pair and before zoom and reflow. Increase that path's duration by 40 minutes. Do not add the pair to either existing Testing journey unless its scenario and tasks genuinely exercise the new method; the current journeys need not change merely to include every new page.

## Scope and terminology

The method focuses on the CSS `forced-colors` media feature and the experience commonly available through Windows contrast themes in compatible browsers. It distinguishes this from:

- the Lab's light and dark themes;
- ordinary authored high-contrast themes;
- browser or operating-system contrast preferences that do not activate CSS forced colors;
- the `prefers-contrast` media feature;
- broader low-vision and magnification testing.

Use **forced colors** for the CSS/browser behavior and **contrast theme or setting** when discussing the operating-system configuration. The page title retains “high contrast” because learners may search using that term, but the content must not imply that all high-contrast settings behave identically.

The method teaches a hybrid workflow. A real compatible environment is the preferred source of evidence. The Lab also provides an assisted simulation so learners without that environment can practise the inspection sequence. The simulation must be labelled as a learning aid and must not claim to reproduce every browser, operating-system, system-color, or user-configuration result.

The method does not make a conformance claim, prescribe one required color appearance, or treat loss of branding and decorative styling as a failure when information and operation remain available.

## Testing method content

Publish `Testing forced colors and high contrast` as a beginner method with an estimated duration of 20 minutes. It should teach learners to:

1. Record the operating system, browser, theme, contrast configuration, viewport, and page state.
2. Review representative text, controls, selection, focus, icons, and diagrams before changing the environment.
3. Enable a real forced-colors environment where available, or use the clearly labelled Lab simulation.
4. Check whether information, relationships, boundaries, states, focus, and operation remain available rather than comparing visual fidelity.
5. Operate relevant controls with a keyboard and verify their exposed names and states.
6. Inspect CSS when necessary, including background images, box shadows, transparent borders, system colors, and `forced-color-adjust`.
7. Restore the original condition, repeat the comparison, and record actual behavior, expected behavior, user impact, limitations, passing checks, and remediation direction.

Explain that user-agent color substitution is expected. Authors should generally allow system colors to work and add durable structural cues. `forced-color-adjust: none` is an exceptional tool for content whose colors must remain meaningful; it is not a general way to preserve branding or override user preferences.

Cover these common checks:

- text and essential graphics remain perceivable;
- controls retain visible boundaries, names, roles, states, and values;
- selected, expanded, checked, current, invalid, and disabled states remain distinguishable;
- keyboard focus remains visible;
- CSS background images do not carry unique essential information;
- diagrams and data distinctions retain labels, patterns, shapes, or other non-color cues;
- custom components use system colors or other forced-colors-aware styling where native behavior is insufficient.

Mention that screen-reader and accessibility-tree inspection can support state verification but cannot establish whether a visual distinction or focus indicator is perceivable.

## Exercise and standalone workflow

Publish `Testing forced colors in a journey planner` as a beginner, find-issues Exercise with an estimated duration of 20 minutes. Its standalone fixture presents a public-transport journey planner with travel-mode selection, origin and destination fields, route results, interchange information, and route actions.

The normal state should appear complete and usable. The fixture provides an assisted control that applies and resets a stable forced-colors learning simulation. Its accessible name and nearby explanation must state that it is a simulation and direct learners to use a real forced-colors environment when available. Activation must be keyboard operable, expose state with `aria-pressed`, remain visible in both conditions, and reset deterministically.

Do not force a new tab. The outer Exercise uses the established standalone-first workflow and tells learners to return for hints or the solution when ready or when they need support.

## Intentional findings

The fixture contains exactly five intentional findings. It must not label targets as defective, reveal answers through comments or diagnostic attributes, or make every component fail.

1. **The selected travel mode loses its visible distinction.**
   Selection relies on an authored background color that is replaced. No durable visible text, shape, or border distinguishes the selected mode. The control also omits a programmatic selected or pressed state, so state inspection confirms the incomplete implementation.

2. **An essential interchange icon disappears.**
   The icon is a CSS background image and supplies unique interchange meaning without adjacent equivalent text. It is unavailable in the forced-colors condition.

3. **Custom journey-field boundaries disappear.**
   The affected inputs remove their native border and rely on an authored background and box shadow. Those cues disappear, leaving the editable regions difficult to identify. A nearby native or forced-colors-aware field provides a passing comparison.

4. **One route action loses its focus indicator.**
   Its focus treatment relies only on a box shadow that is suppressed in forced colors. The control remains keyboard operable, and a nearby action using an outline provides a passing comparison.

5. **Alternative routes become indistinguishable in a route diagram.**
   Two routes use authored line colors as the only distinction at the point of use. The colors collapse to the same system presentation. A nearby text summary or labelled comparison demonstrates a durable alternative without giving away the finding.

The initial state must not exhibit these losses. Both the real Playwright forced-colors condition and the assisted simulation must expose the same five learning outcomes deterministically, although their exact rendered colors may differ.

## Passing comparisons and defect boundaries

Include passing examples for:

- a selected control whose programmatic state and forced-colors-aware border remain available;
- an essential inline icon with equivalent visible text;
- a standard or forced-colors-aware input boundary;
- an outline-based focus indicator;
- route information distinguished with text or patterns in addition to color;
- ordinary text and decorative styling that change appearance without losing meaning.

Keep the Exercise about forced-colors behavior. Do not introduce unrelated low contrast, inaccessible names on otherwise passing controls, broken tab order, clipped text, reflow failures, or screen-reader-only findings. The deliberately incomplete selected-state implementation is part of the first approved finding, not an additional finding.

## Exercise learning contract

The Exercise objectives and instructions ask learners to:

- record their environment and whether they used a real forced-colors setting or the simulation;
- compare the complete initial page with the changed condition;
- inspect text, icons, boundaries, selection, focus, controls, and route distinctions;
- operate controls with a keyboard and inspect programmatic state where relevant;
- identify exactly five losses of information or interaction;
- record useful passing comparisons and expected visual changes that are not defects;
- reset and reapply the condition to confirm causation;
- record actual behavior, expected behavior, user impact, environmental limitations, and remediation direction.

Provide three progressive hints:

1. Direct attention to information that depends on authored colors, backgrounds, shadows, or images.
2. Ask learners to compare selected states, field boundaries, keyboard focus, interchange meaning, and route distinctions.
3. Point to the travel-mode selector, journey fields, one route action, interchange information, and route diagram without stating the corrections.

The solution stays closed by default and contains exactly five finding sections. Each section explains the cause, impact, evidence to record, and a flexible remediation direction. It also identifies representative passing behavior. The solution must not recommend broadly applying `forced-color-adjust: none`; it should prefer durable cues and system-compatible styling.

## Component and data architecture

Follow the existing document-fixture architecture:

- add a focused `PublicTransportJourneyPlannerFixture.astro` component;
- register it in `src/exercises/fixture-registry.ts` as a document fixture;
- keep the fixture key, title, and intentional-violation identifiers in the registry;
- author the method and Exercise through the existing Astro content collections;
- use the established shared method, Exercise, metadata, breadcrumb, section-navigation, hints, solution, theme, and standalone-workspace components.

Keep simulation state local to the fixture. A single control toggles one root state or one injected stylesheet; reset removes that state completely. Avoid a site-wide forced-colors simulator because it would broaden the feature beyond the Exercise and could be mistaken for a product-level accessibility tool.

Use actual `@media (forced-colors: active)` rules for the real environment and a parallel scoped simulation state for learners without it. Share CSS custom properties or tightly grouped selectors where practical so the two paths represent the same intended outcomes without coupling unrelated site styles.

## Learning graph and routing

Update collection orders, section-listing expectations, shared section navigation, accessibility route coverage, and the first Learning path in one change. The new pair remains independently useful to direct visitors; the path is recommended sequencing rather than a prerequisite gate.

Do not modify `Practical screen-reader testing`. Do not automatically add the method to the course-registration or conference-programme journeys. Their scenarios, stages, durations, and evidence contracts remain stable until a deliberate journey expansion is designed.

No redirects are needed because these are new routes. Both public pages should be indexable and appear in the sitemap. The fixture route follows the existing standalone Exercise convention and is not promoted as a primary content page.

## Verification

Add focused automated coverage for:

- method and Exercise routes, metadata, collection order, and bidirectional links;
- exactly five registry findings, three progressive hints, and five closed solution sections;
- complete initial content before either test condition is active;
- the assisted simulation's accessible name, explanation, `aria-pressed` state, keyboard operation, reset, and repeated toggling;
- real `forced-colors: active` media emulation exposing all five approved outcomes;
- the assisted simulation exposing the same five approved outcomes;
- the selected control losing its durable visible distinction and lacking exposed selected state;
- the interchange meaning, affected field boundaries, one focus indicator, and diagram distinctions becoming unavailable only in the changed condition;
- passing comparison states, icons, inputs, focus indicators, route labels or patterns, and ordinary content remaining usable;
- theme inheritance, narrow-width fit, and no answer leakage in fixture markup;
- the outer Exercise and all non-intentionally defective fixture content staying within the expected axe boundary;
- updated first-path sequence and duration, Testing-method and Exercise listings, section navigation, sitemap output, and production build.

Playwright color assertions should prefer semantic or computed relationships over exact RGB values because system-color rendering varies. Tests may assert disappearance, matching versus distinct computed styles, borders, outlines, background images, state attributes, geometry, and accessible text as appropriate.

## Out of scope

- claiming that the assisted simulation duplicates Windows or every browser;
- comprehensive `prefers-contrast` testing;
- prescribing or testing one exact Windows contrast theme;
- magnification, zoom, text-spacing, reduced-motion, orientation, touch-target, or gesture testing;
- a general-purpose site theme or contrast-theme builder;
- complex charts, maps, canvas, or data-visualization remediation;
- modifying existing journeys solely to increase method coverage;
- adding the separately planned motion or mobile-touch content pairs.

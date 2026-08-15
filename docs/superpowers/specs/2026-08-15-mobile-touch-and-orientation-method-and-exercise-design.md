# Mobile touch and orientation method and Exercise design

## Goal

Add a beginner Testing method and paired Exercise that teach learners to test touch-target size and spacing, orientation support, gesture alternatives, and pointer cancellation through a real-device-first and emulation-assisted workflow.

Create:

- `/methods/testing-mobile-touch-and-orientation/`
- `/exercises/testing-touch-interaction-on-a-community-festival-map/`
- `/exercise-fixtures/community-festival-touch/`

Estimate 25 minutes for the method and 25 minutes for the Exercise. Place the method after `Testing motion, animation, and flashing` and before `Testing zoom and reflow`. Place its Exercise after the motion Exercise and before the high-zoom Exercise. Shift later integer orders where necessary without changing their learner-facing sequence.

Connect the method and Exercise bidirectionally. Insert the pair into `Your first accessibility review` after motion testing and before zoom and reflow. Increase the path estimate from 370 to 420 minutes. Do not add the method to either existing Testing journey because their workspaces were not designed around touch gestures or orientation changes.

## Scope

The method covers four practical areas:

- minimum target size and target spacing;
- portrait and landscape orientation;
- alternatives to multipoint and path-based gestures;
- pointer cancellation for single-pointer operation.

Keep these topics outside this pair:

- mobile screen-reader navigation and platform-specific screen-reader gestures;
- hover-only content and hover/focus dismissal;
- drag-and-drop widgets and movable content;
- platform assistive-touch features, switch control, voice control, and stylus-specific behavior;
- complex map accessibility beyond the approved gesture checks;
- responsive reflow and magnification already covered by other methods;
- testing with disabled people as though it were reproducible through emulation.

The method is real-device-first. Prefer an actual touchscreen phone or tablet for the primary evidence. Browser device emulation is useful for preliminary layout, orientation, CSS-pixel, and pointer-event checks, but it cannot establish physical reach, motor effort, accidental activation, tactile interaction, device-specific browser behavior, or compatibility with mobile assistive technology.

## Target-size interpretation

Teach the WCAG 2.2 Target Size (Minimum) baseline of at least 24 by 24 CSS pixels or sufficient spacing so that a 24-CSS-pixel-diameter circle centered on one undersized target does not intersect another target or another such circle. Explain the defined exceptions rather than treating every undersized target as a failure:

- spacing provides the required separation;
- an equivalent control on the same page meets the requirement;
- the target is inline in a sentence or otherwise constrained by line height;
- the target size is determined by the user agent and not modified by the author;
- the particular presentation is essential or legally required.

The method should link to the authoritative WCAG understanding page and state that larger targets may still be preferable for usability. CSS pixels are not the same as physical dimensions, and a computed 24-by-24 box does not prove that a target is comfortable or easy to reach on a real device.

## Testing method content

Publish `Testing mobile touch and orientation` as a beginner Testing method with a 25-minute estimate. It should teach learners to:

1. Record the device, operating system, browser and versions, viewport, browser zoom, input type, orientation, and relevant page state.
2. Complete representative tasks with direct touch on a real device where possible.
3. Identify interactive targets, measure their rendered boxes in CSS pixels, and assess target-to-target spacing and applicable exceptions.
4. Rotate between portrait and landscape without refreshing. Confirm that content and functionality remain available and that any orientation restriction is essential.
5. Inventory multipoint and path-based gestures, including pinch and direction-dependent swipes, then find and operate a simpler single-pointer alternative.
6. For single-pointer actions, test pressing, moving away, cancelling where supported, and releasing. Confirm that an irreversible or consequential action does not complete merely on touch-down unless an allowed exception applies.
7. Repeat preliminary checks with browser emulation where useful and distinguish those observations from real-device evidence.
8. Record the affected target or task, environment, orientation, input and gesture, actual and expected behavior, user impact, exceptions considered, passing comparisons, limitations, and remediation direction.

Explain that orientation may be restricted only when a specific display orientation is essential. A layout preference, simpler implementation, or design optimized for one orientation does not make it essential.

For gesture alternatives, explain that functionality using multipoint or path-based gestures should also work with a single pointer without a path-based gesture unless that gesture is essential. Examples include zoom buttons beside pinch zoom and previous/next buttons beside swipe navigation.

For pointer cancellation, cover completion on the up event, aborting before completion, undoing after completion, and the narrow situations where completing on the down event is essential. Keep this as a testing procedure rather than an exhaustive event-programming tutorial.

## Exercise and standalone workflow

Publish `Testing touch interaction on a community-festival map` as a beginner, find-issues Exercise with a 25-minute estimate. The standalone workspace presents a festival map, map controls, schedule cards, saved sessions, orientation-dependent content, and valid touch-interaction comparisons.

The fixture should respond to real viewport orientation and standard pointer events. A narrow landscape condition should expose the seeded orientation restriction. Constrain it to phone-like landscape dimensions so ordinary desktop landscape layouts are not hidden.

Provide one assisted orientation control for learners who cannot rotate the current device. It adds a fixture-scoped simulated-landscape state, exposes `aria-pressed`, remains keyboard operable and visibly focused, resets deterministically, and states that it is a layout learning aid rather than a reproduction of physical-device behavior.

Use standard pointer events rather than touch-only event APIs so the implementation can distinguish pointer IDs and cancellation while retaining testability. Mouse interaction may support preliminary exploration but must not be described as proof of real touch usability.

Do not force a new tab. Use the established standalone-first workflow and tell learners to return to the Exercise when ready to continue or when they need hints or the solution.

## Intentional findings

The fixture contains exactly five intentional findings. Do not reveal them through comments, class names, data attributes, or accessible text.

1. **A cluster of map controls has undersized and insufficiently spaced targets.**
   Several authored controls render below 24 by 24 CSS pixels, and their center spacing does not satisfy the spacing alternative. None of the approved exceptions applies. Treat the cluster as one finding rather than one finding per button.

2. **A narrow landscape orientation hides useful content.**
   The fixture covers the map and schedule with a message telling the learner to rotate back to portrait, even though portrait orientation is not essential. The assisted state exposes the same restriction for layout practice.

3. **Map zoom is available only through a two-pointer pinch.**
   A deterministic two-pointer sequence changes the map scale. No plus/minus buttons or other single-pointer alternative is provided. A separate tap-operated map action remains as a passing comparison.

4. **Schedule navigation requires a horizontal path gesture.**
   A sufficiently long horizontal swipe changes the visible schedule card. No previous/next controls are available for that component. A separate comparison component supports buttons and may also enhance them with swipe.

5. **Removing a saved session completes on pointer-down without cancellation or undo.**
   The session disappears when the pointer is pressed, before release. Moving away or dispatching `pointercancel` does not restore it, and no undo is available. A separate comparison removal completes on pointer-up and provides visible confirmation.

## Passing comparisons and defect boundary

Include passing examples for:

- a separate group of controls at least 24 by 24 CSS pixels with sufficient spacing;
- ordinary content that reflows in portrait and landscape outside the deliberately blocking fixture region;
- a map-centering action operable with one tap or click;
- a comparison schedule component with visible previous and next buttons, optionally enhanced by swipe;
- a removal action that completes on release and provides confirmation;
- ordinary native links and buttons with visible keyboard focus.

Keep target geometry stable and deterministic at the test viewport. Do not rely on browser-default form controls for the seeded target-size finding because user-agent dimensions can vary.

Do not introduce unrelated missing names, keyboard traps, stale states, low contrast, animation defects, horizontal page overflow, text clipping, screen-reader-only findings, or real destructive actions. All saved sessions and removals are fictional fixture state restored by reloading.

## Exercise learning contract

The Exercise objectives and steps ask learners to:

- record the real device or emulation environment and its limitations;
- complete representative actions with direct touch where possible;
- measure the map-control cluster and assess spacing and exceptions;
- compare portrait and narrow landscape without refreshing, or use the assisted layout state;
- test the map with pinch and search for a single-pointer zoom alternative;
- test schedule navigation and search for non-path controls;
- press, move away, cancel, and release removal actions;
- identify exactly five findings and useful passing comparisons;
- reset or reload the fixture and repeat representative behavior;
- record actual and expected behavior, user impact, exceptions, limitations, and remediation direction.

Provide three progressive hints:

1. Ask learners to inspect target geometry, both orientations, required fingers and paths, and when an action completes.
2. Direct attention to crowded map controls, content hidden on rotation, pinch and swipe interactions, and cancellation before release.
3. Point to the map-control cluster, landscape message, map zoom, main schedule cards, and saved-session removal without stating corrections.

The solution stays closed by default and contains exactly five finding sections. Each explains the condition, interaction sequence, expected behavior, user impact, relevant exception boundary, and flexible remediation direction. It should also identify passing behavior and limitations of emulation.

## Component and state architecture

Follow the existing document-fixture architecture:

- add `CommunityFestivalTouchFixture.astro`;
- register `community-festival-touch` in `src/exercises/fixture-registry.ts` with five intentional-violation identifiers;
- author the method and Exercise through existing Astro content collections;
- reuse the shared method, Exercise, metadata, breadcrumb, section-navigation, disclosure, theme, and standalone-workspace components.

Keep fixture state isolated:

- one root class represents assisted narrow-landscape layout;
- a CSS media query handles real narrow landscape;
- a pointer-ID map handles the two-pointer pinch sequence and updates one map-scale value;
- one pointer start position and threshold handle swipe-only schedule navigation;
- a separate comparison schedule uses native previous and next buttons;
- the seeded removal listens on pointer-down and deliberately lacks cancellation or undo;
- the passing removal listens for pointer-up and writes a confirmation message;
- reload restores all fictional content.

Scripts should use pointer capture only where it supports the intended interaction, release it safely, handle missing elements, and avoid duplicated listeners or stale pointer IDs. Pointer-cancel handling must be deliberate: the seeded target remains removed, while passing behavior does not complete a pending action after cancellation.

## Learning graph and routing

Update collection order, Testing-method and Exercise listings, section navigation, accessibility route coverage, and `Your first accessibility review` in one change. Increase the path estimate to 420 minutes and update its summary, description, topics, and outcomes without implying comprehensive mobile or assistive-technology coverage.

The pair remains self-contained for direct visitors; the path is recommended sequencing rather than a prerequisite gate.

Do not modify `Practical screen-reader testing`. Do not add the method to the course-registration or conference-programme journeys. A future mobile-focused journey may use it when its workspace is deliberately designed for touch and orientation testing.

No redirects are needed. Both public pages should be indexable and appear in the sitemap. The fixture follows the existing standalone Exercise routing convention.

## Verification

Add focused automated coverage for:

- method and Exercise routes, beginner metadata, 25-minute estimates, collection order, and bidirectional links;
- exactly five registry findings, three progressive hints, and five closed solution sections;
- real touch-capable browser context and standard pointer-event behavior;
- computed widths, heights, centers, and spacing for seeded and passing target groups;
- the seeded cluster failing the size-and-spacing baseline without multiplying the finding count;
- portrait content availability, real narrow-landscape blocking behavior, desktop-landscape availability, and assisted-landscape parity;
- the assisted orientation control's label, limitation text, `aria-pressed`, keyboard operation, visible focus, reset, and repeated toggling;
- a deterministic two-pointer pinch changing map scale while no single-pointer zoom alternative exists;
- the passing one-tap map action remaining operable;
- a deterministic horizontal swipe changing the main schedule and the absence of previous/next controls for that component;
- the comparison schedule's previous and next buttons changing its current card;
- seeded removal completing on pointer-down and remaining removed after pointer movement, cancellation, and release;
- passing removal waiting for pointer-up, aborting after pointer-cancel, and exposing confirmation after completion;
- light and dark themes, portrait and landscape-sized viewports, visible keyboard focus, no page-level horizontal overflow, and no answer leakage;
- the outer Exercise and non-intentionally defective fixture behavior staying within the expected axe boundary;
- the first-path 420-minute estimate and exact sequence;
- unchanged method lists, stages, and estimates in both existing Testing journeys, except their dynamically rendered recommended-path duration;
- sitemap inclusion, internal links, Astro diagnostics, production build, and the complete Playwright suite.

Geometry tests should use rendered CSS-pixel rectangles and center distances rather than screenshots. Pointer tests should dispatch pointer IDs and types explicitly and assert state transitions after each down, move, cancel, and up event. Visual review on an actual touchscreen remains recommended because automation cannot establish physical usability.

## Out of scope

- mobile screen-reader or platform assistive-touch instruction;
- hover-only content testing;
- drag-and-drop or complex map-widget accessibility;
- voice control, switch control, or stylus-specific methods;
- a claim that emulation replaces real-device or disabled-user testing;
- physical target-size measurement from CSS pixels;
- responsive zoom and reflow already covered elsewhere;
- adding the method to an unrelated existing journey;
- treating the deliberately incomplete fixture as production-ready festival software.

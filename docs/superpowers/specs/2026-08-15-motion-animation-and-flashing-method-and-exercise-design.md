# Motion, animation, and flashing method and Exercise design

## Goal

Add a beginner Testing method and paired Exercise that teach learners to test automatically moving content, interaction-triggered animation, reduced-motion preferences, and user controls without exposing learners to hazardous flashing.

Create:

- `/methods/testing-motion-animation-and-flashing/`
- `/exercises/testing-motion-preferences-on-a-parcel-tracking-dashboard/`
- `/exercise-fixtures/parcel-tracking-motion/`

Estimate 20 minutes for the method and 20 minutes for the Exercise. Place the method after `Testing forced colors and high contrast` and before `Testing zoom and reflow`. Place its Exercise after the forced-colors Exercise and before the high-zoom Exercise. Shift later integer orders where necessary without changing their learner-facing sequence.

Connect the method and Exercise bidirectionally. Insert the pair into `Your first accessibility review` after forced colors and before zoom and reflow. Increase the path estimate from 330 to 370 minutes. Do not add the method to either existing Testing journey because neither approved scenario currently includes the relevant motion behavior.

## Scope and safety boundary

The method covers:

- automatically moving, scrolling, and animated content;
- motion triggered by loading, scrolling, opening content, or activating controls;
- the `prefers-reduced-motion` media feature;
- pause, stop, and hide controls for moving content;
- repeated animation and animation restart behavior;
- identifying possible flashing risk and escalating it for safe measurement.

Keep these topics outside this pair:

- time limits, session expiration, and timeout extensions;
- media autoplay, captions, transcripts, audio description, and media-player controls;
- carousels as complex widgets;
- vestibular-disorder guidance beyond the test's technical scope;
- measuring a deliberately hazardous flashing example in the browser;
- mobile orientation, touch targets, and gesture alternatives.

The Lab must never reproduce potentially hazardous flashing for demonstration. The method may explain the WCAG threshold concept and link to authoritative guidance, but suspected flashing should be assessed with an appropriate analysis tool or escalated to someone equipped to do so. Learners should not be instructed to watch, replay, or manually count a suspected flashing sequence.

The fixture may animate position, scale, opacity, or other properties at ordinary non-flashing rates. It must not use rapidly alternating high-contrast or saturated-red changes and must not create more than three flash-like transitions in any one-second period. Automated safety checks should inspect all fixture animation and transition definitions for prohibited short repeated cycles, with manual source review as a backstop.

## Testing method content

Publish `Testing motion, animation, and flashing` as a beginner Testing method with a 20-minute estimate. It should distinguish:

- reducing motion from suppressing every useful state change;
- a real system-level reduced-motion preference from an authored in-page preference or Lab simulation;
- automatically moving content from a short progress indication while an operation is genuinely pending;
- motion that may cause discomfort from motion that primarily creates distraction or loss of control;
- suspected flashing from ordinary smooth motion or a slow visual transition;
- safe identification and escalation from hazardous reproduction.

Teach this procedure:

1. Record the operating system, browser and versions, viewport, page state, system motion preference, and any page-level motion control.
2. Review the page before changing the preference and inventory moving, scrolling, blinking, loading, transition, and interaction-triggered content.
3. Enable a real reduced-motion preference where available and confirm that `prefers-reduced-motion: reduce` matches. If unavailable, use the paired Exercise's labelled simulation and record that limitation.
4. Determine whether non-essential motion stops, becomes substantially reduced, or changes to a non-spatial alternative.
5. Operate pause, stop, and hide controls with keyboard and pointer input. Confirm their visible and exposed state and the scope of what they control.
6. Trigger drawers, status changes, confirmations, and other interactive motion deliberately. Repeat activation to check whether animation restarts unexpectedly.
7. Scroll the page and check for parallax, scroll-linked transforms, and other motion tied to viewport movement.
8. Inspect CSS and scripts where necessary, including media queries, animation names, durations, delay, iteration counts, play state, transitions, scroll handlers, and restart behavior.
9. Restore the original preference and repeat representative actions to establish causation.
10. Record the affected content, environment, state and trigger, actual and expected behavior, user impact, passing comparisons, limitations, and remediation direction.

Explain that implementation decisions depend on purpose and impact. A suitable reduced experience may remove a decorative animation, make a transition immediate, replace spatial movement with a simple state change, or preserve a short essential progress indicator. Do not prescribe `animation: none` globally as the only remediation.

For automatically moving content, teach learners to assess whether an operable pause, stop, or hide mechanism is required and whether it controls all relevant movement. For interaction-triggered motion, teach learners to consider whether the motion is essential to the operation and whether it can be disabled or replaced.

The flashing section should describe the need for appropriate frame-by-frame or luminance analysis, the general no-more-than-three-flashes-in-one-second boundary, and the separate general-flash and red-flash concepts without turning the method into a specialist photosensitive-epilepsy assessment guide.

## Exercise and standalone workflow

Publish `Testing motion preferences on a parcel-tracking dashboard` as a beginner, find-issues Exercise with a 20-minute estimate. The standalone workspace presents a delivery status, animated route progress, live update ticker, tracking-details panel, scroll-linked decoration, delivery-confirmation action, and passing comparisons.

The fixture has two ways to enter a reduced-motion condition:

- the real `prefers-reduced-motion: reduce` media query;
- one assisted control that adds a scoped reduced-motion simulation state.

The assisted control must be labelled as a learning aid, explain that it is not a complete operating-system or browser simulation, expose state through `aria-pressed`, remain keyboard operable and visibly focused, and reset deterministically. It toggles one root state and does not change site-wide preferences.

The normal state should make every intended animation and control available for inspection without clipping, horizontal overflow, or unrelated accessibility defects. The reduced-motion condition should improve approved passing examples while leaving exactly five seeded failures unchanged.

Do not force a new tab. Use the established standalone-first workflow and tell learners to return to the Exercise when ready to continue or when they need hints or the solution.

## Intentional findings

The fixture contains exactly five intentional findings. Do not identify targets as defective through comments, class names, data attributes, or accessible text.

1. **A route-progress marker moves continuously without a pause or stop mechanism.**
   Its non-essential motion continues beyond five seconds and ignores reduced motion. Remediation should stop or substantially reduce the animation under the preference and provide suitable user control when the moving-content rule applies.

2. **A live-update ticker scrolls automatically and cannot be paused, stopped, or hidden.**
   The content remains available as text, but the movement continues and no control is provided. A static updates list is an acceptable reduced alternative.

3. **A large tracking-details panel slides across the viewport under reduced motion.**
   Opening and closing the panel retain a substantial spatial transform when the user requests reduced motion. The reduced alternative should appear without the large traversal while preserving the same content and state.

4. **A decorative background uses scroll-linked parallax and ignores reduced motion.**
   Scrolling changes its transform at a different rate from page content. The decoration may remain static or be removed in the reduced condition.

5. **Delivery confirmation triggers and repeatedly restarts a large celebratory animation.**
   Each activation restarts substantial motion even under reduced motion. The reduced alternative should communicate confirmation without the spatial celebration, while the status message remains available.

## Passing comparisons and defect boundary

Include passing examples for:

- a decorative delivery-vehicle animation with a keyboard-operable pause/resume control whose exposed state stays current;
- a status transition that becomes immediate under reduced motion;
- a small progress indicator shown only while a short simulated operation is pending and then removed;
- an equivalent status message that changes without spatial motion;
- static content that remains complete under either preference.

Keep pause state deterministic. The passing vehicle control affects only its clearly identified animation and does not imply that it fixes the five seeded targets.

Do not introduce unrelated keyboard traps, missing names, stale control states, low contrast, text clipping, forced-colors failures, reflow failures, or form-validation defects. Any temporary progress state must complete promptly and deterministically and must not create timing-sensitive learner tasks.

No element may blink or flash. The Exercise can include a safety note explaining that the Lab omits hazardous flashing and directing learners back to the method for safe assessment guidance. This note is not an intentional finding.

## Exercise learning contract

The Exercise objectives and steps ask learners to:

- record the environment and whether a real preference or simulation was used;
- inventory motion and its triggers in the initial state;
- apply reduced motion and confirm the condition;
- operate the valid pause control and compare its scope with uncontrolled movement;
- open and close tracking details, scroll the page, and repeat delivery confirmation;
- identify exactly five failures to reduce or control motion;
- record passing comparisons and useful content that remains available;
- reset and repeat representative actions to establish causation;
- record actual behavior, expected behavior, impact, environmental limitations, and remediation direction;
- avoid repeated exposure to suspected flashing and escalate it for appropriate measurement.

Provide three progressive hints:

1. Ask which movement starts automatically, continues, or restarts, and what controls it.
2. Direct attention to reduced-motion behavior, scrolling, large spatial transitions, and repeated activation.
3. Point to the route progress, live updates, tracking-details panel, background decoration, and delivery confirmation without stating the fixes.

The solution stays closed by default and contains exactly five finding sections. Each explains the trigger, initial behavior, reduced-motion behavior, user impact, and flexible remediation direction. It should also identify passing behavior and preserve the safety boundary around flashing.

## Component and state architecture

Follow the existing document-fixture architecture:

- add `ParcelTrackingMotionFixture.astro`;
- register `parcel-tracking-motion` in `src/exercises/fixture-registry.ts` with five intentional-violation identifiers;
- author the method and Exercise through the existing content collections;
- reuse the shared method, Exercise, metadata, breadcrumb, section-navigation, disclosure, theme, and standalone-workspace components.

Keep fixture state local and separable:

- one root class represents the assisted reduced-motion state;
- the real preference uses `@media (prefers-reduced-motion: reduce)`;
- a vehicle-animation state controls only the valid pause/resume comparison;
- a details-panel state controls open and closed presentation and an appropriate expanded state;
- a short pending state controls the passing progress indicator;
- a confirmation state triggers the status message and celebration restart;
- a scroll handler updates only the decorative parallax property.

Use shared custom properties or grouped selectors where practical so the real and assisted reduced conditions implement the same intended outcomes. Do not create a global motion-preference simulator.

Scripts must handle missing elements safely, avoid timers that outlive the page, and prevent duplicated listeners or uncontrolled animation nodes after repeated activation. Reloading the fixture restores its initial state.

## Learning graph and routing

Update collection order, Testing-method and Exercise listings, section navigation, accessibility route coverage, and `Your first accessibility review` in one change. Increase the path estimate to 370 minutes and update its summary, description, topics, and outcomes without claiming comprehensive cognitive, neurological, or low-vision coverage.

The new pair remains self-contained for direct visitors. The path is recommended sequencing, not a prerequisite gate.

Do not modify `Practical screen-reader testing`. Do not add the method to the course-registration or conference-programme journeys. A future journey may use it only when its workspace deliberately includes motion behavior.

No redirects are needed. Both public pages should be indexable and appear in the sitemap. The fixture follows the existing standalone Exercise routing convention.

## Verification

Add focused automated coverage for:

- method and Exercise routes, beginner metadata, 20-minute estimates, collection order, and bidirectional links;
- exactly five registry findings, three progressive hints, and five closed solution sections;
- complete initial content and identifiable initial motion triggers;
- actual `prefers-reduced-motion: reduce` emulation leaving the five targets unreduced while improving approved passing comparisons;
- the assisted state producing the same intended reduced-condition comparison;
- the assisted control's label, limitation text, `aria-pressed`, keyboard operation, visible focus, reset, and repeated toggling;
- the valid vehicle pause/resume control changing its label, exposed state, and only the intended animation;
- the details panel's visible and exposed open state, its large initial transform, and its unreduced behavior;
- deterministic scroll-linked transform changes in both normal and reduced conditions;
- repeated delivery confirmation restarting the seeded animation while maintaining an appropriate status message;
- the short pending indicator appearing only during its controlled operation and then being removed;
- passing transitions becoming immediate and static content remaining complete;
- no animation or transition definitions that create rapid flash-like repeated cycles;
- light and dark themes, desktop and 390px layouts, visible focus, no horizontal overflow, and no answer leakage;
- the outer Exercise and non-intentionally defective fixture behavior staying within the expected axe boundary;
- the first-path 370-minute estimate and exact sequence;
- unchanged method lists, stages, and estimates in both existing Testing journeys;
- sitemap inclusion, internal links, Astro diagnostics, production build, and the complete Playwright suite.

Prefer computed animation names, durations, iteration counts, play states, transition durations, transforms, state attributes, and deterministic event outcomes over screenshot timing or individual animation frames. Visual review should confirm that the scope and scale of motion are understandable without requiring prolonged observation.

## Out of scope

- rendering hazardous flashing;
- a specialist flashing-threshold analysis tool;
- time-limit and session-expiration testing;
- media autoplay and media-player accessibility;
- a complex carousel or composite-widget Exercise;
- global site motion controls;
- mobile orientation, touch targets, or gesture alternatives;
- adding the method to an unrelated existing journey;
- adding the separately planned mobile touch and orientation pair;
- treating the deliberately incomplete fixture as production-ready parcel-tracking code.

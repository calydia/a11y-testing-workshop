---
title: Testing motion, animation, and flashing
summary: Check whether moving and animated content can be controlled and whether a page respects reduced-motion preferences safely.
description: Learn a repeatable beginner procedure for testing automatic movement, interaction-triggered animation, reduced motion, and possible flashing risk.
status: published
order: 10
category: display-and-adaptation
topics: [motion, animation, reduced motion, user preferences, flashing, pause controls]
prerequisites:
  - Basic familiarity with browser settings and developer tools
skillLevel: beginner
estimatedMinutes: 20
tools: [Web browser, Operating-system motion preference, Keyboard, Browser developer tools]
platforms: [Desktop, Mobile]
outcomes:
  - Inventory automatic, scroll-linked, loading, and interaction-triggered motion.
  - Test a real reduced-motion preference and distinguish it from an in-page simulation.
  - Assess pause, stop, and hide controls and the scope of what they control.
  - Compare spatial motion with immediate or non-spatial reduced alternatives.
  - Identify possible flashing risk without recreating or repeatedly watching hazardous content.
relatedExercises: [testing-motion-preferences-on-a-parcel-tracking-dashboard]
interpretation:
  - Reduced motion does not require suppressing every useful state change or short essential progress indication.
  - A control is useful only when its name, state, operation, and scope are understandable and it controls the relevant movement.
  - Smooth or slow motion is not automatically flashing; suspected flashing requires appropriate measurement.
limitations:
  - The paired simulation is a learning aid and does not reproduce every operating-system, browser, or personal configuration.
  - This method does not cover time limits, media-player accessibility, or every effect of motion on disabled people.
  - A focused technical check does not establish conformance or replace testing with disabled people.
---

## What this method tests

This method checks whether automatically moving content can be controlled, whether interaction and scrolling cause avoidable spatial motion, and whether a page responds usefully when a person requests reduced motion.

It also teaches how to identify possible flashing without unsafe repeated exposure. Motion and flashing are not interchangeable: a slow translation or smooth transition may create substantial movement without flashing, while rapid changes in luminance or saturated red require specialist analysis.

## What you need

Use a browser, keyboard, browser developer tools, and an operating-system motion setting that makes `prefers-reduced-motion: reduce` match where available. Record the operating system, browser and versions, viewport, page state, system motion preference, and any page-level motion control.

The paired Exercise includes an assisted reduced-motion simulation. Use it when a real preference is unavailable and record that limitation. It cannot reproduce every browser, operating-system, or user configuration.

## How to perform the test

1. Review the page before changing the preference. Inventory moving, scrolling, blinking, loading, transition, and interaction-triggered content.
2. Record what starts automatically, how long it continues, whether it repeats, and what triggers it again.
3. Enable the real system reduced-motion preference and confirm that `prefers-reduced-motion: reduce` matches. If necessary, use the Exercise simulation instead.
4. Check whether non-essential motion stops, becomes substantially reduced, or changes to an immediate or non-spatial alternative.
5. Operate pause, stop, and hide controls with keyboard and pointer input. Confirm their names, exposed states, visible states, and the movement they actually control.
6. Trigger drawers, disclosures, status changes, confirmations, and other interactive motion. Repeat the action to check whether animation restarts unexpectedly.
7. Scroll the page and look for parallax, scroll-linked transforms, and content that moves at a different rate from the viewport.
8. Inspect CSS and scripts when needed. Check media queries, animation names, durations, delays, iteration counts, play state, transitions, scroll handlers, and restart behavior.
9. Restore the original preference and repeat representative actions to establish causation.
10. Record the affected content, environment, state and trigger, actual and expected behavior, user impact, passing comparisons, limitations, and remediation direction.

## What to observe

A useful reduced experience depends on purpose. Decorative animation may stop. A large sliding panel may appear immediately. A spatial transition may become a simple state change. A short progress indicator can remain while an operation is genuinely pending and then disappear.

Do not apply `animation: none` globally without considering content and state communication. Confirm that removing motion does not hide information, leave content in an incorrect state, or make a pending operation impossible to understand.

Automatically moving content that starts with other content and continues for more than five seconds may need an operable pause, stop, or hide mechanism. Check whether the control covers all relevant movement rather than only a convenient example.

## Assess possible flashing safely

Content that flashes more than three times in any one-second period may require analysis against the general-flash and red-flash thresholds. Use appropriate frame-by-frame or luminance-analysis tooling and authoritative guidance such as [Understanding Success Criterion 2.3.1: Three Flashes or Below Threshold](https://www.w3.org/WAI/WCAG22/Understanding/three-flashes-or-below-threshold.html).

Do not watch a suspected sequence repeatedly, manually count hazardous flashes, or recreate the effect for a report. Pause or avoid the content where possible, record how it was encountered, and escalate it to someone equipped to assess it safely.

---
title: Testing mobile touch and orientation
summary: Check target size and spacing, orientation support, gesture alternatives, and pointer cancellation on touch interfaces.
description: Learn a real-device-first beginner procedure for testing essential mobile touch interactions with emulation as supporting evidence.
status: published
order: 11
topics: [mobile, touch, target size, orientation, gestures, pointer cancellation]
prerequisites:
  - Basic familiarity with browser developer tools and responsive layouts
skillLevel: beginner
estimatedMinutes: 25
tools: [Touchscreen phone or tablet, Web browser, Browser developer tools]
platforms: [Mobile, Tablet]
outcomes:
  - Measure touch-target size and spacing while considering the defined exceptions.
  - Test complete content and operation in portrait and landscape orientations.
  - Identify multipoint and path-based gestures and verify simpler alternatives.
  - Test whether single-pointer actions can be cancelled before completion.
  - Separate real-device evidence from the limits of browser emulation.
relatedExercises: [testing-touch-interaction-on-a-community-festival-map]
interpretation:
  - A target below 24 by 24 CSS pixels is not automatically a failure when the spacing or another defined exception applies.
  - A layout preference or simpler implementation does not make one orientation essential.
  - Mouse operation and device emulation do not prove that a task is usable through direct touch.
limitations:
  - This method does not cover mobile screen readers, platform assistive-touch features, voice control, switch control, or stylus-specific behavior.
  - CSS-pixel measurements do not establish physical size, comfortable reach, motor effort, or accidental-activation risk.
  - This focused technical check does not replace testing on relevant devices or with disabled people.
---

## What this method tests

This method checks whether touch targets provide a usable minimum size or spacing, whether content works in portrait and landscape, whether complex gestures have simpler alternatives, and whether a person can cancel a single-pointer action before it completes.

Prefer a real touchscreen phone or tablet. Browser device emulation can support preliminary layout, CSS-pixel, orientation, and pointer-event checks, but it cannot reproduce physical reach, tactile interaction, motor effort, accidental activation, every mobile browser, or mobile assistive technology.

## Target size and spacing

WCAG 2.2 Target Size (Minimum) uses a baseline of at least 24 by 24 CSS pixels. An undersized target can also meet the spacing alternative when a 24-CSS-pixel-diameter circle centered on it does not intersect another target or the corresponding circle around another undersized target.

Consider the defined exceptions:

- spacing provides the required separation;
- an equivalent control on the same page meets the requirement;
- the target is inline in a sentence or constrained by line height;
- the user agent determines the size and the author has not modified it;
- the presentation is essential or legally required.

See [Understanding Success Criterion 2.5.8: Target Size (Minimum)](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html). Larger targets may still be preferable. CSS pixels are not physical measurements, and meeting the baseline does not prove that a control is comfortable to reach or operate.

## How to perform the test

1. Record the device, operating system, browser and versions, viewport, browser zoom, input type, orientation, and page state.
2. Complete representative tasks with direct touch on a real device where possible.
3. Identify interactive targets. Measure their rendered width and height in CSS pixels, then assess distances between target centers and any applicable exceptions.
4. Rotate between portrait and landscape without refreshing. Confirm that content, controls, messages, and task completion remain available.
5. If an orientation is restricted, determine whether that orientation is genuinely essential. Design preference and implementation convenience are not essentiality.
6. Inventory multipoint and path-based gestures, such as pinch zoom and direction-dependent swipes. Find and operate a simpler single-pointer alternative that does not depend on a path.
7. Test single-pointer actions by pressing, moving away, cancelling where supported, and releasing. Determine when the action completes and whether it can be aborted or undone.
8. Repeat preliminary checks with browser emulation where useful and label that evidence accurately.
9. Record the target or task, environment, orientation, input and gesture, actual and expected behavior, impact, exceptions considered, passing comparisons, limitations, and remediation direction.

## What to observe

Content should not be restricted to portrait or landscape unless that orientation is essential to the function. Test rotation without reloading because state and partially completed work should remain available.

Functionality that uses multipoint or path-based gestures should also work with a single pointer without a path-based gesture unless the gesture is essential. Zoom buttons can accompany pinch zoom; previous and next buttons can accompany swipe navigation.

For single-pointer operation, completing on the up event usually lets a person move away or cancel before release. Other valid patterns can provide an abort mechanism, undo after completion, or reversal on the up event. Completion on the down event needs a genuine essential reason. Record the complete event sequence rather than only whether one tap eventually worked.

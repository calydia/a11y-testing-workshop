---
title: Testing touch interaction on a community-festival map
summary: Investigate target geometry, orientation, gesture alternatives, and cancellation in a festival map and schedule.
description: Practise real-device-first mobile touch testing with a responsive festival workspace and limited assisted orientation state.
status: published
order: 29
category: display-and-adaptation
topics: [mobile, touch, target size, orientation, pinch, swipe, pointer cancellation]
prerequisites:
  - Understand the Testing mobile touch and orientation method
difficulty: beginner
estimatedMinutes: 25
exerciseType: find-issues
fixture: community-festival-touch
objectives:
  - Measure target boxes and spacing while checking the defined exceptions.
  - Compare content and operation in portrait and narrow landscape.
  - Test multipoint and path-based gestures and search for simpler alternatives.
  - Record five findings, useful passing checks, and the limits of emulation.
methods: [testing-mobile-touch-and-orientation]
hints:
  - Inspect target geometry, both orientations, required fingers and paths, and the event on which an action completes.
  - Check crowded map controls, content after rotation, pinch and swipe interactions, and cancellation before release.
  - Review the map-control cluster, landscape message, map zoom, featured schedule, and saved-session removal.
expectedFindings: 5
solution:
  summary: The festival workspace contains five touch and orientation problems, alongside adequately sized controls, flexible content, simple action alternatives, and cancellable comparison behavior.
  findings:
    - title: The map-control cluster is too small and crowded
      explanation: The three authored map controls are below 24 by 24 CSS pixels and their centers are too close for the spacing alternative. No approved exception applies. Increase their target boxes or provide sufficient separation; treat the cluster as one finding rather than one per button.
      method: testing-mobile-touch-and-orientation
    - title: Useful content is blocked in narrow landscape
      explanation: A phone-like landscape viewport hides the map and schedule behind an instruction to rotate back, although portrait is not essential. Reflow the interface so content and operation remain available in both orientations.
      method: testing-mobile-touch-and-orientation
    - title: Map zoom requires a two-pointer pinch
      explanation: Changing the distance between two pointers changes the map scale, but the same zoom function has no single-pointer alternative. Keep pinch as an enhancement and add controls such as zoom in and zoom out buttons.
      method: testing-mobile-touch-and-orientation
    - title: Featured sessions require a horizontal swipe
      explanation: A long horizontal path gesture changes the featured schedule, but that component has no previous or next controls. Provide simple buttons as the primary alternative; the separate workshop schedule demonstrates this pattern.
      method: testing-mobile-touch-and-orientation
    - title: A saved session is removed on pointer-down
      explanation: The music workshop disappears as soon as the pointer is pressed. Moving away or cancelling before release cannot prevent it, and no undo is available. Complete the action on release with cancellation support or provide an appropriate undo mechanism.
      method: testing-mobile-touch-and-orientation
---

Use [Testing mobile touch and orientation](/methods/testing-mobile-touch-and-orientation/) while investigating the community-festival workspace.

1. Record the real device or emulation environment, operating system, browser and versions, viewport, zoom, input type, orientation, and limitations.
2. Complete representative actions with direct touch on a real device where possible. Mouse interaction and emulation support preliminary checks but do not prove real-touch usability.
3. Measure the map-control cluster in CSS pixels. Assess target centers, spacing, and every relevant exception.
4. Rotate between portrait and narrow landscape without refreshing. If rotation is unavailable, use **Apply narrow-landscape simulation** and record that limitation.
5. Try to zoom the festival map with touch and find an alternative that works with one pointer without a path-based gesture.
6. Navigate the featured and workshop schedules. Record which gestures and controls work for each.
7. Test both saved-session removals by pressing, moving away, cancelling, and releasing. Reload between sequences when necessary.
8. Identify exactly five findings and record useful passing comparisons.
9. Record actual and expected behavior, the complete interaction sequence, user impact, exceptions, environmental limitations, and remediation direction.

Return to this Exercise when you are ready to continue or when you need a hint or the solution.

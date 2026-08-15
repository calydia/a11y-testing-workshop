---
title: Testing forced colors in a journey planner
summary: Compare a public-transport journey planner before and after forced colors and investigate lost information and interaction cues.
description: Practise testing controls, icons, fields, focus, and route distinctions with forced colors or a clearly limited simulation.
status: published
order: 27
topics: [visual design, forced colors, high contrast, controls, focus, essential graphics]
prerequisites:
  - Understand the Testing forced colors and high contrast method
difficulty: beginner
estimatedMinutes: 20
exerciseType: find-issues
fixture: public-transport-journey-planner
objectives:
  - Compare complete information and interaction before and after forced colors are active.
  - Distinguish expected color substitution from lost meaning, state, boundaries, or focus.
  - Inspect keyboard behavior and programmatic state where visual evidence is incomplete.
  - Record five findings, useful passing checks, and limitations of the tested environment.
methods: [testing-forced-colors-and-high-contrast]
hints:
  - Look for information that depends on authored colors, backgrounds, shadows, or images.
  - Compare selected states, field boundaries, keyboard focus, interchange meaning, and route distinctions.
  - Check the travel-mode selector, journey fields, one route action, interchange information, and the route diagram.
expectedFindings: 5
solution:
  summary: The planner contains five problems where forced colors remove the only useful visual cue or reveal that an equivalent programmatic state is missing. Other changed styling remains usable.
  findings:
    - title: The selected travel mode loses its distinction
      explanation: Public transport appears selected only through its authored background color and does not expose a pressed or selected state. Forced colors remove the remaining visual distinction. Use a native state pattern or expose the correct programmatic state and retain a visible system-color border, shape, or text cue.
      method: testing-forced-colors-and-high-contrast
    - title: The interchange icon disappears
      explanation: The interchange symbol is a CSS background image that supplies unique meaning. It is suppressed in forced colors. Provide equivalent visible text or use an essential graphic implementation that remains perceivable; do not rely on a background image alone.
      method: testing-forced-colors-and-high-contrast
    - title: The origin field loses its boundary
      explanation: The custom origin field removes its native border and relies on a background and inset box shadow. Both disappear, while the destination field retains a clear boundary. Preserve a real border or add a forced-colors-aware system-color boundary.
      method: testing-forced-colors-and-high-contrast
    - title: One route action loses keyboard focus
      explanation: The View Route 14 details button uses only a box shadow for focus, which is suppressed. The adjacent Save action keeps an outline. Provide a visible outline or another durable forced-colors-aware focus indicator.
      method: testing-forced-colors-and-high-contrast
    - title: The route diagram loses its route distinctions
      explanation: The two diagram segments rely on authored purple and green lines, which become identical. Add labels, patterns, shapes, or other cues at the point of use. The adjacent text route description is a useful passing comparison.
      method: testing-forced-colors-and-high-contrast
---

Use [Testing forced colors and high contrast](/methods/testing-forced-colors-and-high-contrast/) while investigating the public-transport journey planner.

1. Record your operating system, browser, versions, viewport, Lab theme, page state, and contrast theme or setting.
2. Review the complete planner before changing the condition. Record controls, selected states, icons, field boundaries, focus indicators, and route distinctions that are initially available.
3. Activate a real forced-colors environment when available. Otherwise, use **Apply forced-colors simulation** and record that you used the limited learning aid.
4. Inspect every region again. Use the keyboard to operate controls and inspect programmatic state where the visual presentation is incomplete.
5. Identify exactly five losses of information or interaction. Do not report colors or decorative styling merely because they change.
6. Record passing comparisons that preserve state, meaning, boundaries, focus, or route information.
7. Reset the condition and confirm that each suspected loss disappears, then reapply it to establish causation.
8. For every finding, record actual and expected behavior, likely user impact, environmental limitations, and remediation direction.

Return to this Exercise when you are ready to continue or when you need a hint or the solution.

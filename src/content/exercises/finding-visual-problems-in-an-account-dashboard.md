---
title: Finding visual problems in an account dashboard
summary: Inspect a realistic account dashboard and find four problems involving contrast, color, text spacing, and interaction states.
description: Practise systematic visual accessibility testing with a deliberately flawed account dashboard.
status: published
order: 20
category: foundations
topics: [visual design, contrast, color, readability, focus]
prerequisites:
  - Understand the Testing visual accessibility method
difficulty: beginner
estimatedMinutes: 15
exerciseType: find-issues
fixture: visual-account-dashboard
objectives:
  - Review an interface systematically in both light and dark themes.
  - Measure relevant foreground and background color combinations.
  - Check whether meaning depends on color and whether text remains readable.
  - Compare default, hover, and keyboard-focus states and record reproducible evidence.
methods: [testing-visual-accessibility]
hints:
  - Compare foreground and background colors in both themes; measure rather than relying on how readable they seem to you.
  - Check whether every piece of status information remains understandable when its colors are ignored.
  - Read the densest text and compare the default, hover, and keyboard-focus appearance of each control.
expectedFindings: 4
solution:
  summary: The dashboard contains four deliberately created visual accessibility problems.
  findings:
    - title: The profile review note has insufficient contrast
      explanation: The muted account-review note blends into the page background in both themes and does not provide sufficient contrast for ordinary text. Measure the foreground and background pair in each theme, then use a text color that meets the applicable contrast requirement against every background where it appears.
      method: testing-visual-accessibility
    - title: Service status is communicated only by color
      explanation: Green, amber, and red circles are the only indication of each service's state. Someone who cannot distinguish those colors receives the service names but not their status. Add visible status text or another non-color cue; color can remain as a supplementary cue.
      method: testing-visual-accessibility
    - title: Recent activity text has cramped line spacing
      explanation: The multi-line activity message uses a line height barely larger than its text, making lines difficult to track. Increase the line spacing and ensure the component continues to work when users apply their own text-spacing preferences.
      method: testing-visual-accessibility
    - title: The download button's interaction states are indistinguishable
      explanation: The download control looks the same when hovered or keyboard-focused as it does by default, and its normal focus outline is removed. Provide clearly distinguishable hover and high-contrast keyboard-focus treatments without removing the only visible focus indicator.
      method: testing-visual-accessibility
---

Use the [Testing visual accessibility](/methods/testing-visual-accessibility/) method to review the account dashboard. Start the exercise from the Exercise workspace.

1. Inspect the complete dashboard in both light and dark themes.
2. Measure relevant foreground and background colors with a contrast checker.
3. Check whether every visible status remains understandable without its color.
4. Read each text block and inspect every control in its default, hover, and keyboard-focus states.
5. Find four visual accessibility problems.
6. For each finding, record the affected element, theme and state, what you expected, what you observed, and measured evidence where relevant.

Avoid inspecting the source until you have completed the visual review. Return to this page whenever you need a hint or are ready to review the solution.

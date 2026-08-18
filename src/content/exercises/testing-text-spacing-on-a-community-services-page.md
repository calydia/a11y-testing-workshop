---
title: Testing text spacing on a community-services page
summary: Apply a text-spacing override and investigate lost content and functionality in a community support directory.
description: Practise checking whether a realistic community-services page adapts to user-defined text spacing.
status: published
order: 25
category: display-and-adaptation
topics: [visual design, text spacing, user overrides, readability, responsive layout]
prerequisites:
  - Understand the Testing text spacing and user overrides method
difficulty: beginner
estimatedMinutes: 20
exerciseType: find-issues
fixture: community-services-text-spacing
objectives:
  - Compare representative content before and after applying the complete text-spacing condition.
  - Confirm that all four override values are active before interpreting the result.
  - Identify content and control labels lost through clipping, overlap, truncation, or clamping.
  - Record six findings, including text that resists the override, and useful passing comparisons that expand or wrap correctly.
methods: [testing-text-spacing-and-user-overrides]
hints:
  - Look for containers that should become taller when their text needs more space. Check whether all lines remain available.
  - Inspect wrapping, truncation, overlap, line clamping, and whether every control still exposes its complete visible label.
  - Check the introduction, one service card, one service-navigation item, the important notice, one contact action, and content that does not visibly change.
expectedFindings: 6
solution:
  summary: The page contains six problems caused by fixed sizing, positioning, single-line constraints, hidden overflow, and authored styles that prevent the user override, alongside flexible passing comparisons.
  findings:
    - title: The introductory panel clips its final lines
      explanation: The panel has a fixed height and hides overflow. It fits the initial copy but cannot grow after the spacing override. Remove the fixed height and allow the container to expand with its text.
      method: testing-text-spacing-and-user-overrides
    - title: A service-card heading overlaps its description
      explanation: The family-support card positions its heading and description at fixed locations. The expanded heading occupies the description's space. Keep text in normal document flow and let the card grow.
      method: testing-text-spacing-and-user-overrides
    - title: A service-navigation label is truncated
      explanation: The housing-advice link forces its label onto one line inside a fixed width and hides overflow. Allow the label to wrap or the component to expand without removing words.
      method: testing-text-spacing-and-user-overrides
    - title: The important notice hides paragraph content
      explanation: The notice limits its paragraph to three rendered lines. Increased spacing needs more lines, so part of the message disappears. Remove the clamp when the complete text is required.
      method: testing-text-spacing-and-user-overrides
    - title: A contact button clips its complete label
      explanation: The community-support button has fixed width and height, prevents wrapping, and hides overflow. Use flexible minimum sizing and allow its label to wrap or the button to grow.
      method: testing-text-spacing-and-user-overrides
    - title: The urgent-support paragraph resists the spacing override
      explanation: Higher-specificity authored declarations marked as important keep the paragraph's line height, paragraph spacing, letter spacing, and word spacing unchanged. Remove or restructure declarations that block user overrides; do not hard-code the test values as the page defaults.
      method: testing-text-spacing-and-user-overrides
---

Use [Testing text spacing and user overrides](/methods/testing-text-spacing-and-user-overrides/) while investigating the community support directory.

1. Record your browser, operating system, viewport, theme, page state, and override mechanism.
2. Review the complete page before applying the test condition. Record representative content and controls that are fully available.
3. Activate **Apply test text spacing** and confirm that the complete condition is active.
4. Inspect every text-bearing region and control at the same viewport. Do not treat wrapping or a taller component as a failure when everything remains available.
5. Identify exactly six problems, including any content for which the override does not take effect, and record useful passing comparisons.
6. Reset the spacing and confirm that each suspected problem disappears, then reapply it to establish causation.
7. For every finding, record actual and expected behavior, likely user impact, and remediation direction.

The assisted control applies the four values only to this practice page. On other sites, use a reliable extension, bookmarklet, user stylesheet, or developer tools and confirm the computed values before interpreting the result.

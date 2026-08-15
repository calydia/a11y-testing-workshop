---
title: Testing controls in a community events finder
summary: Investigate names, roles, states, keyboard behavior, and result announcements in a realistic event-finding interface.
description: Practise testing common controls with a screen reader in a community events finder.
status: published
order: 47
topics: [screen readers, controls, accessible names, roles, states, keyboard]
prerequisites:
  - Understand the Testing controls with a screen reader method
difficulty: beginner
estimatedMinutes: 25
exerciseType: find-issues
fixture: community-events-finder
objectives:
  - Inspect accessible names, roles, states, and values before interaction.
  - Operate common controls with their expected keyboard commands.
  - Re-check exposed state and related page updates after interaction.
  - Distinguish findings from useful passing comparisons.
methods: [testing-controls-with-a-screen-reader]
hints:
  - Pay particular attention to the filter trigger, event actions, and information that changes after you make a choice.
  - Compare visible labels with accessible names and compare each control's initial state with what it exposes after activation.
  - Check aria-expanded on the filter button, the control type used for event details, aria-checked on the save switch, the second save control's name, and how the result count is communicated.
expectedFindings: 5
solution:
  summary: The events finder contains five focused control and announcement findings alongside correctly exposed native comparisons.
  findings:
    - title: The filter button exposes stale expanded state
      explanation: The panel opens visually but aria-expanded remains false. Update aria-expanded whenever the controlled panel opens or closes.
      method: testing-controls-with-a-screen-reader
    - title: Event details use button semantics for navigation
      explanation: The repair-café control moves to a destination but is exposed as a button. Use a link with a real href for navigation.
      method: testing-controls-with-a-screen-reader
    - title: The save switch exposes stale checked state
      explanation: The switch works with click and Space and changes visibly, but aria-checked remains false. Update the exposed state with the saved state.
      method: testing-controls-with-a-screen-reader
    - title: A save control's accessible name conflicts with its visible label
      explanation: The visible Save event label is replaced by the unrelated accessible name Bookmark item. Use an accessible name that includes and communicates the visible label.
      method: testing-controls-with-a-screen-reader
    - title: Filtered results are not announced
      explanation: Category checkboxes update the visible result count and list, but the result information is not exposed as a status update. Communicate the concise result change without moving focus.
      method: testing-controls-with-a-screen-reader
---

Use [Testing controls with a screen reader](/methods/testing-controls-with-a-screen-reader/) while investigating the community events finder.

1. Record your screen reader, browser, operating system, relevant versions, and initial page state.
2. Inspect every interactive control before operating it. Record its visible label, accessible name, role, and state or value.
3. Open the filters, choose categories, change the results view, inspect event details, and use each save control with the expected keyboard command.
4. Re-check each control after activation and listen for information that changes elsewhere on the page.
5. Identify exactly five findings and record useful passing behavior from the native checkboxes, radio buttons, action button, and event-details link.
6. For every finding, record reproduction steps, actual and expected behavior, user impact, and remediation direction.

Exact announcements can differ across screen readers, browsers, and operating systems. Evaluate the exposed properties and observable interaction rather than expecting one prescribed speech string.

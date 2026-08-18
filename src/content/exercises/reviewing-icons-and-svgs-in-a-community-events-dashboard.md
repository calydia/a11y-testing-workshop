---
title: Reviewing icons and SVGs in a community events dashboard
summary: Assess meaningful, decorative, and functional SVGs while managing saved events in a community dashboard.
description: Practise comparing visible graphic purpose with screen-reader output and identifying missing, generic, noisy, and duplicated accessible names.
status: published
order: 55
category: content-and-structure
topics: [screen readers, icons, SVG, accessible names]
prerequisites:
  - Understand the Testing icons and SVGs with a screen reader method
difficulty: beginner
estimatedMinutes: 20
exerciseType: find-issues
fixture: community-events-dashboard
objectives:
  - Classify inline SVGs as meaningful, decorative, or functional before judging their implementation.
  - Compare visible graphic meaning with exposed graphic and control names.
  - Identify missing, generic, noisy, and duplicated accessible names.
  - Distinguish problematic patterns from correctly named or correctly silent comparisons.
  - Record evidence and remediation direction without assuming identical speech phrasing across platforms.
methods: [screen-reader-icons-and-svg]
hints:
  - Decide which graphics communicate information or function and which merely repeat nearby text.
  - Compare the visual meaning of each graphic with its accessible name, including controls that contain both an SVG and visible text.
  - Look for one unnamed graphic, one generic graphic name, an unnamed icon-only control, and two controls made noisy by exposed decorative SVGs.
expectedFindings: 5
solution:
  summary: The dashboard contains five findings. The named event-summary graphic, hidden calendar icon, contextually named add button, and silent arrow beside View event details are passing checks.
  findings:
    - title: The availability graphic has no accessible name
      explanation: The Riverside repair café graphic visually communicates that only a few places remain, but its exposed graphic role has no name and no nearby text supplies the information. Give it a concise meaningful name, or provide equivalent visible text and hide the SVG.
      method: screen-reader-icons-and-svg
    - title: The online-event graphic is named only Icon
      explanation: Icon confirms that a graphic exists but does not communicate that the gardening workshop is online. Name the meaningful graphic for the information it conveys, or provide equivalent visible text and hide the SVG.
      method: screen-reader-icons-and-svg
    - title: The Save event button exposes an unnecessary Star name
      explanation: Visible text already gives the button its complete purpose. Exposing the star SVG adds irrelevant wording to the control name or navigation experience. Hide the decorative SVG and retain the visible button text.
      method: screen-reader-icons-and-svg
    - title: The remove icon-only button has no accessible name
      explanation: The button contains only an SVG that is correctly hidden as decorative, leaving the control itself unnamed. Give the button a contextual name such as Remove Riverside repair café from saved events.
      method: screen-reader-icons-and-svg
    - title: The Download schedule button repeats download wording
      explanation: The visible Download schedule text already communicates the action, while the exposed SVG contributes another Download name. Hide the decorative SVG so the control retains one concise visible name.
      method: screen-reader-icons-and-svg
---

Use the [Testing icons and SVGs with a screen reader](/methods/screen-reader-icons-and-svg/) method to review the community events dashboard. Start the exercise from the Exercise workspace.

1. Review every visible icon and SVG and predict whether it is meaningful, decorative, or functional.
2. Navigate through graphics and controls with your screen reader.
3. Compare each announcement or silence with the graphic's visible purpose and nearby text.
4. Inspect markup where you need to confirm why an SVG is exposed or hidden.
5. Identify exactly five accessibility findings and four passing checks.
6. For each finding, record the affected graphic or control, current output, expected result, user impact, and remediation direction.

Screen readers and browsers may phrase graphic roles and repeated names differently. Assess whether the same purpose is available without missing meaning or unnecessary noise rather than expecting one exact announcement.

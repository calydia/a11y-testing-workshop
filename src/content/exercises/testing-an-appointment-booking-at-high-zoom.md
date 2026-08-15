---
title: Testing an appointment booking at high zoom
summary: Test an appointment-booking page at a narrow zoom-equivalent width and with text enlarged to find four reflow and resizing problems.
description: Practise zoom, reflow, and text-resizing testing with a deliberately constrained appointment-booking page.
status: published
order: 31
topics: [zoom, reflow, text resizing, responsive design]
prerequisites:
  - Understand the Testing zoom and reflow method
difficulty: beginner
estimatedMinutes: 20
exerciseType: find-issues
fixture: zoom-appointment-booking
objectives:
  - Test vertical content at a width equivalent to 320 CSS pixels.
  - Enlarge text to 200% and check for lost content or functionality.
  - Distinguish page-level reflow failures from essential two-dimensional regions.
  - Record the browser, viewport, resize condition, affected target, and observed impact.
methods: [testing-zoom-and-reflow]
hints:
  - Distinguish whole-page horizontal overflow from scrolling inside content that genuinely needs two dimensions.
  - Inspect long strings and compare visible content with container dimensions after enlarging text.
  - Check the bottom of the viewport and complete the confirmation task rather than reviewing only static text.
expectedFindings: 4
solution:
  summary: The appointment page contains four deliberately created zoom and reflow problems.
  findings:
    - title: The booking panel retains a fixed width
      explanation: At the 320 CSS-pixel equivalent, the main booking panel remains much wider than the viewport and forces horizontal page scrolling. Use a fluid maximum width and allow the panel and its children to shrink and reflow within the available inline space.
      method: testing-zoom-and-reflow
    - title: The confirmation reference does not wrap
      explanation: The long reference is rendered as one unbreakable line and exceeds its visible container. Provide safe wrapping opportunities or overflow handling that keeps the complete reference available without widening the page.
      method: testing-zoom-and-reflow
    - title: The appointment card clips enlarged content
      explanation: At 200% text resizing, the fixed-height card cannot grow, so appointment information and its review link are clipped. Remove the fixed height and let the container expand with its content.
      method: testing-zoom-and-reflow
    - title: The fixed action bar obscures page content
      explanation: At the narrow zoom-equivalent condition, the bottom action bar covers the final review content because the document does not reserve enough space for it. Prefer a non-obscuring layout or reserve sufficient responsive space for the fixed region.
      method: testing-zoom-and-reflow
---

Use the [Testing zoom and reflow](/methods/testing-zoom-and-reflow/) method to review the appointment booking. Start the exercise from the Exercise workspace.

1. Complete the booking-review task at the default presentation so you know what must remain available.
2. Test the page at a width equivalent to 320 CSS pixels, commonly reached from a 1280 CSS-pixel viewport at 400% page zoom.
3. Return to the default page zoom and enlarge rendered text incrementally up to 200% with a supported mechanism.
4. At each condition, read all content and try to confirm the appointment.
5. Find four zoom, reflow, or text-resizing problems.
6. Record the browser, starting viewport, zoom or text-size setting, affected target, expected result, and observed result.

Return to this page whenever you need a hint or are ready to review the solution. Avoid inspecting the source until you have completed both procedures.

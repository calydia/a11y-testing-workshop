---
title: Testing text spacing and user overrides
summary: Apply the complete text-spacing condition and check whether content and functionality remain available.
description: Learn a repeatable beginner procedure for testing whether a page supports user-defined text spacing.
status: published
order: 8
topics: [visual design, text spacing, user overrides, readability, responsive layout]
prerequisites:
  - Basic familiarity with browser developer tools
skillLevel: beginner
estimatedMinutes: 20
tools: [Web browser, Browser developer tools, User stylesheet or text-spacing tool]
platforms: [Desktop, Mobile]
outcomes:
  - Distinguish authored typography from a test of user-defined text spacing.
  - Apply and confirm all four text-spacing values together.
  - Identify clipping, overlap, truncation, hidden content, and lost control labels.
  - Reset and reapply the condition to confirm what caused an observation.
  - Record findings and useful passing behavior at the tested viewport and state.
relatedExercises: [testing-text-spacing-on-a-community-services-page]
interpretation:
  - A page does not fail merely because its default styles use different spacing values.
  - Wrapping, taller containers, and changed proportions are expected when all content and functionality remain available.
  - A tool that fails to apply the requested values does not provide evidence that the page fails the test.
limitations:
  - This method does not cover forced colors, font replacement, browser zoom, text-only resizing, or general custom stylesheets.
  - The combined condition does not diagnose which individual spacing property caused a layout problem.
  - This focused technical check does not provide comprehensive low-vision or cognitive-accessibility coverage or replace testing with disabled people.
---

## What this method tests

This method checks whether people can override authored text spacing without losing content or functionality. The page does not need to use the test values by default. It needs to remain readable and operable after those values are applied together.

Use the current WCAG text-spacing condition:

- line height of at least `1.5` times the font size;
- spacing after paragraphs of at least `2` times the font size;
- letter spacing of at least `0.12` times the font size;
- word spacing of at least `0.16` times the font size.

Apply those four changes without changing other style properties. The condition comes from [Understanding Success Criterion 1.4.12: Text Spacing](https://www.w3.org/WAI/WCAG22/Understanding/text-spacing).

## What you need

Use a browser and one reliable mechanism that can override page styles, such as a text-spacing extension or bookmarklet, a user stylesheet, or browser developer tools. The paired Exercise includes an assisted control that applies the complete condition consistently.

Record the browser, operating system, viewport, theme, page state, and override mechanism. Learn how to inspect computed styles so you can confirm that the test values took effect before interpreting the result.

## How to perform the test

1. Review the page in its initial state. Record representative navigation items, headings, paragraphs, cards, notices, labels, instructions, and buttons.
2. Apply all four text-spacing values together without changing other style properties.
3. Inspect representative computed styles and confirm that the line height, paragraph spacing, letter spacing, and word spacing were applied.
4. Review every text-bearing component at the same viewport and state used for the initial check.
5. Look for clipped or missing lines, overlapping content, truncated labels, hidden instructions, obscured controls, and functionality that can no longer be identified or used.
6. Record flexible containers, wrapping text, and controls that grow successfully as passing checks.
7. Reset the override and confirm that each suspected problem disappears.
8. Reapply the condition to establish that the override causes the observed loss.
9. Record the affected element, viewport and state, actual behavior, expected behavior, user impact, and remediation direction.

## What to observe

Content may occupy more lines and components may become taller. Those changes are not failures when the complete text and functionality remain available. Fixed heights, absolute positioning, single-line constraints, line clamps, and hidden overflow deserve particular attention because they can prevent containers from adapting.

If the expected values do not appear in computed styles, troubleshoot or change the override mechanism before judging the page. A broken extension or bookmarklet does not prove that the page prevents user styles.

Test the four properties as one condition. You can investigate individual CSS causes during remediation, but the result answers whether the page survives the complete user override.

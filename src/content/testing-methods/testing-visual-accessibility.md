---
title: Testing visual accessibility
summary: Review contrast, color-dependent information, text readability, and visible interaction states systematically.
description: Learn a repeatable visual accessibility testing procedure using browser inspection and contrast measurement.
status: published
order: 7
topics: [visual design, contrast, color, readability, focus]
prerequisites:
  - Basic familiarity with browser developer tools
skillLevel: beginner
estimatedMinutes: 15
tools: [Web browser, Browser developer tools, Contrast checker]
platforms: [Desktop, Mobile]
outcomes:
  - Review visual accessibility systematically across themes and interaction states.
  - Measure relevant text and non-text contrast pairs instead of relying on visual judgment alone.
  - Identify information conveyed only by color and text that is difficult to read because of its spacing.
  - Record visual findings with the affected state, measured evidence, and expected result.
relatedExercises: [finding-visual-problems-in-an-account-dashboard]
interpretation:
  - Contrast results need measurements from the actual foreground and background colors used in the affected state.
  - Information should remain understandable when color differences cannot be perceived.
  - Text should remain readable when users apply their own text-spacing settings.
  - Hover and keyboard-focus states should remain visible against every background where a control appears.
limitations:
  - Visual inspection does not establish whether semantic structure, accessible names, or screen-reader output are correct.
  - Personal perception is not a substitute for measuring contrast with an appropriate tool.
  - Browser simulation can support investigation but does not reproduce every person's vision or display conditions.
  - Zoom, reflow, and user-defined text-spacing checks need additional procedures beyond this baseline review.
---

## What this method tests

This method checks whether people can perceive text, meaningful interface boundaries, status information, and interaction states. It combines systematic visual inspection with measurement where a result depends on a numeric contrast ratio.

## What you need

Use the page in a supported browser with its developer tools and a contrast checker. Test every theme the product offers. If the interface changes at different viewport sizes, include representative desktop and mobile widths.

## Before you start

Identify the page's themes, meaningful color states, and interactive controls. Keep a record of the foreground and background colors you measure, including the theme and interaction state in which they occur.

Do not decide that contrast passes merely because you can personally read or distinguish something. Measure the actual color pair. When transparency, gradients, images, or changing backgrounds are involved, test the least favorable relevant combination.

## How to perform the test

1. Review ordinary text, large text, links, labels, instructions, and status messages against each background on which they appear.
2. Measure text contrast with a contrast checker. At WCAG Level AA, ordinary text needs at least 4.5:1 contrast and large-scale text needs at least 3:1; do not round a result up to the threshold.
3. Inspect meaningful control boundaries, focus indicators, selected states, and graphical objects. Required visual information in user-interface components and graphical objects generally needs at least 3:1 contrast against adjacent colors.
4. Find every place where color communicates meaning, such as success and failure, availability, selection, or category. Check whether text, shape, pattern, position, or another non-color cue communicates the same meaning.
5. Read representative paragraphs, labels, and instructions. Look for cramped line spacing, crowded letter or word spacing, clipping, overlap, and layouts that prevent users from applying their own spacing.
6. Inspect each interactive control in its default, hover, and keyboard-focus states. Confirm the current state remains visually identifiable against its surroundings.
7. Repeat the relevant checks in every supported theme and at representative viewport widths.
8. Record the affected element, theme and state, observed problem, expected result, measured colors and ratio where relevant, and steps another tester can reproduce.

## What to observe

Look for text or meaningful component boundaries that blend into their backgrounds, statuses that become ambiguous when their colors are ignored, dense text that is difficult to track between lines, and controls whose hover or focus state cannot be distinguished reliably.

Passing one theme or state does not establish that the component passes everywhere. Treat each meaningful foreground, background, theme, and interaction-state combination as a separate test target.

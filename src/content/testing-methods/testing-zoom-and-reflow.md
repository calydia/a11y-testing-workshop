---
title: Testing zoom and reflow
summary: Check whether content and functionality remain available when text is enlarged and the page reflows into a narrow CSS viewport.
description: Learn repeatable procedures for testing 200% text resizing and the 320 CSS-pixel reflow condition.
status: published
order: 8
topics: [zoom, reflow, text resizing, responsive design, low vision]
prerequisites:
  - Basic familiarity with browser zoom controls and developer tools
skillLevel: beginner
estimatedMinutes: 20
tools: [Web browser, Browser developer tools, Keyboard]
platforms: [Desktop]
outcomes:
  - Test text enlargement up to 200% without loss of content or functionality.
  - Test vertical content at a width equivalent to 320 CSS pixels.
  - Identify clipping, overlap, obscured content, and unexpected two-dimensional page scrolling.
  - Distinguish essential two-dimensional regions from avoidable page-level reflow failures.
  - Record zoom and reflow findings with reproducible browser and viewport details.
interpretation:
  - Text enlarged to 200% should remain available and controls should remain usable at every intermediate step.
  - Vertically scrolling content should not require horizontal page scrolling at a width equivalent to 320 CSS pixels unless a specific region genuinely needs a two-dimensional layout for meaning or use.
  - A 1280 CSS-pixel starting viewport at 400% zoom commonly produces the 320 CSS-pixel condition, but testers should verify the effective viewport.
  - A failure report should identify the browser, starting viewport, zoom or text-size setting, affected target, and lost content or functionality.
limitations:
  - Browser page zoom, text-only resizing, operating-system magnification, and responsive viewport resizing are related but not identical mechanisms.
  - Browser support for text-only resizing differs, so use a supported mechanism and record it.
  - Tables, maps, diagrams, video, and other content may legitimately need two-dimensional layout; assess the exception for the specific region, not the whole page.
  - Passing these checks does not establish that the page works with every screen magnifier or assistive-technology configuration.
---

## What this method tests

This method checks whether people can enlarge text and page content without losing information or functionality. It combines a 200% text-resizing check with a reflow check at a width equivalent to 320 CSS pixels.

## What you need

Use a desktop browser with page-zoom controls and developer tools that can report the effective CSS viewport. For text resizing, use a browser or supported mechanism that can enlarge rendered text to 200%. Keep a keyboard available so you can confirm that controls remain reachable and operable.

## Before you start

Record the browser, default zoom, starting viewport, theme, and page state. Complete the main task once at the default presentation so you know what content and functionality must remain available.

Do not assume that resizing a browser window reproduces every effect of browser zoom or text-only enlargement. Use the intended mechanism for each procedure and document it.

## How to perform the test

### Reflow at the 320 CSS-pixel equivalent

1. Start with a viewport at least 1280 CSS pixels wide and default zoom, or another setup that lets you reach and verify a 320 CSS-pixel effective width.
2. Increase page zoom incrementally, checking the layout and task at each step, until the effective CSS viewport is 320 pixels wide. A 1280-pixel starting width commonly reaches this at 400% zoom.
3. Read the page from beginning to end and complete its primary task.
4. Check for horizontal page scrolling, clipped or overlapping content, controls outside the viewport, and fixed content that obscures information or functionality.
5. If a particular region scrolls in two dimensions, decide whether that layout is essential for understanding or operating that region. Do not extend a valid regional exception to unrelated page content.

### Text resizing to 200%

1. Return to default page zoom and a representative viewport.
2. Enlarge rendered text incrementally up to 200% using a supported text-resizing mechanism.
3. At every step, check headings, paragraphs, labels, messages, navigation, and controls for clipping, overlap, truncation, or loss.
4. Complete the primary task and confirm that enlarged control labels and related content remain available.
5. Repeat relevant states and themes where text or container dimensions change.

## What to observe

Look for page-level horizontal scrolling, long strings that escape their containers, fixed-width regions, text clipped by fixed heights, controls that disappear, overlaps, and sticky or fixed content covering the task. Note whether a problem occurs during page zoom, text resizing, or both.

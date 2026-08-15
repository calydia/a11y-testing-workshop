---
title: Testing image alternative text
summary: Decide what each image contributes in context and test whether its alternative communicates the same relevant purpose.
description: Learn a context-first visual, screen-reader, and markup-inspection procedure for meaningful, decorative, functional, and complex images.
status: published
order: 17
topics: [images, alternative text, screen readers, accessible names, content]
prerequisites:
  - Basic use of one screen reader
  - Basic familiarity with HTML inspection
skillLevel: beginner
estimatedMinutes: 20
tools: [Web browser, Screen reader, Browser developer tools]
platforms: [Desktop]
outcomes:
  - Classify an image's purpose in its actual content and task context.
  - Assess meaningful, decorative, functional, and text-containing images.
  - Distinguish an intentionally empty alternative from a missing attribute.
  - Evaluate linked-image names, broken-image fallback, and localized alternatives.
  - Record image findings with purpose, context, current output, and expected result.
relatedExercises: [evaluating-image-alternative-text-in-context]
interpretation:
  - A useful alternative communicates the image's relevant purpose in its current context rather than listing every visible detail.
  - Decorative images should normally add no separate announcement when they contribute no information or function.
  - A linked or operable image needs a control name that communicates the destination or action.
  - Screen-reader silence does not by itself distinguish a correct empty alternative from missing or unsupported markup.
  - Alternative text should use the language and terminology appropriate to the surrounding localized content.
limitations:
  - Automated tools can detect some missing attributes but cannot reliably judge whether supplied wording is accurate, useful, redundant, or appropriate in context.
  - Screen-reader announcements and visual broken-image fallback differ between browser and assistive-technology combinations.
  - This method does not cover charts, maps, canvas content, audio, video, or every complex-image description pattern.
  - Icon-specific SVG and generated-content behavior belongs in the dedicated icons and SVG method.
---

## What this method tests

This method checks whether images expose an alternative that communicates the same relevant purpose as their visual presentation. The correct result depends on what the image does in its surrounding content and task.

## What you need

Use the page visually, then with a screen reader and browser developer tools. Know how to navigate to images and links and how to inspect whether an `img` has a missing, empty, or non-empty `alt` attribute.

For icon-specific patterns, use [Testing icons and SVGs with a screen reader](/methods/screen-reader-icons-and-svg/).

## Before you start

Identify the page's task and read its surrounding text before judging individual images. The same picture may need different alternative text—or no alternative—when used in different contexts.

If testing a localized page, use a screen-reader voice that supports the page language and include alternative text in the translation review.

## How to perform the test

1. Review the page visually and identify every content-author-supplied image.
2. For each image, decide whether it is meaningful, decorative, functional or linked, contains text, or needs a longer description.
3. State what information or action the image contributes in this exact context before reading its markup.
4. Navigate through images and links with a screen reader and compare each announcement with the visual purpose and nearby content.
5. For linked or operable images, confirm the complete control name communicates its destination or action.
6. Confirm decorative images add no unnecessary announcement.
7. Inspect markup whenever silence alone cannot distinguish an explicitly empty alternative from a missing attribute or unsupported implementation.
8. When helpful, disable images or test a controlled broken resource and compare its visual fallback with its accessible name.
9. Check translated variants for appropriate language, terminology, and context.
10. Record the image, purpose, context, current accessible name or silence, expected result, and remediation direction.

## What to observe

Look for alternatives that are missing, vague, inaccurate, repetitive, or focused on appearance instead of purpose. Listen for decorative noise and linked images whose names do not explain their destinations. Also identify correct silence and useful alternatives so the review does not assume every image needs descriptive text.

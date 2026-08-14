---
title: Testing language changes with a screen reader
summary: Check whether content in another language triggers appropriate pronunciation without redundant language markup.
description: Learn how to test changes in the human language of page content with a screen reader.
status: published
order: 30
topics: [screen readers, language, pronunciation, semantics]
prerequisites: [Basic use of one screen reader, Relevant screen-reader voices installed]
skillLevel: beginner
estimatedMinutes: 15
tools: [Screen reader, Web browser]
platforms: [Desktop]
outcomes:
  - Check whether a screen reader changes pronunciation for marked-up language changes.
  - Verify that nested content inherits its parent's language.
  - Separate markup failures from missing voice or platform support.
relatedExercises: [testing-language-changes-on-a-community-library-noticeboard]
demonstration: screen-reader/language-changes
interpretation:
  - Correctly marked content should use the pronunciation rules for its declared language when the necessary voice is available.
  - Descendants inherit the language of their parent unless another language is declared.
  - Repeating the same language on every nested element is normally redundant rather than harmful.
limitations:
  - Screen readers may require language voices or packs to be installed separately.
  - Automatic voice switching and supported languages vary by screen reader, browser, and operating system.
---

## What this method tests

This method checks whether changes in the human language of content are exposed so assistive technology can apply suitable pronunciation rules.

## What you need

Use a screen reader with a voice installed for every language in the test content. Confirm that automatic language switching is enabled when the product provides that setting.

## How to perform the test

1. Confirm the page's default language and listen to content in that language.
2. Navigate to a passage written in another language.
3. Listen for a change in voice or pronunciation rules at the language boundary.
4. Continue into nested elements such as links and confirm that they inherit the surrounding language.
5. Inspect the markup if pronunciation does not change.
6. Before reporting a markup failure, verify the installed voices, screen-reader settings, and browser support.

## What to observe

Listen for pronunciation that follows the wrong language, switches too early or too late, or changes unexpectedly inside nested content.

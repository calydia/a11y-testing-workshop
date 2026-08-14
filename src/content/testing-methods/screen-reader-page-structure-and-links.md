---
title: Testing page structure and links with a screen reader
summary: Check whether headings communicate a logical structure and links make sense when encountered outside their surrounding text.
description: Learn how to test page headings, structure, and link purpose using screen-reader navigation and element lists.
status: published
order: 10
topics: [screen readers, headings, links, semantics]
prerequisites: [Basic keyboard navigation, Basic use of one screen reader]
skillLevel: beginner
estimatedMinutes: 20
tools: [Screen reader, Web browser]
platforms: [Desktop]
outcomes:
  - Navigate and assess a page by headings.
  - Review links sequentially and through a screen-reader links list.
  - Identify generic or repeated link text that obscures purpose.
relatedExercises: [reviewing-structure-and-links-in-a-community-resources-directory]
demonstration: screen-reader/page-structure-and-links
interpretation:
  - A heading outline should communicate the page hierarchy without requiring the surrounding visual layout.
  - A link should communicate its destination or action when announced with a reasonable amount of context.
  - Repeated generic links become especially difficult to distinguish in a screen-reader links list.
limitations:
  - Heading navigation commands and element-list names differ between screen readers.
  - A logical heading hierarchy does not prove that every visual relationship is represented semantically.
---

## What this method tests

This method checks whether semantic headings expose a useful page outline and whether links communicate their purpose to someone navigating non-visually.

## What you need

Use a desktop screen reader and a compatible browser. Know how to move by heading, open the screen reader's list or rotor of headings and links, and navigate forward through interactive elements.

## How to perform the test

1. Read the page title and main heading, then navigate through every heading in order.
2. Listen for skipped levels, headings that do not describe their sections, and text styled as a heading without heading semantics.
3. Open the screen reader's headings list and check whether the outline still explains the page.
4. Navigate through links in document order and listen to each accessible name.
5. Open the links list and check whether repeated or generic names can be distinguished without nearby prose.
6. Activate representative links when testing a real site and confirm that their names match their destinations or actions.

## What to observe

Pay attention to both structure and wording. A technically valid heading level can still be unhelpful, and a link that satisfies a minimum requirement in context may still be confusing when heard in a links list.

---
title: Testing page structure and links with a screen reader
summary: Check whether a page title, landmarks, and headings communicate useful structure and links make sense outside their surrounding text.
description: Learn how to test document titles, landmarks, headings, and link purpose using screen-reader navigation and element lists.
status: published
order: 12
topics: [screen readers, headings, links, semantics]
prerequisites: [Basic keyboard navigation, Basic use of one screen reader]
skillLevel: beginner
estimatedMinutes: 20
tools: [Screen reader, Web browser]
platforms: [Desktop]
outcomes:
  - Judge whether the document title usefully identifies the page.
  - Find the main content using landmark navigation and assess whether page regions are useful.
  - Navigate and assess a page by headings.
  - Review links sequentially and through a screen-reader links list.
  - Identify generic or repeated link text that obscures purpose.
relatedExercises: [reviewing-structure-and-links-in-a-community-resources-directory]
demonstration: screen-reader/page-structure-and-links
interpretation:
  - A useful document title identifies the current page and helps distinguish it from other open pages or views.
  - The main content should be discoverable through landmark navigation, and landmarks should describe a useful, restrained set of page regions.
  - A heading outline should communicate the page hierarchy without requiring the surrounding visual layout.
  - A link should communicate its destination or action when announced with a reasonable amount of context.
  - Repeated generic links become especially difficult to distinguish in a screen-reader links list.
limitations:
  - Landmark, heading, and element-list navigation commands and support differ between screen readers and browsers.
  - Finding a main region and a useful set of landmarks does not prove that every page region or visual relationship is represented correctly.
  - A logical heading hierarchy does not prove that every visual relationship is represented semantically.
---

## What this method tests

This method checks whether the document title, landmarks, and semantic headings expose useful page structure and whether links communicate their purpose to someone navigating non-visually.

## What you need

Use a desktop screen reader and a compatible browser. Know how to move by landmark and heading, open the screen reader's list or rotor of landmarks, headings, and links, and navigate forward through interactive elements.

## How to perform the test

1. Read the document title and judge whether the document title usefully identifies the page and distinguishes it from other pages or views.
2. Navigate by landmarks. Confirm that you can find the main content using landmark navigation and that the page exposes a useful, restrained set of landmarks.
3. Read the main heading, then navigate through every heading in order.
4. Listen for skipped levels, headings that do not describe their sections, and text styled as a heading without heading semantics.
5. Open the screen reader's headings list and check whether the outline still explains the page.
6. Navigate through links in document order and listen to each accessible name.
7. Open the links list and check whether repeated or generic names can be distinguished without nearby prose.
8. Activate representative links when testing a real site and confirm that their names match their destinations or actions.

## What to observe

Pay attention to both structure and wording. Record a useful title, discoverable main content, and purposeful landmarks as passing evidence. A technically valid heading level can still be unhelpful, and a link that satisfies a minimum requirement in context may still be confusing when heard in a links list.

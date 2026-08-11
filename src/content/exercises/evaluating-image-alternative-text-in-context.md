---
title: Evaluating image alternative text in context
summary: Compare meaningful, decorative, linked, missing, and broken-image alternatives on a community-volunteering page.
description: Practise deciding image purpose and evaluating alternative text through visual review, screen-reader testing, and markup inspection.
status: published
order: 50
topics: [images, alternative text, screen readers, content]
prerequisites:
  - Understand the Testing image alternative text method
difficulty: beginner
estimatedMinutes: 20
exerciseType: compare
fixture: image-alternative-text
objectives:
  - Classify image purpose before judging its alternative text.
  - Compare visual information, screen-reader output, surrounding context, and linked-image destinations.
  - Distinguish an explicitly empty decorative alternative from a missing attribute.
  - Observe useful alternative text when an image resource fails to load.
methods: [testing-image-alternative-text]
hints:
  - Decide why each image exists in this page before judging whether its wording is useful.
  - Compare the silent decorative case with the markup of images that are missing or exposing text.
  - Inspect the linked logo and broken image as destination and fallback cases rather than ordinary photographs.
expectedFindings: 4
solution:
  summary: The page contains four findings. The contextual volunteer image, explicitly empty decorative flourish, and broken image with useful alternative text are valid comparison cases rather than defects.
  findings:
    - title: The riverside photograph has a vague alternative
      explanation: Water is technically related to the photograph but does not communicate why the image appears in the cleanup story. Describe the relevant riverside condition or activity concisely, based on what the image contributes beyond the nearby text.
      method: testing-image-alternative-text
    - title: A decorative flourish is announced unnecessarily
      explanation: The blue wave flourish adds visual styling but no information, yet its non-empty alternative adds noise to screen-reader navigation. Give a purely decorative img an empty alt attribute so it is ignored.
      method: testing-image-alternative-text
    - title: The linked logo does not identify its destination
      explanation: The image link is named only Logo, which does not tell someone where activation leads. Name the linked image for the organization or destination, such as Community Action Network home, rather than describing only its visual type.
      method: testing-image-alternative-text
    - title: The meeting-point image has no alt attribute
      explanation: The location graphic contributes the Riverside Community Centre meeting point but has no alt attribute. Provide a concise alternative that communicates the relevant location information, while keeping the same information available in nearby text.
      method: testing-image-alternative-text
---

Use the [Testing image alternative text](/methods/testing-image-alternative-text/) method to review the community-volunteering page below.

1. Review the page visually and predict why each image is present.
2. Navigate through images and links with a screen reader and compare each announcement with the visible image, nearby content, and destination.
3. Inspect markup where you need to distinguish a missing attribute from an intentionally empty alternative.
4. Observe the deliberately broken image visually and with your screen reader.
5. Identify exactly four accessibility findings and three valid comparison cases.
6. For each finding, record the image, purpose, context, current output or silence, expected result, and remediation direction.

The broken image is intentional but is not one of the four findings. Browser fallback appearance and exact screen-reader phrasing can differ, so assess whether the useful alternative remains available rather than expecting one exact presentation.

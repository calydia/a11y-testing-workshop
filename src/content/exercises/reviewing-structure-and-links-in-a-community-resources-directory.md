---
title: Reviewing structure and links in a community resources directory
summary: Use heading navigation and link lists to assess the structure and link purpose of a community-services directory.
description: Practise comparing visible organization with semantic headings and evaluating whether links remain understandable outside their surrounding context.
status: published
order: 45
category: content-and-structure
topics: [screen readers, headings, links, semantics]
prerequisites:
  - Understand the Testing page structure and links with a screen reader method
difficulty: beginner
estimatedMinutes: 20
exerciseType: find-issues
fixture: community-resources-directory
objectives:
  - Judge whether the document title identifies the directory page usefully.
  - Navigate by landmarks and confirm that the main content is discoverable.
  - Assess whether semantic headings communicate a useful page outline.
  - Compare visible structure with screen-reader heading navigation and the headings list.
  - Evaluate link purpose in document context and in a screen-reader links list.
  - Record concise evidence and remediation direction for each finding.
methods: [screen-reader-page-structure-and-links]
hints:
  - Compare every visible resource title with what appears when you navigate by heading.
  - Listen to the transitions between heading levels, then look for a prominent title that is absent from the headings list.
  - Review the links list for repeated names, generic phrases, and names that do not distinguish different destinations.
expectedFindings: 5
solution:
  summary: The directory contains five pattern-level findings. Its useful document title, main region, introductory heading sequence, descriptive introductory links, Digital skills support card, and closing section provide passing checks.
  findings:
    - title: The Food support heading skips a level
      explanation: The Community services section uses an h2, but Food support is an h4. This creates an unexplained gap in heading navigation. Use the h3 level that represents a resource card beneath this section.
      method: screen-reader-page-structure-and-links
    - title: Housing advice is not exposed as a heading
      explanation: Housing advice is visually styled like the other resource titles but is a paragraph, so it is absent from heading navigation and the headings list. Mark it up as the same semantic heading level as its sibling cards.
      method: screen-reader-page-structure-and-links
    - title: Repeated Read more links do not distinguish their destinations
      explanation: The Food support and Housing advice cards both use Read more for different destinations. Nearby card content supplies context in document order, but the links are indistinguishable in a links list. Use concise visible wording that includes each resource name.
      method: screen-reader-page-structure-and-links
    - title: Click here does not identify its purpose
      explanation: The link name Click here does not say that it leads to information about contacting the support team when encountered independently. Replace it with wording that names the information or action.
      method: screen-reader-page-structure-and-links
    - title: Service details links do not distinguish different services
      explanation: Two Service details links lead to different service information. Although the phrase describes a general destination type, it does not distinguish the links in a links list. Include each service name in visible link wording or otherwise provide a clear, distinguishable accessible name.
      method: screen-reader-page-structure-and-links
---

Use the [Testing page structure and links with a screen reader](/methods/screen-reader-page-structure-and-links/) method to review the community resource directory. Start the exercise from the Exercise workspace.

1. Read the document title and decide whether it identifies this directory page usefully.
2. Navigate by landmarks and confirm that you can find the main content and understand the page regions provided.
3. Review the page visually and predict how its sections and resource cards should appear in a heading outline.
4. Navigate through every heading in document order, then inspect your screen reader's headings list or rotor.
5. Compare what your screen reader exposes with the visible organization.
6. Navigate through links sequentially, then inspect the links list or rotor without relying on surrounding text.
7. Identify exactly five accessibility findings while noting examples that work correctly.
8. Record the useful document title and discoverable main content as passing checks.
9. For each finding, record the affected content, observed output, expected result, user impact, and remediation direction.

Treat repeated instances of the same naming pattern as one finding. Screen-reader commands and exact announcement wording vary, so assess the exposed heading structure and accessible link names rather than expecting one exact phrase.

# Image alternative text method and exercise design

## Purpose

Create a dedicated Testing method for evaluating image alternative text and a contextual Exercise containing both valid and invalid examples. Selectively reuse suitable local images from retained workshop content without editing or deleting legacy pages.

The Exercise includes a deliberately broken image with useful alternative text so learners can observe visual fallback and assistive-technology exposure. The broken resource is instructional and is not itself an accessibility finding.

## Routes and order

Publish:

- `/methods/testing-image-alternative-text/`
- `/exercises/evaluating-image-alternative-text-in-context/`

Place the method with the screen-reader methods, after `Testing page structure and links with a screen reader` and before `Testing icons and SVGs with a screen reader`. Use an integer order between those existing entries. Place the Exercise after `Comparing automated and manual findings`.

Use existing listings, breadcrumbs, section navigation, metadata, Exercise presentation, fixture registry, theme behavior, and disclosures.

## Testing method

The method teaches purpose and context before wording. A tester should first decide what function an image performs, then assess whether the available text alternative communicates the same relevant purpose.

Cover these categories:

- meaningful images that contribute information;
- decorative images that add no information in context;
- functional or linked images whose alternative must communicate the action or destination;
- images containing text;
- complex images that need a concise alternative plus an adjacent or linked extended description;
- images whose purpose changes with surrounding content;
- localized images and translated alternatives.

### Procedure

1. Review the page visually and identify every content-author-supplied image.
2. Determine each image's purpose in its actual context before reading its `alt` value.
3. Navigate with a screen reader and compare the announcement with the relevant visual information, nearby text, and task.
4. For linked or operable images, verify that the resulting control name communicates the destination or action.
5. Check that decorative images add no unnecessary announcement.
6. Inspect markup when silence alone cannot distinguish an intentionally empty alternative from a missing attribute or unsupported implementation.
7. Disable images or test a controlled broken resource when useful to inspect visual fallback behavior; do not assume fallback rendering is identical across browsers.
8. Check translated pages and confirm alternative text uses the appropriate language and context.
9. Record the image, purpose, context, current accessible name or silence, expected result, and remediation direction.

### Interpretation and limitations

An automated checker can detect some structural conditions, such as a missing `alt` attribute, but cannot reliably decide whether supplied text is accurate, concise, redundant, decorative, or appropriate for the current context.

Screen-reader silence also does not prove correctness. Both a correctly empty decorative alternative and missing or unsupported markup can lead to silence in some combinations, so inspect code when the distinction matters.

Avoid universal wording formulas. Words such as `image`, `photo`, or `logo` are often redundant, but may occasionally contribute meaning; judge the complete accessible name and purpose rather than banning individual words mechanically.

Suggested metadata:

- Skill level: beginner
- Estimated time: 20 minutes
- Tools: web browser, screen reader, browser developer tools
- Platforms: desktop
- Outcomes: classify image purpose, assess context-appropriate alternatives, distinguish empty from missing markup, evaluate linked images, and report findings with evidence

## Exercise

Create a beginner `compare` Exercise titled `Evaluating image alternative text in context`, with an estimated duration of 20 minutes and `testing-image-alternative-text` as its related method.

The fixture depicts a community-volunteering page containing project information, linked branding, meaningful photographs, decorative presentation, and location information. Ask learners to:

1. Review the page visually and predict the purpose of each image.
2. Navigate through images and links with a screen reader.
3. Compare announcements with visible context and link destinations.
4. Inspect markup to distinguish missing and empty alternatives.
5. Observe the deliberately broken image visually and with a screen reader.
6. Identify exactly four accessibility findings while also documenting the three valid comparison cases.

## Fixture findings

Seed exactly four findings:

1. **Vague meaningful alternative.** A meaningful photograph uses `alt="Water"`, which does not communicate the image's relevant contribution to the volunteering story.
2. **Noisy decorative alternative.** A decorative flourish has non-empty alternative text and is announced despite adding no information.
3. **Unhelpful linked-logo alternative.** A linked organization logo uses `alt="Logo"`, so the link name does not communicate its destination or organization.
4. **Missing alternative attribute.** A meaningful event-location image has no `alt` attribute.

## Valid comparison cases

Include three non-findings:

1. A meaningful image with concise, context-specific alternative text.
2. A decorative image implemented with `alt=""`.
3. A deliberately broken image URL with useful context-specific alternative text and explicit dimensions so its fallback can be observed.

The broken resource should be deterministic and local, using a fixture-only nonexistent path rather than an external network dependency. Browser fallback appearance may differ; tests should assert the broken load state and accessible name rather than pixel-identical rendering.

## Assets and credits

Reuse suitable local images only where their existing source and credit information are known. Carry relevant credits into the fixture or Exercise content when required. Do not fetch new third-party images for this milestone.

A simple decorative flourish may be created as a small code-native SVG or CSS shape. Keep it isolated from established branding assets.

## Automated and behavioral contract

Use stable fixture markers for the four findings and three valid comparisons.

Tests should verify:

- the vague meaningful image exposes `Water`;
- the noisy decorative image appears in the accessibility tree;
- the linked logo exposes only `Logo` and points to a distinct organization destination;
- the meaningful location image lacks the `alt` attribute;
- the correct meaningful image exposes its context-specific alternative;
- the correct decorative image has an explicitly empty `alt` and no accessible image role;
- the broken image fails to load, retains its useful `alt`, and remains exposed with the intended accessible name;
- axe reports only explicitly documented structural results, including the missing-alternative target;
- unaffected links and controls retain accessible names, keyboard operation, and visible focus.

Do not require one exact screen-reader phrase or one exact visual broken-image rendering. Those details differ between browser and assistive-technology combinations.

## Hints and solution

Provide three progressive hints:

- decide why each image exists before judging its wording;
- compare silence from decorative cases with their actual markup;
- inspect linked images and the broken image as functional/fallback cases rather than ordinary photographs.

The Solution contains exactly four findings. Add a short valid-comparisons explanation after the findings so learners can verify why the correct meaningful, empty decorative, and broken-image cases are not defects. The current Exercise solution schema supports only findings, so place the valid-comparison explanation in the solution summary or finding explanations without changing the schema.

## Reuse and boundaries

Reuse the standard method and Exercise architecture. Add one fixture component, registry entry, method entry, Exercise entry, and focused tests. Do not add a new image component abstraction unless implementation reveals genuine repetition.

Do not duplicate the icons/SVG method. Link to it where icon-specific accessible-name or decorative-icon testing would otherwise be repeated.

Legacy `/testing-visuals/` and `/testing-screen-readers/` content remains unchanged.

## Deferred iframe UX review

Do not redesign Exercise embedding in this milestone. Record iframe scrolling and nested-navigation distraction as a cross-Exercise UX concern to evaluate after the remaining content migrations. Compare at least:

- reliable same-origin automatic iframe height;
- standalone-first Exercise presentation;
- inline rendering for fixtures that do not require document isolation;
- retaining iframes only for whole-document test conditions.

Any later change must preserve fixture isolation, accessible names, keyboard entry/exit, theme synchronization, standalone access, and automated-test boundaries.

## Verification

Verify:

- route and collection order;
- breadcrumbs and section navigation;
- method structure and link to the icons/SVG method;
- named iframe and standalone route;
- four findings and three valid comparisons;
- missing, empty, vague, functional, decorative, and broken-image behavior;
- stable automated results and independent human-judgment assertions;
- light/dark themes and narrow layouts;
- Hints and four-item Solution;
- zero outer-shell axe violations;
- unchanged legacy pages;
- production build and complete regression suite.

## Out of scope

- Editing, deleting, or redirecting legacy pages
- Redesigning iframe presentation now
- Downloading new third-party images
- Testing CSS background images, canvas, charts, maps, audio, or video alternatives
- Creating the deferred pre-launch legacy cleanup
- Creating a Learning path or Testing journey

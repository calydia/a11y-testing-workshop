# Zoom and reflow method and exercise design

## Purpose

Create a reusable Testing method covering zoom, reflow, and text resizing, followed by one Exercise that applies both procedures to a realistic appointment-booking page. Selectively adapt accurate concepts from the retained `/testing-zooming/` workshop page without editing or deleting that page.

## Routes and collection order

Publish:

- `/methods/testing-zoom-and-reflow/`
- `/exercises/testing-an-appointment-booking-at-high-zoom/`

Place the method after `Testing visual accessibility` and before the screen-reader methods. Place the Exercise after the visual account-dashboard Exercise. Both entries use the existing collection-driven listings, breadcrumbs, section navigation, metadata, and Exercise presentation.

## Testing method

The method teaches two related but separate checks:

1. Resize text up to 200% without loss of content or functionality.
2. Present vertically scrolling content at a width equivalent to 320 CSS pixels without loss of information or functionality and without requiring scrolling in two dimensions, except for content that genuinely requires a two-dimensional layout for usage or meaning.

Explain that a 1280 CSS-pixel viewport at 400% page zoom commonly produces the 320 CSS-pixel equivalent, but testers should verify the effective CSS viewport rather than assuming one browser setup. Distinguish full-page zoom, text resizing, operating-system magnification, and responsive viewport resizing.

The method should cover:

- starting from a known viewport and default zoom;
- increasing full-page zoom incrementally to the target condition;
- checking content, controls, labels, messages, and task completion at each step;
- testing text enlargement up to 200% with a supported mechanism;
- detecting clipping, overlap, obscured content, unwrapped strings, unexpected horizontal page scrolling, and loss of functionality;
- deciding whether two-dimensional scrolling is essential for a specific region rather than assuming an exception applies to the whole page;
- testing supported themes and representative states;
- documenting browser, viewport, zoom or text-size setting, target, expectation, and observed result.

Avoid outdated claims that pixel font sizes inherently prevent modern browser zoom. Recommend flexible layouts and containers based on observed behavior rather than declaring one CSS unit universally correct.

Suggested metadata:

- Skill level: beginner
- Estimated time: 20 minutes
- Tools: web browser, browser developer tools, keyboard
- Platforms: desktop
- Outcomes: perform repeatable reflow and text-resizing checks, identify lost or obscured content and functionality, distinguish valid exceptions, and report reproducible evidence

## Exercise

Create a beginner `find-issues` Exercise titled `Testing an appointment booking at high zoom`, with an estimated duration of 20 minutes and `testing-zoom-and-reflow` as its related method.

Use the established Exercise sequence:

1. Summary and metadata
2. Objectives
3. Instructions
4. Exercise workspace
5. Progressive Hints disclosure
6. Solution disclosure
7. Contextual related-method link

Ask learners to inspect the appointment booking at the 320 CSS-pixel equivalent and with text resized to 200%, complete the available booking-review task, find exactly four problems, and record the affected condition and reproducible evidence.

## Appointment-booking fixture

Use a document-level fixture rendered through the shared fixture route, embedded in a named iframe, and exposed through the normal standalone link. The fixture depicts an appointment summary with date and service details, contact information, a confirmation reference, explanatory content, and ordinary review or confirmation controls.

Use Atkinson Hyperlegible and the exact Lab light/dark base themes. Follow stored and system theme preferences and synchronize live with the parent page. The normal desktop presentation should look cohesive and remain keyboard-operable.

Seed exactly four deliberate findings:

1. **Fixed-width booking panel.** A meaningful main panel retains a fixed width and causes horizontal page scrolling at the 320 CSS-pixel equivalent.
2. **Unbreakable confirmation reference.** A long reference string adds horizontal overflow because it has no safe wrapping opportunity or overflow handling.
3. **Fixed-height appointment card.** At 200% text resizing, meaningful text and a related control are clipped or unavailable because the container cannot grow.
4. **Obscuring fixed action bar.** At the narrow zoom-equivalent width, a fixed bottom action area covers meaningful content or functionality and does not reserve sufficient space.

The four targets must be deterministic and independently testable. Do not introduce unrelated contrast, keyboard operation, focus order, accessible-name, semantic-structure, table, modal, or screen-reader defects.

## Automated test model

Browser automation does not need to drive browser chrome. Test the relevant rendered conditions directly:

- set the fixture viewport to 320 CSS pixels for reflow assertions;
- apply a test-only 200% root text-size override for text-resizing assertions;
- calculate page-level overflow from document scroll width versus client width;
- compare clipped container scroll dimensions with visible client dimensions;
- verify the fixed action area intersects an intended content target;
- confirm unaffected controls remain reachable and operable;
- verify the standalone fixture and Exercise shell retain their accessibility boundary.

The learner-facing method must still explain how to reproduce the checks with real browser zoom and text-resizing controls. Automated simulation is a regression contract, not a replacement for manual testing.

## Hints and solution

Provide three progressive hints:

- distinguish whole-page horizontal overflow from scrolling inside content that genuinely needs two dimensions;
- inspect long strings and compare visible content with container dimensions after text enlargement;
- check the bottom of the viewport and complete the task rather than evaluating only static text.

The Solution contains exactly four findings corresponding one-to-one with the seeded targets. Each explanation covers the test condition, user impact, evidence, and a practical remediation direction.

## Reuse and boundaries

Reuse the existing Exercise layouts, fixture renderer, theme initialization, iframe fallback, disclosures, section navigation, and breadcrumbs. Add one focused appointment-booking fixture and one registry entry. Do not duplicate shared theme or disclosure behavior.

The Lab shell and method page must pass normal automated checks. Fixture assertions may account only for deliberate targets and must fail on unrelated violations.

## Verification

Verify:

- method and Exercise listing order, routes, breadcrumbs, and exact current-page states;
- one named iframe and matching standalone fixture;
- exactly four intentional targets;
- page overflow at 320 CSS pixels from the fixed panel and long reference;
- clipping at 200% text size;
- fixed-bar overlap at the narrow condition;
- keyboard operation of unaffected controls;
- theme initialization and live iframe synchronization;
- narrow and desktop rendering in both themes;
- progressive Hints and four-item Solution;
- normal shell axe results and narrowly documented fixture results;
- unchanged legacy zoom content;
- complete site regression suite and production build.

## Deferred pre-launch legacy cleanup

Before the renewed site goes live, plan a separate final cleanup milestone for retained old content. That milestone should:

1. Inventory every legacy route, component, style, image, and asset still present.
2. Identify which new method, Exercise, Learning path, or Testing journey replaces each useful legacy item.
3. Decide explicitly whether each old route should be retained, redirected, archived, or removed.
4. Verify analytics, inbound links, bookmarks, and any external references before choosing redirects or removals.
5. Remove components and assets only after confirming no retained or new route depends on them.
6. Test redirects, missing-route behavior, navigation, sitemap output, and production build before launch.

Do not perform that cleanup during this zoom-and-reflow milestone.

## Out of scope

- Editing, deleting, or redirecting `/testing-zooming/`
- Migrating its Firefox screenshot or browser-specific workshop walkthrough verbatim
- Creating the deferred legacy-cleanup implementation now
- Adding image alternative-text, automated-tool, screen-reader, or table exercises
- Creating a Learning path or Testing journey

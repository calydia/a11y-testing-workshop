# Standalone-first Exercise workspace design

## Goal

Replace document-fixture iframe embedding with a clear standalone-first Exercise workflow. Learners start each document Exercise from its Exercise page, work in the isolated standalone fixture, and return whenever they need a hint or are ready to continue and review the solution.

This removes distracting nested scrolling while preserving fixture isolation, whole-document testing, theme behavior, intentional accessibility boundaries, and user choice over browser tabs.

## Scope

Apply the new workflow to all six current document fixtures:

- keyboard preferences form;
- visual account dashboard;
- zoom appointment booking;
- automated event registration;
- image alternative text;
- community-course registration.

The fixture registry already distinguishes `document` and `inline` fixtures. Document fixtures use the new standalone-first panel. Inline fixtures, if introduced later, continue to render directly inside the Exercise workspace.

Do not alter fixture content, intentional findings, registry keys, routes, Exercise content, hints, solutions, or Testing journey links.

## Exercise workspace presentation

Keep the existing `Exercise workspace` section and heading.

For a document fixture, replace the iframe and old `Open exercise in a new page` link with one compact workspace panel containing:

1. The registered fixture title as a heading.
2. A prominent same-tab link labelled `Start exercise`.
3. The exact primary guidance:

   `The exercise opens on a separate page. Return to this page whenever you need a hint, or when you are ready to continue and review the solution.`

4. A smaller optional note:

   `You can open the exercise in a new tab if you want to keep these instructions and hints available.`

The `Start exercise` link targets the existing `/exercise-fixtures/<key>/` route. Do not add `target`, script-driven window opening, or another browsing-context mechanism. Users retain normal browser controls for choosing a new tab.

The panel should use the Lab's existing border, background, link, button-like action, hover, focus, light-theme, dark-theme, and responsive conventions. Its meaning and action must remain clear without relying on color or icons.

## Return workflow

Every current standalone fixture already begins with one `Return to the exercise` link. Preserve those links and their current Exercise destinations.

Do not force browser history navigation. Explicit hrefs remain more predictable when a learner opens a fixture directly, bookmarks it, refreshes it, or chooses a new tab.

Returning to an Exercise may reset transient fixture state depending on normal browser navigation and document lifecycle. The optional new-tab note gives learners a way to keep Exercise instructions and hints available without the site forcing that choice.

## Theme behavior

Standalone fixture routes retain the existing shared theme initialization:

- use the saved `darkMode` preference when present;
- otherwise follow the system color preference;
- initialize before fixture presentation;
- apply the correct standalone light or dark fixture theme.

Remove embedded live-synchronization expectations from Exercise tests because the fixture is no longer present in the Exercise document. Do not remove the fixture route's existing storage and media-query listeners; they remain useful for a standalone page that is open while the preference changes in another browsing context.

## Component architecture

Update `ExerciseFixture.astro` so:

- inline fixture definitions still render their component;
- document fixture definitions render a focused standalone workspace panel;
- the panel receives its title and URL from the existing registry definition;
- no fixture-specific height conditions remain.

A separate small component such as `StandaloneExercisePanel.astro` is recommended to keep the registry branching component focused. It accepts only the registered title and fixture URL.

Remove all iframe markup and iframe height utility classes from the shared Exercise presentation. Do not introduce iframe-resize messaging, DOM measurement, client hydration, or persistence.

The fixture route and registry remain unchanged unless a type or import cleanup is strictly required. Fixture components remain isolated and are not imported directly by Exercise content.

## Accessibility

The panel uses a heading below `Exercise workspace`, explanatory paragraphs, and one ordinary link. The `Start exercise` link has a visible hover treatment and a full visible keyboard focus indicator in both themes.

No ARIA is required for ordinary same-tab navigation. Do not announce a new window because none is forced.

The Exercise shell should pass its full automated accessibility scan without excluding an iframe. Standalone fixtures retain their current focused accessibility test boundaries, including documented intentional violations.

The workspace panel must wrap naturally at narrow widths and must not cause page-level horizontal scrolling.

## Test migration

Update all six Exercise test files and shared axe coverage.

For each Exercise, verify:

- no iframe is rendered;
- exactly one `Start exercise` link exists in the Exercise workspace;
- the link points to the registered fixture route;
- the link has no `target` attribute;
- the registered fixture title is visible;
- the exact primary guidance is visible;
- the optional new-tab note is visible;
- the standalone fixture route returns successfully;
- the standalone fixture contains exactly one `Return to the exercise` link;
- the return link points to the correct Exercise route.

Across the shared workflow, verify:

- the action has visible hover and focus treatment in light and dark themes;
- the panel has no horizontal overflow at a narrow viewport;
- the full Exercise shell passes axe without iframe exclusions;
- initial saved light and dark preferences apply to every standalone fixture;
- the fixture's existing behavior, responsive checks, intentional findings, and standalone axe results remain unchanged;
- the Testing journey's direct course-registration workspace link remains valid.

Remove or rewrite:

- iframe-title assertions;
- iframe `src` assertions;
- `frameLocator` usage;
- embedded theme synchronization assertions;
- iframe height assertions;
- fixture-specific iframe height rules;
- axe iframe exclusions on Exercise detail routes.

Do not weaken standalone fixture behavior assertions merely because the embedded copy is removed. Tests should navigate directly to fixture routes for interaction, theme, responsive, and intentional-defect verification.

## Content and navigation

Do not rewrite the six Exercise entries. Their instructions already point learners toward the workspace and can remain unless a specific sentence incorrectly describes an embedded interface. If such wording exists, update only that sentence to describe starting the standalone Exercise.

The primary navigation, collection listings, breadcrumbs, Learning path, and Testing journey remain unchanged. The journey continues to link directly to the same standalone course-registration route.

## Verification

Run:

- focused tests for all six Exercise workflows;
- shared shell and axe tests;
- Testing journey tests;
- Astro diagnostics;
- production build;
- complete Playwright regression suite;
- visual review of representative Exercise panels at desktop/mobile and light/dark widths;
- `git diff --check`.

Confirm the diff contains no fixture markup or intentional-finding changes.

## Out of scope

- Automatic iframe resizing
- Selective iframe retention for current document fixtures
- New inline fixtures
- Persisting fixture state across navigation
- Forcing new tabs or windows
- Progress tracking
- Changing Exercise hints or solutions
- Changing standalone fixture content
- Legacy content cleanup

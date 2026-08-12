# Community conference programme Testing journey design

## Goal

Publish the second Testing journey, `Reviewing a community conference programme`, as an intermediate, task-led accessibility review of one consistent conference programme workspace. The journey applies five existing screen-reader-related Testing methods without reteaching them or revealing a solution.

Create a dedicated standalone journey workspace containing realistic programme content, valid comparisons, and a controlled set of accessibility problems. The journey teaches learners to combine evidence across techniques, distinguish defects from platform limitations and passing checks, and make an evidence-based publication recommendation.

## Routes and collection placement

Publish the journey at:

`/journeys/reviewing-a-community-conference-programme/`

Use status `published` and order `20`, after `Reviewing a course registration before launch`, on `/journeys/` and in the collection-driven Testing journeys submenu.

Publish the standalone workspace at:

`/journey-workspaces/community-conference-programme/`

Use `workspace` in the public route rather than implementation terms such as `fixture`. The workspace is linked contextually from the journey and does not appear in primary or section navigation.

## Audience, duration, and preparation

Use:

- difficulty: `intermediate`;
- estimated time: `75` minutes;
- role: `Accessibility tester reviewing a conference programme before publication`.

The learner is expected to understand basic screen-reader operation. Reference `Practical screen-reader testing` as recommended preparation, not a hard prerequisite. Visitors may still enter the journey directly and use its stage-level method links as references.

Do not repeat screen-reader setup instructions in the journey. Learners record their chosen assistive-technology environment during the first stage.

## Scenario

A community conference team is preparing to publish its programme. The learner has been asked to review whether screen-reader users can understand the programme, choose sessions using the available content and graphical controls, follow multilingual information, inspect session details in a modal, and return to the programme without losing their place.

The learner tests the same standalone conference workspace throughout the journey. The workspace contains a deliberate mixture of accessible patterns and defects. The journey must not state how many findings exist or expose a model answer.

## Methods

Reference exactly these five Testing methods in this order:

1. `screen-reader-page-structure-and-links`
2. `testing-image-alternative-text`
3. `screen-reader-icons-and-svg`
4. `screen-reader-language-changes`
5. `testing-modal-dialogs`

Do not add general keyboard testing as a sixth journey method. The modal method already includes the relevant keyboard procedure, and keyboard observations can be recorded as supporting evidence.

## Objectives

Learners should be able to:

1. Define a reproducible screen-reader review environment and scope.
2. Navigate a programme by structure and links rather than relying on visual layout.
3. Evaluate whether images, icons, and SVG controls communicate equivalent content and purpose.
4. Separate language-markup failures from unavailable voices or platform support.
5. Test modal naming, containment, background inertness, closing behavior, and focus restoration within a realistic task.
6. Consolidate overlapping evidence and make a concise publication recommendation.

## Six-stage sequence

The frontmatter `stages` array is authoritative and renders exactly six stages.

### 1. Define the review conditions

Record the workspace route, screen reader, browser, operating system, versions, installed voices, theme, viewport, initial UI state, and test scope. State what is outside the review.

No method reference is required for this planning stage.

### 2. Find your way through the programme

Locate the keynote and selected sessions using heading navigation, sequential reading, and link lists. Assess whether programme structure and session destinations remain understandable outside the visual layout.

Reference `screen-reader-page-structure-and-links`.

### 3. Choose a session using its complete content

Identify speakers and venues, compare graphical information with nearby text, and try the graphical schedule control. Decide which graphics communicate information or function and which should remain silent.

Reference, in order:

1. `testing-image-alternative-text`
2. `screen-reader-icons-and-svg`
3. `screen-reader-page-structure-and-links`

### 4. Review multilingual session information

Read the Finnish and Swedish content. Distinguish markup problems from unavailable voices or unsupported automatic switching, and record the environment needed to reproduce the result.

Reference `screen-reader-language-changes`.

### 5. Inspect session details and return to the programme

Open details from different sessions, identify the dialog, navigate within it, attempt to reach background content, close it using supported methods, and continue from the trigger.

Reference, in order:

1. `testing-modal-dialogs`
2. `screen-reader-page-structure-and-links`
3. `screen-reader-icons-and-svg`

### 6. Consolidate and recommend

Merge overlapping evidence, distinguish defects from passing comparisons and support limitations, prioritize user impact, and recommend whether the programme is ready to publish.

Reference all five journey methods in their authoritative order.

## Deliverables

Render exactly five static deliverables:

1. Test environment and review scope.
2. Programme-navigation record.
3. Findings with reproduction steps, evidence, user impact, and remediation direction.
4. Passing checks and support-dependent observations.
5. Concise publication recommendation identifying blockers and follow-up testing.

These are ordinary list items, not inputs, checkboxes, completion controls, grades, or saved progress. Do not require a particular reporting tool or disclose a target finding count.

## Conference workspace content

Create one focused workspace component and a static route. The rendered page includes:

- a conference introduction;
- a programme grouped by day;
- keynote and session entries;
- repeated links that open session details;
- speaker and venue images;
- meaningful, decorative, linked, and icon-button graphics;
- Finnish and Swedish text within an English document;
- a session-details modal;
- a single `Return to the Testing journey` link.

The journey link to the workspace and the return link both use normal same-tab navigation without `target`. Visitors may choose to open either link in a new tab.

Use original local assets or simple code-native graphics that can be redistributed with the project. Do not depend on remote images or third-party scripts.

## Canonical workspace findings

The implementation contains exactly these eight intentional findings:

1. Part of the programme uses a misleading heading hierarchy.
2. Repeated session-detail links do not distinguish their destinations.
3. A speaker image alternative does not communicate the speaker's relevant identity.
4. A decorative graphic is announced unnecessarily.
5. An icon-only schedule control lacks a useful accessible name.
6. A Finnish language change is not programmatically marked.
7. The session-details modal lacks a useful accessible name.
8. Closing the modal fails to restore focus to the control that opened it.

The journey page and workspace must not disclose this list or count. Avoid source comments, `data-*` labels, classes, IDs, accessible descriptions, or visible text that identify elements as findings. Stable semantic IDs needed for interaction tests are acceptable when they describe content or function rather than correctness.

## Passing comparisons

Include and preserve these intentional passing cases:

- a logical heading region elsewhere in the programme;
- a useful venue-image alternative;
- a correctly silent decorative icon;
- a well-named linked graphic;
- correctly marked Swedish content;
- keyboard focus containment in the open modal;
- background inertness while the modal is open;
- Escape and visible close-control behavior.

Passing cases allow learners to distinguish actual defects from assumptions and document behavior worth preserving.

## Modal implementation boundary

Use the native `dialog` element opened with `showModal()` so browser-provided modal containment and background inertness remain valid comparisons. Populate the dialog's session content based on the selected details link.

The dialog deliberately has no accessible name. Both Escape and the visible close control close it. After closing, deliberately move focus away from the triggering link to create the focus-restoration finding. Do not introduce unrelated keyboard traps or broken close behavior.

Use a small workspace-local client script only for opening, populating, closing, and deliberate focus placement. Do not add application state, persistence, or framework hydration.

## Recommended Learning path architecture

Extend the Testing journey collection schema with:

`learningPaths: z.array(reference('learningPaths')).default([])`

Resolve these references at build time in the journey route and pass small view models to journey presentation. Each view contains title, summary, level, estimated time, and URL.

Extend the existing `Optional preparation` presentation so it can render recommended Learning paths and optional Exercises. Use visible content-type labels or otherwise clearly distinguish them. Exercise-specific warnings about not consulting a solution apply only when Exercises exist.

The first journey has no Learning path references and must retain its current optional Exercise behavior and wording. Missing references fail content validation or the build rather than being silently omitted.

## Journey body responsibilities

The journey Markdown body supplies concise guidance unique to this scenario:

1. pacing advice;
2. the direct workspace link;
3. evidence-recording guidance;
4. advice for handling assistive-technology variation;
5. publication-recommendation guidance.

Do not duplicate frontmatter objectives, methods, stages, or deliverables in Markdown. Do not include a solution, required finding count, severity answer key, or completed model report.

## Component and route architecture

Reuse:

- the Testing journey collection and dynamic detail route;
- `JourneyLayout`, `JourneyMeta`, `JourneyOverview`, and `JourneyStages`;
- collection-driven listing, submenu, and breadcrumbs;
- build-time method resolution and stage normalization;
- shared Lab theme initialization for the workspace.

Add or extend only focused boundaries:

- the optional `learningPaths` content reference field;
- Learning-path reference resolution in the journey route;
- optional-preparation presentation for both content types;
- one conference workspace component;
- one static journey-workspace page;
- a small workspace-local modal script.

Do not edit the five referenced methods, their demonstrations, existing Exercises, exercise fixtures, or the first journey's workspace.

## Internal linking and navigation

The journey is discoverable from `/journeys/`, the Testing journeys submenu, and its breadcrumb hierarchy. The workspace is discoverable only through the journey's contextual link and returns only to that journey.

Keep both journey detail pages at the same URL depth. Do not place the intermediate journey beneath the Learning path or beneath the first journey.

The recommended Learning path link establishes a cross-section connection from application back to structured preparation without making completion mandatory.

## Accessibility and responsive behavior

The surrounding journey page must have no automatically detectable accessibility violations. It uses semantic headings and lists, visible text for stage and method associations, existing link focus treatments, light/dark themes, and layouts that wrap without page-level horizontal overflow.

The workspace intentionally contains accessibility defects for learners to discover. It must still avoid unrelated failures outside the canonical set. Theme controls are not required inside the workspace, but the saved Lab theme must apply. The return link and all non-defective controls use visible hover and focus treatments.

At narrow widths, programme content and the dialog fit the viewport without unrelated horizontal scrolling. Do not make responsiveness itself an undisclosed ninth finding.

## Testing

Add focused journey-page tests for:

- publication at `/journeys/reviewing-a-community-conference-programme/`;
- both journeys appearing in order on `/journeys/` and in the submenu;
- intermediate difficulty and `75 minutes` metadata;
- scenario, role, and exactly six objectives;
- five methods in the approved order;
- `Practical screen-reader testing` as optional preparation with title, summary, level, duration, and route;
- preservation of the first journey's optional Exercise presentation and warning;
- exactly six stages with approved tasks and stage-specific method links;
- exactly five static deliverables;
- a same-tab workspace link to `/journey-workspaces/community-conference-programme/`;
- absence of a solution, finding count, grading, completion controls, and progress storage;
- breadcrumb, submenu current state, visible focus, themes, narrow layout, and no axe violations.

Add focused workspace tests for:

- the standalone route and one correct return link;
- retained light and dark theme preference;
- intended heading and repeated-link structures;
- image, SVG, icon-control, and language cases;
- exact expected automated-rule IDs and no unrelated axe violations;
- opening the correct session content from multiple details links;
- native modal focus containment and background inertness;
- Escape and visible close-control behavior;
- deliberate failure to restore focus to the trigger;
- narrow layout without unrelated overflow;
- absence of comments or diagnostic markup that reveal answers.

Do not add the intentionally defective workspace to the site-wide zero-violation axe route list. Add only the surrounding journey page there.

Run Astro diagnostics, content reference validation, the production build, focused tests, the complete Playwright suite, and `git diff --check`. Visually review the journey and workspace at desktop/mobile widths in light/dark themes. Confirm no referenced method, demonstration, Exercise, exercise fixture, or first-journey workspace changed.

## Deferred work

This milestone does not include:

- a dedicated Exercise derived from the conference workspace;
- a public solution or model report;
- a required finding count, grading, saved state, or progress tracking;
- changes to the Practical screen-reader testing Learning path sequence;
- new Testing methods or changes to existing method content;
- additional journey workspaces;
- a downloadable reporting template;
- legacy content cleanup.

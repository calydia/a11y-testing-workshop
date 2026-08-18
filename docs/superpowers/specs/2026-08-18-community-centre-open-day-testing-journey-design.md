# Community centre open-day Testing journey design

## Goal

Publish an intermediate Testing journey in which learners review one fictional community-centre open-day website before launch. The journey applies six existing Testing methods in a realistic workflow, teaches learners to consolidate overlapping evidence, and ends with an evidence-based launch recommendation.

This journey closes an application gap for forced-colors, motion, mobile-touch, and media methods that currently appear in the broad beginner Learning path but not in a Testing journey. It also reinforces keyboard and zoom/reflow skills without expanding the curriculum with another isolated method.

## Public routes

Add:

- `/journeys/reviewing-a-community-centre-open-day-before-launch/`
- `/journey-workspaces/community-centre-open-day/`

Use `workspace` in learner-facing language. The workspace route is linked contextually from the journey and does not appear in primary or section navigation. It returns to the journey through a normal same-tab link.

The journey is discoverable from `/journeys/`, the Testing journeys submenu, breadcrumbs, internal links, and the sitemap. Its title and summary must make the scenario understandable to visitors who arrive directly.

## Audience, level, and timing

Set the journey to intermediate difficulty with a 90-minute estimate. The learner has basic familiarity with browser accessibility testing and can consult the linked Testing methods while working.

Recommend `Your first accessibility review` as optional preparation, not a prerequisite. Do not require path completion, progress tracking, grading, a particular reporting tool, or a specific number of findings.

The learner acts as the accessibility tester for a community centre preparing to publish its open-day website. Their responsibility is to define a reasonable scope, collect reproducible evidence, distinguish findings from passing checks and platform limitations, prioritize user impact, and advise whether the site is ready to launch.

## Referenced methods

Reference these six methods in authored order:

1. `testing-keyboard-accessibility`
2. `testing-forced-colors-and-high-contrast`
3. `testing-motion-animation-and-flashing`
4. `testing-mobile-touch-and-orientation`
5. `testing-media-accessibility`
6. `testing-zoom-and-reflow`

Each method appears in the relevant journey stage. The journey applies the existing procedures rather than restating them. Do not modify the methods or their paired Exercises merely to accommodate this journey.

## Six-stage sequence

The frontmatter `stages` array is authoritative and renders exactly six stages.

### 1. Define scope and environments

Record the workspace route, task scope, browsers, operating systems, versions, viewport and orientation conditions, input methods, visual preferences, media settings, assistive technology where used, initial state, and known exclusions. No method reference is required for this planning stage.

### 2. Review keyboard operation and reflow

Use `Testing keyboard accessibility` and `Testing zoom and reflow`. Complete representative navigation, schedule, save, media, and booking tasks. Review focus visibility and order, control operation, content availability, obstruction, and reflow at the defined conditions. Record passing behavior as well as findings.

### 3. Apply visual and motion preferences

Use `Testing forced colors and high contrast` and `Testing motion, animation, and flashing`. Activate real platform or browser conditions where available. Review selected states, map interpretation, moving content, pause controls, and reduced-motion behavior. Label assisted evidence and limitations accurately.

### 4. Test touch and orientation

Use `Testing mobile touch and orientation`. Prefer a real touchscreen device. Review target geometry and spacing, direct-touch operation, portrait and phone-like landscape content, and relevant exceptions. Treat emulation as supporting evidence rather than proof of physical usability.

### 5. Review the travel video

Use `Testing media accessibility`. Compare narration, captions, transcript, visual-only information, playback behavior, and player controls. Separate author-controlled alternative-content defects from native player and platform differences.

### 6. Consolidate and recommend

Merge evidence that describes the same root problem, preserve distinct findings that require different remediation, prioritize user impact, identify launch blockers and follow-up testing, and provide a concise launch recommendation.

## Journey deliverables

Render exactly six static deliverables:

1. Scoped environment and test plan.
2. Reproducible findings with affected task, state, method, actual result, expected result, and evidence.
3. Passing checks and platform or support limitations.
4. Consolidated findings where multiple methods expose the same root problem.
5. Prioritized remediation directions and follow-up testing.
6. Concise launch recommendation with blockers and rationale.

These are ordinary list items. Do not render checkboxes, progress indicators, saved state, scores, grades, or a completed model report.

## Workspace content

Create one focused workspace component and one static journey-workspace route. The rendered page includes:

- a return link to the journey;
- community-centre branding and an open-day introduction;
- ordinary site navigation;
- featured activities;
- schedule filters and event cards;
- venue information and a small authored map;
- a locally hosted travel-information video with captions and transcript;
- a booking action and enough trailing content to test obstruction;
- explicit platform-variation guidance where needed without exposing findings.

The workspace uses the Lab's saved light or dark theme, has a deterministic initial state after reload, remains usable at narrow widths outside intentional conditions, and contains no real transactions, personal data, external requests, analytics, or persistence.

## Canonical workspace findings

The implementation contains exactly these nine intentional findings:

1. A custom `Save activity` control responds to pointer activation but cannot receive focus or operate from the keyboard.
2. A fixed booking bar obscures meaningful content or controls at the method's defined zoom/reflow condition.
3. The selected schedule filter loses its only visible selected cue in forced colors even though its programmatic state remains correct.
4. Authored venue-map regions become indistinguishable in forced colors because their meaning depends on custom colors without a durable equivalent.
5. A featured-activities carousel advances automatically, has no pause control, and continues its movement when reduced motion is requested.
6. Authored map controls are below the target-size baseline and too closely spaced for the spacing alternative, with no applicable exception.
7. Useful schedule, venue, media, or booking content is blocked at phone-like landscape dimensions even though portrait orientation is not essential.
8. The travel-video captions state an incorrect route number while narration and transcript provide the correct number.
9. A meaningful visual-only shuttle cancellation is absent from narration, captions, transcript, and any audio-described version or complete equivalent alternative.

The journey page and workspace must not disclose this list or count. Avoid answer-revealing source comments, visible labels, accessible descriptions, class names, IDs, or `data-*` attributes. Stable selectors may describe content or function rather than correctness.

One interface region can produce evidence for more than one method, but the canonical findings remain distinct only where the root cause and remediation differ. The journey guidance tells learners to consolidate duplicates rather than treating every observation as a separate defect.

## Passing comparisons

Include representative passing behavior:

- ordinary links and native buttons work with keyboard input and have visible focus;
- the main schedule content flexibly reflows outside the intentionally fixed booking bar;
- ordinary content does not move or animate unnecessarily;
- primary booking and schedule actions provide sufficiently large touch targets;
- the travel video starts only after user activation and uses native controls;
- the transcript is generally useful and contains the correct route number;
- the page remains available in desktop landscape and ordinary portrait conditions;
- important state not assigned to the seeded forced-colors findings remains distinguishable.

Passing checks help learners avoid treating every difference or platform variation as a defect.

## Workspace behavior

Use small, isolated client behavior only where needed:

- advance the featured-activities carousel on one predictable timer;
- support pointer activation for the deliberately keyboard-inaccessible save control and expose a visible saved state;
- update schedule-filter visible and programmatic selection in ordinary colors;
- apply the orientation restriction only through a phone-like landscape media condition;
- normalize locally generated WebM duration if required for native seeking;
- restore all initial content and states on reload.

Do not add framework hydration, application-wide state, persistent storage, background requests, or real booking behavior. Avoid duplicated timers or event listeners. The carousel must not flash or use rapid alternating changes.

## Journey media

Create a second short locally generated WebM video specifically for this journey. It must be distinct from the media Exercise and focus on travel information for the open day.

The narration and transcript state the same correct route number. The WebVTT caption file substitutes a different route number in one otherwise accurate cue. A meaningful shuttle cancellation and its time are shown visually but omitted from narration, captions, transcript, and any described source.

The video uses clear synthetic narration, simple authored cards, user-initiated native controls, no autoplay, no hazardous flashing, no abrupt loud audio, no copyrighted third-party material, and no external dependency. Store a stable poster image with the meaningful visual detail so the pre-playback state is deterministic.

Keep the asset compact and provide a source-controlled local generator. Reuse the proven media-generation approach without coupling this journey's content or timing to the existing Exercise asset.

## Journey page content

The Markdown body adds concise guidance that complements rather than duplicates frontmatter:

- how to maintain one evidence log across several methods;
- when to reset the workspace or environment;
- how to handle overlapping evidence;
- how to distinguish findings, passing checks, observations, and limitations;
- how to prioritize and write the launch recommendation;
- the Lab's scope and disabled-user-testing boundary.

Provide one clearly named link to open the workspace. Do not embed the workspace, force a new tab, reveal solutions, state a target finding count, or supply a completed report.

## Collection and navigation integration

Publish the journey after the two existing journeys. Preserve both existing journeys' authored content, method lists, stages, workspaces, and tests.

The existing collection-driven Testing journeys listing and submenu include the new route automatically. Update exact listing, navigation, breadcrumb, accessibility-route, sitemap, and unique-ID assertions.

No Learning path content or duration changes are required. `Your first accessibility review` is linked as recommended preparation from this journey only.

## Verification

Add focused Playwright coverage for:

- journey title, summary, intermediate difficulty, 90-minute estimate, scenario, role, objectives, six methods, recommended path, stages, deliverables, breadcrumbs, and navigation;
- contextual workspace and return links using normal same-tab navigation;
- absence of solutions, finding counts, progress, grading, and completed recommendations;
- deterministic workspace reload and unique IDs;
- the keyboard-inaccessible save control alongside passing native controls and visible focus;
- fixed booking-bar obstruction only at the intended zoom/reflow condition;
- selected-filter and map-region behavior in ordinary and real forced-colors conditions;
- carousel movement, missing pause control, real reduced-motion behavior, timer cleanup, and no hazardous flashing pattern;
- exact touch-target boxes, center spacing, passing target comparisons, portrait availability, phone-like landscape restriction, and desktop-landscape availability;
- locally built video, poster, caption track, transcript, finite duration, playback, pause, seeking, route-number mismatch, and visual-only shuttle content;
- light and dark themes, narrow-width fit, expected axe boundary, and no answer leakage;
- Testing journeys listing order, section navigation, accessibility-route coverage, sitemap output, Astro diagnostics, production build, and the full regression suite.

Tests must inspect stable DOM, computed state, media metadata, source assets, and event outcomes. Do not depend on the painted appearance of native video controls, exact caption styling, animation screenshots, physical touch comfort, or unsupported platform behavior.

## Out of scope

- New Testing methods or Exercises.
- Changes to the two existing Testing journeys or their workspaces.
- A completed model answer or required finding count.
- Real booking, authentication, payments, storage, or network requests.
- Custom media-player controls or live media.
- Mobile screen readers, voice control, switch control, or stylus-specific testing.
- A conformance claim or exhaustive WCAG mapping.
- Treating the intentionally incomplete workspace as production-ready event software.

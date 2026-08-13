# Icons and SVGs exercise design

## Goal

Create a beginner Exercise that follows `Testing icons and SVGs with a screen reader` and gives learners focused practice deciding whether inline SVG graphics expose the right meaning: concise names for meaningful graphics and silence for decorative graphics.

The Exercise belongs immediately after its method in `Practical screen-reader testing`. It uses the established standalone workspace workflow and does not reuse the broader community-conference journey workspace.

## Published content

Create the Exercise at:

`/exercises/reviewing-icons-and-svgs-in-a-community-events-dashboard/`

Use:

- title: `Reviewing icons and SVGs in a community events dashboard`;
- difficulty: beginner;
- estimated time: 20 minutes;
- Exercise type: `find-issues`;
- primary method: `screen-reader-icons-and-svg`;
- expected findings: exactly five.

The objectives are to:

1. classify inline SVGs as meaningful, decorative, or functional before judging their implementation;
2. compare visible graphic meaning with exposed graphic and control names;
3. identify missing, generic, noisy, and duplicated accessible names;
4. distinguish problematic patterns from correctly named or correctly silent comparisons;
5. record evidence and remediation direction without assuming identical speech phrasing across platforms.

## Learner workflow

The authored instructions ask the learner to:

1. open the standalone community-events dashboard;
2. review each icon and SVG visually and predict its purpose;
3. navigate through graphics and controls with a screen reader;
4. compare each announcement or silence with the visible purpose and nearby text;
5. inspect markup where needed to confirm why a graphic is exposed or hidden;
6. identify exactly five pattern-level findings and four valid comparisons;
7. record the affected graphic or control, current output, expected result, user impact, and remediation direction.

Exact graphic-role wording and repetition can differ between browser and screen-reader combinations. Learners assess whether equivalent purpose is available without unnecessary noise rather than matching one prescribed announcement.

## Standalone fixture

Create a standalone fixture at:

`/exercise-fixtures/community-events-dashboard/`

The fixture represents a signed-in dashboard for managing saved community events. It contains:

- a return link to the Exercise;
- one page heading and a short introduction;
- a small summary region with meaningful status graphics;
- saved-event cards with dates, availability, and controls;
- download and save/remove actions;
- a compact explanatory note containing a decorative icon.

Use only code-native inline SVG. Do not introduce remote assets, icon fonts, or generated-content icons. Controls remain native buttons or links, are keyboard operable, and have visible focus.

## Five intentional findings

### 1. A meaningful availability graphic has no accessible name

One event uses a visually meaningful inline SVG to communicate that only a few places remain. The SVG is exposed as a graphic but has no accessible name, and no nearby text supplies that same availability information.

Remediation direction: give the meaningful graphic a concise name such as `Only a few places remaining`, or provide equivalent visible text and make the SVG decorative.

### 2. A meaningful location graphic is named only `Icon`

One inline SVG communicates that an event is held online, but its accessible name is the generic word `Icon`. The name confirms that a graphic exists without communicating its meaning.

Remediation direction: name the meaningful graphic for the information it conveys, such as `Online event`, or provide equivalent text and hide the decorative SVG.

### 3. A decorative SVG beside visible button text is announced unnecessarily

A `Save event` button contains visible text that already supplies the complete control name. Its star SVG is separately exposed and named `Star`, adding irrelevant content to the button's accessible name or navigation experience.

Remediation direction: hide the decorative SVG from assistive technology and let the visible button text provide the name.

### 4. An icon-only remove button has no accessible name

One saved-event card has a button containing only a trash/remove SVG. The SVG is hidden as decorative, but the button itself has no accessible name.

Remediation direction: give the button a concise contextual name such as `Remove Riverside repair café from saved events`, while keeping the internal SVG decorative.

### 5. A text button exposes duplicate download wording

A `Download schedule` button contains visible text plus an exposed SVG named `Download`. Depending on accessible-name computation and screen-reader output, the control includes redundant download wording rather than one concise name.

Remediation direction: hide the SVG because the visible text already communicates the complete action.

## Four valid comparisons

Include four deliberate passing patterns:

1. a meaningful standalone SVG named `Three saved events`;
2. a decorative calendar SVG hidden beside an event date already expressed in text;
3. an icon-only button named contextually, such as `Add neighbourhood gardening workshop to saved events`;
4. a `View event details` control whose arrow SVG is hidden and whose visible text supplies the complete name.

The solution identifies these as valid comparisons. Learners should not report every SVG or every icon-only control merely because those patterns require judgment.

## Visual and interaction design

Use the established standalone-fixture conventions:

- Atkinson Hyperlegible typography;
- light background and dark-theme counterpart consistent with existing fixtures;
- bordered cards and a responsive grid;
- visible hover and focus treatments on every control;
- a single-column layout at narrow widths;
- no horizontal page scrolling at 390px;
- saved-event controls that respond to pointer and keyboard activation without changing the fixture's instructional structure.

The fixture may update a visible neutral status message after a control is activated. If used, the message must be correctly exposed and must not add an unrelated live-region defect.

## Hints and solution

Provide three progressive hints:

1. decide which graphics communicate information or function and which merely repeat nearby text;
2. compare the visual meaning of each graphic with its accessible name, including controls containing both SVG and visible text;
3. look for one unnamed graphic, one generic graphic name, an unnamed icon-only control, and two controls made noisy by exposed decorative SVGs.

The solution lists the five findings above. Each explanation states the role of the SVG, observable output, user impact, and remediation direction without prescribing ARIA when visible text or native semantics are sufficient.

## Method and Learning path integration

Update `Testing icons and SVGs with a screen reader` to link visibly to the new Exercise and reference it through `relatedExercises` metadata.

Update `Practical screen-reader testing` so the Exercise follows the icons/SVG method immediately. Preserve the earlier page-structure/link and image-alternative pairs and the later language and modal methods in their current relative order.

Increase the Learning path estimate from 155 minutes to 175 minutes, displayed as approximately 2 hours 55 minutes. Any journey card that surfaces this path's raw duration must reflect 175 minutes.

## Architecture

Add the fixture component to the existing Exercise fixture registry and render it through the shared standalone fixture route. Reuse `ExerciseLayout`, `StandaloneExercisePanel`, Exercise hints and solution components, breadcrumbs, section navigation, theme persistence, and collection helpers.

Use neutral, purpose-oriented data attributes only where browser tests need stable targets. Do not expose labels such as `finding`, `broken`, `problem`, `answer`, or `solution` in the rendered fixture markup.

## Validation

Add focused Playwright coverage that asserts:

- Exercise metadata, objectives, method link, instructions, standalone workflow, three hints, and five-item solution;
- exact roles and accessible names of the five intentional patterns;
- exact accessible behavior of the four valid comparisons;
- native control operation and visible focus;
- fixture source contains only the approved inline-SVG patterns and does not reveal answers;
- the return link works without forcing a new tab;
- saved theme and 390px responsive behavior;
- axe results remain limited to the approved automatic boundary, with manual or support-dependent patterns asserted separately;
- method link and collection relationship;
- immediate Learning path placement and revised duration;
- updated downstream journey duration;
- an axe-clean outer Exercise page.

Run Astro diagnostics, production build, focused Exercise, method, Learning path, journey, architecture, and accessibility tests, the complete Playwright suite, visual review in both themes and responsive widths, and `git diff --check`.

## Out of scope

- raster-image alternative text;
- CSS-generated icon support testing;
- icon fonts or external icon libraries;
- heading structure, link-purpose, language, modal, form, validation, contrast, zoom, or reflow defects;
- inaccessible keyboard behavior or focus styling;
- changing the migrated method demonstration or legacy example route;
- changing the community-conference journey workspace;
- creating language-change or modal-dialog Exercises in this implementation.

# Language changes exercise design

## Goal

Create a beginner Exercise that follows `Testing language changes with a screen reader` and gives learners focused practice identifying whether Finnish, Swedish, and English language boundaries are represented correctly in markup.

The Exercise belongs immediately after its method in `Practical screen-reader testing`. It uses the established standalone workspace workflow and explicitly separates markup evidence from voice installation, automatic-switching settings, and platform support.

## Published content

Create the Exercise at:

`/exercises/testing-language-changes-on-a-community-library-noticeboard/`

Use:

- title: `Testing language changes on a community library noticeboard`;
- difficulty: beginner;
- estimated time: 20 minutes;
- Exercise type: `find-issues`;
- primary method: `screen-reader-language-changes`;
- expected findings: exactly five.

The objectives are to:

1. identify the intended human language of each passage before inspecting markup;
2. test language boundaries and nested content with a screen reader;
3. inspect declared and inherited language values;
4. distinguish missing, incorrect, invalid, and overly broad language declarations;
5. separate markup defects from unavailable voices or unsupported automatic switching.

## Learner workflow

The authored instructions ask the learner to:

1. record the screen reader, browser, operating system, installed Finnish and Swedish voices, and automatic-language-switching setting;
2. open the standalone community-library noticeboard;
3. review the visible English, Finnish, and Swedish passages and predict each language boundary;
4. read through every notice and its nested links with a screen reader;
5. inspect language markup and inherited values;
6. identify exactly five markup findings and four valid comparison patterns;
7. record actual pronunciation or voice behavior separately from markup evidence;
8. avoid reporting a markup failure solely because a voice did not switch.

Exact voices, language names, pronunciation, and switching behavior vary across screen readers, browsers, operating systems, installed voice packs, and user settings. The solution evaluates markup and language boundaries rather than one prescribed speech output.

## Standalone fixture

Create a standalone fixture at:

`/exercise-fixtures/community-library-noticeboard/`

The document language remains English. The page represents a Helsinki community library noticeboard and contains:

- a return link to the Exercise;
- one English page heading and introduction;
- Finnish and Swedish event notices;
- nested registration or information links;
- one intentionally English phrase nested within a correctly marked non-English passage;
- a closing English information section.

All language examples must be natural, concise, and understandable enough for a learner to identify visually without requiring full fluency. Use accurate Finnish and Swedish diacritics and language codes in the valid cases.

## Five intentional findings

### 1. A Finnish announcement has no language declaration

A complete Finnish notice appears within the English document without a `lang` attribute on the passage or an ancestor. It therefore inherits English despite its Finnish content.

Remediation direction: declare `lang="fi"` on the smallest suitable container for the Finnish passage.

### 2. A Swedish announcement is marked as Finnish

A Swedish notice declares `lang="fi"`. The value is syntactically valid but describes the wrong human language, so automated validation cannot determine the content mismatch.

Remediation direction: change the declaration to `lang="sv"`.

### 3. A Swedish link is wrongly overridden as English

A correctly marked Swedish paragraph contains a Swedish registration link with `lang="en"`. The link should inherit Swedish, but the unnecessary override can trigger English pronunciation for Swedish text.

Remediation direction: remove the override and allow the link to inherit `sv` from its parent.

### 4. A Finnish wrapper extends over following English content

A container declares `lang="fi"` for a Finnish notice but also wraps a subsequent English availability sentence. The declaration is placed too broadly, so the English sentence inherits Finnish.

Remediation direction: move `lang="fi"` to the Finnish passage or explicitly restore `lang="en"` at the genuine boundary. Prefer the smallest clear boundary rather than compensating for an unnecessarily broad wrapper.

### 5. A Swedish passage uses an invalid language value

A Swedish notice uses `lang="swedish"` instead of a valid BCP 47 language tag. This case should be detectable by automated analysis in addition to manual inspection.

Remediation direction: use the valid Swedish language tag `sv`.

## Four valid comparisons

Include four deliberate passing patterns:

1. a Finnish notice correctly marked `lang="fi"`;
2. a Swedish notice correctly marked `lang="sv"`;
3. a Swedish nested link with no redundant declaration, correctly inheriting `sv`;
4. a short English event name inside Finnish content explicitly marked `lang="en"`, demonstrating a genuine nested language change.

The solution identifies these as valid comparisons. Repeating the same language on every nested element is not required, and correct inheritance must not be reported as a defect.

## Visual and interaction design

Use the established standalone-fixture conventions:

- Atkinson Hyperlegible typography;
- light and dark themes consistent with existing fixtures;
- bordered notice cards in a responsive grid;
- native links with visible hover and keyboard focus;
- single-column presentation at narrow widths;
- no horizontal page scrolling at 390px.

Links may target matching informational anchors within the fixture so activation is harmless and observable. Do not add dynamic language switching, translation controls, or remote content.

## Hints and solution

Provide three progressive hints:

1. compare each passage's visible language with the language inherited from the English document;
2. inspect nested links and the exact point where content returns from Finnish or Swedish to English;
3. look for one missing declaration, one wrong valid language, one invalid value, one unnecessary nested override, and one declaration whose scope is too broad.

The solution lists the five findings above. Each explanation separates the markup issue from possible voice or platform behavior and gives a focused remediation direction.

## Method and Learning path integration

Update `Testing language changes with a screen reader` to link visibly to the new Exercise and reference it through `relatedExercises` metadata.

Update `Practical screen-reader testing` so the Exercise follows the language-change method immediately. Preserve the earlier method-and-Exercise pairs and keep the modal-dialog method last.

Increase the Learning path estimate from 175 minutes to 195 minutes, displayed as approximately 3 hours 15 minutes. Any journey card that surfaces this path's raw duration must reflect 195 minutes.

## Architecture

Add the fixture component to the existing Exercise fixture registry and render it through the shared standalone fixture route. Reuse `ExerciseLayout`, `StandaloneExercisePanel`, Exercise hints and solution components, breadcrumbs, section navigation, theme persistence, and collection helpers.

Use neutral, content-oriented data attributes where browser tests need stable targets. Do not expose labels such as `finding`, `broken`, `problem`, `answer`, or `solution` in rendered fixture markup.

## Validation

Add focused Playwright coverage that asserts:

- Exercise metadata, objectives, method link, standalone workflow, three hints, and five-item solution;
- the exact authored `lang` values for all five findings;
- computed inherited language values for nested and unmarked content;
- the four valid comparison patterns;
- working links and visible focus;
- saved theme and 390px responsive behavior;
- the standalone fixture's automated accessibility results contain only the approved invalid-language boundary;
- pronunciation and voice switching are explicitly documented as manual, environment-dependent observations;
- the method links to the Exercise;
- the Learning path places the Exercise directly after the method and shows 195 minutes as approximately 3 hours 15 minutes;
- the downstream journey surfaces the updated duration;
- the outer Exercise page passes axe.

Run Astro diagnostics, the production build, focused Exercise, method, Learning path, journey, architecture, and accessibility tests, the complete Playwright suite, visual review in light/dark and desktop/mobile conditions, and `git diff --check`.

## Out of scope

- translating the entire site or adding locale routes;
- language-selection controls or dynamic translation;
- testing `dir` or bidirectional text;
- pronunciation grading or speech-output automation;
- adding or configuring operating-system voices;
- headings, link-purpose, images, icons, SVGs, dialogs, forms, validation, contrast, zoom, or reflow defects;
- changing the migrated method demonstration, legacy example route, or conference journey workspace;
- creating the modal-dialog Exercise in this implementation.

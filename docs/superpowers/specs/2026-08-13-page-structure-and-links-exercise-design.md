# Page structure and links exercise design

## Goal

Create a beginner Exercise that follows the existing `Testing page structure and links with a screen reader` method and gives learners focused practice evaluating semantic headings and link purpose with a screen reader.

The Exercise belongs immediately after its method in `Practical screen-reader testing`. It uses the established standalone workspace workflow so learners can operate their screen reader on a realistic document and return to the Exercise for progressive hints or the solution.

## Published content

Create the Exercise at:

`/exercises/reviewing-structure-and-links-in-a-community-resources-directory/`

Use:

- title: `Reviewing structure and links in a community resources directory`;
- summary: explain that learners assess a community directory through heading navigation and link lists;
- difficulty: beginner;
- estimated time: 20 minutes;
- Exercise type: `find-issues`;
- primary method: `screen-reader-page-structure-and-links`;
- expected findings: exactly five.

The objectives are to:

1. assess whether semantic headings communicate a useful page outline;
2. compare the visual structure with screen-reader heading navigation and the headings list;
3. evaluate link purpose both in document context and outside that context in a links list;
4. record concise evidence and remediation direction for each finding.

## Learner workflow

The authored instructions ask the learner to:

1. open the standalone community-resources directory;
2. review the visible organization before starting assistive-technology checks;
3. navigate through headings in document order;
4. inspect the screen reader's headings list or rotor;
5. navigate through links sequentially;
6. inspect the screen reader's links list or rotor;
7. identify exactly five accessibility findings while distinguishing valid comparisons;
8. record the affected content, observed output, expected result, and remediation direction.

Exact screen-reader commands and announcement wording remain platform-dependent. The task evaluates exposed structure and accessible names, not memorization of one product's phrases.

## Standalone fixture

Create a standalone fixture at:

`/exercise-fixtures/community-resources-directory/`

The fixture represents a public community-services directory. It contains:

- a return link to the Exercise;
- one page `h1`;
- introductory guidance with a valid `h2` and descriptive links;
- three resource cards covering food support, housing advice, and digital-skills support;
- a small closing section with valid structure and link wording.

The visual presentation should resemble a plausible public-information page, use the established fixture typography and Lab-aware light/dark theme, provide visible keyboard focus, and reflow without horizontal page scrolling at a 390px viewport.

The page must remain fully operable. Deliberate defects affect only heading semantics and link purpose.

## Five intentional findings

### 1. Food-support content skips a heading level

The resource section moves from an `h2` section heading directly to an `h4` card heading. The visible hierarchy may look plausible, but screen-reader heading navigation exposes an unexplained skipped level.

Remediation direction: use the heading level that represents the card's actual place in the document hierarchy, expected to be `h3` in this fixture.

### 2. Housing-advice title is not a semantic heading

The housing card title is a visually prominent styled paragraph rather than a heading element. It is visible in the card but absent from heading navigation and the headings list.

Remediation direction: use the semantic heading level appropriate to the sibling resource cards.

### 3. Repeated `Read more` links do not distinguish resource destinations

At least two resource cards use the accessible name `Read more` for different destinations. Nearby prose provides visual context in document order, but the links become indistinguishable in a screen-reader links list.

Treat the repeated instances as one pattern-level finding rather than inflating the finding count per occurrence.

Remediation direction: include the resource or destination in each link's accessible name, preferably through concise visible wording.

### 4. A `Click here` link does not communicate its purpose

One instruction ends with a `Click here` link whose accessible name does not identify the destination or action when encountered independently.

Remediation direction: replace the generic phrase with wording that names the information or action.

### 5. Identically named `Service details` links lead to different destinations

Two links named `Service details` lead to distinct service pages. Unlike the repeated `Read more` pattern, these links appear in a separate directory control area and demonstrate that a superficially descriptive phrase can still be ambiguous when it does not distinguish multiple destinations.

Remediation direction: incorporate each service name into the visible link wording or otherwise provide an accessible name that distinguishes the destinations while retaining understandable visible text.

## Valid comparisons

Include working patterns that are not findings:

- one logical sequence from the page `h1` to a section `h2` and card `h3`;
- descriptive introductory links whose names make sense outside surrounding prose;
- a resource link that visibly identifies its destination;
- a closing section whose heading level correctly returns to the section hierarchy.

The solution explicitly identifies these as comparison cases so learners are not encouraged to report every heading or link.

## Hints and solution

Provide three progressive hints:

1. compare the visible card titles with what appears during heading navigation;
2. inspect transitions between heading levels and note any visually prominent title missing from the headings list;
3. review the links list for repeated names, generic phrases, and names that fail to distinguish different destinations.

The solution lists the five pattern-level findings above. Each explanation connects the fixture evidence to user impact and gives remediation direction without prescribing unnecessary ARIA.

## Learning-path and method integration

Update `Practical screen-reader testing` so this Exercise follows `Testing page structure and links with a screen reader` immediately. Keep the subsequent image alternative-text method and Exercise pair in their current relative order.

Update the method's `relatedExercises` metadata to reference the new Exercise. Do not add unrelated methods to the Exercise.

Recalculate the Learning path's estimated time from approximately 2 hours 15 minutes to approximately 2 hours 35 minutes, based on the new 20-minute Exercise.

## Architecture

Add the fixture component to the existing Exercise fixture registry and render it through the standalone fixture route used by current Exercises. Reuse `ExerciseLayout`, `StandaloneExercisePanel`, hint and solution components, section navigation, breadcrumbs, content helpers, and theme persistence.

Use purpose-specific data attributes only where browser tests need to identify the five deliberate patterns or valid comparisons. Do not expose labels such as `finding`, `problem`, `broken`, or `answer` in the rendered fixture markup, because learners may inspect source while completing the task. Neutral identifiers such as content or resource names are acceptable.

## Validation

Add focused Playwright coverage that asserts:

- the Exercise publishes with its metadata, objectives, standalone-workspace link, instructions, three hints, and five-item solution;
- the fixture contains exactly the intended semantic heading structure and link-name patterns;
- the valid comparison headings and links remain correct;
- links are operable and expose visible keyboard focus;
- the return link leads back to the Exercise without forcing a new tab;
- the fixture follows the saved Lab theme and fits a 390px viewport;
- axe results are limited to the deliberately approved boundary, with manual-only findings separately asserted;
- the method links to the Exercise;
- the Practical screen-reader testing path places the Exercise directly after its method and shows the revised estimated time;
- the outer Exercise page passes axe.

Run Astro diagnostics, the production build, focused Exercise, screen-reader-method, Learning path, content-architecture, and accessibility tests, the complete Playwright suite, and `git diff --check`.

## Out of scope

- image alternative text, icons, SVGs, language changes, dialogs, forms, validation, color contrast, zoom, reflow, or automated-testing defects;
- inaccessible custom controls or broken keyboard operation;
- testing dynamic heading changes in a single-page application;
- testing link destination accuracy beyond whether names correspond to the authored fixture destinations;
- adding exercises for the remaining screen-reader methods in this implementation;
- changing the migrated method demonstration or legacy example route.

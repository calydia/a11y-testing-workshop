# Learning graph refinement design

## Goal

Make the current Accessibility Testing Lab curriculum easier for beginners to enter and traverse without creating new learning content.

This milestone implements the first group of recommendations from the MVP content-scope audit:

- expose the broad beginner starting point from Home and the Learning paths landing page;
- complete bidirectional relationships between all ten Testing methods and Exercises;
- connect each Learning path to the Testing journey that applies it;
- expose each Learning path as Optional preparation from its matching journey.

The milestone uses explicit collection relationships and shared rendering. It does not infer relationships by scanning other collections.

## Beginner entry point

### Home

Add a compact introductory section after the opening sentence and before the existing four-area list:

- heading: `New to accessibility testing?`;
- one short explanation that the broad beginner path introduces one technique at a time and follows each method with practice;
- link text: `Start your first accessibility review`;
- destination: `/learn/your-first-accessibility-review/`.

Use an ordinary descriptive text link with the site's existing link treatment. Do not add a new button variant, promotional hero, progress tracking, or account state.

Keep all four existing content-area links and their explanations.

### Learning paths landing page

Replace the generic one-sentence introduction with concise guidance that distinguishes the two choices:

- `Your first accessibility review` is the recommended broad starting point;
- `Practical screen-reader testing` can be completed independently or after the first path.

Keep the existing card order and card component. Do not add badges, featured-card variants, filtering, or path-comparison controls.

## Explicit method-to-Exercise relationships

All ten Testing methods have one paired Exercise in the current curriculum. Add `relatedExercises` metadata where it is missing:

| Testing method | Related Exercise |
| --- | --- |
| `testing-with-automated-tools` | `comparing-automated-and-manual-findings` |
| `testing-keyboard-accessibility` | `keyboard-testing-a-preferences-form` |
| `testing-visual-accessibility` | `finding-visual-problems-in-an-account-dashboard` |
| `testing-zoom-and-reflow` | `testing-an-appointment-booking-at-high-zoom` |
| `testing-forms-and-validation` | `testing-a-community-course-registration-form` |
| `screen-reader-page-structure-and-links` | `reviewing-structure-and-links-in-a-community-resources-directory` |
| `testing-image-alternative-text` | `evaluating-image-alternative-text-in-context` |
| `screen-reader-icons-and-svg` | `reviewing-icons-and-svgs-in-a-community-events-dashboard` |
| `screen-reader-language-changes` | `testing-language-changes-on-a-community-library-noticeboard` |
| `testing-modal-dialogs` | `testing-modal-dialogs-in-account-settings` |

Keep `relatedExercises` as an array. The shared rendering must support multiple related Exercises even though each method currently has one.

Do not infer method relationships from Exercise metadata. Explicit references remain visible to authors and are validated by the content schema.

## Shared method practice section

Create a focused component for displaying related Exercises on Testing method pages. It accepts resolved Exercise views containing:

- title;
- summary;
- canonical Exercise URL;
- estimated minutes.

Render the section after the method's authored Markdown content. Use:

- heading: `Practise this method`;
- a semantic list when one or more Exercises exist;
- linked Exercise titles;
- summaries;
- visible estimated time.

The component renders nothing for an empty list. Its layout must follow existing content typography, link focus treatment, light/dark themes, and narrow-width behavior. Reuse an existing related-content presentation when its semantics and metadata support this requirement; otherwise create the smallest dedicated component rather than expanding `MethodLayout` with presentation details.

The method detail route resolves every `relatedExercises` reference and passes the resulting view data into `MethodLayout`. Invalid references remain build-time content errors. Do not add a runtime fallback that silently drops unresolved content.

Remove the four manually authored `## Practise this method` sections from:

- `screen-reader-page-structure-and-links.md`;
- `screen-reader-icons-and-svg.md`;
- `screen-reader-language-changes.md`;
- `testing-modal-dialogs.md`.

This prevents duplicate visible sections and ensures metadata is the single source for method-to-Exercise relationships.

## Path-to-journey transitions

### Your first accessibility review

Revise `Where to go next` so it:

1. recommends [Reviewing a course registration before launch](/journeys/reviewing-a-course-registration-before-launch/) as the realistic application of the path's foundational methods;
2. recommends [Practical screen-reader testing](/learn/practical-screen-reader-testing/) as the next focused skill path;
3. does not maintain a manual list of individual screen-reader methods that is liable to omit their Exercises.

Frame both destinations as optional next steps after completing the path, not hidden requirements.

### Practical screen-reader testing

Revise `Where to go next` so it:

1. recommends [Reviewing a community conference programme](/journeys/reviewing-a-community-conference-programme/) as the realistic application of the path's screen-reader methods;
2. retains [Your first accessibility review](/learn/your-first-accessibility-review/) as an optional broader foundation for visitors who entered the screen-reader path independently;
3. removes the course-registration journey as its primary application because that journey does not use the path's specialized method set.

## Journey preparation relationships

Use the existing `learningPaths` collection-reference field and Optional preparation rendering:

- add `your-first-accessibility-review` to `Reviewing a course registration before launch`;
- preserve `practical-screen-reader-testing` on `Reviewing a community conference programme`.

The course journey's prerequisite wording may remain, but it must not be the only reference to the path. Both journey pages must visibly render the linked path title, summary, level, and estimated time in Optional preparation.

Do not add automatic reverse-link discovery or a new prerequisite schema.

## Architecture

The method route is responsible for resolving collection references into presentation-ready Exercise views, following the journey route's existing pattern for resolving Learning paths and Exercises.

`MethodLayout` remains responsible for composition. The related-Exercise component remains responsible for presentation. Content entries remain responsible for declaring relationships and explaining editorial transitions.

This separation keeps collection loading out of leaf presentation components and avoids mixing relationship lookup with Markdown content.

## Validation

Add or update focused Playwright coverage that asserts:

- Home contains the `New to accessibility testing?` heading and direct beginner-path link;
- the Learning paths landing introduction distinguishes the broad and focused paths;
- all ten method pages render exactly one shared practice section;
- every practice section links to the approved Exercise and includes its summary and estimate;
- the four previously manual method pages do not render duplicate practice headings or links;
- both Learning paths link to their matching Testing journeys;
- the first path links to the screen-reader path without maintaining a manual method list;
- the screen-reader path links to the first path as an optional broader foundation;
- the course journey renders the first path in Optional preparation;
- the conference journey continues to render the screen-reader path in Optional preparation;
- method order, path step order, section navigation, breadcrumbs, and metadata remain unchanged;
- changed public pages pass axe and fit a 390px viewport;
- method practice links and new entry links have visible keyboard focus.

Run Astro diagnostics, the production build, focused architecture, method, path, journey, shell, and accessibility tests, the complete Playwright suite, and `git diff --check`. Review Home, one foundational method, one screen-reader method, both paths, and both journeys at representative desktop and mobile widths.

## Out of scope

- creating new Testing methods, Exercises, Learning paths, or Testing journeys;
- rewriting existing method procedures or Exercise instructions;
- changing Exercise findings or fixture behavior;
- adding automatic relationship inference;
- adding path badges, filters, featured cards, or progress tracking;
- changing path durations or checkpoint-duration modeling;
- expanding About or adding site-level testing-scope guidance;
- adding page-title or landmark checks;
- final legacy-content cleanup;
- SEO, analytics, deployment, or launch communications.

# Content drift refinement design

Date: 14 August 2026

## Goal

Resolve three small inconsistencies in the current beginner curriculum: explain what Learning-path totals include, correct the stale screen-reader path summary, and make document-title and landmark checks explicit within the existing page-structure material.

## Learning-path estimates

Keep the authored Learning-path totals at 250 minutes for `Your first accessibility review` and 220 minutes for `Practical screen-reader testing`.

Treat these as realistic end-to-end learning estimates. They include setup, note-taking, reviewing results, and repetition in addition to the focused method and Exercise work. The duration shown on an individual step remains the estimate for that method or Exercise rather than a full accounting of every transition and learning activity.

Render one shared explanation beneath the existing level and estimated-time metadata in `LearningPathMeta`. Both current paths use the same definition, so a schema field or duplicated authored note is unnecessary. Keep the explanation visually subordinate and consistent with the compact metadata presentation.

## Screen-reader path summary

Update the `Practical screen-reader testing` summary so it reflects all five method-and-Exercise pairs now included:

- page structure and links;
- image alternative text;
- icons and SVGs;
- language changes; and
- modal dialogs.

Keep its title, description, outcomes, steps, and 220-minute total otherwise unchanged.

## Document-title and landmark checks

Extend `Testing page structure and links with a screen reader` without renaming it or increasing its 20-minute estimate.

The method should explicitly teach learners to:

- judge whether the document title usefully identifies the page;
- find the main content using screen-reader landmark navigation;
- assess whether landmarks expose useful, restrained page regions rather than treating landmark quantity as a goal; and
- interpret a useful title and discoverable main region as passing evidence.

Incorporate these checks into the method's outcomes, procedure, observations, interpretation, and limitations where relevant. Preserve its existing heading and link guidance.

## Exercise refinement

Extend `Reviewing structure and links in a community resources directory` so its objectives and instructions explicitly include the document title, main content, and landmark navigation.

The existing fixture already supplies valid comparisons: it has a useful document title and a discoverable `main` region. Learners should record those as passing checks. Do not change fixture markup solely for this refinement and do not manufacture landmark defects.

Keep the Exercise at exactly five intentional findings and 20 minutes. Update the solution summary to identify the title and main region as valid comparisons, while leaving its five finding entries unchanged.

## Architecture and affected files

Modify only existing presentation and authored-content boundaries:

- `src/components/learning-path/LearningPathMeta.astro`
- `src/content/learning-paths/practical-screen-reader-testing.md`
- `src/content/testing-methods/screen-reader-page-structure-and-links.md`
- `src/content/exercises/reviewing-structure-and-links-in-a-community-resources-directory.md`

No schema, route, fixture, relationship, or shared Exercise component changes are required.

## Verification

Automated coverage should verify that:

- both Learning paths display the shared explanation of total time;
- the existing 250- and 220-minute totals remain unchanged;
- the screen-reader path summary names all five current practice areas;
- the method explicitly covers useful titles, main content, and restrained landmark structure;
- the Exercise asks learners to perform and record those checks;
- the solution still exposes exactly five findings and identifies the title and main region as passing evidence; and
- the affected pages retain their existing axe, focus, and narrow-viewport behavior.

Run the production build and complete Playwright suite after focused checks. Visually review both Learning-path metadata blocks and the refined method and Exercise at representative desktop and mobile widths in both themes.

## Out of scope

- Changing Learning-path totals or individual step estimates.
- Adding per-checkpoint time metadata.
- Renaming the page-structure method or Exercise.
- Adding landmark defects or changing the fixture.
- Expanding the Exercise beyond five findings.
- Adding a separate landmarks, page-title, or document-structure method.
- Performing the broader editorial consistency pass or retained-content cleanup.

# Site scope guidance design

Date: 14 August 2026

## Goal

Set an honest, discoverable boundary around what Accessibility Testing Lab teaches. Learners should understand that the current curriculum is useful introductory practice without interpreting completion as exhaustive testing or a conformance assessment.

## Content approach

Use layered guidance rather than repeating the full explanation on every page:

- About contains the complete site-level scope statement.
- Both Learning paths end with a short, context-specific reminder and a link to About.
- Existing method-level limitations remain unchanged.

This puts the durable explanation in one place while reaching learners at the point where they may otherwise overestimate what completing a path establishes.

## About page

Add a clearly headed section to the existing About page. It must explain that:

- the Lab teaches selected practical accessibility-testing techniques, not exhaustive coverage;
- completing a Learning path, Exercise, or Testing journey is not a WCAG conformance assessment;
- automated and manual technical checks do not replace usability evaluation or involving disabled people;
- real reviews should define their scope and exclusions and arrange specialist or user testing when the product and risk require it; and
- Exercise and journey workspaces can contain deliberate accessibility problems and are isolated practice material rather than examples to copy into production.

The tone should remain practical and encouraging. The statement should help learners interpret their evidence accurately without diminishing the skills they have practised.

## Learning-path reminders

Add a `Keep the scope in mind` section at the end of each Learning path, after its current progression guidance.

For `Your first accessibility review`, explain that the path is a broad introduction, not a complete audit. Encourage learners to record areas they did not test and arrange additional testing appropriate to the product and its risks.

For `Practical screen-reader testing`, explain that the five focused techniques do not represent every screen-reader experience or every assistive-technology, browser, and platform combination. Encourage testing with relevant users and environments when reviewing a real service.

Each reminder links to `/about/` using descriptive link text that introduces the full Lab scope guidance.

## Architecture

This refinement changes authored content only:

- `src/pages/about/index.astro`
- `src/content/learning-paths/your-first-accessibility-review.md`
- `src/content/learning-paths/practical-screen-reader-testing.md`

It adds no component, content-collection field, relationship type, or route. The guidance does not need to be shared verbatim, because each path reminder has a distinct context and the complete statement has a single canonical home on About.

## Verification

Automated coverage should verify that:

- About renders the complete scope boundary and its key concepts;
- both Learning paths render `Keep the scope in mind`;
- both path reminders link to `/about/`;
- the About page and Learning paths continue to pass the existing axe checks; and
- the added copy does not introduce horizontal overflow at a narrow viewport.

Run the production build and full Playwright suite after the focused checks. Review About and both path endings at representative desktop and mobile widths in both themes.

## Out of scope

- Changing method-level limitations.
- Adding a new scope, conformance, or reporting method.
- Adding specialist testing procedures or new Exercises.
- Reconciling Learning-path summaries or duration estimates.
- Expanding page-title and landmark coverage.
- Cleaning up retained workshop content.

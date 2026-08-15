# Editorial consistency pass design

Date: 15 August 2026

## Goal

Make terminology consistent across the new Accessibility Testing Lab without broadly rewriting stable content. Learners should encounter the same names for content types, test results, actions, and workspaces throughout the learning system.

## Scope

Review learner-facing text in:

- Home and About;
- the four section landing pages;
- both Learning paths;
- all ten Testing methods;
- all ten Exercises;
- both Testing journeys; and
- shared learner-facing components used by those pages.

Classify each occurrence by context. Change inconsistent terminology, capitalization, and only the nearby wording needed to leave a clear sentence.

Do not perform a full voice or style rewrite. Preserve text that already follows the glossary even when it could be phrased differently.

## Editorial glossary

### Lab content types

Use these product labels when text refers to a defined Accessibility Testing Lab content type:

- `Learning path`
- `Testing method`
- `Exercise`
- `Testing journey`

Use lowercase when a word is generic rather than a Lab content type. For example, `manual testing methods`, `complete the exercise`, and `the user's journey` remain ordinary prose.

Plural labels retain the initial capital when they refer to multiple Lab entries: `Learning paths`, `Testing methods`, `Exercises`, and `Testing journeys`.

### Test results

- Use `finding` for a confirmed accessibility problem supported by evidence.
- Use `passing check` for tested behavior that works and is worth recording.
- Use `observation` when behavior is support-dependent, inconclusive, or not established as a failure.
- Use `working example` only for a demonstration intentionally showing correct behavior. Do not use it as the name for recorded test evidence.

Replace learner-facing `valid comparison`, `valid comparison case`, and `valid comparison pattern` with `passing check`. Internal fixture-design concepts may retain `valid comparison` when they are not rendered to learners.

### Actions and decisions

- Use `remediation direction` for guidance about correcting an individual finding.
- Use `recommendation` for an overall publication, launch, or next-action decision.

Do not flatten these into one term: they operate at different levels of a review.

### Practice environments

- Use `Exercise workspace` for the separate interface used by an Exercise.
- Use `Testing journey workspace` for the interface used throughout a Testing journey.

Generic references such as `workspace link` may remain lowercase when they do not name the content feature.

### Level metadata

- Use `level` for Learning paths.
- Use `difficulty` for Exercises and Testing journeys.

Preserve the existing schemas and rendered labels.

## Change strategy

Use a glossary-driven editorial inventory rather than mechanical replacement:

1. Search all in-scope learner-facing sources for glossary terms and known variants.
2. Classify each occurrence by whether it names a product type or uses an ordinary noun.
3. Replace learner-facing comparison terminology with `passing check` and adjust grammar locally.
4. Check finding, observation, remediation, recommendation, workspace, level, and difficulty usage against the glossary.
5. Re-read every changed paragraph in its rendered page context.

This approach avoids incorrect capitalization and limits churn in content that has already been reviewed.

## Architecture

The pass changes authored copy and, where necessary, static labels in existing shared components. It adds no route, component, schema field, fixture behavior, content relationship, or style.

Tests may add a small public terminology contract, but should avoid asserting every sentence verbatim. Assertions should protect important labels and known variants without making ordinary editorial improvements unnecessarily expensive.

## Verification

Verification should confirm that:

- known learner-facing `valid comparison` variants are absent from the new public content;
- affected Exercise summaries and instructions use `passing check` while retaining their exact finding counts;
- Learning-path step labels and shared journey preparation labels use the approved content-type names;
- journey deliverables retain the distinction between findings, passing checks, remediation direction, observations, and recommendations;
- level and difficulty labels remain unchanged;
- all changed pages pass their existing axe and responsive checks; and
- the production build and complete Playwright suite pass.

Review every changed sentence in rendered desktop or mobile context and in both themes across a representative set of affected page types.

## Out of scope

- Rewriting content for voice, rhythm, persuasion, or search optimization.
- Changing page titles, URLs, schemas, estimates, authored order, finding counts, or journey deliverables.
- Changing fixture problems, interactions, or solution findings.
- Editing retained workshop pages or old routes.
- Renaming internal identifiers, test names, data attributes, or content-collection fields solely for capitalization.
- Adding a public glossary page.
- Planning or performing legacy-content cleanup.

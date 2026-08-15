# Editorial consistency pass implementation plan

## Goal

Apply the approved terminology glossary to the new Accessibility Testing Lab while preserving stable content, exact finding counts, schemas, fixtures, and behavior.

## Task 1: Build and pin the learner-facing terminology inventory

### Files

- Modify: `tests/site-architecture.spec.js`
- Modify: `tests/learning-path.spec.js`
- Modify: relevant focused Exercise tests
- Modify: `tests/testing-journey.spec.js`

### Work

1. Inventory glossary terms and known variants across in-scope pages, collection content, and shared learner-facing components.
2. Separate public rendered copy from frontmatter identifiers, code, tests, and retained workshop content.
3. Add focused assertions that public Exercise copy uses `passing check` instead of `valid comparison` variants.
4. Preserve exact finding-count assertions for every affected Exercise.
5. Assert the approved content-type labels in Learning-path steps and journey preparation cards.
6. Preserve the existing distinction between findings, passing checks, observations, remediation direction, and recommendations in both journeys.
7. Preserve Learning-path `Level` and Exercise/journey `Difficulty` labels.

## Task 2: Normalize Exercise result terminology

### Primary files

- Modify: `src/content/exercises/evaluating-image-alternative-text-in-context.md`
- Modify: `src/content/exercises/reviewing-icons-and-svgs-in-a-community-events-dashboard.md`
- Modify: `src/content/exercises/reviewing-structure-and-links-in-a-community-resources-directory.md`
- Modify: `src/content/exercises/testing-language-changes-on-a-community-library-noticeboard.md`
- Modify: `src/content/exercises/testing-modal-dialogs-in-account-settings.md`
- Modify other Exercise entries only where the inventory finds an approved glossary inconsistency.

### Work

1. Replace learner-facing `valid comparison` variants with `passing check`.
2. Adjust nearby grammar so summaries and instructions remain natural.
3. Keep `working example` only where a demonstration intentionally contrasts correct and incorrect behavior.
4. Keep every solution finding entry and exact expected-finding count unchanged.
5. Do not change fixture markup, behavior, hints, difficulty, estimates, or method relationships.

## Task 3: Normalize content-type capitalization

### Files

- Modify only in-scope entries and shared labels identified by the inventory.

### Work

1. Use `Learning path`, `Testing method`, `Exercise`, and `Testing journey` when referring to Lab content types.
2. Preserve lowercase ordinary nouns and generic testing language.
3. Normalize plural product labels where they refer to Lab sections or entries.
4. Re-read surrounding sentences rather than applying mechanical replacement.
5. Preserve titles, navigation labels, URLs, and internal identifiers.

## Task 4: Normalize review-result and workspace language

### Files

- Modify only in-scope content and shared learner-facing components identified by the inventory.

### Work

1. Use `finding` only for confirmed problems and `observation` for support-dependent or inconclusive results.
2. Keep `remediation direction` attached to individual findings.
3. Keep `recommendation` attached to publication, launch, or next-action decisions.
4. Use `Exercise workspace` and `Testing journey workspace` when naming those product features.
5. Preserve `Level` for Learning paths and `Difficulty` for Exercises and Testing journeys.

## Task 5: Review the resulting copy

1. Generate a diff limited to learner-facing source files.
2. Read every changed sentence in file context and remove unnecessary edits.
3. Search again for known variants and classify any deliberate remaining occurrences.
4. Confirm retained workshop pages, internal identifiers, schemas, and fixtures remain untouched unless required by an existing focused test.

## Task 6: Verify

1. Run the new focused terminology tests first and confirm failures at the intended wording boundaries.
2. Apply the editorial changes and rerun affected Exercise, Learning-path, journey, architecture, and axe tests.
3. Run the Astro production build.
4. Render and review every changed page; use representative desktop/mobile and light/dark screenshots for each affected page type.
5. Run the complete Playwright suite on its default port 4321.
6. Run `git diff --check`, inspect the final worktree, and report any intentional glossary variants that remain.

## Out of scope

- Full copy rewriting or search optimization.
- Titles, URLs, schemas, estimates, order, relationships, finding counts, and deliverables.
- Fixture content or behavior.
- Retained workshop routes and legacy cleanup.
- Internal identifiers and test names changed only for stylistic consistency.
- A public glossary page.

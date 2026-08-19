# Practice workspace indexing implementation plan

## Goal

Keep standalone Exercise fixtures and Testing journey workspaces available to learners while removing them from search discovery.

## Task 1: Protect the indexing boundary with tests

### Files

- Create: `tests/practice-workspace-indexing.spec.js`

### Work

1. Add browser assertions that a representative Exercise fixture and both journey workspaces are reachable and emit `meta[name="robots"][content="noindex"]`.
2. Assert an ordinary Exercise and Testing journey remain indexable.
3. Read the generated sitemap and assert that neither workspace prefix appears while ordinary Exercise and journey URLs remain present.
4. Read `robots.txt` and assert it does not disallow the workspace route groups.
5. Run the focused test and confirm it fails for the missing indexing controls.

## Task 2: Add workspace indexing metadata

### Files

- Modify: `src/pages/exercise-fixtures/[...id].astro`
- Modify: `src/pages/journey-workspaces/community-centre-open-day.astro`
- Modify: `src/pages/journey-workspaces/community-conference-programme.astro`

### Work

1. Add `meta name="robots" content="noindex"` to each standalone document head.
2. Preserve titles, themes, markup, routes, and interactions.
3. Run the browser metadata assertions.

## Task 3: Exclude workspaces from the sitemap

### Files

- Modify: `astro.config.mjs`

### Work

1. Configure the sitemap integration with a pathname-based filter.
2. Exclude only `/exercise-fixtures/` and `/journey-workspaces/` route prefixes.
3. Preserve all normal public pages and existing legacy redirect behavior.
4. Build and run the sitemap assertions.

## Task 4: Verify the release fix

### Work

1. Run the focused indexing tests.
2. Run Astro diagnostics.
3. Run a production build under Node.js 24.
4. Run the complete Playwright suite.
5. Run `git diff --check`, inspect the final diff, and confirm there are no unrelated changes.

## Out of scope

- Workspace content or route changes.
- `robots.txt` blocking.
- Broader metadata, structured-data, or social-sharing work.

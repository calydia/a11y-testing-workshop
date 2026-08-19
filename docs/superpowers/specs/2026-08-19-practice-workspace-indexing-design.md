# Practice workspace indexing design

Date: 19 August 2026

## Goal

Keep standalone Exercise fixtures and Testing journey workspaces available to learners while preventing those deliberately inaccessible, context-light pages from appearing independently in search results.

## Scope

This change applies only to:

- `/exercise-fixtures/**`
- `/journey-workspaces/**`

Normal Lab pages, including Exercises and Testing journeys that explain these workspaces, remain indexable. Workspace URLs, links, layouts, interaction behavior, and return paths do not change.

## Metadata behavior

Every standalone Exercise fixture and Testing journey workspace will include:

```html
<meta name="robots" content="noindex">
```

The workspace documents will remain crawlable. `robots.txt` will continue to allow these routes so crawlers can read the `noindex` directive. The change will not add `nofollow`, because links back to the surrounding Lab content should remain discoverable.

Add the directive directly to the three existing workspace page templates. This keeps the release fix small and avoids refactoring their separate document shells immediately before launch. The templates will not use the normal `DocumentHead` component because workspace pages intentionally sit outside the full Lab shell and do not need ordinary-page canonical, Open Graph, manifest, or structured-data metadata.

## Sitemap behavior

Configure `@astrojs/sitemap` with a filter that excludes URLs whose pathname begins with `/exercise-fixtures/` or `/journey-workspaces/`. All ordinary public pages remain in the sitemap, and the existing exclusion of generated legacy redirect routes remains intact.

The sitemap filter is the authoritative discovery boundary. It will operate on complete generated URLs and compare their parsed pathname rather than relying on an unanchored text match.

## Verification

Automated tests will prove that:

- a representative Exercise fixture emits `noindex`;
- both Testing journey workspaces emit `noindex`;
- fixture and workspace routes remain directly reachable;
- neither route prefix appears in the generated sitemap;
- ordinary Exercise and Testing journey pages remain in the sitemap and remain indexable;
- `robots.txt` does not block the workspace routes;
- existing fixture and journey behavior remains covered by the full Playwright suite.

Run Astro diagnostics, a Node 24 production build, and the complete Playwright suite after implementation.

## Out of scope

- Changing workspace content or intentional accessibility findings.
- Changing route names or adding redirects.
- Blocking workspaces in `robots.txt`.
- Adding canonical URLs, social metadata, or structured data to workspaces.
- Broader page-title or social-sharing improvements identified by the release audit.

# Section navigation and content grouping implementation plan

## Goal

Group the 18 Testing methods and 18 Exercises into four shared browsing areas, make their listing pages the complete overview, and shorten each detail-page sidebar to the current area plus links to the other areas without changing routes, breadcrumbs, Learning paths, or Testing journeys.

## Task 1: Pin the category and navigation contract

### Files

- Modify: `tests/site-architecture.spec.js`
- Modify: `tests/content-architecture.spec.js`
- Modify: `tests/exercise-architecture.spec.js`
- Modify: `tests/screen-reader-methods.spec.js`

### Work

1. Add failing assertions that `/methods/` and `/exercises/` expose a “Browse by area” navigation with the four category fragment links in canonical order.
2. Assert that each grouped listing contains four `h2` category headings, their descriptions, and `h3` card headings.
3. Pin all current method and Exercise titles beneath their approved category and preserve existing `order` within each category.
4. On representative detail pages from every category, assert the section sidebar contains the current category heading, all pages in that category, and “Other areas” links to the remaining listing fragments.
5. Assert that the current detail link alone has `aria-current="page"` and that category fragment links do not.
6. Assert that detail sidebars do not include entries from other categories as direct page links.
7. Preserve the existing complete sidebar contract for Learning paths and Testing journeys.
8. Update the existing section-card typography and ordering locators for `h3` headings only on grouped Methods and Exercises listings; retain `h2` cards on flat Learning path and Testing journey listings.
9. Add a source-level or rendered-data assertion that every paired method and Exercise declares the same category.

## Task 2: Add the shared category model and content metadata

### Files

- Create: `src/lib/content-categories.ts`
- Modify: `src/content.config.ts`
- Modify: all entries in `src/content/testing-methods/`
- Modify: all entries in `src/content/exercises/`

### Work

1. Define the four stable category identifiers: `foundations`, `display-and-adaptation`, `content-and-structure`, and `interaction-and-tasks`.
2. Store each category's label, description, fragment identifier, and display order in one readonly definition.
3. Export a category identifier type and a Zod-compatible value list so schema and UI code share the same source of truth.
4. Add a required `category` field to the Testing method and Exercise schemas only.
5. Assign every current method and its paired Exercise to the approved matching category.
6. Do not change titles, summaries, topics, authored order values, routes, relationships, or body content.
7. Run Astro content validation to confirm missing or invalid categories fail at build time.

## Task 3: Build reusable grouping helpers and listing components

### Files

- Modify: `src/lib/content.ts`
- Create: `src/components/content/GroupedContentListing.astro`
- Modify: `src/components/content/ContentListing.astro`
- Modify: `src/components/content/ContentCard.astro`
- Modify: `src/components/SectionLanding.astro`

### Work

1. Add typed helpers that group already ordered entries by category and emit only non-empty categories in canonical category order.
2. Keep `getVisibleEntries` responsible for publication and authored entry order; do not duplicate sorting rules in page templates.
3. Extend card/listing data so a caller can select the correct card heading level without deriving semantics from visual style.
4. Build a grouped-listing component that renders an `h2` and description for each category, then delegates its cards to the existing `ContentListing` grid using `h3` titles.
5. Add a labelled “Browse by area” navigation before the grouped sections, with links to the category fragment IDs.
6. Ensure fragment targets have stable unique IDs and adequate scroll spacing beneath the sticky site header if required by the current layout.
7. Extend `SectionLanding` to render either grouped content or the current flat listing. Preserve flat behavior and typography for Learning paths and Testing journeys.
8. Do not add filtering, disclosure state, tabs, search, or client-side JavaScript.

## Task 4: Render grouped Methods and Exercises landing pages

### Files

- Modify: `src/pages/methods/index.astro`
- Modify: `src/pages/exercises/index.astro`

### Work

1. Map visible collection entries to category-aware card data and pass the grouped model to `SectionLanding`.
2. Render categories and cards in the shared canonical order.
3. Preserve each existing card URL, summary, border, background, typography size, hover behavior, focus treatment, and responsive two-column grid.
4. Preserve the existing page title, introduction, metadata, breadcrumb, and primary-navigation state.
5. Leave `/learn/` and `/journeys/` page implementations unchanged except for any narrowly required shared type adjustment.

## Task 5: Make the section sidebar category-aware

### Files

- Modify: `src/lib/content.ts`
- Modify: `src/components/navigation/SectionNavigation.astro`
- Modify: `src/pages/methods/[...id].astro`
- Modify: `src/pages/exercises/[...id].astro`

### Work

1. Extend section-navigation data with category identifiers while retaining the existing flat item shape for short collections.
2. For each method and Exercise static path, build navigation data for the entry's current category plus links to the other category fragments.
3. Extend `SectionNavigation` with an optional grouped mode containing the section title, complete-listing link, current category heading and page list, and an “Other areas” category list.
4. Use semantic headings and nested lists without unnecessary ARIA or disclosure controls.
5. Keep `aria-current="page"` on the exact current detail page only.
6. Keep existing link hover and focus behavior, mobile in-flow placement, desktop column width, and sticky positioning.
7. Ensure long titles wrap without creating horizontal overflow.
8. Preserve the current flat-mode component API and output for Learning path and Testing journey detail pages.
9. Do not add previous/next navigation in this change.

## Task 6: Complete regression and accessibility verification

### Work

1. Run the focused site-architecture, content-architecture, Exercise-architecture, and method tests on the default port `4321` under Node.js 24.
2. Run Astro diagnostics and the production build to validate every content entry against the required schema.
3. Run the complete Playwright suite.
4. Review Methods and Exercises listing pages at desktop and mobile widths in light and dark themes.
5. Review representative sidebars from all four categories at desktop and mobile widths, including keyboard focus and long-title wrapping.
6. Follow every “Browse by area” and “Other areas” link and verify it lands at the intended visible category heading.
7. Verify heading outlines are `h1 > h2 > h3` on grouped listings and unchanged on flat listings.
8. Verify Learning path and Testing journey listing pages and detail navigation are visually and behaviorally unchanged.
9. Verify all existing detail routes, breadcrumbs, related-content links, primary navigation, sitemap entries, and redirects remain unchanged.
10. Run `git diff --check` and inspect the final diff for unrelated content or style changes.

## Out of scope

- New category routes or category pages
- Changes to existing public URLs, breadcrumbs, or primary navigation
- Search, filters, tabs, accordions, or collapsible sidebar state
- Topic-derived or automatically curated recommendations
- Grouping Learning paths or Testing journeys
- Previous and next page navigation
- Rewriting existing titles, summaries, topics, or page bodies
- Adding new Methods, Exercises, Learning paths, or Testing journeys

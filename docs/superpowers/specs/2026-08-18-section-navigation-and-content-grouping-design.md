# Section navigation and content grouping design

## Purpose

Testing methods and Exercises each contain 18 pages. Their flat listing pages and complete second-level menus no longer provide an easy way to scan or browse the growing sections.

The revised navigation will divide responsibility between two interfaces:

- Section listing pages provide a complete overview of all content.
- Detail-page sidebars prioritize discovery of nearby, related topics.

Learning paths and Testing journeys remain ungrouped because their current collections are small. Existing content URLs, breadcrumbs, and primary navigation remain unchanged.

## Category model

Testing methods and Exercises share four primary categories. Every method and its corresponding exercise use the same category.

### Foundations

Broad techniques that commonly form the beginning of an accessibility review:

- Testing keyboard accessibility / Keyboard testing a preferences form
- Testing visual accessibility / Finding visual problems in an account dashboard
- Testing with automated tools / Comparing automated and manual findings

### Display and adaptation

Testing how content responds to presentation settings, input conditions, and user preferences:

- Testing text spacing and user overrides / Testing text spacing on a community-services page
- Testing forced colors and high contrast / Testing forced colors in a journey planner
- Testing motion, animation, and flashing / Testing motion preferences on a parcel-tracking dashboard
- Testing mobile touch and orientation / Testing touch interaction on a community-festival map
- Testing zoom and reflow / Testing an appointment booking at high zoom

### Content and structure

Testing whether information is represented and communicated accessibly:

- Testing media accessibility / Testing a community announcement video
- Testing page structure and links with a screen reader / Reviewing structure and links in a community resources directory
- Testing data tables with a screen reader / Testing a community-course timetable with a screen reader
- Testing image alternative text / Evaluating image alternative text in context
- Testing icons and SVGs with a screen reader / Reviewing icons and SVGs in a community events dashboard
- Testing language changes with a screen reader / Testing language changes on a community library noticeboard

### Interaction and tasks

Testing controls and workflows that users must operate or complete:

- Testing controls with a screen reader / Testing controls in a community events finder
- Testing forms and validation / Testing a community-course registration form
- Testing modal dialogs / Testing modal dialogs in account settings
- Testing time limits and interruptions / Testing session timeout in a community-support application

Each entry has one primary navigation category even when it overlaps several areas. The existing `topics` field continues to represent those secondary relationships.

## Listing pages

The Testing methods and Exercises landing pages will contain:

1. The existing page title and introduction.
2. A compact “Browse by area” list of links to the four category sections.
3. One visible section per category, in the canonical order above.
4. An `h2` category heading and short category description.
5. The category's existing card grid, with card titles changed to `h3` to preserve heading hierarchy.

All groups remain expanded. The initial version will not include filters, tabs, accordions, search, or category routes. Category links use stable fragment identifiers such as `/methods/#content-and-structure` and `/exercises/#content-and-structure`.

Learning paths and Testing journeys retain their current flat listings. The shared landing-page components support both grouped and ungrouped presentations.

## Detail-page sidebar

Testing method and Exercise sidebars contain:

1. The section title.
2. A link to the complete section listing.
3. The current category heading.
4. Links to all entries in the current category.
5. An “Other areas” heading with links to the remaining category fragments on the section listing page.

The current detail link keeps `aria-current="page"`. Category links do not receive `aria-current` because they lead to locations on the listing page rather than representing the current detail page.

The sidebar uses semantic headings and nested lists. It does not use disclosure controls or hide navigation behind interactive state. On mobile it remains in the normal document flow; on desktop it retains the existing sidebar placement and sticky behavior.

Learning path and Testing journey sidebars continue showing their complete short lists.

Previous and next navigation is a separate concern. If added, it belongs after the main page content and not inside the sidebar. It is not required for this change.

## Content schema and shared data

Testing methods and Exercises gain a required `category` field backed by a shared enum:

- `foundations`
- `display-and-adaptation`
- `content-and-structure`
- `interaction-and-tasks`

Both method and exercise entries declare the category explicitly. This repetition is intentional: exercises may later refer to multiple methods, and their primary placement should remain authored rather than inferred.

A central category definition contains each category's identifier, label, description, fragment identifier, and display order. Listing pages and sidebars consume this definition so their language and ordering cannot drift.

Content helpers are responsible for grouping entries and preserving each entry's existing `order` within its category. Page templates do not reproduce grouping logic.

## Component responsibilities

- `ContentListing` continues to render a single card grid.
- A grouped-listing component renders the category sections and delegates each grid to `ContentListing`.
- `ContentCard` supports the correct heading level for its context.
- `SectionLanding` accepts either flat entries or grouped entries.
- `SectionNavigation` accepts optional category information. Without it, its existing complete-list behavior remains available.
- Shared content utilities build ordered groups and category-aware navigation data.

These boundaries keep category metadata, grouping logic, presentation, and navigation rendering independently understandable and testable.

## Routing and information architecture

The routes remain flat within their existing sections:

```text
Testing methods (/methods/)
├── [Category presentation: Foundations] (#foundations)
├── [Category presentation: Display and adaptation] (#display-and-adaptation)
├── [Category presentation: Content and structure] (#content-and-structure)
├── [Category presentation: Interaction and tasks] (#interaction-and-tasks)
└── Method detail pages (/methods/{slug}/)

Exercises (/exercises/)
├── [Category presentation: Foundations] (#foundations)
├── [Category presentation: Display and adaptation] (#display-and-adaptation)
├── [Category presentation: Content and structure] (#content-and-structure)
├── [Category presentation: Interaction and tasks] (#interaction-and-tasks)
└── Exercise detail pages (/exercises/{slug}/)
```

Categories are navigational metadata, not additional hierarchy in URLs. Breadcrumbs therefore remain `Home > Testing methods > Page` and `Home > Exercises > Page`.

## Accessibility requirements

- Listing-page category headings are `h2`; their card headings are `h3`.
- “Browse by area” and sidebar links have descriptive visible text.
- Fragment targets are stable and receive normal browser focus and scroll behavior.
- Detail-page navigation uses `aria-current="page"` only for the current page.
- Sidebar groups use headings and lists without unnecessary ARIA.
- No information is available only through expansion, hover, color, or visual position.
- Focus, hover, light-theme, and dark-theme styles continue using the site's shared interaction patterns.

## Validation and testing

Implementation verification will cover:

- Astro content validation rejects missing or invalid categories.
- Every current method–exercise pair has the same primary category.
- Categories and their entries render in the defined order.
- Empty categories are not rendered if this component is reused with partial content.
- Listing pages have a valid heading hierarchy.
- “Browse by area” and “Other areas” fragment links reach the intended sections.
- Method and Exercise sidebars show the current category's entries and the other category links.
- `aria-current` identifies only the current detail page.
- Learning path and Testing journey listings and sidebars remain unchanged.
- Existing detail URLs and breadcrumbs remain unchanged.
- Desktop and mobile layouts remain usable at relevant breakpoints.
- Existing build and end-to-end checks continue to pass.

## Out of scope

- New category routes or category landing pages
- Search, filtering, tabs, or collapsible navigation
- Automatic topic-based recommendations
- Changes to primary navigation
- Changes to existing content URLs or breadcrumbs
- Regrouping Learning paths or Testing journeys
- Previous and next page navigation

# Accessibility Testing Lab breadcrumbs design

## Purpose and scope

Add breadcrumbs to the new Accessibility Testing Lab information architecture. Breadcrumbs help visitors understand the relationship between a content page and its primary section while providing a direct route back to higher levels.

Breadcrumbs appear only on these new routes and their collection detail pages:

- `/learn/`
- `/methods/`
- `/exercises/`
- `/journeys/`
- `/about/`

The home page has no breadcrumb. Retained workshop pages and legacy `/examples/` routes remain unchanged.

## Hierarchy

Use explicit authored labels rather than deriving display text from URL segments.

Section landing pages use two levels:

```text
Home / Testing methods
```

Collection detail pages use three levels:

```text
Home / Testing methods / Testing modal dialogs
```

The About page uses:

```text
Home / About this Lab
```

All items except the final item are links. The final item is plain text and represents the current page.

## Component contract

Create a presentational `Breadcrumbs.astro` component with this shallow input:

```ts
interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface Props {
  items: BreadcrumbItem[];
}
```

The component does not inspect `Astro.url`, import content collections, or infer labels. Callers own hierarchy and labels.

Add an optional `breadcrumb` slot to `BaseLayout`. Render the slot as the first content inside `<main>`, before page-specific content. Pages without the slot retain their existing output and spacing.

Collection detail routes already know the section label and current entry title. They pass breadcrumb items through their collection-specific layout to `ContentLayout`, which forwards the breadcrumb to `BaseLayout`. Section landing pages and About supply their breadcrumb directly to `BaseLayout`.

## Semantics and interaction

Render a navigation landmark with `aria-label="Breadcrumbs"` and an ordered or unordered list whose list semantics remain available to assistive technology.

- Render ancestor items as normal links.
- Render the final item as plain text with `aria-current="page"` on its list item.
- Insert `/` separators visually between items.
- Mark separators `aria-hidden="true"` so they are not announced.
- Preserve the Lab's global hover and visible keyboard-focus behavior on every link.
- Do not make the current item a redundant link to itself.

Long titles wrap naturally. The breadcrumb must not cause horizontal scrolling at narrow widths or at 200% and 400% zoom.

## Visual design

Match the useful visual characteristics of the breadcrumb on Sanna's blog:

- A single inline trail beneath the site header and above the page heading.
- Base-size text, visually quieter than page content.
- Muted Lab text colors in light and dark themes.
- Underlined ancestor links using the Lab's existing link colors.
- Slash separators with compact horizontal spacing.
- Full available Lab content width with responsive horizontal padding aligned to the main content area.
- Modest space below the breadcrumb before the page heading.

Use the Lab's existing tokens rather than copying compiled blog CSS or introducing blog-specific color values.

Reference: `https://blog.sanna.ninja/tech/moving-my-accessibility-site-to-astro/`.

## Route integration

| Route family | Breadcrumb |
|---|---|
| `/learn/` | Home / Learning paths |
| `/learn/[...id]/` | Home / Learning paths / Entry title |
| `/methods/` | Home / Testing methods |
| `/methods/[...id]/` | Home / Testing methods / Entry title |
| `/exercises/` | Home / Exercises |
| `/exercises/[...id]/` | Home / Exercises / Entry title |
| `/journeys/` | Home / Testing journeys |
| `/journeys/[...id]/` | Home / Testing journeys / Entry title |
| `/about/` | Home / About this Lab |

Empty collections need no placeholder detail pages; their landing breadcrumbs still render normally.

## Testing

Add coverage for:

- No breadcrumb on `/`.
- Correct two-level breadcrumbs on all four section landings and About.
- Correct three-level breadcrumb on each current Testing method detail page.
- Ancestor URLs and authored labels.
- Exactly one `aria-current="page"`, on the final non-link item.
- A navigation landmark named `Breadcrumbs`.
- Separators hidden from assistive technology.
- Breadcrumb placement before the page `h1`.
- Visible keyboard focus on ancestor links.
- Long-title wrapping and no horizontal overflow at narrow widths.
- Light and dark theme compatibility.
- Existing axe scans with breadcrumbs present.
- No breadcrumb added to retained legacy routes.

## Non-goals

- Inferring breadcrumb labels from raw URL segments.
- Adding breadcrumbs to the home page or legacy workshop routes.
- Adding breadcrumb dropdowns or collapsed intermediate levels.
- Replacing the primary or section navigation.
- Adding schema.org `BreadcrumbList` structured data in this first UI change.

# Content section navigation design

## Purpose

Add reusable detail-page navigation for Learning paths, Testing methods, Exercises, and Testing journeys. Visitors should be able to move between entries in the same section without returning to its landing page.

The first use is the four published Testing methods, but the component and layout contract apply to every content collection.

## Navigation model

Create `SectionNavigation.astro` with these inputs:

```ts
interface SectionNavigationItem {
  href: string;
  label: string;
}

interface Props {
  title: string;
  landingHref: string;
  landingLabel: string;
  items: SectionNavigationItem[];
  currentPath: string;
}
```

The component renders a labelled navigation landmark containing:

1. A visible section heading.
2. A link to the section landing page.
3. Links to all published entries in collection order.

For Testing methods, the initial navigation is:

```text
Testing methods
All testing methods
Testing page structure and links with a screen reader
Testing icons and SVGs with a screen reader
Testing language changes with a screen reader
Testing modal dialogs
```

Use complete entry titles as labels. Do not introduce a second short-navigation-title field until real titles demonstrate a need for it.

## Current-page behavior

Normalize trailing slashes before comparing paths. The link whose normalized URL exactly matches the current path receives `aria-current="page"`. Other links do not receive `aria-current`, including the section landing link while viewing a detail page.

Current-page styling should use the existing active-link visual language. It must remain distinguishable without relying only on color.

## Collection data

Add a shared helper that converts published collection entries into shallow navigation items containing only `href` and `label`.

- Use the existing production visibility rules.
- Sort entries by `order`, then title, using the existing collection helper.
- Do not resolve entry bodies or relationships for navigation.
- Do not manually maintain duplicate lists of entry URLs.

Each dynamic detail route supplies the appropriate section configuration:

| Collection | Title | Landing route | Landing label |
|---|---|---|---|
| `learningPaths` | Learning paths | `/learn/` | All learning paths |
| `testingMethods` | Testing methods | `/methods/` | All testing methods |
| `exercises` | Exercises | `/exercises/` | All exercises |
| `testingJourneys` | Testing journeys | `/journeys/` | All testing journeys |

Empty collections produce no detail routes, so they do not render an empty submenu. The shared contract is nevertheless wired into all four detail-route templates now.

## Responsive layout

Extend `ContentLayout` with an optional `navigation` slot.

- Without navigation, retain the current centered single-column layout.
- With navigation, use a wider grid at large viewports: a readable content column plus a sidebar.
- On large viewports, place navigation in a sticky right-hand sidebar aligned near the article heading.
- On smaller viewports, place navigation inline after the title, summary, and metadata but before the main body.
- Preserve source order so navigation appears in a logical reading and keyboard sequence on small screens.
- Do not duplicate the navigation markup for different breakpoints; reposition one instance with CSS Grid.

### Desktop alignment refinement

Size the large-screen grid to its two visible columns and gap rather than leaving unused width inside an 80em wrapper. Center the complete article-plus-navigation unit so the outer left and right margins are equal. Keep the readable article column at 40em and retain the existing bounded navigation column; do not stretch either column merely to fill available space.

The heading and body occupy separate grid cells when navigation is present, so their adjoining margins must not create an exaggerated gap. On large screens, compact the top margin of the first body heading at this boundary. Preserve normal heading spacing elsewhere and leave the approved mobile spacing and source order unchanged.

The article remains the primary content container. The section navigation is adjacent to the article content rather than nested inside prose sections.

## Visual design

Follow the useful parts of the legacy `ScreenReaderExamplesNav` treatment:

- Visible heading
- Top and bottom borders
- Compact text and spacing
- Clearly styled current-page link

Use the Lab's existing colors, focus indicators, dark-mode tokens, and link styles. Long titles wrap naturally. The navigation must remain usable at 200% and 400% zoom without clipping or horizontal scrolling caused by the component.

## Reuse boundaries

`SectionNavigation` is presentational and does not import Astro content APIs. Collection lookup and URL construction remain in route helpers.

`ContentLayout` knows only whether navigation content was supplied. It does not know which collection is being rendered.

Collection-specific layouts forward the navigation slot:

```text
Dynamic collection route
├── loads current entry
├── loads shallow section-navigation items
└── collection-specific layout
    └── ContentLayout
        ├── article content
        └── SectionNavigation through named slot
```

## Testing

Add coverage for:

- The four current method links and the `/methods/` landing link.
- Collection ordering.
- Exact current-page `aria-current="page"` behavior.
- Absence of `aria-current` from sibling and landing links on detail pages.
- Navigation landmark name and visible heading.
- One navigation instance at mobile and desktop widths.
- Inline placement before the body on small screens.
- Sticky sidebar placement at large widths.
- Equal outer margins around the visible two-column unit at large widths.
- Compact spacing between introductory content and the first body heading at large widths without changing mobile spacing.
- Keyboard access and visible focus for every submenu link.
- Long-title wrapping at narrow widths and zoomed layouts.
- Axe scans with the new navigation present.
- Shared configuration in all four dynamic route templates without requiring sample content entries.

## Non-goals

- Adding nested topic groups or expandable submenu levels.
- Adding previous/next controls.
- Adding custom short navigation labels to content schemas.
- Showing draft entries in production navigation.
- Replacing primary navigation or section landing-page listings.
- Removing the legacy `ScreenReaderExamplesNav` during this change.

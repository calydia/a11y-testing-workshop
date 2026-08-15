# Legacy content cleanup design

Date: 15 August 2026

## Goal

Remove the old accessibility-workshop implementation from Accessibility Testing Lab while preserving saved links when an old page has an honest renewed destination. Legacy content that has no place in the new information architecture should disappear rather than remain published or redirect to a misleading page.

## Cleanup principles

- Keep content only when it has already been renewed into the four-area Lab architecture.
- Remove old implementations rather than maintaining parallel workshop pages.
- Redirect an old URL only when its purpose maps clearly to renewed content.
- Let unmatched workshop-only routes use the normal 404 response.
- Remove code, assets, and dependencies only after confirming they have no current consumers.
- Preserve all current Learning paths, Testing methods, Exercises, Testing journeys, workspaces, and shared site behavior.

## Redirect map

Add these mappings to Astro's `redirects` configuration:

| Old URL | Renewed destination |
| --- | --- |
| `/testing-automated-tools/` | `/methods/testing-with-automated-tools/` |
| `/testing-keyboard-accessibility/` | `/methods/testing-keyboard-accessibility/` |
| `/testing-visuals/` | `/methods/testing-visual-accessibility/` |
| `/testing-zooming/` | `/methods/testing-zoom-and-reflow/` |
| `/testing-screen-readers/` | `/learn/practical-screen-reader-testing/` |
| `/examples/` | `/methods/` |
| `/examples/screen-reader/` | `/learn/practical-screen-reader-testing/` |
| `/examples/screen-reader/links/` | `/methods/screen-reader-page-structure-and-links/` |
| `/examples/screen-reader/icons/` | `/methods/screen-reader-icons-and-svg/` |
| `/examples/screen-reader/lang/` | `/methods/screen-reader-language-changes/` |
| `/examples/screen-reader/modals/` | `/methods/testing-modal-dialogs/` |

Delete the corresponding source page files. A physical Astro page at an old URL would take precedence over its configured redirect.

This project currently builds static HTML without an adapter. Astro therefore generates HTML redirect files using a meta refresh and cannot guarantee a server-level 301 status. These redirects preserve bookmarks and direct navigation. Host-level permanent redirects can replace or supplement them during deployment planning without restoring legacy pages.

## Routes removed without redirects

Delete these pages and leave no redirect:

| URL | Reason |
| --- | --- |
| `/answers/` | Answers refer specifically to defects in removed workshop pages and do not apply to the renewed Exercises. |
| `/aria-tests/` | Experimental test cases have no reviewed equivalent in the Lab curriculum. |
| `/resources/` | The generic link list does not fit the four-area architecture; useful references should be curated within relevant Testing methods later. |

These URLs should return the site's normal 404 response.

## Page and layout cleanup

Migrate Home from the temporary `src/layouts/Layout.astro` compatibility wrapper to `BaseLayout.astro`. Preserve its title, metadata, content, links, and rendered behavior.

After all legacy pages are removed, delete:

- `src/layouts/Layout.astro`
- `src/components/site/WorkshopCompatibilityStyles.astro`
- `src/components/ScreenReaderExamplesNav.astro`
- `src/components/FormWithErrors.astro`
- `src/components/CardOk.astro`
- `src/components/CardNotOk.astro`
- `src/components/MenuComponent.jsx`
- `src/components/MenuComponentFixed.jsx`

Each item is currently used only by pages in the removal set. Do not fold workshop compatibility CSS into `BaseLayout`.

## Asset cleanup

Delete images that become unreferenced after the workshop pages and cards are removed:

- `src/images/cat.jpg`
- `src/images/firefox-zoom.png`
- `src/images/logo-example.png`
- `src/images/water2.jpg`

Keep:

- `src/images/water.jpg`, used by the image-alternative-text Exercise;
- `src/images/man-working.jpg`, used by an Exercise and Testing journey workspace;
- `public/images/community-conference-venue.svg`;
- public favicons and theme icons; and
- footer scripts still referenced by the current shell.

Run a post-removal reference scan before deleting any additional asset.

## Dependency cleanup

The two legacy menu components are the only React consumers. Once they are removed:

- remove the React import and integration from `astro.config.mjs`;
- remove `@astrojs/react`, `react`, `react-dom`, `@types/react`, and `@types/react-dom` from `package.json`; and
- update the lockfile using the package manager.

Do not replace React with another client framework. The current Lab interactions remain Astro and browser-native JavaScript.

## Information architecture after cleanup

The published content hierarchy remains:

```text
Home (/)
├── Learning paths (/learn/)
│   └── Learning path pages (/learn/{slug}/)
├── Testing methods (/methods/)
│   └── Testing method pages (/methods/{slug}/)
├── Exercises (/exercises/)
│   └── Exercise pages (/exercises/{slug}/)
├── Testing journeys (/journeys/)
│   └── Testing journey pages (/journeys/{slug}/)
└── About this Lab (/about/) [footer]
```

Exercise fixtures and Testing journey workspaces remain supporting routes, not primary navigation sections. Redirect files preserve selected old entry points without reintroducing them into navigation, breadcrumbs, or the content hierarchy.

## Testing changes

Remove tests whose contract is that legacy pages render their old content. Replace them with focused contracts that:

- enumerate all 11 redirect sources and their exact destinations;
- verify each redirect source no longer renders workshop content;
- verify `/answers/`, `/aria-tests/`, and `/resources/` return the normal 404 response;
- verify current navigation and content contain no links to old URLs;
- verify Home renders through `BaseLayout` without losing shell behavior;
- verify renewed route inventories, breadcrumbs, section navigation, and relationship links remain intact;
- verify the sitemap does not expose removed unmatched pages as ordinary content; and
- verify no removed component, compatibility layout, React integration, dependency, or orphaned asset remains referenced.

Update existing tests that currently require legacy routes to remain available. Preserve tests for the renewed demonstrations and method pages; those implementations are independent of the deleted old examples.

## Verification

1. Establish the redirect, 404, and no-legacy-reference tests before deletion.
2. Remove pages in small groups and rerun focused routing tests.
3. Migrate Home and remove confirmed orphaned code and assets.
4. Remove React and update dependency files.
5. Run Astro diagnostics and the production build.
6. Inspect build output for the 11 redirect artifacts, absence of unmatched pages, sitemap behavior, and absence of obsolete bundled assets.
7. Run current-route, navigation, breadcrumb, axe, responsive, and interaction checks.
8. Run the complete Playwright suite on port 4321.
9. Run reference scans, `git diff --check`, and final worktree review.

## Out of scope

- Adding new curriculum content or a Resources section.
- Rewriting renewed pages from legacy material.
- Redirecting unmatched pages to approximate destinations.
- Changing the four-area navigation or current URL structure.
- Removing Exercise fixtures or Testing journey workspaces.
- Choosing or configuring the final production host.
- Installing a deployment adapter solely to produce server-level redirects.

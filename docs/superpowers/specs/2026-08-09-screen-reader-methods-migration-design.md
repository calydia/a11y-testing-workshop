# Screen-reader examples migration design

## Purpose

Adapt the four existing pages under `/examples/screen-reader/` into the Accessibility Testing Lab information architecture. The material will become testing-method content with embedded demonstrations rather than a new Examples section or immediate exercise content.

The migration preserves the useful demonstrations while reshaping each page around how to perform and interpret an accessibility test.

## Content placement

Create four entries in the `testingMethods` content collection:

| Existing page | New route | Working title |
|---|---|---|
| `/examples/screen-reader/links/` | `/methods/screen-reader-page-structure-and-links/` | Testing page structure and links with a screen reader |
| `/examples/screen-reader/icons/` | `/methods/screen-reader-icons-and-svg/` | Testing icons and SVGs with a screen reader |
| `/examples/screen-reader/lang/` | `/methods/screen-reader-language-changes/` | Testing language changes with a screen reader |
| `/examples/screen-reader/modals/` | `/methods/testing-modal-dialogs/` | Testing modal dialogs |

Do not create an Examples collection, route, or primary-navigation item. The existing legacy routes remain available during this phase and can be redirected or retired in a separately reviewed cleanup.

## Editorial structure

All four method entries use a consistent learning structure:

1. What the method tests
2. What the visitor needs
3. How to perform the test
4. What to observe
5. Interactive demonstrations
6. How to interpret the result
7. Limitations and platform variations
8. Related exercises, when exercises exist

The pages should teach testing behavior rather than become implementation tutorials. Existing implementation explanations may remain where they help visitors interpret test results, but code mechanics are secondary to the testing procedure.

Each entry uses the existing `testingMethods` schema:

- `skillLevel`: initially `beginner`
- `estimatedMinutes`: a realistic completion estimate
- `tools`: the relevant screen-reader and browser categories without requiring a single product
- `platforms`: only platforms materially relevant to the method
- `outcomes`: observable skills visitors gain
- `relatedMethods` and `relatedExercises`: empty until real related entries exist
- `status`: `published` once the adapted page and demonstration pass review

## Demonstration model

The method page owns the explanation and testing instructions. Interactive or rendered examples move into focused Astro components under:

```text
src/components/demonstrations/screen-reader/
├── PageStructureAndLinksDemo.astro
├── IconsAndSvgDemo.astro
├── LanguageChangesDemo.astro
└── ModalDialogsDemo.astro
```

These are explanatory demonstrations, not exercise fixtures:

- Expected behavior may be visible alongside the example.
- Accessible, problematic, and comparative patterns may be labelled when that supports learning.
- The surrounding method remains accessible and understandable without operating every demonstration.
- Demonstration-specific styles and scripts remain colocated with their component.

The demonstrations must not depend on the legacy `ScreenReaderExamplesNav` component or old example routes.

### Page structure and links

Retain both problematic and improved patterns. Organize them as explicit comparisons and explain what visitors should hear or discover through headings lists, link lists, and sequential navigation.

### Icons and SVGs

Retain meaningful, decorative, and noisy icon patterns. Make the expected accessible name or expected silence explicit after each test target. Preserve the CSS-generated-content caveat as a platform-support limitation rather than a recommended technique.

### Language changes

Retain working language inheritance and redundant-language examples. Add a clear prerequisite that the chosen screen reader must have the relevant voice or language support installed. Describe failure to switch pronunciation as a result requiring configuration checks before concluding the markup is wrong.

### Modal dialogs

Retain the working ARIA-based and native `dialog` demonstrations. The testing procedure covers initial focus, Tab and Shift+Tab containment, Escape, background inertness, accessible name and description, and focus restoration. Keyboard testing is part of this method even though the examples are grouped with screen-reader material.

## Rendering architecture

Markdown method entries need a controlled way to request demonstrations without importing arbitrary component paths from frontmatter.

Add an optional field to the testing-method schema:

```ts
demonstration: z.enum([
  'screen-reader/page-structure-and-links',
  'screen-reader/icons-and-svg',
  'screen-reader/language-changes',
  'screen-reader/modal-dialogs',
]).optional()
```

A typed demonstration registry maps those stable keys to Astro components. `MethodLayout` renders the selected demonstration at the method body's designated demonstration boundary. Because ordinary Markdown cannot place a component at an arbitrary body location, the initial template places the demonstration after the rendered method procedure and observation guidance, followed by interpretation and limitations content supplied through structured frontmatter or a layout-owned section.

To avoid over-structuring prose, the preferred implementation is to add two optional schema fields:

```ts
demonstration: demonstrationKey.optional(),
interpretation: z.array(z.string()).default([]),
limitations: z.array(z.string()).default([]),
```

The Markdown body contains the introduction, prerequisites, procedure, and observations. `MethodLayout` then renders:

```text
Method header and metadata
Markdown teaching content
Demonstration, when configured
Interpreting the results, when configured
Limitations, when configured
Related content, when configured
```

Unknown demonstration keys fail schema validation. A missing registry implementation for a valid key fails the build with a clear authoring error.

## Exercise relationship

No exercise entries are created in this migration.

Future exercises may reuse or adapt underlying patterns, but explanatory demonstrations and exercise fixtures remain separate components because they have different contracts:

- Demonstrations reveal and explain expected behavior.
- Exercise fixtures present an investigation target without revealing findings immediately.
- An exercise may link back to its prerequisite method.
- Shared low-level markup may be extracted later only when real duplication appears.

## Accessibility boundary

Problematic patterns are intentional only inside clearly identified comparison demonstrations. They must not compromise the Lab shell or the explanatory content around them.

- Each demonstration has a visible heading or accessible label.
- Comparisons identify which examples are intentionally problematic in explanatory text.
- Placeholder links do not unexpectedly navigate or reload the page when activated.
- Modal examples restore page state and focus after every close path.
- IDs remain unique when a demonstration renders once on a page.
- Automated scans document and scope any intentional violations rather than ignoring the entire method page.

## Testing

Add coverage for:

- All four method routes and their titles.
- Collection cards linking to the four methods from `/methods/`.
- Method metadata and stable demonstration-key resolution.
- Unique headings and IDs within every rendered method.
- Keyboard operation of links, SVG controls, and both modal implementations.
- Modal focus entry, containment, Escape behavior, and restoration.
- Language attributes and inheritance in rendered markup.
- Accessible-name behavior for meaningful and decorative SVG examples.
- Axe scans of the method shell, with any deliberate comparison violations explicitly scoped and asserted.
- The absence of an Examples item in primary navigation.

## Migration sequence

1. Add the method demonstration schema fields and typed registry.
2. Extract each legacy demonstration into a focused component without changing its behavior.
3. Create and adapt the four Markdown method entries around testing procedures.
4. Render demonstrations and structured interpretation sections through `MethodLayout`.
5. Add route, collection-listing, interaction, and accessibility tests.
6. Verify the legacy example pages still render during this phase.

## Non-goals

- Creating a new Examples section or collection.
- Creating exercise entries or hiding solutions.
- Removing or redirecting legacy example routes.
- Migrating the broader `/testing-screen-readers` workshop page.
- Standardizing every demonstration into the same visual pattern when its testing purpose differs.

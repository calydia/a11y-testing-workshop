# Screen-reader methods migration implementation plan

## Goal

Adapt the four legacy screen-reader example pages into published Testing methods entries with reusable explanatory demonstrations. Preserve the legacy routes during this phase and do not create an Examples section or exercise entries.

## Task 1: Add failing method-route and collection-listing tests

### Files

- Add: `tests/screen-reader-methods.spec.js`
- Modify: `tests/content-architecture.spec.js`
- Modify: `tests/axe-core.spec.js`

### Work

1. Assert these routes render successfully with one expected `h1`:
   - `/methods/screen-reader-page-structure-and-links/`
   - `/methods/screen-reader-icons-and-svg/`
   - `/methods/screen-reader-language-changes/`
   - `/methods/testing-modal-dialogs/`
2. Assert `/methods/` lists and links to all four entries.
3. Assert the primary navigation still has no Examples item.
4. Add accessibility scans for the explanatory portions of all four methods.
5. Run the tests and confirm they fail because the entries do not yet exist.

### Verification

```sh
npx playwright test tests/screen-reader-methods.spec.js tests/content-architecture.spec.js tests/axe-core.spec.js --workers 1
```

## Task 2: Extend the testing-method schema and add a demonstration registry

### Files

- Modify: `src/content.config.ts`
- Add: `src/demonstrations/registry.ts`
- Add: `src/components/demonstrations/MethodDemonstration.astro`

### Work

1. Add an optional enumerated `demonstration` field containing the four approved stable keys.
2. Add `interpretation` and `limitations` string arrays with empty defaults.
3. Define a typed registry mapping demonstration keys to Astro components.
4. Make an unknown registry key throw a clear authoring error rather than rendering an empty region.
5. Keep content frontmatter independent of component filesystem paths.

### Verification

```sh
npm run astro -- check
npm run build
```

## Task 3: Extract the page-structure and links demonstration

### Files

- Add: `src/components/demonstrations/screen-reader/PageStructureAndLinksDemo.astro`
- Modify: `src/pages/examples/screen-reader/links.astro`

### Work

1. Extract the existing heading, page-structure, and link examples into the focused component.
2. Organize problematic and improved patterns as explicit comparisons.
3. Prevent demonstration links using `href="#"` from causing page navigation when activated.
4. Keep expected screen-reader behavior visible in the explanatory demonstration.
5. Reuse the component from the legacy route so behavior is not duplicated.

### Verification

```sh
npm run astro -- check
npx playwright test tests/screen-reader-methods.spec.js --grep "structure|links" --workers 1
```

## Task 4: Extract the icons and SVG demonstration

### Files

- Add: `src/components/demonstrations/screen-reader/IconsAndSvgDemo.astro`
- Modify: `src/pages/examples/screen-reader/icons.astro`

### Work

1. Move meaningful, decorative, missing-name, and noisy icon comparisons into the component.
2. Keep demonstration-specific CSS colocated.
3. Preserve expected names or silence in the visible explanations.
4. Present generated CSS content as a support caveat, not a recommended accessible-name mechanism.
5. Reuse the component from the legacy route.

### Verification

```sh
npm run astro -- check
npx playwright test tests/screen-reader-methods.spec.js --grep "icons|SVG" --workers 1
```

## Task 5: Extract the language-changes demonstration

### Files

- Add: `src/components/demonstrations/screen-reader/LanguageChangesDemo.astro`
- Modify: `src/pages/examples/screen-reader/lang.astro`

### Work

1. Extract the working inherited-language and redundant-language examples.
2. Preserve correct `lang` attributes and nested inheritance.
3. Explain that installed voices and screen-reader/browser support affect observed pronunciation.
4. Reuse the component from the legacy route.

### Verification

```sh
npm run astro -- check
npx playwright test tests/screen-reader-methods.spec.js --grep "language" --workers 1
```

## Task 6: Extract the modal-dialog demonstrations

### Files

- Add: `src/components/demonstrations/screen-reader/ModalDialogsDemo.astro`
- Modify: `src/pages/examples/screen-reader/modals.astro`

### Work

1. Move both the ARIA-based modal and native `dialog` implementation into the component.
2. Move their styles and client behavior with the component.
3. Preserve unique IDs, accessible names and descriptions, initial focus, focus containment, Escape behavior, background inertness, and focus restoration.
4. Reuse the component from the legacy route.
5. Add focused keyboard tests for both implementations.

### Verification

```sh
npm run astro -- check
npx playwright test tests/screen-reader-methods.spec.js --grep "modal" --workers 1
```

## Task 7: Render demonstrations and structured guidance in MethodLayout

### Files

- Modify: `src/layouts/MethodLayout.astro`
- Modify: `src/pages/methods/[...id].astro`
- Add: `src/components/content/InterpretationList.astro`
- Add: `src/components/content/LimitationsList.astro`

### Work

1. Pass the demonstration key, interpretation, and limitations from the collection route to `MethodLayout`.
2. Render the Markdown teaching content first.
3. Render the configured demonstration in a labelled section.
4. Render interpretation and limitations sections only when their arrays contain content.
5. Keep related-content rendering shallow and optional.

### Verification

```sh
npm run astro -- check
npm run build
```

## Task 8: Create the four testing-method entries

### Files

- Add: `src/content/testing-methods/screen-reader-page-structure-and-links.md`
- Add: `src/content/testing-methods/screen-reader-icons-and-svg.md`
- Add: `src/content/testing-methods/screen-reader-language-changes.md`
- Add: `src/content/testing-methods/testing-modal-dialogs.md`

### Work

For each method:

1. Add complete frontmatter matching the collection schema.
2. Set `status: published` and a stable listing order.
3. Write a concise introduction focused on what the method tests.
4. State prerequisites and setup without requiring one named screen reader.
5. Provide an ordered testing procedure.
6. Explain what visitors should observe before the demonstration.
7. Add useful interpretation and limitation entries in frontmatter.
8. Avoid duplicating the full demonstration explanation in Markdown.

Content-specific requirements:

- Structure and links: headings navigation, link lists, sequential navigation, and link-purpose comparison.
- Icons and SVGs: meaningful names, decorative silence, duplicate announcements, and generated-content uncertainty.
- Language changes: pronunciation switching, inheritance, redundant markup, installed voices, and platform variation.
- Modals: accessible name and description, initial focus, Tab and Shift+Tab containment, Escape, inert background, and focus restoration.

### Verification

```sh
npm run astro -- check
npm run build
npx playwright test tests/screen-reader-methods.spec.js tests/content-architecture.spec.js --workers 1
```

## Task 9: Verify legacy-route compatibility and accessibility boundaries

### Files

- Modify: `tests/screen-reader-methods.spec.js`
- Modify: `tests/axe-core.spec.js`

### Work

1. Confirm all four legacy `/examples/screen-reader/` detail routes still return successfully.
2. Confirm method pages do not render `ScreenReaderExamplesNav`.
3. Check heading order and duplicate IDs on every new and legacy route.
4. Scope automated accessibility assertions to account for deliberately problematic comparison targets without excluding the whole page.
5. Confirm interactive examples cannot disrupt the shared Lab shell.

### Verification

```sh
npx playwright test tests/screen-reader-methods.spec.js tests/axe-core.spec.js --workers 1
```

## Task 10: Final verification and review

### Work

1. Run Astro type and content validation.
2. Build the production site and confirm all four static method routes are generated.
3. Run the complete Playwright suite.
4. Confirm no Examples navigation item, route collection, or exercise entry was introduced.
5. Confirm only the four approved legacy pages were adapted.
6. Review the diff for duplicated demonstration markup, stale imports, unsafe `href="#"` behavior, and accidental workshop-content deletion.

### Verification

```sh
npm run astro -- check
npm run build
npx playwright test --workers 1
rg -n "Examples" src/components/MainNavigation.astro src/content.config.ts
git diff --check
git status --short
```

## Completion criteria

- Four published testing-method entries render at the approved routes and appear on `/methods/`.
- Each method teaches a repeatable testing procedure and includes its explanatory demonstration.
- Demonstration implementations are reusable and not duplicated between new and legacy routes.
- Modal and other interactive demonstrations remain keyboard operable.
- Legacy screen-reader example routes remain available.
- No Examples section or exercise entries are added.
- Astro validation, production build, and the complete Playwright suite pass.

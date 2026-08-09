# Testing keyboard accessibility method implementation plan

## Goal

Publish one clean, reusable Testing method at `/methods/testing-keyboard-accessibility/`, derived selectively from the legacy keyboard workshop page. Keep deliberately broken examples and exercises out of this milestone, retain the legacy route, and integrate the method into existing listings, breadcrumbs, and section navigation.

## Task 1: Add failing route, listing, and navigation tests

### Files

- Modify: `tests/screen-reader-methods.spec.js`
- Modify: `tests/breadcrumbs.spec.js`
- Modify: `tests/axe-core.spec.js`

### Work

1. Rename the shared method fixture in `tests/screen-reader-methods.spec.js` if necessary so it accurately represents all Testing methods rather than only screen-reader methods.
2. Add `Testing keyboard accessibility` at `/methods/testing-keyboard-accessibility/` before the four existing methods in the expected collection order.
3. Assert `/methods/` links to the new entry in that order.
4. Assert the Testing methods section navigation includes the new entry first.
5. Assert the keyboard method identifies only its own section-navigation link with `aria-current="page"`.
6. Assert the breadcrumb is `Home / Testing methods / Testing keyboard accessibility` with the current item as plain text.
7. Add the new route to automated axe coverage.
8. Confirm the focused tests fail because the content entry does not yet exist.

### Verification

```sh
npx playwright test tests/screen-reader-methods.spec.js tests/breadcrumbs.spec.js tests/axe-core.spec.js --grep "keyboard accessibility|listing|section navigation" --workers 1
```

## Task 2: Create the keyboard accessibility method entry

### Files

- Add: `src/content/testing-methods/testing-keyboard-accessibility.md`

### Work

1. Add complete frontmatter using the existing `testingMethods` schema.
2. Set `status: published` and an order before the current screen-reader methods.
3. Use beginner skill level, an approximately 15-minute estimate, desktop platform, keyboard/browser tools, and focused topics and prerequisites.
4. Do not set a `demonstration` key.
5. Add outcomes covering a repeatable keyboard review, identification of focus and operability failures, and reproducible reporting.
6. Add structured interpretation and limitation entries matching the approved distinctions.

### Verification

```sh
npm run astro -- check
npm run build
```

## Task 3: Write the reusable testing procedure

### Files

- Modify: `src/content/testing-methods/testing-keyboard-accessibility.md`

### Work

1. Write `What this method tests` around reachability, operability, focus order, focus visibility, and keyboard traps.
2. Write `What you need` without depending on one browser or operating system.
3. Add `Before you start` guidance for a predictable starting focus position, pointer-free testing, and platform Tab settings.
4. Write an ordered procedure covering:
   - forward and backward navigation;
   - access to all controls and functionality;
   - link, button, form-control, and native-widget operation;
   - logical focus order;
   - visible focus;
   - traps and unexpected focus loss;
   - bypass mechanisms;
   - character-key shortcuts;
   - reproducible finding notes.
5. Write `What to observe` with concrete success and failure signals.
6. Link contextually to `/methods/testing-modal-dialogs/` for the complete modal focus procedure.
7. Keep deliberately broken examples, workshop tasks, answers, screen-reader commands, and version-specific Safari instructions out of the page.

### Verification

```sh
npm run astro -- check
npx playwright test tests/screen-reader-methods.spec.js --grep "Testing keyboard accessibility" --workers 1
```

## Task 4: Add focused content-boundary assertions

### Files

- Modify: `tests/screen-reader-methods.spec.js`

### Work

1. Assert the page has the approved procedural headings.
2. Assert it contains a link to Testing modal dialogs.
3. Assert it renders Interpreting the results and Limitations.
4. Assert it does not render a Demonstration heading.
5. Assert it has unique element IDs.
6. Confirm the current layout naturally handles a method without a demonstration.

### Verification

```sh
npx playwright test tests/screen-reader-methods.spec.js --grep "Testing keyboard accessibility" --workers 1
```

## Task 5: Verify legacy preservation and cross-navigation

### Files

- Modify: `tests/screen-reader-methods.spec.js`

### Work

1. Assert `/testing-keyboard-accessibility/` remains available.
2. Confirm no redirect or content deletion was introduced.
3. Confirm the legacy route does not receive new Lab breadcrumbs.
4. Confirm the new method does not import `FormWithErrors`, card examples, workshop compatibility styles, or another legacy fixture.
5. Confirm the primary navigation remains unchanged.

### Verification

```sh
npx playwright test tests/screen-reader-methods.spec.js tests/breadcrumbs.spec.js --grep "keyboard|legacy|primary navigation" --workers 1
```

## Task 6: Final verification and review

### Work

1. Run Astro type and content validation.
2. Build the production site and confirm the new static route is generated.
3. Run the complete Playwright suite.
4. Review the rendered method for concise instructions, platform-neutral wording, correct key names, and separation from exercises.
5. Confirm collection order is keyboard first, followed by the four screen-reader methods.
6. Review the diff for accidental legacy edits, schema changes, demonstration additions, or exercise fixtures.

### Verification

```sh
npm run astro -- check
npm run build
npx playwright test --workers 1
rg -n "FormWithErrors|CardNotOk|WorkshopCompatibilityStyles|demonstration:" src/content/testing-methods/testing-keyboard-accessibility.md
git diff --check
git status --short
```

## Completion criteria

- `/methods/testing-keyboard-accessibility/` renders a published, platform-neutral baseline keyboard-testing procedure.
- The method appears first on `/methods/` and in the Testing methods section navigation.
- Its breadcrumb and exact current-page states are correct.
- It covers reachability, activation, focus order and visibility, traps, bypass mechanisms, shortcuts, and reproducible reporting.
- It links to the modal method without duplicating the full modal procedure.
- It has interpretation and limitation guidance but no Demonstration section.
- No exercise, broken fixture, schema change, redirect, or legacy content edit is introduced.
- The legacy keyboard workshop route remains available.
- Astro validation, production build, axe checks, and the complete Playwright suite pass.

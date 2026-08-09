# Testing keyboard accessibility method design

## Purpose

Create the first method migrated from the remaining workshop material: a reusable, self-contained procedure for performing a baseline desktop keyboard accessibility review.

The method teaches a repeatable testing technique. It does not contain deliberately broken examples or function as an exercise. Practice fixtures and exercises derived from the legacy keyboard page will be designed separately after this method has been reviewed in use.

## Route and collection

Add one published `testingMethods` entry:

```text
/methods/testing-keyboard-accessibility/
```

Use the title `Testing keyboard accessibility`. Place it before the four existing screen-reader methods in collection order because keyboard testing is a foundational technique and is frequently performed before assistive-technology testing.

The entry uses the existing Testing methods schema and route. Do not add schema fields or a custom page template.

Suggested metadata:

- Skill level: beginner
- Estimated time: approximately 15 minutes for a representative page
- Tools: keyboard and web browser
- Platform: desktop
- Topics: keyboard, focus, operability, navigation
- Prerequisites: basic familiarity with common interactive web controls

## Method scope

The method covers a general desktop keyboard review:

1. Begin from a predictable page and focus position.
2. Navigate forward and backward through interactive elements.
3. Confirm all interactive content and functionality can be reached.
4. Operate links, buttons, form controls, and common native widgets with expected keys.
5. Check that focus order follows the page's meaning and operation.
6. Check that keyboard focus is always visually identifiable.
7. Check that focus is not trapped in a component or lost unexpectedly.
8. Check bypass mechanisms for repeated blocks where applicable.
9. Check character-key shortcuts and whether users can disable, remap, or limit them when required.
10. Record failures with the element, key sequence, expected result, and observed result.

The method mentions overlays as an important focus-management checkpoint but links to the existing Testing modal dialogs method for the complete modal procedure. It does not duplicate that method's focus containment, Escape, inert-background, and restoration instructions.

## Content structure

Follow the established Testing method page pattern:

1. **What this method tests** — operability, reachability, focus order, focus visibility, and freedom from keyboard traps.
2. **What you need** — a physical or equivalent keyboard, a desktop browser, and knowledge of common native-control keys.
3. **Before you start** — begin at the top of a freshly loaded page, avoid using a pointer during the test, and note that browser or operating-system settings can affect which elements receive Tab focus.
4. **How to perform the test** — the ordered baseline procedure.
5. **What to observe** — practical signs of success and failure.
6. **Interpreting the results** — structured guidance using the existing `interpretation` field.
7. **Limitations** — structured caveats using the existing `limitations` field.

Do not configure a demonstration. `MethodLayout` should naturally omit the Demonstration section.

## Content boundaries

### Include

- `Tab` and `Shift` + `Tab` navigation.
- Expected activation of links and buttons.
- Arrow-key operation where native controls use it.
- Reachability of all interactive content.
- Logical focus order.
- Visible keyboard focus.
- Keyboard traps and unexpected focus loss.
- Skip links and other bypass mechanisms.
- Character-key shortcut considerations.
- A concise caveat about browser and operating-system keyboard-navigation settings.
- A cross-link to Testing modal dialogs.

### Exclude for later work

- Deliberately broken form controls.
- The styled non-interactive `div` button.
- Repeated-link card examples.
- A scored exercise or solution.
- Detailed screen-reader commands.
- Mobile external-keyboard, switch-control, or voice-control procedures.
- Version-specific Safari menu paths.
- A comprehensive widget-by-widget keyboard pattern reference.

## Interpretation and limitations

Interpretation should make these distinctions clear:

- An element that cannot receive keyboard focus cannot be operated by a keyboard user.
- Reachability alone is insufficient when activation keys do not work or focus is not visible.
- A technically sequential focus order can still be confusing if it conflicts with visual or semantic reading order.
- Focus must not become trapped except where a defined interaction intentionally contains it and provides an exit.
- Failures should be documented with reproducible key sequences.

Limitations should state:

- Keyboard operability does not prove correct roles, names, states, or screen-reader output.
- Browser and operating-system settings may change Tab behavior, so testers must distinguish configuration from page defects.
- Complex widgets require comparison with their documented keyboard interaction pattern.
- Modal dialogs require the dedicated modal method.
- Mobile and alternative-input testing are outside this baseline desktop method.

## Legacy-content handling

Use `src/pages/testing-keyboard-accessibility.astro` only as source material. Do not copy its workshop structure, hidden-answer link, task box, embedded broken controls, or outdated platform wording into the method.

Keep the legacy route and its components unchanged during this milestone. Do not add redirects or delete the old page.

## Navigation and internal linking

The published entry automatically appears on `/methods/` and in the collection-driven Testing methods submenu.

The expected order becomes:

1. Testing keyboard accessibility
2. Testing page structure and links with a screen reader
3. Testing icons and SVGs with a screen reader
4. Testing language changes with a screen reader
5. Testing modal dialogs

Link contextually from the keyboard method to `/methods/testing-modal-dialogs/` when directing readers to the complete overlay procedure. Do not add a new primary-navigation item.

## Testing

Add coverage for:

- The new route renders successfully.
- `/methods/` lists the keyboard method before the four screen-reader methods.
- The Testing methods section navigation lists it in the same order.
- Its section-navigation link has `aria-current="page"` on its own route and sibling links do not.
- Its breadcrumb is `Home / Testing methods / Testing keyboard accessibility`.
- The page contains the approved procedural sections and a link to Testing modal dialogs.
- The page has no Demonstration heading.
- The page has Interpreting the results and Limitations sections.
- The legacy `/testing-keyboard-accessibility/` route remains available.
- Axe finds no automatically detectable accessibility issues on the new route.
- Astro content validation and the production build pass.

## Non-goals

- Creating the keyboard or form exercise in this milestone.
- Migrating the entire legacy keyboard page.
- Rewriting or deleting the legacy route.
- Adding a new demonstration component.
- Adding new content-collection schema fields.
- Expanding the primary information architecture.

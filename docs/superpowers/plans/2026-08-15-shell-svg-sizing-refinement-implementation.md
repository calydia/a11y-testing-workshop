# Shell SVG sizing refinement implementation plan

## Goal

Reduce both shell logos to the approved responsive sizes and protect the intended dimensions of every migrated shell SVG.

## Task 1: Extend the SVG sizing contract

### Files

- Modify: `tests/shell-interactions.spec.js`

### Work

1. At a mobile viewport, assert the visible header and footer logos are `80px` wide.
2. At a desktop viewport, assert both visible logos are `96px` wide.
3. Assert visible menu and theme SVGs remain `32px` square.
4. Assert the Back to top SVG remains `48px` square.
5. Preserve decorative SVG, accessible-name, visibility, and keyboard-interaction assertions.

## Task 2: Apply shared responsive logo sizing

### Files

- Modify: `src/layouts/BaseLayout.astro`

### Work

1. Change the shared header-logo width from `w-24` to `w-20` and its medium width from `w-32` to `w-24`.
2. Change the footer-logo width from `w-24` to `w-20` and its medium width from `w-28` to `w-24`.
3. Preserve `h-auto`, theme visibility rules, and all non-logo icon styles.

## Task 3: Verify

1. Run focused shell interaction tests.
2. Run axe checks, Astro diagnostics, and the production build.
3. Confirm the existing dependency-remediation audit still reports zero vulnerabilities.
4. Run `git diff --check` and review the combined pending implementation changes.

## Out of scope

- Header/footer restructuring or unrelated spacing changes.
- Logo artwork or aspect-ratio changes.
- Changes to menu, theme, or Back to top icon sizes.
- Changes to the approved native SVG migration architecture.

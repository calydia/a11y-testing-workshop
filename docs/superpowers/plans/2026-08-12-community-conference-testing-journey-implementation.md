# Community conference programme Testing journey implementation plan

## Goal

Publish an intermediate, task-led conference-programme Testing journey with one standalone workspace, five existing screen-reader methods, recommended Learning-path preparation, six review stages, and a controlled mix of eight findings and valid comparisons.

## Task 1: Add failing journey and workspace tests

### Files

- Modify: `tests/testing-journey.spec.js`
- Add: `tests/community-conference-workspace.spec.js`
- Modify: `tests/axe-core.spec.js`

### Work

1. Pin the second journey's listing and submenu order, metadata, scenario, role, objectives, methods, preparation, stages, deliverables, workspace link, and absence of answer/progress UI.
2. Preserve all first-journey behavior and optional Exercise wording.
3. Pin the workspace route, return link, theme, responsive behavior, semantic cases, modal interactions, and controlled finding boundaries.
4. Assert the expected automated rule IDs only on the intentionally defective workspace.
5. Add only the surrounding journey page to central zero-violation axe coverage.

## Task 2: Extend journey preparation references

### Files

- Modify: `src/content.config.ts`
- Modify: `src/pages/journeys/[...id].astro`
- Modify: `src/layouts/JourneyLayout.astro`
- Modify: `src/components/journey/JourneyOverview.astro`

### Work

1. Add optional `learningPaths` references to Testing journey entries.
2. Resolve path references at build time into title, summary, level, duration, and URL.
3. Extend Optional preparation to distinguish Learning paths from Exercises.
4. Apply the solution warning only when optional Exercises exist.
5. Keep entries without either preparation type free of empty presentation.

## Task 3: Publish the second journey

### Files

- Add: `src/content/testing-journeys/reviewing-a-community-conference-programme.md`

### Work

1. Add intermediate metadata, order 20, 75-minute duration, scenario, role, six objectives, five methods, and the recommended Learning path.
2. Add the exact six task-led stages and method associations.
3. Add five static deliverables.
4. Write pacing, workspace, evidence, support-variation, and publication guidance without a solution or finding count.

## Task 4: Build the standalone conference workspace

### Files

- Add: `src/components/journey/workspaces/CommunityConferenceProgramme.astro`
- Add: `src/pages/journey-workspaces/community-conference-programme.astro`
- Add local workspace assets only if needed.

### Work

1. Build realistic conference introduction, programme, session, image, icon, language, and modal content.
2. Seed exactly the eight approved findings without diagnostic markup or comments.
3. Preserve all approved passing comparisons.
4. Use native `dialog` for containment and inertness; add only workspace-local modal scripting.
5. Apply saved Lab theme and a single same-tab return link.
6. Ensure non-defective controls have visible hover/focus states and layouts do not introduce unrelated overflow.

## Task 5: Focused verification

1. Run Astro diagnostics and production build.
2. Restart the production preview.
3. Run focused journey, workspace, content-architecture, and axe tests.
4. Correct only defects within the approved scope.
5. Confirm the automated workspace violation set remains exact.

## Task 6: Final verification

1. Run the complete Playwright suite.
2. Visually review journey and workspace in desktop/mobile and light/dark modes.
3. Run `git diff --check`.
4. Confirm no referenced method, demonstration, Exercise, exercise fixture, or first-journey workspace changed.

```sh
npx astro check
npm run build
npx playwright test tests/testing-journey.spec.js tests/community-conference-workspace.spec.js tests/content-architecture.spec.js tests/axe-core.spec.js --workers 1
npx playwright test --workers 1
git diff --check
```

# Accessibility Testing Lab architecture design

## Purpose

Redesign the existing Astro accessibility workshop as Accessibility Testing Lab at `https://testing.a11y.ing/`. The new site is a hands-on environment for learning and practising accessibility testing.

This is a new information architecture. Existing workshop content may be selectively adapted later, but this work does not migrate, rewrite, or delete it. The new architecture does not contain a Workshops section.

## Information architecture

The four primary content areas have distinct purposes:

- **Learning paths** teach skills through ordered, self-guided sequences.
- **Testing methods** are reusable reference pages for individual testing techniques.
- **Exercises** are deliberately created examples visitors investigate to practise testing.
- **Testing journeys** are realistic scenarios that combine methods and apply previously learned skills.

The primary navigation contains, in this order:

1. Learning paths
2. Testing methods
3. Exercises
4. Testing journeys

The site title and logo link to Home. Home is not repeated in the primary navigation. “About this Lab” appears in the footer rather than the primary navigation.

The initial public routes are:

```text
/
/learn/
/methods/
/exercises/
/journeys/
/about/
```

Section index pages are regular Astro pages. Collection-backed detail pages use catch-all routes so content can be nested later without changing the routing architecture:

```text
src/pages/
├── index.astro
├── learn/
│   ├── index.astro
│   └── [...id].astro
├── methods/
│   ├── index.astro
│   └── [...id].astro
├── exercises/
│   ├── index.astro
│   └── [...id].astro
├── journeys/
│   ├── index.astro
│   └── [...id].astro
└── about/
    └── index.astro
```

The site uses trailing slashes consistently. Collection entry IDs are the canonical URL path segments; a separate slug field is added only if a future entry needs to override its ID.

## Reuse and retirement

### Reusable foundations

The implementation should retain and refine these foundations:

- The document shell, metadata foundation, header, main landmark, and footer composition from `src/layouts/Layout.astro`.
- `SkipLink.astro` and its visible-on-focus behavior.
- `ThemeToggle.astro`, after correcting its copy and making its script tolerant of a missing toggle.
- The responsive menu mechanics and normalized current-path handling from `MainNavigation.astro`.
- The footer structure and back-to-top behavior from `Footer.astro`.
- Tailwind design tokens, readable font choices, dark theme, focus treatments, buttons, code styles, and general prose styles.
- Astro Icon, Astro asset handling, Playwright, and axe-core.

Reuse refers to behavior and styling foundations, not necessarily keeping the current files unchanged. `Layout.astro` presently combines layout, metadata, general design-system styles, workshop fixture styles, and menu behavior. The new implementation should separate those responsibilities.

### Workshop-specific architecture to retire

The following should not shape the new site and can be removed in a later migration step:

- Top-level topic routes such as `/testing-visuals`, `/testing-zooming`, `/testing-keyboard-accessibility`, `/testing-automated-tools`, and `/testing-screen-readers`.
- `/examples/`, its screen-reader subnavigation, `/answers/`, `/resources/`, and `/aria-tests/` as current architectural concepts.
- The existing primary-navigation data, including its explicit Home item.
- `ScreenReaderExamplesNav.astro` and other manually maintained content-specific navigation.
- `CardOk`, `CardNotOk`, `FormWithErrors`, `MenuComponent`, and `MenuComponentFixed` as general site components. They may later supply ideas or code for isolated exercise fixtures.
- Workshop/demo-only global CSS such as `.color-contrast`, `.bad-practice`, CSS-content test classes, and demo-menu rules.
- The unused `blogs` layout slot.
- Old workshop names and URLs in the homepage, README, package metadata, manifest, tests, Astro configuration, and structured metadata.
- Sitemap locale configuration unless localized routes become a real requirement.

No existing content or component is deleted as part of establishing the initial architecture.

## Shared site structure

The shared shell should be decomposed into components with focused responsibilities:

```text
BaseLayout
├── DocumentHead
├── SiteHeader
│   ├── SkipLink
│   ├── BrandLink
│   ├── ThemeToggle
│   └── MainNavigation
├── main
└── SiteFooter
    ├── About this Lab
    └── Related sites
```

`MainNavigation` derives the current path from `Astro.url.pathname`; pages do not pass a manually maintained `currentUrl`. Exact section-index matches receive `aria-current="page"`. On detail pages, the parent section may have a visual active state, but it must not misuse `aria-current` to claim the parent link is the current page.

The layout owns the skip target on the main content container. Individual content authors do not add a repeated `id="skip-target"` to headings.

Recommended content presentation boundaries are:

```text
src/layouts/
├── BaseLayout.astro
├── ContentLayout.astro
├── LearningPathLayout.astro
├── MethodLayout.astro
├── ExerciseLayout.astro
└── JourneyLayout.astro

src/components/
├── content/
├── exercise/
├── navigation/
└── site/
```

## Content collections

Create four build-time content collections in `src/content.config.ts`, backed by Markdown files under:

```text
src/content/
├── learning-paths/
├── testing-methods/
├── exercises/
└── testing-journeys/
```

All collections share these fields:

```ts
{
  title: z.string(),
  summary: z.string(),
  description: z.string(),
  status: z.enum(['draft', 'published']).default('draft'),
  order: z.number().int().nonnegative().default(0),
  topics: z.array(z.string()).default([]),
  prerequisites: z.array(z.string()).default([]),
  updatedAt: z.coerce.date().optional(),
}
```

`summary` is visible listing-card copy. `description` is concise search and social metadata. Draft entries are omitted from production listings and `getStaticPaths()` output.

### Learning paths

```ts
{
  level: z.enum(['beginner', 'intermediate', 'advanced']),
  estimatedMinutes: z.number().int().positive(),
  outcomes: z.array(z.string()).min(1),
  steps: z.array(z.discriminatedUnion('type', [
    z.object({ type: z.literal('method'), entry: reference('testingMethods') }),
    z.object({ type: z.literal('exercise'), entry: reference('exercises') }),
    z.object({ type: z.literal('journey'), entry: reference('testingJourneys') }),
    z.object({
      type: z.literal('content'),
      title: z.string(),
      anchor: z.string(),
    }),
  ])).min(1),
}
```

The Markdown body supplies the introduction and inline teaching material. The `steps` array is the authoritative progression order. The common `order` field only sorts learning paths on their section index.

### Testing methods

```ts
{
  skillLevel: z.enum(['beginner', 'intermediate', 'advanced']),
  estimatedMinutes: z.number().int().positive().optional(),
  tools: z.array(z.string()).default([]),
  platforms: z.array(z.string()).default([]),
  outcomes: z.array(z.string()).min(1),
  relatedMethods: z.array(reference('testingMethods')).default([]),
  relatedExercises: z.array(reference('exercises')).default([]),
}
```

Method bodies follow a stable editorial template: purpose, when to use the method, prerequisites or tools, procedure, observations, result interpretation, limitations, and related practice.

### Exercises

```ts
{
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  estimatedMinutes: z.number().int().positive(),
  exerciseType: z.enum([
    'find-issues',
    'perform-test',
    'compare',
    'fix-implementation',
  ]),
  fixture: z.string(),
  objectives: z.array(z.string()).min(1),
  methods: z.array(reference('testingMethods')).min(1),
  hints: z.array(z.string()).default([]),
  expectedFindings: z.number().int().nonnegative().optional(),
  solution: z.object({
    summary: z.string(),
    findings: z.array(z.object({
      title: z.string(),
      explanation: z.string(),
      method: reference('testingMethods').optional(),
    })),
  }).optional(),
}
```

`fixture` is a stable registry key such as `keyboard/basic-form`, not a component path. Static-site solutions can be visually disclosed on demand but cannot be treated as secret or access-controlled.

### Testing journeys

```ts
{
  difficulty: z.enum(['beginner', 'intermediate', 'advanced']),
  estimatedMinutes: z.number().int().positive(),
  scenario: z.string(),
  role: z.string().optional(),
  objectives: z.array(z.string()).min(1),
  methods: z.array(reference('testingMethods')).min(2),
  exercises: z.array(reference('exercises')).default([]),
  stages: z.array(z.object({
    title: z.string(),
    task: z.string(),
    methods: z.array(reference('testingMethods')).default([]),
  })).min(1),
  deliverables: z.array(z.string()).default([]),
}
```

Journeys reference methods and exercises instead of reproducing them. Their unique content is the scenario, sequence, prioritization, and reporting task.

## Exercise architecture

An exercise page separates trustworthy instructions from intentionally flawed practice material:

```text
ExerciseLayout
├── ExerciseHeader
│   ├── difficulty
│   ├── estimated time
│   └── associated methods
├── ExerciseObjectives
├── ExerciseBrief
├── ExerciseWorkspace
│   ├── ExerciseFixture
│   └── ResetControl, when stateful
├── ExerciseTaskList
├── ExerciseHints
├── ExerciseSolution
└── RelatedContent
```

Reusable components should include `ExerciseMeta`, `ExerciseObjectives`, `ExerciseInstructions`, `ExerciseWorkspace`, `ExerciseFixture`, `ExerciseHints`, `ExerciseSolution`, `RelatedMethods`, `ContentCard`, and `ContentListing`.

A typed fixture registry maps the schema's stable keys to implementations. Content files do not import fixture components or encode filesystem locations.

Small, component-level examples can render inline in `ExerciseWorkspace`. Exercises that test document-level behavior use an iframe backed by a fixture-only route such as `/exercise-fixtures/[...id]/`. Document-level behavior includes page titles, document language, landmarks, whole-page reflow or zoom, modal focus containment, and full-page automated scans.

Fixtures must not own or disrupt the Lab's header, primary navigation, footer, skip link, or page heading. Each intentional violation is recorded in fixture metadata so tests and maintainers can distinguish designed defects from regressions.

## Data flow

At build time, Astro validates collection frontmatter and resolves collection references. Section index pages retrieve published entries and sort them by `order`, then title as a stable secondary key. Detail routes retrieve the entry named by the catch-all ID, render its collection-specific layout, and resolve only the references required for that page.

Related-content rendering must not recursively expand referenced entries. Cards receive a small normalized view model containing the entry URL, title, summary, and relevant metadata. This prevents circular references from causing recursive output and keeps content components independent of collection internals.

Missing or invalid references fail validation or the production build. Unknown fixture keys fail the build through the typed registry or produce an explicit authoring error in development; they must not silently render an empty workspace.

## Metadata and configuration

- Set Astro's `site` to `https://testing.a11y.ing/`.
- Use Accessibility Testing Lab as the site name in titles, Open Graph data, structured data, the manifest, package metadata, and README.
- Generate canonical URLs from `Astro.site` and `Astro.url` rather than hard-coded hostnames.
- Keep English-only, unprefixed routes initially. Remove the unused sitemap locale declaration until localization is designed.
- Preserve the generated sitemap integration.
- Redirects from old workshop URLs are a deployment concern and do not preserve old routes, navigation, or content architecture inside the application.

## Testing strategy

The initial architecture should add coverage for:

- All six section and utility routes returning successfully.
- The primary navigation's exact labels, order, URLs, and current-page behavior.
- The brand link returning to Home and “About this Lab” appearing in footer navigation only.
- Production exclusion of drafts.
- Collection schema validation and successful rendering of each content type.
- Stable nested ID routing and 404 behavior for unknown entries.
- Resolution of cross-collection references.
- Missing fixture-key failure behavior.
- Keyboard operation of the mobile menu, theme toggle, back-to-top control, hints, and solutions.
- Automated accessibility scans of the global shell, section indexes, and ordinary content.

Deliberately inaccessible fixtures cannot be covered by a blanket “zero axe violations” assertion. Tests should scan the surrounding exercise interface separately. Fixture tests should either exclude the intentional region or assert a documented set of known violations. Unexpected additions or disappearance of expected violations should fail tests, because either can signal that an exercise changed unintentionally.

## Delivery sequence

1. Establish shared site configuration, shell components, primary navigation, footer navigation, and the six requested landing routes.
2. Add the four collection definitions and dynamic route templates with no migration of workshop content.
3. Add reusable listing, content, relationship, and exercise-shell components.
4. Verify the empty collection architecture and route templates without creating or migrating individual content entries.
5. Expand automated tests for the new shell, routes, collections, and fixture boundary.
6. In a separately reviewed phase, decide which existing workshop material to adapt, replace, redirect, or remove.

## Explicit non-goals

- Migrating or rewriting existing workshop content.
- Deleting old pages or components during the initial architecture work.
- Preserving old workshop navigation or URL structure for application-level backward compatibility.
- Creating a Workshops section.
- Designing localization, authentication, progress persistence, grading, or protected solutions.

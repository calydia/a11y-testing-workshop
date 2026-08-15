# Shell SVG sizing refinement design

## Goal

Reduce the header and footer logos after the native SVG migration while verifying that every other shell SVG retains an appropriate, intentional size.

## Current measurements

| SVG | Mobile | Desktop |
| --- | ---: | ---: |
| Header logo | 96px | 128px |
| Footer logo | 96px | 112px |
| Menu icon | 32px | Hidden with the desktop menu toggle |
| Theme icon | 32px | 32px |
| Back to top icon | 48px | 48px |

The native SVG imports respect the assigned CSS. The regression is therefore a visual scale preference for the two logos, not uncontrolled intrinsic sizing.

## Design

- Set both header and footer logos to `80px` wide below the medium breakpoint.
- Set both header and footer logos to `96px` wide from the medium breakpoint.
- Preserve automatic height so the original logo aspect ratio remains intact.
- Keep the menu and theme icons at `32px`.
- Keep the Back to top icon at `48px`.
- Preserve current light/dark visibility, control labels, decorative `aria-hidden` treatment, layout, and interaction behavior.

The shared logo rules remain in `BaseLayout.astro`; do not add competing size classes to individual logo instances.

## Verification

- Add exact computed-width checks for visible header and footer logos at mobile and desktop viewports.
- Add exact computed-size checks for the visible menu, theme, and Back to top icons.
- Preserve the existing inline/decorative SVG and accessible-name assertions.
- Run focused shell tests, axe checks, Astro diagnostics, and the production build.

## Out of scope

- Changing the logo artwork or aspect ratio.
- Changing header/footer structure or spacing beyond the smaller logo footprint.
- Reducing interactive control targets or changing their icons.
- Revisiting the native SVG dependency migration.

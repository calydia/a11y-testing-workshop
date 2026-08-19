# Shared social-image metadata implementation plan

## Goal

Adopt the shared 1200 × 630 A11ying with Sanna social image across four Astro sites while preserving authored blog images in `sanna`.

## Task 1: Add focused metadata tests

### Repositories

- `a11y-testing-astro`
- `sanna`
- `a11ying-front`
- `wcag-front`

### Work

1. Assert each shared layout renders an absolute `/social-media-share.jpg` URL on its production origin.
2. Assert Open Graph width, height, JPEG type, and shared image alternative.
3. Assert X/Twitter uses `summary_large_image`, the same image URL, and the same alternative.
4. In `sanna`, assert ordinary pages and image-less blog pages use the shared fallback.
5. In `sanna`, assert an article-specific image overrides the fallback without receiving the generic brand-image alternative.
6. Preserve existing canonical, locale, alternate-language, structured-data, and indexing assertions.

## Task 2: Implement the Testing Lab metadata

### Files

- Modify: `src/components/site/DocumentHead.astro`
- Modify: the focused metadata test

### Work

1. Build the absolute image URL from `Astro.site`.
2. Add the approved Open Graph and X/Twitter declarations.
3. Keep `noindex` workspace documents outside the shared head unchanged.

## Task 3: Implement personal-site and blog fallback metadata

### Files

- Modify: `sanna/src/layouts/SiteLayout.astro`
- Modify: `sanna/src/blog/layouts/BlogLayout.astro`
- Modify: focused tests in `sanna`

### Work

1. Add optional social-image props to `SiteLayout`, defaulting to the shared brand image and alternative.
2. Render all approved metadata once in `SiteLayout`.
3. Let `BlogLayout` select an authored image or the shared fallback and pass it to `SiteLayout`.
4. Emit the generic alternative only for the shared brand image.
5. Remove the duplicate blog-slot `og:image` declaration.

## Task 4: Implement the bilingual site metadata

### Files

- Modify: `a11ying-front/src/layouts/Layout.astro`
- Modify: `wcag-front/src/layouts/Layout.astro`
- Modify: focused tests in both repositories

### Work

1. Replace the former `some-share.jpeg` URL with `/social-media-share.jpg`.
2. Add the approved image type, alternative, and X/Twitter declarations.
3. Preserve localized Open Graph and alternate-language metadata.

## Task 5: Verify all four repositories

### Work

1. Confirm every image exists, is JPEG, is 1200 × 630, and stays within the agreed file-size target.
2. Run focused metadata tests in all four repositories.
3. Run Astro diagnostics and production builds.
4. Run each repository's broader required quality gate where its configured content services are available.
5. Run `git diff --check` and inspect each repository independently for unrelated changes.

## Out of scope

- Editing or generating the supplied image.
- Additional image sizes.
- New per-page artwork.
- Migrating blog image alternatives.
- Visible layout changes.

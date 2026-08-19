# Shared social-image metadata design

Date: 19 August 2026

## Goal

Give all four A11ying with Sanna websites consistent social-sharing previews using one shared brand image design while preserving article-specific sharing images on the personal blog.

## Repositories and production origins

| Repository | Production origin |
| --- | --- |
| `a11y-testing-astro` | `https://testing.a11y.ing/` |
| `sanna` | `https://sanna.a11y.ing/` |
| `a11ying-front` | `https://a11y.ing/` |
| `wcag-front` | `https://wcag.a11y.ing/` |

## Image contract

The user will add the same brand artwork to each repository as:

`public/social-media-share.jpg`

The image will be:

- 1200 × 630 pixels;
- JPEG encoded in sRGB;
- designed with important text and logos inside safe edge margins;
- compressed to approximately 300 KB or less where practical.

One 1.91:1 image is sufficient for Open Graph and large X/Twitter cards. No additional sizes or generated variants are required.

## Metadata contract

Each site's ordinary shared document head will emit:

- an absolute `og:image` URL using that site's configured production origin;
- `og:image:width` set to `1200`;
- `og:image:height` set to `630`;
- `og:image:type` set to `image/jpeg`;
- `og:image:alt` set to `A11ying with Sanna` for the shared brand image;
- `twitter:card` set to `summary_large_image`;
- `twitter:image` using the same absolute image URL;
- `twitter:image:alt` matching the Open Graph image alternative.

Existing Open Graph titles, descriptions, locales, canonical URLs, alternate-language metadata, structured data, and indexing behavior remain unchanged.

The implementation will derive image URLs from each project's existing site origin or `Astro.site`; it will not hard-code one domain across repositories.

## Personal blog fallback

The `sanna` repository has two metadata layers:

- `SiteLayout` accepts optional social-image and social-image-alternative props, defaulting to the shared brand image and its approved alternative.
- `BlogLayout` passes an individual article image through those props when one exists.

Blog posts with an authored `mainImage` continue to use that image for `og:image` and `twitter:image`. Blog pages or posts without an authored image use `/social-media-share.jpeg`.

The migrated blog model does not expose alternative text for article-specific social images. The implementation will therefore emit the shared `A11ying with Sanna` alternative only when the brand fallback is used; it will not invent or reuse an inaccurate description for authored article images.

`SiteLayout` will remain the single place that renders image metadata, preventing conflicting duplicate declarations. `BlogLayout` will select the image and pass it into that shared renderer.

## Existing site images

The user has replaced the current `some-share.jpeg` files in `a11ying-front` and `wcag-front` with the new shared image. The metadata change will adopt that replacement without restoring the superseded files.

The existing profile and article images in `sanna` remain unchanged.

## Verification

Focused tests in each repository will verify the relevant shared layout output:

- the absolute brand-image URL uses the correct origin and filename;
- the 1200 × 630 dimensions and JPEG type are declared;
- Open Graph and X/Twitter large-card metadata agree;
- the shared brand image has the approved alternative;
- `sanna` ordinary pages and image-less blog pages use the fallback;
- `sanna` article pages with an authored image keep their article image and do not receive the generic brand-image alternative;
- existing locale, canonical, and indexing metadata remain intact.

Run each repository's focused checks and production build. Run the broader quality gates required by each repository's local instructions where the available test environment permits it. The image files themselves may be absent during implementation because the user will supply them before release; metadata tests must not require the asset to exist yet.

## Out of scope

- Creating or editing the brand image.
- Generating multiple social-image sizes.
- Adding per-page social artwork outside the existing `sanna` blog behavior.
- Migrating blog image alternative text.
- Changing visible layouts or site branding.

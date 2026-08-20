# Cross-site footer links design

## Context

The A11ying and WCAG sites currently link from their localized footers to the accessibility category on the old standalone blog domain. The renewed blog will live under `sanna.a11y.ing`, and Accessibility Testing Lab is becoming another related site in the same ecosystem.

## Scope

Update footer navigation in these projects:

- `a11ying-front`
- `wcag-front`
- `sanna` (the English blog footer)

The Testing Lab footer itself is outside this change.

## Blog link

On A11ying and WCAG, replace the old blog destination with:

`https://sanna.a11y.ing/blog/accessibility/`

Use these localized labels:

- English: “Accessibility blog”
- Finnish: “Saavutettavuusblogi”

The existing external-link behavior and styling remain unchanged.

## Accessibility Testing Lab link

Add a footer link to:

`https://testing.a11y.ing/`

On English pages and in Sanna's English blog footer, use the official name “Accessibility Testing Lab”.

On Finnish pages, render the official name in a `lang="en"` span and add a visible Finnish note after the link: “(englanniksi)”. Add `hreflang="en"` to the link. The note is outside the English-language span so assistive technology can pronounce each language appropriately.

The resulting Finnish presentation is:

`Accessibility Testing Lab (englanniksi)`

## Architecture

For A11ying and WCAG, add localized translation keys for the Testing Lab label and the Finnish language note, then consume them from the existing shared footer component. Do not duplicate separate Finnish and English footer templates.

For Sanna, add the Testing Lab entry to the existing `A11ying sites` list in `BlogFooter.astro`. The blog itself is English-only, so it does not need a Finnish availability note or language attributes.

## Verification

- Confirm both localized A11ying and WCAG footers use the new blog URL and localized label.
- Confirm the Testing Lab URL and accessible link name on English footers.
- Confirm Finnish pages expose `lang="en"`, `hreflang="en"`, and the visible “(englanniksi)” note.
- Confirm Sanna's blog footer includes the Testing Lab link.
- Run each affected project's relevant footer tests and production build.


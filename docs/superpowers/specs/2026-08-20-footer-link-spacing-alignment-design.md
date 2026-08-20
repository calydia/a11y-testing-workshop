# Footer link spacing alignment design

## Context

Testing Lab related-site links carry the same `py-2` utility classes as the A11ying and WCAG footers. However, Testing Lab also applies `my-4` globally to unordered-list items. This adds `1rem` above and below every related-site item, creating visibly larger gaps than on the other sites.

## Decision

Add a scoped rule for each `<li>` in the `A11ying sites` footer navigation. This overrides the global list-item margins while retaining the existing `py-2` link padding:

```css
footer [aria-label="A11ying sites"] li {
  margin-block: 0;
}
```

A utility class is not sufficient here because the project's unlayered global list rule takes precedence over Tailwind utilities in the cascade.

The resulting related-site entries have zero vertical item margins and `0.5rem` vertical link padding, matching the A11ying and WCAG related-site lists.

## Scope

Only related-site list items change. Leave the left `About the Lab` group unchanged because it serves the informational-navigation role that uses more generous spacing on the other sites. Do not change the global unordered-list rule because content lists rely on it.

## Verification

- Assert that a related-site list item has `0px` top and bottom margins.
- Assert that its link retains `8px` top and bottom padding.
- Retain the existing footer destination assertions.
- Run the shell browser tests and production build.

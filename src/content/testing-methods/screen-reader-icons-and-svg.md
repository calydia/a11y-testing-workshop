---
title: Testing icons and SVGs with a screen reader
summary: Determine whether meaningful graphics have useful names and decorative graphics remain silent.
description: Learn how to test meaningful, decorative, and CSS-generated icons and SVGs with a screen reader.
status: published
order: 20
topics: [screen readers, icons, SVG, accessible names]
prerequisites: [Basic use of one screen reader]
skillLevel: beginner
estimatedMinutes: 20
tools: [Screen reader, Web browser]
platforms: [Desktop]
outcomes:
  - Distinguish meaningful icons from decorative icons during testing.
  - Check the accessible names of inline SVG graphics.
  - Recognize duplicate, noisy, missing, and support-dependent announcements.
relatedExercises: [reviewing-icons-and-svgs-in-a-community-events-dashboard]
demonstration: screen-reader/icons-and-svg
interpretation:
  - A meaningful graphic needs an accessible name that communicates the same purpose as its visual presentation.
  - A decorative icon should normally add no separate announcement when adjacent text already conveys its meaning.
  - An icon inside a labelled control should not make the control's name repetitive or confusing.
limitations:
  - SVG and generated-content announcements vary across browser and screen-reader combinations.
  - A screen reader can reveal the accessible name but cannot determine whether that name accurately describes the visual meaning.
---

## What this method tests

This method checks whether icons and SVG graphics contribute the right information to the accessibility tree: a useful name when meaningful, and no unnecessary noise when decorative.

## What you need

Use a screen reader with a compatible browser. If possible, repeat uncertain results with another common browser or screen reader.

## How to perform the test

1. Navigate through graphics and controls containing icons.
2. Compare each announcement with the visible purpose of the graphic.
3. Confirm that meaningful standalone graphics have concise, accurate names.
4. Confirm that decorative graphics are skipped rather than announced separately.
5. Listen for duplicate names when an icon appears beside visible control text.
6. Test CSS-generated content in the supported combinations relevant to the product.

## What to observe

Listen for missing meaning, irrelevant filenames, repeated words, generic names such as “icon,” and decorative symbols that interrupt otherwise clear content.

## Practise this method

Use [Reviewing icons and SVGs in a community events dashboard](/exercises/reviewing-icons-and-svgs-in-a-community-events-dashboard/) to apply this procedure to a deliberately created page.

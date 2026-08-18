export const contentCategories = [
  {
    id: 'foundations',
    label: 'Foundations',
    description: 'Broad techniques that commonly form the beginning of an accessibility review.',
  },
  {
    id: 'display-and-adaptation',
    label: 'Display and adaptation',
    description: 'Test how content responds to presentation settings, input conditions, and user preferences.',
  },
  {
    id: 'content-and-structure',
    label: 'Content and structure',
    description: 'Test whether information is represented and communicated accessibly.',
  },
  {
    id: 'interaction-and-tasks',
    label: 'Interaction and tasks',
    description: 'Test controls and workflows that users must operate or complete.',
  },
] as const;

export type ContentCategoryId = typeof contentCategories[number]['id'];
export type ContentCategory = typeof contentCategories[number];

export const contentCategoryIds = contentCategories.map(({ id }) => id) as [
  ContentCategoryId,
  ...ContentCategoryId[],
];

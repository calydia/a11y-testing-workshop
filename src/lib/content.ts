import type { CollectionEntry, CollectionKey } from 'astro:content';
import { getCollection } from 'astro:content';
import { contentCategories, type ContentCategoryId } from './content-categories';

const isPublished = (entry: { data: { status: 'draft' | 'published' } }) => (
  import.meta.env.DEV || entry.data.status === 'published'
);

export async function getVisibleEntries<C extends CollectionKey>(collection: C) {
  const entries = await getCollection(collection);

  return entries
    .filter(isPublished)
    .sort((first, second) => {
      const orderDifference = first.data.order - second.data.order;
      return orderDifference || first.data.title.localeCompare(second.data.title);
    }) as CollectionEntry<C>[];
}

export const contentUrl = (section: string, id: string) => `/${section}/${id}/`;

export interface SectionNavigationItem {
  href: string;
  label: string;
  category?: ContentCategoryId;
}

export function createSectionNavigationItems<C extends CollectionKey>(
  entries: CollectionEntry<C>[],
  section: string,
): SectionNavigationItem[] {
  return entries.map((entry) => ({
    href: contentUrl(section, entry.id),
    label: entry.data.title,
    category: (entry.data as { category?: ContentCategoryId }).category,
  }));
}

export function groupEntriesByCategory<C extends CollectionKey>(entries: CollectionEntry<C>[]) {
  return contentCategories
    .map((category) => ({
      category,
      entries: entries.filter((entry) => (
        (entry.data as { category?: ContentCategoryId }).category === category.id
      )),
    }))
    .filter(({ entries: categoryEntries }) => categoryEntries.length > 0);
}

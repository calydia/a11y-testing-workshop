import type { CollectionEntry, CollectionKey } from 'astro:content';
import { getCollection } from 'astro:content';

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
}

export function createSectionNavigationItems<C extends CollectionKey>(
  entries: CollectionEntry<C>[],
  section: string,
): SectionNavigationItem[] {
  return entries.map((entry) => ({
    href: contentUrl(section, entry.id),
    label: entry.data.title,
  }));
}

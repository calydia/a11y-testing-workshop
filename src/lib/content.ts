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

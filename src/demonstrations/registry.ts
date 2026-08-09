import type { AstroComponentFactory } from 'astro/runtime/server/index.js';
import IconsAndSvgDemo from '../components/demonstrations/screen-reader/IconsAndSvgDemo.astro';
import LanguageChangesDemo from '../components/demonstrations/screen-reader/LanguageChangesDemo.astro';
import ModalDialogsDemo from '../components/demonstrations/screen-reader/ModalDialogsDemo.astro';
import PageStructureAndLinksDemo from '../components/demonstrations/screen-reader/PageStructureAndLinksDemo.astro';

export const demonstrationRegistry = {
  'screen-reader/page-structure-and-links': PageStructureAndLinksDemo,
  'screen-reader/icons-and-svg': IconsAndSvgDemo,
  'screen-reader/language-changes': LanguageChangesDemo,
  'screen-reader/modal-dialogs': ModalDialogsDemo,
} satisfies Record<string, AstroComponentFactory>;

export type DemonstrationKey = keyof typeof demonstrationRegistry;

export function getDemonstration(key: DemonstrationKey): AstroComponentFactory {
  const demonstration = demonstrationRegistry[key];
  if (!demonstration) throw new Error(`Unknown method demonstration: ${key}`);
  return demonstration;
}

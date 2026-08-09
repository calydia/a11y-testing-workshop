import type { AstroComponentFactory } from 'astro/runtime/server/index.js';
import KeyboardPreferencesFormFixture from '../components/exercise/fixtures/KeyboardPreferencesFormFixture.astro';

export interface InlineFixture {
  kind: 'inline';
  component: AstroComponentFactory;
  intentionalViolations: string[];
}

export interface DocumentFixture {
  kind: 'document';
  component: AstroComponentFactory;
  title: string;
  intentionalViolations: string[];
}

export type ExerciseFixtureDefinition = InlineFixture | DocumentFixture;

export const fixtureRegistry: Record<string, ExerciseFixtureDefinition> = {
  'keyboard-preferences-form': {
    kind: 'document',
    component: KeyboardPreferencesFormFixture,
    title: 'Communication preferences form exercise',
    intentionalViolations: [
      'click-only-control-skipped',
      'custom-control-no-keyboard-activation',
      'missing-focus-indicator',
      'positive-tabindex-order',
    ],
  },
};

export function getFixture(key: string): ExerciseFixtureDefinition {
  const fixture = fixtureRegistry[key];
  if (!fixture) throw new Error(`Unknown exercise fixture: ${key}`);
  return fixture;
}

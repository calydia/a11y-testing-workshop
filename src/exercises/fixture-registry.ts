import type { AstroComponentFactory } from 'astro/runtime/server/index.js';

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

export const fixtureRegistry: Record<string, ExerciseFixtureDefinition> = {};

export function getFixture(key: string): ExerciseFixtureDefinition {
  const fixture = fixtureRegistry[key];
  if (!fixture) throw new Error(`Unknown exercise fixture: ${key}`);
  return fixture;
}

import type { AstroComponentFactory } from 'astro/runtime/server/index.js';
import KeyboardPreferencesFormFixture from '../components/exercise/fixtures/KeyboardPreferencesFormFixture.astro';
import VisualAccountDashboardFixture from '../components/exercise/fixtures/VisualAccountDashboardFixture.astro';
import ZoomAppointmentBookingFixture from '../components/exercise/fixtures/ZoomAppointmentBookingFixture.astro';
import AutomatedEventRegistrationFixture from '../components/exercise/fixtures/AutomatedEventRegistrationFixture.astro';
import ImageAlternativeTextFixture from '../components/exercise/fixtures/ImageAlternativeTextFixture.astro';

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
  'visual-account-dashboard': {
    kind: 'document',
    component: VisualAccountDashboardFixture,
    title: 'Account dashboard visual accessibility exercise',
    intentionalViolations: [
      'low-contrast-text',
      'color-only-status',
      'cramped-text',
      'weak-interaction-state',
    ],
  },
  'zoom-appointment-booking': {
    kind: 'document',
    component: ZoomAppointmentBookingFixture,
    title: 'Appointment booking zoom and reflow exercise',
    intentionalViolations: [
      'fixed-panel',
      'unbreakable-reference',
      'fixed-height-card',
      'fixed-action-bar',
    ],
  },
  'automated-event-registration': {
    kind: 'document',
    component: AutomatedEventRegistrationFixture,
    title: 'Event registration automated testing exercise',
    intentionalViolations: [
      'unlabelled-email',
      'unnamed-button',
      'low-contrast-helper',
      'pointer-only-session',
      'ambiguous-links',
    ],
  },
  'image-alternative-text': {
    kind: 'document',
    component: ImageAlternativeTextFixture,
    title: 'Community volunteering image alternative text exercise',
    intentionalViolations: [
      'vague-meaningful',
      'noisy-decorative',
      'linked-logo',
      'missing-alt',
    ],
  },
};

export function getFixture(key: string): ExerciseFixtureDefinition {
  const fixture = fixtureRegistry[key];
  if (!fixture) throw new Error(`Unknown exercise fixture: ${key}`);
  return fixture;
}

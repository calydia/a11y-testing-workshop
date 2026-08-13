import type { AstroComponentFactory } from 'astro/runtime/server/index.js';
import KeyboardPreferencesFormFixture from '../components/exercise/fixtures/KeyboardPreferencesFormFixture.astro';
import VisualAccountDashboardFixture from '../components/exercise/fixtures/VisualAccountDashboardFixture.astro';
import ZoomAppointmentBookingFixture from '../components/exercise/fixtures/ZoomAppointmentBookingFixture.astro';
import AutomatedEventRegistrationFixture from '../components/exercise/fixtures/AutomatedEventRegistrationFixture.astro';
import ImageAlternativeTextFixture from '../components/exercise/fixtures/ImageAlternativeTextFixture.astro';
import CourseRegistrationFixture from '../components/exercise/fixtures/CourseRegistrationFixture.astro';
import CommunityResourcesDirectoryFixture from '../components/exercise/fixtures/CommunityResourcesDirectoryFixture.astro';
import CommunityEventsDashboardFixture from '../components/exercise/fixtures/CommunityEventsDashboardFixture.astro';

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
  'course-registration': {
    kind: 'document',
    component: CourseRegistrationFixture,
    title: 'Community course registration form exercise',
    intentionalViolations: [
      'disconnected-label',
      'disconnected-format-instruction',
      'unnamed-format-group',
      'invalid-focus-unchanged',
      'unassociated-inline-errors',
      'unannounced-success',
    ],
  },
  'community-resources-directory': {
    kind: 'document',
    component: CommunityResourcesDirectoryFixture,
    title: 'Community resources directory structure and links exercise',
    intentionalViolations: [
      'skipped-heading-level',
      'visual-title-without-heading-semantics',
      'repeated-read-more-links',
      'generic-click-here-link',
      'duplicate-service-details-links',
    ],
  },
  'community-events-dashboard': {
    kind: 'document',
    component: CommunityEventsDashboardFixture,
    title: 'Community events dashboard icons and SVGs exercise',
    intentionalViolations: [
      'unnamed-availability-graphic',
      'generic-online-graphic-name',
      'noisy-save-icon',
      'unnamed-remove-button',
      'duplicated-download-name',
    ],
  },
};

export function getFixture(key: string): ExerciseFixtureDefinition {
  const fixture = fixtureRegistry[key];
  if (!fixture) throw new Error(`Unknown exercise fixture: ${key}`);
  return fixture;
}

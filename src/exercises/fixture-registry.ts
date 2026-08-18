import type { AstroComponentFactory } from 'astro/runtime/server/index.js';
import KeyboardPreferencesFormFixture from '../components/exercise/fixtures/KeyboardPreferencesFormFixture.astro';
import VisualAccountDashboardFixture from '../components/exercise/fixtures/VisualAccountDashboardFixture.astro';
import ZoomAppointmentBookingFixture from '../components/exercise/fixtures/ZoomAppointmentBookingFixture.astro';
import AutomatedEventRegistrationFixture from '../components/exercise/fixtures/AutomatedEventRegistrationFixture.astro';
import ImageAlternativeTextFixture from '../components/exercise/fixtures/ImageAlternativeTextFixture.astro';
import CourseRegistrationFixture from '../components/exercise/fixtures/CourseRegistrationFixture.astro';
import CommunityResourcesDirectoryFixture from '../components/exercise/fixtures/CommunityResourcesDirectoryFixture.astro';
import CommunityEventsDashboardFixture from '../components/exercise/fixtures/CommunityEventsDashboardFixture.astro';
import CommunityLibraryNoticeboardFixture from '../components/exercise/fixtures/CommunityLibraryNoticeboardFixture.astro';
import AccountSettingsDialogsFixture from '../components/exercise/fixtures/AccountSettingsDialogsFixture.astro';
import CommunityEventsFinderFixture from '../components/exercise/fixtures/CommunityEventsFinderFixture.astro';
import CommunityCourseTimetableFixture from '../components/exercise/fixtures/CommunityCourseTimetableFixture.astro';
import CommunityServicesTextSpacingFixture from '../components/exercise/fixtures/CommunityServicesTextSpacingFixture.astro';
import PublicTransportJourneyPlannerFixture from '../components/exercise/fixtures/PublicTransportJourneyPlannerFixture.astro';
import ParcelTrackingMotionFixture from '../components/exercise/fixtures/ParcelTrackingMotionFixture.astro';
import CommunityFestivalTouchFixture from '../components/exercise/fixtures/CommunityFestivalTouchFixture.astro';
import CommunityAnnouncementMediaFixture from '../components/exercise/fixtures/CommunityAnnouncementMediaFixture.astro';
import CommunitySupportSessionTimeoutFixture from '../components/exercise/fixtures/CommunitySupportSessionTimeoutFixture.astro';

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
  'community-library-noticeboard': {
    kind: 'document',
    component: CommunityLibraryNoticeboardFixture,
    title: 'Community library language changes exercise',
    intentionalViolations: [
      'missing-finnish-language',
      'swedish-marked-finnish',
      'swedish-link-marked-english',
      'finnish-scope-includes-english',
      'invalid-swedish-language-value',
    ],
  },
  'account-settings-dialogs': {
    kind: 'document',
    component: AccountSettingsDialogsFixture,
    title: 'Account settings modal dialogs exercise',
    intentionalViolations: [
      'unnamed-custom-dialog',
      'initial-focus-unchanged',
      'focus-not-contained',
      'background-remains-interactive',
      'escape-not-supported',
      'focus-not-restored',
    ],
  },
  'community-events-finder': {
    kind: 'document',
    component: CommunityEventsFinderFixture,
    title: 'Community events finder controls exercise',
    intentionalViolations: [
      'stale-disclosure-state',
      'navigation-exposed-as-button',
      'stale-switch-state',
      'visible-label-name-conflict',
      'unannounced-filter-results',
    ],
  },
  'community-course-timetable': {
    kind: 'document',
    component: CommunityCourseTimetableFixture,
    title: 'Community course timetable screen-reader exercise',
    intentionalViolations: [
      'missing-table-name',
      'weekday-cells-not-headers',
      'time-cells-not-headers',
      'incorrect-time-header-scope',
      'ambiguous-empty-cells',
    ],
  },
  'community-services-text-spacing': {
    kind: 'document',
    component: CommunityServicesTextSpacingFixture,
    title: 'Community services text-spacing exercise',
    intentionalViolations: [
      'fixed-height-introduction',
      'overlapping-service-card',
      'truncated-navigation-label',
      'clamped-important-notice',
      'clipped-contact-label',
      'resistant-urgent-support-spacing',
    ],
  },
  'public-transport-journey-planner': {
    kind: 'document',
    component: PublicTransportJourneyPlannerFixture,
    title: 'Public transport journey planner forced-colors exercise',
    intentionalViolations: [
      'lost-travel-mode-selection',
      'missing-interchange-icon',
      'missing-journey-field-boundaries',
      'missing-route-action-focus',
      'collapsed-route-colors',
    ],
  },
  'parcel-tracking-motion': {
    kind: 'document',
    component: ParcelTrackingMotionFixture,
    title: 'Parcel tracking motion preferences exercise',
    intentionalViolations: [
      'uncontrolled-route-motion',
      'uncontrolled-updates-motion',
      'unreduced-details-transition',
      'unreduced-scroll-motion',
      'unreduced-confirmation-motion',
    ],
  },
  'community-festival-touch': {
    kind: 'document',
    component: CommunityFestivalTouchFixture,
    title: 'Community festival mobile touch exercise',
    intentionalViolations: [
      'undersized-map-control-cluster',
      'restricted-mobile-landscape',
      'pinch-only-map-zoom',
      'swipe-only-schedule',
      'down-event-session-removal',
    ],
  },
  'community-announcement-media': {
    kind: 'document',
    component: CommunityAnnouncementMediaFixture,
    title: 'Community announcement media exercise',
    intentionalViolations: [
      'omitted-caption-phrase',
      'missing-caption-sound-identification',
      'mistimed-caption-cue',
      'incomplete-transcript',
      'undescribed-visual-information',
    ],
  },
  'community-support-session-timeout': {
    kind: 'document',
    component: CommunitySupportSessionTimeoutFixture,
    title: 'Community support session-timeout exercise',
    intentionalViolations: [
      'late-warning',
      'excessive-countdown-announcements',
      'pointer-only-extension',
      'unrelated-focus-restoration',
      'discarded-entered-information',
      'lost-interrupted-position',
    ],
  },
};

export function getFixture(key: string): ExerciseFixtureDefinition {
  const fixture = fixtureRegistry[key];
  if (!fixture) throw new Error(`Unknown exercise fixture: ${key}`);
  return fixture;
}

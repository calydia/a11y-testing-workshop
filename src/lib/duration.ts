export function formatEstimatedDuration(estimatedMinutes: number, includeAbout = false) {
  const wholeHours = Math.floor(estimatedMinutes / 60);
  const minutes = estimatedMinutes % 60;
  const roundsToNextHour = wholeHours > 0 && minutes >= 55;
  const hours = roundsToNextHour ? wholeHours + 1 : wholeHours;
  const displayedMinutes = roundsToNextHour ? 0 : minutes;

  if (hours === 0) {
    return `${includeAbout ? 'About ' : ''}${minutes} minutes`;
  }

  return `${includeAbout ? 'About ' : ''}${hours} ${hours === 1 ? 'hour' : 'hours'}${displayedMinutes ? ` ${displayedMinutes} minutes` : ''}`;
}

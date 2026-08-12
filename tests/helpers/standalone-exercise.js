import { expect } from '@playwright/test';

export const primaryGuidance = 'The exercise opens on a separate page. Return to this page whenever you need a hint, or when you are ready to continue and review the solution.';
export const optionalGuidance = 'You can open the exercise in a new tab if you want to keep these instructions and hints available.';

export async function expectStandaloneExercise(page, request, { exercisePath, fixturePath, fixtureTitle }) {
  await page.goto(exercisePath);
  const workspace = page.getByRole('region', { name: 'Exercise workspace' });
  await expect(workspace.getByRole('heading', { level: 3, name: fixtureTitle })).toBeVisible();
  const start = workspace.getByRole('link', { name: 'Start exercise' });
  await expect(start).toHaveAttribute('href', fixturePath);
  await expect(start).not.toHaveAttribute('target');
  await expect(workspace.getByText(primaryGuidance, { exact: true })).toBeVisible();
  await expect(workspace.getByText(optionalGuidance, { exact: true })).toBeVisible();
  await expect(workspace.locator('iframe')).toHaveCount(0);
  expect((await request.get(fixturePath)).ok()).toBe(true);

  await page.goto(fixturePath);
  const returnLink = page.getByRole('link', { name: 'Return to the exercise' });
  await expect(returnLink).toHaveCount(1);
  await expect(returnLink).toHaveAttribute('href', exercisePath);
}

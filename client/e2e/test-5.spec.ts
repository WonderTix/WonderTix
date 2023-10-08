import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('about:blank');
  await page.goto('chrome-error://chromewebdata/');
  await page.goto('https://localhost:3000/');
  await page.getByRole('button', { name: 'See Showings' }).first().click();
});
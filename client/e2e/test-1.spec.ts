import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://localhost:3000/ticketing/doorlist');
  await page.getByLabel('Choose Event').selectOption('32');
  await page.getByLabel('Choose Time').selectOption('372');
});
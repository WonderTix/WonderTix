import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://localhost:3000/');
  await page.getByRole('button', { name: 'See Showings' }).first().click();
  await page.locator('#select-date').selectOption('Wed Sep 15 2021 03:00:00 GMT-0700 (Pacific Daylight Time)');
  await page.locator('#select-time').selectOption('372');
  await page.locator('#select-ticket-type').selectOption('General Admission - Adult');
  await page.locator('#select-qty').selectOption('4');
  await page.getByRole('button', { name: 'Get Tickets' }).click();
  await page.getByRole('heading', { name: 'Success!' }).click();
  await page.getByText('You added 4 tickets to Angels In America on Sep 15 to the cart.').click();
});
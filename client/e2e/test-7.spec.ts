import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://localhost:3000/');
  await page.getByRole('button', { name: 'See Showings' }).first().click();
  await page.getByTestId('select-date').selectOption('Wed Sep 15 2021 03:00:00 GMT-0700 (Pacific Daylight Time)');
  await page.getByText('Ticket Type', { exact: true }).click();
  await page.getByTestId('select-time').selectOption('372');
  await page.getByTestId('select-ticket-type').selectOption('General Admission - Adult');
  await page.getByTestId('select-qty').selectOption('4');
  await page.getByTestId('get-tickets').click();
});
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.getByRole('list').locator('a').filter({ hasText: 'Dashboard' }).click();
  await page.getByRole('button', { name: 'Door List' }).click();
  await page.getByRole('heading', { name: 'Door List' }).click();
  await page.getByRole('list').locator('a').filter({ hasText: 'Dashboard' }).click();
  await page.getByRole('button', { name: 'Events' }).click();
  await page.getByRole('heading', { name: 'Select Event' }).click();
  await page.getByRole('button', { name: 'Purchase Tickets' }).click();
  await page.getByRole('img', { name: '404 error image' }).click();
  await page.getByRole('button', { name: 'Create Newsletter' }).click();
  await page.getByRole('heading', { name: 'Newsletter Creation!' }).click();
  await page.getByRole('button', { name: 'Manage Seasonal Tickets' }).click();
  await page.getByRole('img', { name: '404 error image' }).click();
  await page.getByRole('button', { name: 'Manage Ticket Types' }).click();
  await page.getByRole('heading', { name: 'Manage Ticket Types' }).click();
  await page.getByRole('button', { name: 'Ticket Exchanges' }).click();
  await page.getByRole('heading', { name: 'Ticket Exchanges' }).click();
});
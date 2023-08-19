import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Playwright/);
});

test('get started link', async ({ page }) => {
  await page.goto('https://playwright.dev/');

  // Click the get started link.
  await page.getByRole('link', { name: 'Get started' }).click();

  // Expects the URL to contain intro.
  await expect(page).toHaveURL(/.*intro/);
});

test('portland play house link',async({page})=>{
  await page.goto('/');

  await page.getByRole('link', { name: '/' }).click();

  await expect(page).toHaveURL('https://portlandplayhouse.org');
});

test('donate',async({page})=>{
  await page.goto('/');

  await page.getByRole('button', { name: 'Donate' }).click();

  await expect(page).toHaveURL('https://127.0.0.1:3000/donate');

  await page.getByRole('button', { name: 'Back to Events' }).click();

  await expect(page).toHaveURL('https://127.0.0.1:3000');
});

test('events',async({page})=>{
  await page.goto('/');

  await page.getByRole('button', { name: 'See Showings' }).first().click();

  await expect(page).toHaveURL('https://127.0.0.1:3000/events/32');

  await page.getByRole('button', { name: 'Back to Events' }).click();

  await expect(page).toHaveURL('https://127.0.0.1:3000');
});

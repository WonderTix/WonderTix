import { test, expect } from '@playwright/test';

test('portland play house link',async({page})=>{
  await page.goto('https://localhost:3000/');

  await page.getByRole('link', { name: '/' }).click();

  await expect(page).toHaveURL('https://portlandplayhouse.org/');
});

test('donate',async({page})=>{
  await page.goto('https://localhost:3000/');

  await page.getByRole('button', { name: 'Donate' }).click();

  await expect(page).toHaveURL('https://localhost:3000/donate');

  await page.getByRole('button', { name: 'Back to Events' }).click();

  await expect(page).toHaveURL('https://localhost:3000/');
});

test('events',async({page})=>{
  await page.goto('https://localhost:3000/');

  await page.getByRole('button', { name: 'See Showings' }).first().click();

  await expect(page).toHaveURL('https://localhost:3000/events/32');

  await page.getByRole('button', { name: 'Back to Events' }).click();

  await expect(page).toHaveURL('https://localhost:3000/');
});

import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://localhost:3000/');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByLabel('Email address').click();
  await page.getByLabel('Email address').fill('test@wondertix.com');
  await page.getByLabel('Email address').press('Tab');
  await page.getByLabel('Password').fill('wondertix123!');
  await page.getByLabel('Password').press('Enter');
  await page.locator('svg').nth(1).click();
  await page.getByText('Admin').first().click();
  await page.getByRole('button', { name: 'Contacts' }).click();
  await page.getByPlaceholder('Search by contact...').click();
  await page.getByPlaceholder('Search by contact...').fill('Annabelle');
  await page.getByPlaceholder('Search by contact...').press('Enter');
  await page.getByText('Customer Information').first().click();
  await page.getByText('Customer name:').first().click();
  await page.getByText('ID:').first().click();
  await page.getByText('Email:').first().click();
  await page.getByText('Phone:').first().click();
  await page.getByText('Customer Address:').first().click();
  await page.getByText('Newsletter:').first().click();
  await page.getByText('Donorbadge:').first().click();
  await page.getByText('Seating Accommodation:').first().click();
  await page.getByText('VIP:').first().click();
  await page.getByText('Volunteer List:').first().click();
  await page.getByRole('button', { name: 'Show All Information' }).first().click();
});
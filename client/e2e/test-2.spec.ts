import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://localhost:3000/');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByLabel('Email address').click();
  await page.getByLabel('Email address').fill('test@wondertix.com');
  await page.getByLabel('Email address').press('Tab');
  await page.getByLabel('Password').fill('wondertix123!');
  await page.getByLabel('Password').press('Enter');
  await page.getByRole('button', { name: 'See Showings' }).first().click();
  await page.getByLabel('Quantity').selectOption('2');
  await page.getByLabel('Quantity').click();
  await page.getByLabel('Quantity').selectOption('3');
  await page.getByTestId('get-tickets').click();
  await page.getByRole('button', { name: 'Take me there!' }).click();
  await page.getByRole('button', { name: 'Proceed To Checkout' }).click();
  await page.getByRole('button', { name: 'Continue' }).click();
});
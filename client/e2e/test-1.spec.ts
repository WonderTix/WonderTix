import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://localhost:3000/');
  await page.getByRole('button', { name: 'Sign in' }).click();
  await page.getByLabel('Email address').fill('test2@wondertix.com');
  await page.getByLabel('Email address').press('Tab');
  await page.getByLabel('Password').fill('wondertix123!');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByRole('button', { name: 'Accept' }).click();
  await page.getByText('test2@wondertix.com').click();
});
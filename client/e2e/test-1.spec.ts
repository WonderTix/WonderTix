import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://localhost:3000/');
  await page.getByRole('button', { name: 'See Showings' }).first().click();
  await page.getByLabel('Ticket Type').selectOption('General Admission - Adult');
  await page.getByLabel('Quantity').selectOption('3');
  await page.getByTestId('get-tickets').click();
  await page.getByRole('button', { name: 'Take me there!' }).click();
  await page.getByText('Angels In America Tickets').click();
  await page.getByText('General Admission - Adult - Fri, Sep 17 - 11:00 AM').click();
  await page.getByText('3', { exact: true }).click();
  await page.getByText('My Cart').click();
});

await page.goto('https://localhost:3000/');
await page.getByRole('button', { name: 'See Showings' }).first().click();
await page.getByLabel('Quantity').selectOption('4');
await page.getByTestId('get-tickets').click();
await page.getByRole('button', { name: 'Take me there!' }).click();
await page.getByRole('button', { name: 'Proceed To Checkout' }).click();
await page.getByRole('button', { name: 'Continue' }).click();
await page.getByPlaceholder('First Name').click();
await page.getByPlaceholder('First Name').fill('John');
await page.getByPlaceholder('First Name').press('Tab');
await page.getByPlaceholder('Last Name').fill('Doe');
await page.getByPlaceholder('Last Name').press('Tab');
await page.getByPlaceholder('Street Address').fill('123 St, Bollys, MA');
await page.getByPlaceholder('Street Address').press('Tab');
await page.getByPlaceholder('Postal Code').fill('023370');
await page.getByPlaceholder('Postal Code').press('Tab');
await page.getByPlaceholder('Country').fill('USA');
await page.getByPlaceholder('Country').press('Tab');
await page.getByPlaceholder('Phone').fill('503-777-7654');
await page.getByPlaceholder('Phone').press('Tab');
await page.getByPlaceholder('Email', { exact: true }).fill('test@wondertix.com');
await page.getByRole('button', { name: 'Next' }).click();
await page.getByLabel('Email').click();
await page.getByLabel('Email').fill('test@wondertix.com');
await page.getByPlaceholder('1234 1234 1234 1234').click();
await page.getByPlaceholder('1234 1234 1234 1234').fill('4242 4242 4242 4242');
await page.getByPlaceholder('1234 1234 1234 1234').press('Tab');
await page.getByPlaceholder('MM / YY').fill('12 / 99');
await page.getByPlaceholder('MM / YY').press('Tab');
await page.getByPlaceholder('CVC').press('Shift+Tab');
await page.getByPlaceholder('MM / YY').fill('12 / 30');
await page.getByPlaceholder('MM / YY').press('Tab');
await page.getByPlaceholder('CVC').fill('999');
await page.getByPlaceholder('CVC').press('Tab');
await page.getByPlaceholder('Full name on card').fill('John Doe');
await page.getByPlaceholder('Full name on card').press('Tab');
await page.getByLabel('Country or region').press('Tab');
await page.getByPlaceholder('ZIP').fill('99999');
await page.getByPlaceholder('ZIP').press('Tab');
await page.getByTestId('checkout-container').click();
await page.getByTestId('hosted-payment-submit-button').click();
await page.getByText('Thank you for your purchase!').click();
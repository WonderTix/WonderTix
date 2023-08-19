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

// test('portland play house link',async({page})=>{
//   test.setTimeout(100000);  // Set timeout for this test to 100 seconds
//   await page.goto('https://localhost:3000/');
//    // Wait for the link with the specific role and name to appear for up to 60 seconds
//    const linkElement = await page.waitForSelector('a[role="link"][name="/"]', { timeout: 60000 });

//    await linkElement.click();

//   await expect(page).toHaveURL('https://portlandplayhouse.org/');
// });
test('portland play house link',async({page})=>{
  test.setTimeout(100000);  // Set timeout for this test to 100 seconds
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
  test.setTimeout(120000);  // Set timeout for this test to 120 seconds
  await page.goto('https://localhost:3000/');

  await page.getByRole('button', { name: 'See Showings' }).first().click();

  await expect(page).toHaveURL('https://localhost:3000/events/32');

  await page.getByRole('button', { name: 'Back to Events' }).click();

  await expect(page).toHaveURL('https://localhost:3000/');
});

// test('events', async ({ page }) => {
//   test.setTimeout(120000);  // Set timeout for this test to 120 seconds

//   await page.goto('https://localhost:3000/');

//   let attempts = 5;
//   let buttonFound = false;

//   while (attempts > 0 && !buttonFound) {
//     try {
//       await page.waitForSelector('button[role="button"][name="See Showings"]', { timeout: 10000 });
//       buttonFound = true; // If the button is found, set the flag to true
//     } catch (error) {
//       // If the button isn't found within the timeout, refresh the page
//       await page.reload();
//       attempts--; // Decrement the attempts counter
//     }
//   }

//   if (!buttonFound) {
//     throw new Error('Failed to find the "See Showings" button after multiple attempts.');
//   }

//   await page.click('button[role="button"][name="See Showings"]');

//   await expect(page).toHaveURL('https://localhost:3000/events/32');

//   await page.click('button[role="button"][name="Back to Events"]');

//   await expect(page).toHaveURL('https://localhost:3000/');
// });

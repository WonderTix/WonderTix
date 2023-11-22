import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {

await page.getByRole('button', { name: 'Profile picture test@wondertix.com' }).click();
await page.getByText('Manage Ticketing').click();
await page.getByRole('button', { name: 'Seasons' }).click();
await page.getByRole('button', { name: 'Add Season' }).click();
await page.getByLabel('Season Name:').click();
await page.getByLabel('Season Name:').press('CapsLock');
await page.getByLabel('Season Name:').fill('T');
await page.getByLabel('Season Name:').press('CapsLock');
await page.getByLabel('Season Name:').fill('Test');
await page.getByLabel('Season Name:').press('CapsLock');
await page.getByLabel('Season Name:').fill('Test_');
await page.getByLabel('Season Name:').press('CapsLock');
await page.getByLabel('Season Name:').fill('Test_season2');
await page.getByLabel('Start Date:').fill('2023-11-01');
await page.getByLabel('End Date:').fill('2023-11-09');
await page.getByLabel('Image URL:').click();
await page.getByLabel('Image URL:').fill('https://www.imdb.com/title/tt1520211/mediaviewer/rm3421721345/?ref_=tt_ov_i');
await page.getByLabel('Active').check();
await page.getByRole('button', { name: 'Save' }).click();
await page.getByRole('button', { name: 'Continue' }).click();
await page.getByRole('button', { name: 'Add event' }).click();
await page.getByRole('button', { name: 'Close' }).click();
await page.getByRole('button', { name: 'Edit' }).click();
await page.getByRole('button', { name: 'Delete' }).click();
await page.getByRole('button', { name: 'Continue' }).click();

await page.locator('button').filter({ hasText: 'Test_SeasonStart Date: 11/01/2023End Date: 11/09/2023' }).nth(1).click();
await page.getByRole('button', { name: 'Edit' }).click();
await page.getByRole('button', { name: 'Delete' }).click();
await page.getByRole('button', { name: 'Continue' }).click();
await page.locator('a').filter({ hasText: 'Dashboard' }).first().click();
await page.getByRole('button', { name: 'Seasons' }).click();
await page.locator('button').filter({ hasText: 'Test_SeasonStart Date: 11/01/2023End Date: 11/09/2023' }).click();
});

import {test, expect} from '@playwright/test';

test('test', async ({page}) => {
  await page.goto('https://localhost:3000/ticketing/doorlist');
  await page.goto('https://wtix-dev.us.auth0.com/u/login?state=hKFo2SBBdnZnTHdTZmFQb3lnX3JMemhONGFXcnUwQVVjTlRsTaFur3VuaXZlcnNhbC1sb2dpbqN0aWTZIHpqS1dKbFdRbVJOVHZnTDB3T2FZMWVwVFk2YXdnRFhfo2NpZNkgcmlpQ2NyeEQwbzdON29BcnFnV1RUVG5pTW1ZTTZXaUw');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('wondertix123!');
  await page.getByRole('button', {name: 'Continue', exact: true}).click();
  await page.locator('.MuiDataGrid-virtualScrollerContent').click();
  await page.getByRole('heading', {name: 'Door List'}).click();
  await page.getByLabel('Choose Event').selectOption('32');
  await page.getByLabel('Choose Time').selectOption('372');
  await page.getByText('No tickets sold for this show').click();
  await page.getByRole('heading', {name: 'Showing: Angels In America'}).click();
  await page.getByRole('heading', {name: 'Wed, Sep 15, 3:00 AM'}).click();
});

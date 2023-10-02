import {test as setup, expect} from '@playwright/test';
import {LoginPage} from './pages/loginPage';
import dotenv from 'dotenv';
import path from 'path';

// Construct the path to the .env file based on __dirname
console.log(`process env CI is ${process.env.CI}`);
if (!process.env.CI) {
  console.log('using dotenv');
  const envPath = path.join(__dirname, '../../.env');
  dotenv.config({path: envPath});
}
console.log(`process env tes email is ${process.env.TEST_EMAIL}`);
console.log(JSON.stringify(process.env, null, 2));

/**
 * https://playwright.dev/docs/auth
 */

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({page}) => {
  setup.setTimeout(120000);

  const loginPage = new LoginPage(page);

  const email = process.env.TEST_EMAIL as string;
  const password = process.env.TEST_PASSWORD as string;

  console.log('Logging in...');
  await page.screenshot({ path: 'before-login.png' });

  await loginPage.login(email, password);
  await page.screenshot({ path: 'after-login.png' });

  console.log('Login completed.');
  console.log('Current URL:', await page.url());

  const htmlContent = await page.content();
  console.log(htmlContent);

  await expect(page.getByText('Wrong email or password')).not.toBeVisible();
  await expect(page.getByRole('heading', { name: 'Oops!, something went wrong' })).not.toBeVisible();

  // Ensuring visibility and correctness of page elements post-login.
  await expect(await loginPage.getLoggedInEmailDisplay(email)).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Events' })).toBeVisible();

  // Store the authentication state for future use.
  await page.context().storageState({path: authFile});
});

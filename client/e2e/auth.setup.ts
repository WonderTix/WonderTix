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
  setup.setTimeout(90000);

  const loginPage = new LoginPage(page);

  const email = process.env.TEST_EMAIL as string;
  const password = process.env.TEST_PASSWORD as string;

  console.log('Logging in...');
  await loginPage.login(email, password);
  console.log('Login completed.');
  console.log('Current URL:', await page.url());

  await expect(page.getByText('Wrong email or password')).not.toBeVisible();

  // Wait for the URL to change.
  await page.waitForURL('/');

  // Ensuring visibility and correctness of page elements post-login.
  await expect(await loginPage.getLoggedInEmailDisplay(email)).toBeVisible();

  // Store the authentication state for future use.
  await page.context().storageState({path: authFile});
});

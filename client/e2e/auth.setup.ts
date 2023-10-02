import {test as setup, expect} from '@playwright/test';
import {LoginPage} from './pages/loginPage';
import dotenv from 'dotenv';
import path from 'path';

// Construct the path to the .env file based on __dirname
console.log(`process env CI is ${process.env.CI}`);
console.log(`process env CI is ${process.env.CI}`);
console.log(`process env CI is ${process.env.CI}`);
if (!process.env.CI) {
  console.log("using dotenv");
  console.log("using dotenv");
  dotenv.config({path: path.join(__dirname, '../../.env')});
}
console.log(`process env is ${process.env}`);

/**
 * https://playwright.dev/docs/auth
 */

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({page}) => {
  setup.setTimeout(120000);
   
  const loginPage = new LoginPage(page);

  const email = process.env.TEST_EMAIL as string;
  const password = process.env.TEST_PASSWORD as string;

  await loginPage.login(email, password);

  // Wait for the URL to change.
  await page.waitForURL('/');

  // Ensuring visibility and correctness of page elements post-login.
  await expect(await loginPage.getLoggedInEmailDisplay(email)).toBeVisible();

  // Store the authentication state for future use.
  await page.context().storageState({path: authFile});
});


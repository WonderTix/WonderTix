import {test as setup, expect} from '@playwright/test';
import {LoginPage} from './pages/loginPage';
import dotenv from 'dotenv';
import path from 'path';

// Construct the path to the .env file based on __dirname
if (!process.env.CI) {
  console.log('using dotenv');
  const envPath = path.join(__dirname, '../../.env');
  dotenv.config({path: envPath});
}
// console.log(JSON.stringify(process.env, null, 2));

/**
 * https://playwright.dev/docs/auth
 */

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({page}) => {
  setup.setTimeout(180000);

  const loginPage = new LoginPage(page);

  const email = process.env.TEST_EMAIL as string;
  const password = process.env.TEST_PASSWORD as string;

  console.log('Logging in...');

  await loginPage.login(email, password);

  // Edge case for "Default App is trying to access your wtix-xxx account"
  try {
    // Wait for the Accept button to appear on the page.
    await loginPage.postLoginAuthAcceptButton.waitFor({ timeout: 5000 });
    // If the Post-first-login Auth0 Accept button is found, click it.
    await loginPage.postLoginAuthAcceptButton.click();
  } catch (error) {
    console.log('Accept button did not appear within 5 seconds.');
  }

  console.log('Login completed.');
  console.log('Current URL:', page.url());

  // await page.reload();
  // const htmlContent = await page.content();
  // console.log(htmlContent);

  // Ensuring visibility and correctness of page elements post-login.
  await expect(loginPage.loginButton).not.toBeVisible(); // Sign-in button should be gone
  await expect(loginPage.getLoggedInEmailDisplay(email)).toBeVisible({ timeout:30000 }); // User email in its place
  await expect(page.getByRole('heading', {name: 'Events'})).toBeVisible();

  // Store the authentication state for future use.
  await page.context().storageState({path: authFile});
});

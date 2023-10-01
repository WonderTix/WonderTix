import { test as setup, expect } from '@playwright/test';
import { LoginPage } from './pages/loginPage';
import dotenv from 'dotenv';
import path from 'path';

// Construct the path to the .env file based on __dirname
const envPath = path.join(__dirname, '../../.env');
dotenv.config({ path: envPath });

/**
 * https://playwright.dev/docs/auth
 */

const authFile = 'playwright/.auth/user.json';

setup('authenticate', async ({ page }) => {
  const loginPage = new LoginPage(page);

    const email = process.env.TEST_EMAIL as string;
    const password = process.env.TEST_PASSWORD as string;

  await loginPage.login(email, password);

	// Wait for the URL to change.
  await page.waitForURL('/');

  // Ensuring visibility and correctness of page elements post-login.
  await expect(await loginPage.getLoggedInEmailDisplay(email)).toBeVisible();

  // Store the authentication state for future use.
  await page.context().storageState({ path: authFile });
});

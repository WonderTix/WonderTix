import { type Locator, type Page } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly frontEndUrl: string;

  readonly loginButton: Locator;
  readonly loginWelcomeMessage: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginContinueButton: Locator;

  constructor(page: Page) {
   
    this.page = page;

    this.loginButton = page.getByRole('button', { name: 'Sign in' });
    this.loginWelcomeMessage = page.getByText('Log in to wtix-dev to continue to Default App.');
    this.emailInput = page.getByLabel('Email address');
    this.passwordInput = page.getByLabel('Password');
    this.loginContinueButton = page.getByRole('button', { name: 'Continue', exact: true });
  }

  async goto() {
    await this.page.goto('/', { timeout: 120000 }); //  seconds timeout
  }

  async getLoggedInEmailDisplay(email: string) {
    return this.page.getByText(`${email}`);
  }

  async setEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async setPassword(password: string) {
    await this.passwordInput.fill(password);
  }

  async login(email: string, password: string ) {
    await this.goto();
    await this.loginButton.click()
    await this.setEmail(email);
    await this.setPassword(password);
    await this.loginContinueButton.click();
  }
}
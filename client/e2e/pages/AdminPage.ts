/* eslint-disable require-jsdoc */
import {type Locator, type Page, expect} from '@playwright/test';
import {EventsInfo, ShowingInfo} from '../testData/ConstsPackage';
/*
Since many locators' names are created while a specific test is being written, some names are ill-considered,
of course we could optimize them later in the process to create as few locators as possible and to share
the same locator with multiple tests.
*/

export class AdminPage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto('/admin', {timeout: 90000});
  }

  async gotoTicketing() {
    await this.page.goto('/ticketing', {timeout: 90000});
  }
}

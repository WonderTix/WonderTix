/* eslint-disable require-jsdoc */
import {type Locator, type Page} from '@playwright/test';

export class DoorListPage {
  readonly page: Page;

  readonly pageHeader: Locator;

  constructor(page: Page) {
    this.page = page;

    this.pageHeader = page.getByRole('heading', {name: 'Door List'});
  }
}

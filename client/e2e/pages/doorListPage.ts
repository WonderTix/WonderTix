/* eslint-disable require-jsdoc */
import {type Locator, type Page} from '@playwright/test';

export class DoorListPage {
  readonly page: Page;

  readonly pageHeader: Locator;
  readonly chooseEvent: Locator;
  readonly chooseTime: Locator;

  constructor(page: Page) {
    this.page = page;

    this.pageHeader = page.getByRole('heading', {name: 'Door List'});
    this.chooseEvent = page.getByLabel('Choose Event');
    this.chooseTime = page.getByLabel('Choose Time');
  }

  async goto() {
    await this.page.goto('https://localhost:3000/ticketing/doorlist', {timeout: 90000});
  }

  //  Will need to determine away to identify event specitically.
  async setEvent(event: string) {
    await this.chooseEvent.selectOption(event);
  }

  //  Also need a way to identify the time
  async setTime(time: string) {
    await this.chooseTime.selectOption(time);
  }
}

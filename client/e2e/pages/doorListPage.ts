/* eslint-disable require-jsdoc */
import {type Locator, type Page} from '@playwright/test';
import {EventsInfo, ShowingInfo} from '../testData/ConstsPackage';

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
    await this.page.goto('/ticketing/doorlist', {timeout: 90000});
  }

  //  Will need to determine away to identify event specitically.
  async setEventByLabel(event: string) {
    await this.chooseEvent.selectOption({label: event});
  }

  //  Also need a way to identify the time
  async setTimeByLabel(time: string) {
    await this.chooseTime.selectOption({label: time});
  }

  async getHeader() {
    return this.pageHeader.textContent();
  }

  async selectRandomShow() {
    const showsUnit = await this.chooseEvent.allInnerTexts();
    const shows = showsUnit[0].split('\n');
    const randShow = shows[Math.floor(Math.random() * (await shows).length)];
    await this.setEventByLabel(randShow);
    return await randShow;
  }

  async selectRandomTime() {
    const timesUnit = await this.chooseTime.allInnerTexts();
    const times = timesUnit[0].split('\n');
    const randTime = times[Math.floor(Math.random() * (await times).length)];
    await this.setTimeByLabel(randTime);
    return await randTime;
  }

  async searchShowing(event: EventsInfo, showing: ShowingInfo) {
    const eventOption = await this.chooseEvent.getByRole('option').filter({hasText: event.eventName}).textContent();
    await this.chooseEvent.selectOption(eventOption);
    await this.chooseTime.selectOption(showing.showingDateTime);
  }
}

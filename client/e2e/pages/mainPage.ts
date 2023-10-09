/* eslint-disable require-jsdoc */

import {type Locator, type Page, expect} from '@playwright/test';

export class MainPage {
  readonly page: Page;

  readonly firstShowing: Locator;
  readonly headingEvent: Locator;

  // Below elements are actually on the event template
  // Should event template be its own page object?
  readonly selectDate: Locator;
  readonly selectTime: Locator;
  readonly selectTicketType: Locator;
  readonly selectQuantity: Locator;
  readonly addConcessionsTicket: Locator;
  readonly getTickets: Locator;
  readonly titleEvent: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstShowing = page.getByRole('button', {name: 'See Showings'}).first();
    this.headingEvent = page.getByRole('heading', {name: 'Events'});
    this.selectDate = page.locator('#select-date');
    this.selectTime = page.locator('#select-time');
    this.selectTicketType = page.locator('#select-ticket-type');
    this.selectQuantity = page.locator('#select-qty');
    this.addConcessionsTicket = page.locator('#checkbox-concessions');
    this.getTickets = page.getByRole('button', {name: 'Get Tickets'});
    this.titleEvent = page.locator('#event-title');
  }

  async goto() {
    await this.page.goto('/', {timeout: 90000});
  }

  async goFirstShowing() {
    await this.firstShowing.click();
    const title = await this.titleEvent.textContent();
    return await title;
  }

  private async selectRandomOption(optionBox: Locator) {
    const allOptions = await (await optionBox.allInnerTexts())[0].split('\n');
    allOptions.shift();
    const randomOption = allOptions[Math.floor(Math.random() * (await allOptions).length)];
    await optionBox.selectOption({label: randomOption});
    return await randomOption;
  }

  async selectRandomDate() {
    const randomDate = await this.selectRandomOption(this.selectDate);
    return await randomDate;
  }

  async selectRandomTime() {
    const randomTime = await this.selectRandomOption(this.selectTime);
    return await randomTime;
  }

  async selectRandomTicketType() {
    const randomTicketType = await this.selectRandomOption(this.selectTicketType);
    return await randomTicketType;
  }

  async selectRandomQuantity() {
    const randonQuantity = await this.selectRandomOption(this.selectTime);
    return await randonQuantity;
  }

  async clickGetTickets() {
    await this.getTickets.click();
  }
}

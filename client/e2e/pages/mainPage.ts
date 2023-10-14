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
  readonly successHeader: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstShowing = page.getByRole('button', {name: 'See Showings'}).first();
    this.headingEvent = page.getByRole('heading', {name: 'Events'});
    this.selectDate = page.getByTestId('select-date');
    this.selectTime = page.getByTestId('select-time');
    this.selectTicketType = page.getByTestId('select-ticket-type');
    this.selectQuantity = page.getByTestId('select-qty');
    this.addConcessionsTicket = page.getByTestId('checkbox-concessions');
    this.getTickets = page.getByTestId('get-tickets');
    this.titleEvent = page.getByTestId('event-title');
    this.successHeader = page.getByRole('heading', {name: 'Success!'});
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
    expect(await allOptions.length).toBeGreaterThanOrEqual(2);
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
    const randonQuantity = await this.selectRandomOption(this.selectQuantity);
    return await randonQuantity;
  }

  async clickGetTickets() {
    // await this.page.getByTestId('get-tickets').click();
    await this.getTickets.click();
  }

  async checkAddTicketSucess(message: string) {
    if (await this.successHeader.isVisible() && await this.page.getByText(message).isVisible()) {
      return true;
    } else {
      return false;
    }
  }
}

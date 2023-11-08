/* eslint-disable require-jsdoc */

import {type Locator, type Page, expect} from '@playwright/test';
import {EventsInfo, ShowingInfo} from '../testData/ConstsPackage';

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
  readonly cartFromSuccess: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstShowing = page.getByRole('button', {name: 'See Showings'}).first();
    this.headingEvent = page.getByRole('heading', {name: 'Events'});
    this.selectDate = page.locator('#date-select');
    this.selectTime = page.locator('#time-select');
    this.selectTicketType = page.locator('#ticket-type-select');
    this.selectQuantity = page.locator('#qty-select');
    this.addConcessionsTicket = page.locator('#add-concessions-ticket');
    this.getTickets = page.getByTestId('get-tickets');
    this.titleEvent = page.getByTestId('event-title');
    this.successHeader = page.getByRole('heading', {name: 'Success!'});
    this.cartFromSuccess = page.getByRole('button', {name: 'Take me there!'});
  }

  // Initial page navigation - sends browser session to the root address
  // Sets long timeout to account for various delays while testing in dev
  async goto() {
    await this.page.goto('/', {timeout: 90000});
  }

  async getShowingLocator(showingName: string) {
    return this.page.getByText(showingName).first();
  }

  // Click the 'See Showings' button of the first event on the main page
  // Return the name of that showing
  async goFirstShowing() {
    await this.firstShowing.click();
    const title = await this.titleEvent.textContent();
    return title;
  }

  // Find and go to the showing associated with the EventsInfo parameter
  // Return the name of that showing
  async goSelectShowing(eventInfo: EventsInfo) {
    const eventCard = await this.getShowingLocator(eventInfo.eventName + eventInfo.eventDescription + 'See Showings');
    await eventCard.getByRole('button', {name: 'See Showings'}).click();
    const title = await this.titleEvent.textContent();
    return title;
  }

  // Helper function - selects a random option in a dropdown box
  // allInnerTexts does not work on FireFox and WebKit
  // The evaluate function sends a JS snippet to build a string that's roughly an equivalent
  // There is a minor bug, but the error is discarded in the shift operation
  // Array must have length of at least two, or no selectable options exist
  // String shift removes the first item in the array
  // Select a random option from the array, set that option, and return the text
  private async selectRandomOption(optionBox: Locator) {
    const allOptions = (await optionBox.evaluate((sel) => {
      var list;
      var i;
      for (i=0; i< sel.options.length; i++) {
        list = list + sel.options[i].text + "\n";
      }
      return list.slice(0, -1);
    })).split('\n');
    expect(allOptions.length).toBeGreaterThanOrEqual(2);
    allOptions.shift();
    const randomOption = allOptions[Math.floor(Math.random() * (allOptions).length)];
    await optionBox.selectOption(randomOption);
    return randomOption;
  }

  // The below selectXX functions simply pass the option locator into the helper above and
  // return the selected text
  async selectRandomDate() {
    const randomDate = await this.selectRandomOption(this.selectDate);
    return randomDate;
  }

  async selectRandomTime() {
    const randomTime = await this.selectRandomOption(this.selectTime);
    return randomTime;
  }

  async selectRandomTicketType() {
    const randomTicketType = await this.selectRandomOption(this.selectTicketType);
    return randomTicketType;
  }

  async selectRandomQuantity() {
    const randomQuantity = await this.selectRandomOption(this.selectQuantity);
    return randomQuantity;
  }

  // Click the Get Tickets button on the event page
  async clickGetTickets() {
    await this.getTickets.click();
  }

  // Verify specified elements are on the popup after clicking the Get Tickets button
  // Verifies the 'Success!' header is visible and the event details text is correct
  // Event details message must be composed in the calling test and passed into this function
  async checkAddTicketSucess(message: string) {
    if (await this.successHeader.isVisible() && await this.page.getByText(message).isVisible()) {
      return true;
    } else {
      return false;
    }
  }

  async clickTakeMeThere() {
    await this.cartFromSuccess.click();
  }

  async checkCart(name: string, info:string, quantity: string) {
    await this.page.getByText(name).isVisible();
    await this.page.getByText(info).isVisible();
    await this.page.getByText(quantity, {exact: true}).isVisible();
  }
}

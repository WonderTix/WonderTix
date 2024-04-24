/* eslint-disable require-jsdoc */
import {type Locator, type Page} from '@playwright/test';
import {EventInfo} from '../testData/EventInfo';
import {ShowingInfo} from '../testData/ShowingInfo';
import {CustomerInfo} from '../testData/CustomerInfo';

export class DoorListPage {
  readonly page: Page;

  readonly homePageButton: Locator;

  readonly pageHeader: Locator;
  readonly chooseEvent: Locator;
  readonly chooseShowing: Locator;
  readonly showingTitle: Locator;
  readonly showingTime: Locator;
  readonly customerRow: Locator;
  readonly activeViewOption: Locator;
  readonly allViewOption: Locator;

  constructor(page: Page) {
    this.page = page;

    this.homePageButton = page.getByRole('button', {name: '/'});

    this.pageHeader = page.getByRole('heading', {name: 'Door List'});
    this.chooseEvent = page.getByTestId('event-select');
    this.chooseShowing = page.getByTestId('showing-select');
    this.showingTitle = page.getByRole('heading', {name: 'Showing'});
    this.showingTime = page.getByTestId('showing-time');
    this.customerRow = page.locator('.MuiDataGrid-row');
    this.activeViewOption = page.getByTestId('active-button');
    this.allViewOption = page.getByTestId('all-button');
  }

  // Go to the door list
  async goTo() {
    await this.page.goto('/ticketing/doorlist', {timeout: 60000});
  }

  async goHome() {
    await this.homePageButton.click();
  }

  // Pick event by option label
  async setEventByLabel(event: string) {
    await this.chooseEvent.selectOption({label: event});
  }

  // Pick time by option label
  async setTimeByLabel(time: string) {
    await this.chooseShowing.selectOption({label: time});
  }

  // Fetch the page header as a string
  async getHeader() {
    return this.pageHeader.textContent();
  }

  // Pick a random show to look at and return its name
  async selectRandomShow() {
    const showsUnit = await this.chooseEvent.allInnerTexts();
    const shows = showsUnit[0].split('\n');
    const randShow = shows[Math.floor(Math.random() * shows.length)];
    await this.setEventByLabel(randShow);
    return randShow;
  }

  // Pick a random date/time and return it as a string
  async selectRandomTime() {
    const timesUnit = await this.chooseShowing.allInnerTexts();
    const times = timesUnit[0].split('\n');
    const randTime = times[Math.floor(Math.random() * times.length)];
    await this.setTimeByLabel(randTime);
    return randTime;
  }

  // Find a specific showing using the EventInfo object for the name, and the ShowingInfo object
  // for the correct show date/time
  async searchShowing(event: EventInfo, showing: ShowingInfo) {
    const eventOption = await this.chooseEvent
      .getByRole('option')
      .filter({hasText: event.eventName})
      .textContent();
    await this.chooseEvent.selectOption(eventOption);

    const showingOption = await this.chooseShowing
      .getByRole('option')
      .filter({
        hasText: `${showing.showingWholeDate}, ${showing.showingTime12hour}`,
      })
      .textContent();
    await this.chooseShowing.selectOption(showingOption);
  }

  // Verify a specific order exists by customer name, quantity, and accommodation.
  getCustomerRow(customer: CustomerInfo, qty: number) {
    return this.customerRow
      .filter({hasText: customer.firstName})
      .filter({hasText: customer.lastName})
      .filter({hasText: `${qty} x General Admission`})
      .filter({hasText: customer.accommodations});
  }

  // Sets viewable list of events to active events.
  async setActiveView() {
    await this.activeViewOption.click();
  }

  // Sets viewable list of events to all events.
  async setAllView() {
    await this.allViewOption.click();
  }
}

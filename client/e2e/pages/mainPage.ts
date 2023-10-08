/* eslint-disable require-jsdoc */

import {type Locator, type Page} from '@playwright/test';

export class MainPage {
  readonly page: Page;

  readonly firstShowing: Locator;
  readonly selectDate: Locator;
  readonly selectTicketType: Locator;
  readonly selectQuantity: Locator;
  readonly addConcessionsTicket: Locator;
  readonly getTickets: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstShowing = page.getByRole('button', {name: 'See Showings'}).first();
    this.selectDate = page.getByRole('combobox', {name: 'select-date'});
    this.selectTicketType = page.getByRole('combobox', {name: 'select-ticket-type'});
    this.selectQuantity = page.getByRole('combobox', {name: 'select-qty'});
    this.addConcessionsTicket = page.getByRole('checkbox', {name: 'checkbox-concessions'});
    this.getTickets = page.getByRole('button', {name: 'Get Tickets'});
  }

  async goto() {
    this.page.goto('/', {timeout: 90000});
  }
}

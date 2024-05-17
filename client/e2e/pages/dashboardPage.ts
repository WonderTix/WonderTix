/* eslint-disable require-jsdoc */
import {type Locator, type Page} from '@playwright/test';

export class DashboardPage {
  readonly page: Page;

  readonly TicketingDashboardHeading: Locator;
  readonly PageHeading: Locator;

  constructor(page: Page) {
    this.page = page;

    this.TicketingDashboardHeading = page.getByRole('heading', {
      name: 'Ticketing Dashboard',
    });
    this.PageHeading = page.locator('h1');
  }

  async goTo() {
    await this.page.goto('/ticketing', {timeout: 60000});
  }

  async clickDashboardButton(buttonTitle: DashboardButtons) {
    await this.page.getByRole('button', {name: buttonTitle}).click();
  }

  async getPageHeading() {
    return await this.PageHeading.textContent();
  }
}

export enum DashboardButtons {
  DoorList = 'Door List',
  Events = 'Events',
  PurchaseTickets = 'Purchase Tickets',
  Seasons = 'Seasons',
  RefundOrders = 'Refund Orders',
  TicketTypes = 'Manage Ticket & Subscription Types',
  DiscountCodes = 'Manage Discount Codes',
  Newsletters = 'Create Newsletter',
  SubscriptionRedemption = 'Subscription Redemption',
  TicketExchanges = 'Ticket Exchanges',
}

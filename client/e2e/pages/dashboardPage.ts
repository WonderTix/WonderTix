/* eslint-disable require-jsdoc */
import {type Locator, type Page, expect} from '@playwright/test';

export class DashboardPage {
  readonly page: Page;

  readonly TicketingDashboardHeading: Locator;
  readonly PageHeading: Locator;

  readonly DoorListButton: Locator;
  readonly EventsButton: Locator;
  readonly PurchaseTicketsButton: Locator;
  readonly SeasonsButton: Locator;
  readonly RefundOrdersButton: Locator;
  readonly ManageTicketTypesButton: Locator;
  readonly ManageDiscountCodesButton: Locator;
  readonly CreateNewsletterButton: Locator;
  readonly SubscriptionRedemptionButton: Locator;
  readonly TicketExchangesButton: Locator;

  constructor(page: Page) {
    this.page = page;

    this.TicketingDashboardHeading = page.getByRole('heading', {
      name: 'Ticketing Dashboard',
    });
    this.PageHeading = page.locator('h1');

    this.DoorListButton = page.getByRole('button', {name: 'Door List'});
    this.EventsButton = page.getByRole('button', {name: 'Events'});
    this.PurchaseTicketsButton = page.getByRole('button', {
      name: 'Purchase Tickets',
    });
    this.SeasonsButton = page.getByRole('button', {name: 'Seasons'});
    this.RefundOrdersButton = page.getByRole('button', {
      name: 'Refund Orders',
    });
    this.ManageTicketTypesButton = page.getByRole('button', {
      name: 'Manage Ticket & Subscription Types',
    });
    this.ManageDiscountCodesButton = page.getByRole('button', {
      name: 'Manage Discount Codes',
    });
    this.CreateNewsletterButton = page.getByRole('button', {
      name: 'Create Newsletter',
    });
    this.SubscriptionRedemptionButton = page.getByRole('button', {
      name: 'Subscription Redemption',
    });
    this.TicketExchangesButton = page.getByRole('button', {
      name: 'Ticket Exchanges',
    });
  }

  async goTo() {
    await this.page.goto('/ticketing', {timeout: 60000});
  }

  async clickDashboardButton(buttonTitle: string) {
    await this.page.getByRole('button', {name: buttonTitle}).click();
  }

  async getPageHeading() {
    return await this.PageHeading.textContent();
  }
}

export const DashboardButtons = {
  DoorList: 'Door List',
  Events: 'Events',
  PurchaseTickets: 'Purchase Tickets',
  Seasons: 'Seasons',
  RefundOrders: 'Refund Orders',
  TicketTypes: 'Manage Ticket & Subscription Types',
  DiscountCodes: 'Manage Discount Codes',
  Newsletters: 'Create Newsletter',
  SubscriptionRedemption: 'Subscription Redemption',
  TicketExchanges: 'Ticket Exchanges',
};

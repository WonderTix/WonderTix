import {type Locator, type Page, expect} from '@playwright/test';

export class DashboardPage {
  readonly page: Page;

  // Homepage
  readonly EmailButton: Locator;
  readonly ManageTicketing: Locator;

  // ../ticketing
  readonly TicketingHeading: Locator;
  readonly DoorListButton: Locator;
  readonly EventsButton: Locator;
  readonly PurchaseTicketsButton: Locator;
  readonly SeasonsButton: Locator;
  readonly CreateNewsletterButton: Locator;
  readonly ManageSeasonalTicketsButton: Locator;
  readonly ManageTicketTypesButton: Locator;
  readonly TicketExchangesButton: Locator;
  readonly RefundOrdersButton: Locator;

  readonly DashboardButton: Locator;

  constructor(page: Page) {
    this.page = page;

    // HOMEPAGE
    this.EmailButton = page.getByText('test@wondertix.com');
    this.ManageTicketing = page.getByText('Manage Ticketing').first();

    // ..//ticketing
    this.TicketingHeading = page.getByRole('heading', {
      name: 'Ticketing Dashboard',
    });
    this.DoorListButton = page.getByRole('button', {name: 'Door List'});
    this.EventsButton = page.getByRole('button', {name: 'Events'});
    this.PurchaseTicketsButton = page.getByRole('button', {
      name: 'Purchase Tickets',
    });
    this.SeasonsButton = page.getByRole('button', {name: 'Seasons'});
    this.CreateNewsletterButton = page.getByRole('button', {
      name: 'Create Newsletter',
    });
    this.ManageSeasonalTicketsButton = page.getByRole('button', {
      name: 'Manage Seasonal Tickets',
    });
    this.ManageTicketTypesButton = page.getByRole('button', {
      name: 'Manage Ticket Types',
    });
    this.TicketExchangesButton = page.getByRole('button', {
      name: 'Ticket Exchanges',
    });
    this.RefundOrdersButton = page.getByRole('button', {
      name: 'Refund Orders',
    });

    // Left sidebar
    this.DashboardButton = page
      .getByRole('list')
      .locator('a')
      .filter({hasText: 'Dashboard'});
  }

  async goto() {
    await this.page.goto('/', {timeout: 90000});
    await this.EmailButton.click();
    await this.ManageTicketing.click();
  }

  async ticketingURL() {
    await this.page.goto('/ticketing', {timeout: 90000});
  }

  async backToDashboard() {
    await this.DashboardButton.click();
    await expect(this.TicketingHeading).toBeVisible();
    await expect(this.page).toHaveURL('/ticketing');
  }

  async DoorList() {
    await this.goto();
    await this.DoorListButton.click();
    await expect(
      this.page.getByRole('heading', {name: 'Door List'}),
    ).toBeVisible();
    await expect(this.page).toHaveURL('/ticketing/doorlist');
    await this.backToDashboard();
  }
  async Events() {
    await this.goto();
    await this.EventsButton.click();
    await expect(
      this.page.getByRole('heading', {name: 'Select Event'}),
    ).toBeVisible();
    await expect(this.page).toHaveURL('/ticketing/showings');
    await this.backToDashboard();
  }
  async PurchaseTickets() {
    await this.goto();
    await this.PurchaseTicketsButton.click();
    await expect(
      this.page.getByRole('heading', {name: 'Purchase Tickets'}),
    ).toBeVisible();
    await expect(this.page).toHaveURL('/ticketing/purchaseticket');
    await this.backToDashboard();
  }
  async Seasons() {
    await this.goto();
    await this.SeasonsButton.click();
    await expect(
      this.page.getByRole('heading', {name: 'Select Season'}),
    ).toBeVisible();
    await expect(this.page).toHaveURL('/ticketing/seasons');
    await this.backToDashboard();
  }
  async CreateNewsletter() {
    await this.goto();
    await this.CreateNewsletterButton.click();
    await expect(
      this.page.getByRole('heading', {name: 'Newsletter Creation!'}),
    ).toBeVisible();
    await expect(this.page).toHaveURL('/ticketing/addnewsletter');
    await this.backToDashboard();
  }
  async ManageSeasonalTickets() {
    await this.goto();
    await this.ManageSeasonalTicketsButton.click();
    await expect(
      this.page.getByRole('img', {name: '404 error image'}),
    ).toBeVisible();
    await expect(this.page).toHaveURL('/ticketing/seasonaltickets');
    await this.page.goto('/ticketing', {timeout: 90000});
  }
  async ManageTicketTypes() {
    await this.goto();
    await this.ManageTicketTypesButton.click();
    await expect(
      this.page.getByRole('heading', {name: 'Manage Ticket Types'}),
    ).toBeVisible();
    await expect(this.page).toHaveURL('/ticketing/tickettypes');
    await this.backToDashboard();
  }
  async TicketExchanges() {
    await this.goto();
    await this.TicketExchangesButton.click();
    await expect(
      this.page.getByRole('heading', {name: 'Ticket Exchanges'}),
    ).toBeVisible();
    await expect(this.page).toHaveURL('/ticketing/ticketexchanges');
    await this.backToDashboard();
  }
  async RefundOrders() {
    await this.goto();
    await this.RefundOrdersButton.click();
    await expect(
      this.page.getByRole('heading', {name: 'Refund Order'}),
    ).toBeVisible();
    await expect(this.page).toHaveURL('/ticketing/refund');
    await this.backToDashboard();
  }
}

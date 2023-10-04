import { type Locator, type Page ,expect} from '@playwright/test';

export class DashboardPage {
  readonly page: Page;

  //Homepage
  readonly EmailButton: Locator;
  readonly ManageTicketing: Locator;

  //../ticketing
  readonly TicketingHeading: Locator;
  readonly DoorListButton: Locator;
  readonly EventsButton: Locator;
  readonly PurchaseTicketsButton: Locator;
  readonly CreateNewsletterButton: Locator;
  readonly ManageSeasonalTicketsButton: Locator;
  readonly ManageTicketTypesButton: Locator;
  readonly TicketExchangesButton: Locator;

  readonly DashboardButton: Locator;
  

  constructor(page: Page) {

    this.page = page;

    //HOMEPAGE
    this.EmailButton = page.getByText('test@wondertix.com');
    this.ManageTicketing = page.getByText('Manage Ticketing').first();

    //..//ticketing
    this.TicketingHeading = page.getByRole('heading', { name: 'Ticketing Dashboard' });
    this.DoorListButton = page.getByRole('button', { name: 'Door List' });
    this.EventsButton = page.getByRole('button', { name: 'Events' });
    this.PurchaseTicketsButton = page.getByRole('button', { name: 'Purchase Tickets' });
    this.CreateNewsletterButton = page.getByRole('button', { name: 'Create Newsletter' });
    this.ManageSeasonalTicketsButton = page.getByRole('button', { name: 'Manage Seasonal Tickets' });
    this.ManageTicketTypesButton = page.getByRole('button', { name: 'Manage Ticket Types' });
    this.TicketExchangesButton = page.getByRole('heading', { name: 'Ticket Exchanges' });
  
    //Left sidebar
    this.DashboardButton = page.getByRole('list').locator('a').filter({ hasText: 'Dashboard' });
  }

  async goto(){
    await this.page.goto('/', { timeout: 90000 });
    await this.EmailButton.click();
    await this.ManageTicketing.click();
  }

  async ticketingURL(){
    await this.page.goto('/ticketing', { timeout: 90000 });
  }

  async backtoDashboard(){
    await this.DashboardButton.click();
  }

}
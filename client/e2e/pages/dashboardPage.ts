import { type Locator, type Page } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;

  //Homepage
  readonly EmailButton: Locator;
  readonly ManageTicketing: Locator;

  //../ticketing
  readonly TicketingHeading: Locator;
  readonly DoorListbutton: Locator;
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
    this.DoorListbutton = page.getByRole('button', { name: 'Door List' });
    this.EventsButton = page.getByRole('button', { name: 'Events' });
    this.PurchaseTicketsButton = page.getByRole('button', { name: 'Purchase Tickets' });
    this.CreateNewsletterButton = page.getByRole('button', { name: 'Create Newsletter' });
    this.ManageSeasonalTicketsButton = page.getByRole('button', { name: 'Manage Seasonal Tickets' });
    this.ManageTicketTypesButton = page.getByRole('button', { name: 'Manage Ticket Types' });
    this.TicketExchangesButton = page.getByRole('heading', { name: 'Ticket Exchanges' });
  
    //
    this.DashboardButton = page.getByRole('list').locator('a').filter({ hasText: 'Dashboard' });
  }

  async goto(){
    await this.page.goto('/', { timeout: 90000 });
    await this.EmailButton.click();
    await this.ManageTicketing.click();
  }

  async backtoDashboard(){
    await this.DashboardButton.click();
  }

  async DoorList(){
    await this.DoorListbutton.click();
    await this.backtoDashboard();
  }

  async Events(){
    await this.EventsButton.click();
    await this.backtoDashboard();
  }

  async PurchaseTickets(){
    await this.PurchaseTicketsButton.click();
    await this.page.goto('/ticketing',{timeout: 90000});
  }

  async CreateNewsletter(){
    await this.CreateNewsletterButton.click();
    await this.backtoDashboard();
  }

  async ManageSeasonalTickets(){
    await this.ManageSeasonalTicketsButton.click();
    await this.page.goto('/ticketing',{timeout: 90000});
  }

  async ManageTicketTypes(){
    await this.ManageTicketTypesButton.click();
    await this.backtoDashboard();
  }

  async TicketExchanges(){
    await this.TicketExchangesButton.click();
    await this.backtoDashboard();
  }

  async TicketingDashboard(){
    await this.goto();
    await this.DoorList();
    await this.Events();
    await this.PurchaseTickets();
    await this.CreateNewsletter();
    await this.ManageSeasonalTickets();
    await this.ManageTicketTypes();
    await this.TicketExchanges();
  }
}
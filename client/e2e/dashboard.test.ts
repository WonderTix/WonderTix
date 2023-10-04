import {test , expect} from '@playwright/test';
import {DashboardPage} from './pages/dashboardPage';

test('Homepage->Ticketing Dashboard',async({page}) => {
  const dashboard = new DashboardPage(page);

  await dashboard.goto();
  await expect(dashboard.TicketingHeading).toBeVisible();
  await expect(dashboard.page).toHaveURL('/ticketing');
});

test('Ticketing Dashboard->Door List',async({page}) => {
  const dashboard = new DashboardPage(page);

  await dashboard.goto();
  await dashboard.DoorListButton.click();
  await expect(dashboard.page.getByRole('heading', { name: 'Door List' })).toBeVisible();
  await expect(dashboard.page).toHaveURL('/ticketing/doorlist');
  await dashboard.backtoDashboard();
  await expect(dashboard.TicketingHeading).toBeVisible();
  await expect(dashboard.page).toHaveURL('/ticketing');
});

test('Ticketing Dashboard->Events',async({page}) => {
  const dashboard = new DashboardPage(page);

  await dashboard.goto();
  await dashboard.EventsButton.click();
  await expect(dashboard.page.getByRole('heading', { name: 'Select Event' })).toBeVisible();
  await expect(dashboard.page).toHaveURL('/ticketing/showings');
  await dashboard.backtoDashboard();
  await expect(dashboard.TicketingHeading).toBeVisible();
  await expect(dashboard.page).toHaveURL('/ticketing');
});

test('Ticketing Dashboard->PurchaseTickets',async({page}) => {
  const dashboard = new DashboardPage(page);

  await dashboard.goto();
  await dashboard.PurchaseTicketsButton.click();
  await expect(dashboard.page.getByRole('img', { name: '404 error image' })).toBeVisible();
  await expect(dashboard.page).toHaveURL('/ticketing/purchaseticket');
  await dashboard.ticketingURL();
  await expect(dashboard.TicketingHeading).toBeVisible();
  await expect(dashboard.page).toHaveURL('/ticketing');
});

test('Ticketing Dashboard->CreateNewsletter',async({page}) => {
  const dashboard = new DashboardPage(page);

  await dashboard.goto();
  await dashboard.CreateNewsletterButton.click();
  await expect(dashboard.page.getByRole('heading', { name: 'Newsletter Creation!' })).toBeVisible();
  await expect(dashboard.page).toHaveURL('/ticketing/addnewsletter');
  await dashboard.backtoDashboard();
  await expect(dashboard.TicketingHeading).toBeVisible();
  await expect(dashboard.page).toHaveURL('/ticketing');
});

test('Ticketing Dashboard->ManageSeasonalTickets',async({page}) => {
  const dashboard = new DashboardPage(page);

  await dashboard.goto();
  await dashboard.ManageSeasonalTicketsButton.click();
  await expect(dashboard.page.getByRole('img', { name: '404 error image' })).toBeVisible();
  await expect(dashboard.page).toHaveURL('/ticketing/seasonaltickets');
  await dashboard.ticketingURL();
  await expect(dashboard.TicketingHeading).toBeVisible();
  await expect(dashboard.page).toHaveURL('/ticketing');
});

test('Ticketing Dashboard->ManageTicketTypes',async({page}) => {
  const dashboard = new DashboardPage(page);

  await dashboard.goto();
  await dashboard.ManageTicketTypesButton.click();
  await expect(dashboard.page.getByRole('heading', { name: 'Manage Ticket Types' })).toBeVisible();
  await expect(dashboard.page).toHaveURL('/ticketing/tickettypes');
  await dashboard.backtoDashboard();
  await expect(dashboard.TicketingHeading).toBeVisible();
  await expect(dashboard.page).toHaveURL('/ticketing');
});

test('Ticketing Dashboard->TicketExchanges',async({page}) => {
  const dashboard = new DashboardPage(page);

  await dashboard.goto();
  await dashboard.TicketExchangesButton.click();
  await expect(dashboard.page.getByRole('heading', { name: 'Ticket Exchanges' })).toBeVisible();
  await expect(dashboard.page).toHaveURL('/ticketing/ticketexchanges');
  await dashboard.backtoDashboard();
  await expect(dashboard.TicketingHeading).toBeVisible();
  await expect(dashboard.page).toHaveURL('/ticketing');
});
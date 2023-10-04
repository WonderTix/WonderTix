import {test , expect} from '@playwright/test';
import {DashboardPage} from './pages/dashboardPage';

test('Homepage->Ticketing Dashboard',async({page}) => {
  test.setTimeout(180000);

  const dashboard = new DashboardPage(page);

  await dashboard.goto();
  await expect(dashboard.TicketingHeading).toBeVisible();
  await expect(dashboard.page).toHaveURL('/ticketing');
});

test('Ticketing Dashboard->Door List',async({page}) => {
  test.setTimeout(180000);

  const dashboard = new DashboardPage(page);

  await dashboard.goto();
  await dashboard.DoorList();
  await expect(dashboard.page.getByRole('heading', { name: 'Door List' })).toBeVisible();
  await expect(dashboard.page).toHaveURL('/ticketing/doorlist');
  await dashboard.backtoDashboard();
  await expect(dashboard.TicketingHeading).toBeVisible();
  await expect(dashboard.page).toHaveURL('/ticketing');
});

test('Ticketing Dashboard->Events',async({page}) => {
  test.setTimeout(180000);

  const dashboard = new DashboardPage(page);

  await dashboard.goto();
  await dashboard.Events();
  await expect(dashboard.page.getByRole('heading', { name: 'Select Event' })).toBeVisible();
  await expect(dashboard.page).toHaveURL('/ticketing/showings');
  await dashboard.backtoDashboard();
  await expect(dashboard.TicketingHeading).toBeVisible();
  await expect(dashboard.page).toHaveURL('/ticketing');
});

test('Ticketing Dashboard->PurchaseTickets',async({page}) => {
  test.setTimeout(180000);

  const dashboard = new DashboardPage(page);

  await dashboard.goto();
  await dashboard.PurchaseTickets();
  await expect(dashboard.page.getByRole('img', { name: '404 error image' })).toBeVisible();
  await expect(dashboard.page).toHaveURL('/ticketing/purchaseticket');
  await dashboard.ticketingURL();
  await expect(dashboard.TicketingHeading).toBeVisible();
  await expect(dashboard.page).toHaveURL('/ticketing');
});

test('Ticketing Dashboard->CreateNewsletter',async({page}) => {
  test.setTimeout(180000);

  const dashboard = new DashboardPage(page);

  await dashboard.goto();
  await dashboard.CreateNewsletter();
  await expect(dashboard.page.getByRole('heading', { name: 'Newsletter Creation!' })).toBeVisible();
  await expect(dashboard.page).toHaveURL('/ticketing/addnewsletter');
  await dashboard.backtoDashboard();
  await expect(dashboard.TicketingHeading).toBeVisible();
  await expect(dashboard.page).toHaveURL('/ticketing');
});

test('Ticketing Dashboard->ManageSeasonalTickets',async({page}) => {
  test.setTimeout(180000);

  const dashboard = new DashboardPage(page);

  await dashboard.goto();
  await dashboard.ManageSeasonalTickets();
  await expect(dashboard.page.getByRole('img', { name: '404 error image' })).toBeVisible();
  await expect(dashboard.page).toHaveURL('/ticketing/seasonaltickets');
  await dashboard.ticketingURL();
  await expect(dashboard.TicketingHeading).toBeVisible();
  await expect(dashboard.page).toHaveURL('/ticketing');
});

test('Ticketing Dashboard->ManageTicketTypes',async({page}) => {
  test.setTimeout(180000);

  const dashboard = new DashboardPage(page);

  await dashboard.goto();
  await dashboard.ManageTicketTypes();
  await expect(dashboard.page.getByRole('heading', { name: 'Manage Ticket Types' })).toBeVisible();
  await expect(dashboard.page).toHaveURL('/ticketing/tickettypes');
  await dashboard.backtoDashboard();
  await expect(dashboard.TicketingHeading).toBeVisible();
  await expect(dashboard.page).toHaveURL('/ticketing');
});

test('Ticketing Dashboard->TicketExchanges',async({page}) => {
  test.setTimeout(180000);

  const dashboard = new DashboardPage(page);

  await dashboard.goto();
  await dashboard.TicketExchanges();
  await expect(dashboard.page.getByRole('heading', { name: 'Ticket Exchanges' })).toBeVisible();
  await expect(dashboard.page).toHaveURL('/ticketing/ticketexchanges');
  await dashboard.backtoDashboard();
  await expect(dashboard.TicketingHeading).toBeVisible();
  await expect(dashboard.page).toHaveURL('/ticketing');
});
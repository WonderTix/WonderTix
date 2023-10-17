import {test, expect} from '@playwright/test';
import {DashboardPage} from './pages/dashboardPage';

test('Homepage->Ticketing Dashboard', async ({page}) => {
  const dashboard = new DashboardPage(page);

  await dashboard.goto();
  await expect(dashboard.TicketingHeading).toBeVisible();
  await expect(dashboard.page).toHaveURL('/ticketing');
});

test('Ticketing Dashboard->Door List', async ({page}) => {
  const dashboard = new DashboardPage(page);

  await dashboard.DoorList();
  await dashboard.backtoDashboard();
});

test('Ticketing Dashboard->Events', async ({page}) => {
  const dashboard = new DashboardPage(page);

  await dashboard.Events();
  await dashboard.backtoDashboard();
});

test('Ticketing Dashboard->PurchaseTickets', async ({page}) => {
  const dashboard = new DashboardPage(page);

  await dashboard.PurchaseTickets();
  await dashboard.ticketingURL();
});

test('Ticketing Dashboard->CreateNewsletter', async ({page}) => {
  const dashboard = new DashboardPage(page);

  await dashboard.CreateNewsletter();
  await dashboard.backtoDashboard();
});

test('Ticketing Dashboard->ManageSeasonalTickets', async ({page}) => {
  const dashboard = new DashboardPage(page);

  await dashboard.ManageSeasonalTickets();
});

test('Ticketing Dashboard->ManageTicketTypes', async ({page}) => {
  const dashboard = new DashboardPage(page);

  await dashboard.ManageTicketTypes();
  await dashboard.backtoDashboard();
});

test('Ticketing Dashboard->TicketExchanges', async ({page}) => {
  const dashboard = new DashboardPage(page);

  await dashboard.TicketExchanges();
  await dashboard.backtoDashboard();
});

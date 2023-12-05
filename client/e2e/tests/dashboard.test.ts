import {test, expect} from '@playwright/test';
import {DashboardPage} from '../pages/dashboardPage';

test('Homepage->Ticketing Dashboard', async ({page}) => {
  const dashboard = new DashboardPage(page);

  await dashboard.goto();
  await expect(dashboard.TicketingHeading).toBeVisible();
  await expect(dashboard.page).toHaveURL('/ticketing');
});

test('Ticketing Dashboard->DoorList', async ({page}) => {
  const dashboard = new DashboardPage(page);

  await dashboard.doorList();
  await dashboard.backToDashboard();
});

test('Ticketing Dashboard->Events', async ({page}) => {
  const dashboard = new DashboardPage(page);

  await dashboard.events();
  await dashboard.backToDashboard();
});

test('Ticketing Dashboard->PurchaseTickets', async ({page}) => {
  const dashboard = new DashboardPage(page);

  await dashboard.purchaseTickets();
  await dashboard.ticketingURL();
});

test('Ticketing Dashboard->Seasons', async ({page}) => {
  const dashboard = new DashboardPage(page);

  await dashboard.seasons();
  await dashboard.ticketingURL();
});

test('Ticketing Dashboard->CreateNewsletter', async ({page}) => {
  const dashboard = new DashboardPage(page);

  await dashboard.createNewsletter();
  await dashboard.backToDashboard();
});

test('Ticketing Dashboard->ManageSeasonalTickets', async ({page}) => {
  const dashboard = new DashboardPage(page);

  await dashboard.manageSeasonalTickets();
});

test('Ticketing Dashboard->ManageTicketTypes', async ({page}) => {
  const dashboard = new DashboardPage(page);

  await dashboard.manageTicketTypes();
  await dashboard.backToDashboard();
});

test('Ticketing Dashboard->TicketExchanges', async ({page}) => {
  const dashboard = new DashboardPage(page);

  await dashboard.ticketExchanges();
  await dashboard.backToDashboard();
});

test('Ticketing Dashboard->RefundOrders', async ({page}) => {
  const dashboard = new DashboardPage(page);

  await dashboard.refundOrders();
  await dashboard.backToDashboard();
});

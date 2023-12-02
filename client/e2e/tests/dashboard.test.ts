import { test, expect } from '@playwright/test';
import { DashboardPage } from '../pages/dashboardPage';

test('Homepage->Ticketing Dashboard', async ({page}) => {
  const dashboard = new DashboardPage(page);

  await dashboard.goto();
  await expect(dashboard.TicketingHeading).toBeVisible();
  await expect(dashboard.page).toHaveURL('/ticketing');
});

test('Ticketing Dashboard->DoorList', async ({page}) => {
  const dashboard = new DashboardPage(page);

  await dashboard.DoorList();
  await dashboard.backToDashboard();
});

test('Ticketing Dashboard->Events', async ({page}) => {
  const dashboard = new DashboardPage(page);

  await dashboard.Events();
  await dashboard.backToDashboard();
});

test('Ticketing Dashboard->PurchaseTickets', async ({page}) => {
  const dashboard = new DashboardPage(page);

  await dashboard.PurchaseTickets();
  await dashboard.ticketingURL();
});

test('Ticketing Dashboard->Seasons', async ({page}) => {
  const dashboard = new DashboardPage(page);

  await dashboard.Seasons();
  await dashboard.ticketingURL();
});

test('Ticketing Dashboard->CreateNewsletter', async ({page}) => {
  const dashboard = new DashboardPage(page);

  await dashboard.CreateNewsletter();
  await dashboard.backToDashboard();
});

test('Ticketing Dashboard->ManageSeasonalTickets', async ({page}) => {
  const dashboard = new DashboardPage(page);

  await dashboard.ManageSeasonalTickets();
});

test('Ticketing Dashboard->ManageTicketTypes', async ({page}) => {
  const dashboard = new DashboardPage(page);

  await dashboard.ManageTicketTypes();
  await dashboard.backToDashboard();
});

test('Ticketing Dashboard->TicketExchanges', async ({page}) => {
  const dashboard = new DashboardPage(page);

  await dashboard.TicketExchanges();
  await dashboard.backToDashboard();
});

test('Ticketing Dashboard->RefundOrders', async ({page}) => {
  const dashboard = new DashboardPage(page);

  await dashboard.RefundOrders();
  await dashboard.backToDashboard();
});

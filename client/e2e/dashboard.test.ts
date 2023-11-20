import {test , expect} from '@playwright/test';
import {DashboardPage} from './pages/dashboardPage';

test('Homepage->Ticketing Dashboard',async({page}) => {
  const dashboard = new DashboardPage(page);

  await dashboard.goto();
  await expect(dashboard.TicketingHeading).toBeVisible();
  await expect(dashboard.page).toHaveURL('/ticketing');
});

<<<<<<< HEAD
test('Ticketing Dashboard->Door List',async({page}) => {
  const dashboard = new DashboardPage(page);

  await dashboard.DoorList();
  await dashboard.backtoDashboard();
  
=======
test('Ticketing Dashboard->DoorList', async ({page}) => {
  const dashboard = new DashboardPage(page);

  await dashboard.DoorList();
  await dashboard.backToDashboard();
>>>>>>> origin/main
});

test('Ticketing Dashboard->Events',async({page}) => {
  const dashboard = new DashboardPage(page);

  await dashboard.Events();
  await dashboard.backToDashboard();
});

test('Ticketing Dashboard->PurchaseTickets',async({page}) => {
  const dashboard = new DashboardPage(page);

  await dashboard.PurchaseTickets();
  await dashboard.ticketingURL();
});

<<<<<<< HEAD
test('Ticketing Dashboard->CreateNewsletter',async({page}) => {
=======
test('Ticketing Dashboard->Seasons', async ({page}) => {
  const dashboard = new DashboardPage(page);

  await dashboard.Seasons();
  await dashboard.ticketingURL();
});

test('Ticketing Dashboard->CreateNewsletter', async ({page}) => {
>>>>>>> origin/main
  const dashboard = new DashboardPage(page);

  await dashboard.CreateNewsletter();
  await dashboard.backToDashboard();
});

test('Ticketing Dashboard->ManageSeasonalTickets',async({page}) => {
  const dashboard = new DashboardPage(page);

  await dashboard.ManageSeasonalTickets();
});

test('Ticketing Dashboard->ManageTicketTypes',async({page}) => {
  const dashboard = new DashboardPage(page);

  await dashboard.ManageTicketTypes();
  await dashboard.backToDashboard();
});

test('Ticketing Dashboard->TicketExchanges',async({page}) => {
  const dashboard = new DashboardPage(page);

  await dashboard.TicketExchanges();
<<<<<<< HEAD
  await dashboard.backtoDashboard();
});
=======
  await dashboard.backToDashboard();
});

test('Ticketing Dashboard->RefundOrders', async ({page}) => {
  const dashboard = new DashboardPage(page);

  await dashboard.RefundOrders();
  await dashboard.backToDashboard();
});
>>>>>>> origin/main

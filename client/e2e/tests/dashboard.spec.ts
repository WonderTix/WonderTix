import {test, expect} from '@playwright/test';
import {DashboardPage, DashboardButtons} from '../pages/dashboardPage';

test('Homepage->Ticketing Dashboard', async ({page}) => {
  const dashboard = new DashboardPage(page);

  await dashboard.goTo();
  await expect(dashboard.TicketingDashboardHeading).toBeVisible();
  await expect(dashboard.page).toHaveURL('/ticketing');
});

test('Ticketing Dashboard->DoorList', async ({page}) => {
  const dashboard = new DashboardPage(page);

  await dashboard.goTo();
  await dashboard.clickDashboardButton(DashboardButtons.DoorList);
  expect(dashboard.getPageHeading, 'Door List');
  await expect(dashboard.page).toHaveURL('/ticketing/doorlist');
});

test('Ticketing Dashboard->Events', async ({page}) => {
  const dashboard = new DashboardPage(page);

  await dashboard.goTo();
  await dashboard.clickDashboardButton(DashboardButtons.Events);
  expect(dashboard.getPageHeading, 'Events');
  await expect(dashboard.page).toHaveURL('/ticketing/events');
});

test('Ticketing Dashboard->PurchaseTickets', async ({page}) => {
  const dashboard = new DashboardPage(page);

  await dashboard.goTo();
  await dashboard.clickDashboardButton(DashboardButtons.PurchaseTickets);
  expect(dashboard.getPageHeading, 'Purchase Tickets');
  await expect(dashboard.page).toHaveURL('/ticketing/purchaseticket');
});

test('Ticketing Dashboard->Seasons', async ({page}) => {
  const dashboard = new DashboardPage(page);

  await dashboard.goTo();
  await dashboard.clickDashboardButton(DashboardButtons.Seasons);
  expect(dashboard.getPageHeading, 'Seasons');
  await expect(dashboard.page).toHaveURL('/ticketing/seasons');
});

test('Ticketing Dashboard->RefundOrders', async ({page}) => {
  const dashboard = new DashboardPage(page);

  await dashboard.goTo();
  await dashboard.clickDashboardButton(DashboardButtons.RefundOrders);
  expect(dashboard.getPageHeading, 'Refund Orders');
  await expect(dashboard.page).toHaveURL('/ticketing/refund');
});

test('Ticketing Dashboard->ManageTicketAndSubscriptionTypes', async ({page}) => {
  const dashboard = new DashboardPage(page);

  await dashboard.goTo();
  await dashboard.clickDashboardButton(DashboardButtons.TicketTypes);
  expect(dashboard.getPageHeading, 'Manage Ticket Types');
  await expect(dashboard.page).toHaveURL('/ticketing/tickettypes');
});

test('Ticketing Dashboard->DiscountCodes', async ({page}) => {
  const dashboard = new DashboardPage(page);

  await dashboard.goTo();
  await dashboard.clickDashboardButton(DashboardButtons.DiscountCodes);
  expect(dashboard.getPageHeading, 'Manage Discount Codes');
  await expect(dashboard.page).toHaveURL('/ticketing/discountcodes');
});

test('Ticketing Dashboard->CreateNewsletter', async ({page}) => {
  const dashboard = new DashboardPage(page);

  await dashboard.goTo();
  await dashboard.clickDashboardButton(DashboardButtons.Newsletters);
  expect(dashboard.getPageHeading, 'Newsletter Creation!');
  await expect(dashboard.page).toHaveURL('/ticketing/addnewsletter');
});

test('Ticketing Dashboard->SubscriptionRedemption', async ({page}) => {
  const dashboard = new DashboardPage(page);

  await dashboard.goTo();
  await dashboard.clickDashboardButton(DashboardButtons.SubscriptionRedemption);
  expect(dashboard.getPageHeading, 'Subscription Redemption');
  await expect(dashboard.page).toHaveURL('/ticketing/subscription/redemption');
});

test('Ticketing Dashboard->TicketExchanges', async ({page}) => {
  const dashboard = new DashboardPage(page);

  await dashboard.goTo();
  await dashboard.clickDashboardButton(DashboardButtons.TicketExchanges);
  expect(dashboard.getPageHeading, 'Ticket Exchanges');
  await expect(dashboard.page).toHaveURL('/ticketing/ticketexchanges');
});

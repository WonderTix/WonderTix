/* eslint-disable require-jsdoc */
import {test, expect} from '@playwright/test';
import {EventsPage} from '../pages/EventsPage';
import {AdminPurchasePage} from '../pages/AdminPurchasePage';
import {EVENT_INFO_1} from '../testData/EventInfo';
import {SHOWING_INFO_2} from '../testData/ShowingInfo';
import {JANE_DOE} from '../testData/CustomerInfo';
import {VALID_VISA_CREDIT} from '../testData/CreditCard';

test('Open admin purchase page', async ({page}) => {
  const adminPage = new AdminPurchasePage(page);
  await adminPage.goTo();
});

test('Open ticketing page', async ({page}) => {
  const adminPage = new AdminPurchasePage(page);
  await adminPage.goToTicketing();
});

test('Purchase ticket for customer as admin', async ({page}, testInfo) => {
  const timeoutAdd = testInfo.retry * 5000;
  test.setTimeout(80000 + (timeoutAdd * 2));

  const adminPage = new AdminPurchasePage(page);
  const events = new EventsPage(page);
  await events.goto();
  await events.addnewevent(EVENT_INFO_1);
  await events.activateEvent();
  await events.addNewShowing(SHOWING_INFO_2);

  try {
    await adminPage.purchaseTicket(EVENT_INFO_1.eventName, SHOWING_INFO_2.showingWholeDate, VALID_VISA_CREDIT, JANE_DOE);
    await expect(adminPage.purchaseSuccessful).toBeVisible({timeout: 15000 + timeoutAdd});
  } finally {
    await adminPage.goToHome();
    await events.goToEventFromManage(EVENT_INFO_1);
    await events.deleteTheEvent(EVENT_INFO_1);
  }
});

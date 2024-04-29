import {test, expect} from '@playwright/test';
import {EventsPage} from '../pages/eventsPage';
import {AdminPurchasePage} from '../pages/adminPurchasePage';
import {EVENT_INFO_1} from '../testData/EventInfo';
import {SHOWING_INFO_2} from '../testData/ShowingInfo';
import {CustomerInfo, JANE_DOE} from '../testData/CustomerInfo';
import {VALID_VISA_CREDIT} from '../testData/CreditCard';

test('Purchase ticket for customer as admin', async ({page}, testInfo) => {
  const timeoutAdd = testInfo.retry * 5000;
  test.setTimeout(80000 + (timeoutAdd * 2));

  const adminPage = new AdminPurchasePage(page);
  const events = new EventsPage(page);
  const customer = new CustomerInfo(JANE_DOE);
  try {
    // Add event and showing
    await events.goTo();
    await events.addNewEvent(EVENT_INFO_1);
    await events.activateEvent();
    await events.addNewShowing(SHOWING_INFO_2);

    // Purchase ticket
    await adminPage.goTo();
    await adminPage.purchaseTicket(EVENT_INFO_1.eventName, SHOWING_INFO_2.showingWholeDate, VALID_VISA_CREDIT, customer);
    await expect(adminPage.purchaseSuccessfulScreen).toBeVisible({timeout: 15000 + timeoutAdd});
  } finally {
    // Remove added event
    await adminPage.goToHome();
    await events.goToEventFromManage(EVENT_INFO_1);
    await events.deleteTheEvent();
  }
});

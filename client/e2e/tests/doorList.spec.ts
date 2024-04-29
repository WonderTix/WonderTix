import {test, expect} from '@playwright/test';
import {DoorListPage} from '../pages/doorListPage';
import {EventsPage} from '../pages/eventsPage';
import {MainPage} from '../pages/mainPage';
import {EventInfo, EVENT_INFO_1} from '../testData/EventInfo';
import {SHOWING_INFO_1} from '../testData/ShowingInfo';
import {CustomerInfo, JANE_DOE} from '../testData/CustomerInfo';
import {VALID_VISA_CREDIT} from '../testData/CreditCard';

test('Select Active Showing in Doorlist', async ({page}) => {
  const currentEvent = new EventInfo(EVENT_INFO_1);
  const eventsPage = new EventsPage(page);
  const doorList = new DoorListPage(page);

  try {
    // Add event and showing to check from within the door list
    await eventsPage.goTo();
    await eventsPage.addNewEvent(currentEvent);
    await eventsPage.activateEvent();
    await eventsPage.addNewShowing(SHOWING_INFO_1);

    // Check door list
    await doorList.goTo();
    await doorList.searchShowing(currentEvent, SHOWING_INFO_1);

    await expect(doorList.showingTitle).toHaveText(
      `Showing: ${currentEvent.eventName}`,
    );
    await expect(doorList.showingTime).toHaveText(
      `${SHOWING_INFO_1.showingWholeDate}, ${SHOWING_INFO_1.showingTime12hour}`,
    );
  } finally {
    // Remove the added event
    await doorList.goHome();
    await eventsPage.goToEventFromManage(currentEvent);
    await eventsPage.deleteTheEvent();
  }
});

test('Select Inactive Showing in Doorlist', async ({page}) => {
  const currentEvent = new EventInfo(EVENT_INFO_1);
  const eventsPage = new EventsPage(page);
  const doorList = new DoorListPage(page);

  try {
    // Add event and showing to check for in the door list
    await eventsPage.goTo();
    await eventsPage.addNewEvent(currentEvent);
    await eventsPage.addNewShowing(SHOWING_INFO_1);

    // Check door list
    await doorList.goTo();
    await doorList.setAllView();
    await doorList.searchShowing(currentEvent, SHOWING_INFO_1);

    await expect(doorList.showingTitle).toHaveText(
      `Showing: ${currentEvent.eventName}`,
    );
    await expect(doorList.showingTime).toHaveText(
      `${SHOWING_INFO_1.showingWholeDate}, ${SHOWING_INFO_1.showingTime12hour}`,
    );
  } finally {
    // Remove the added event
    await doorList.goHome();
    await eventsPage.goToInactiveEventFromManage(currentEvent);
    await eventsPage.deleteTheEvent();
  }
});

test('See Purchased Seats in Doorlist', async ({page}, testInfo) => {
  const timeoutAdd = testInfo.retry * 5000;
  test.setTimeout(80000 + timeoutAdd);

  const eventsPage = new EventsPage(page);
  const mainPage = new MainPage(page);
  const doorList = new DoorListPage(page);

  const currentEvent = new EventInfo(EVENT_INFO_1);
  const currentPatron = new CustomerInfo(JANE_DOE);
  const ticketQuantity = 3;

  try {
    // Add event and showing to check for in the door list
    await eventsPage.goTo();
    await eventsPage.addNewEvent(currentEvent);
    await eventsPage.activateEvent();
    await eventsPage.addNewShowing(SHOWING_INFO_1);

    // Purchase tickets
    await mainPage.goTo();
    await mainPage.purchaseTicket(
      currentPatron,
      VALID_VISA_CREDIT,
      currentEvent,
      {timeoutAdd: timeoutAdd, qty: ticketQuantity},
    );

    // Check door list
    await doorList.goTo();
    await doorList.searchShowing(currentEvent, SHOWING_INFO_1);
    await expect(
      doorList.getCustomerRow(currentPatron, ticketQuantity),
    ).toBeVisible();
  } finally {
    // Remove the added event
    await doorList.goHome();
    await eventsPage.goToEventFromManage(currentEvent);
    await eventsPage.deleteTheEvent();
  }
});

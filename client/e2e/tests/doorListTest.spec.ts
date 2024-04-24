import {test, expect} from '@playwright/test';
import {DoorListPage} from '../pages/doorListPage';
import {EventsPage} from '../pages/eventsPage';
import {MainPage} from '../pages/mainPage';
import {EventInfo, EVENT_INFO_1} from '../testData/EventInfo';
import {SHOWING_INFO_1} from '../testData/ShowingInfo';
import {CustomerInfo, JANE_DOE} from '../testData/CustomerInfo';
import {VALID_VISA_CREDIT} from '../testData/CreditCard';


test('Check Home', async ({page}) => {
  const doorList = new DoorListPage(page);
  await doorList.goto();
  expect(doorList.getHeader, 'Door List');
});

test('Select Active Showing in Doorlist', async ({page}) => {
  const currentEvent = new EventInfo(EVENT_INFO_1);
  const eventsPage = new EventsPage(page);
  const doorList = new DoorListPage(page);

  try {
    // Add event and showing to check for in the door list
    await eventsPage.goto();
    await eventsPage.addnewevent(currentEvent);
    await eventsPage.activateEvent();
    await eventsPage.addNewShowing(SHOWING_INFO_1);

    // Check door list
    await doorList.goto();
    await doorList.searchShowing(currentEvent, SHOWING_INFO_1);
  } finally {
    // Remove the added event
    await eventsPage.goto();
    await page.locator(':text("' + currentEvent.eventName + '")').click();
    await eventsPage.deleteTheEvent(currentEvent);
  }
});

test('Select Inactive Showing in Doorlist', async ({page}) => {
  const currentEvent = new EventInfo(EVENT_INFO_1);
  const eventsPage = new EventsPage(page);
  const doorList = new DoorListPage(page);

  try {
    // Add event and showing to check for in the door list
    await eventsPage.goto();
    await eventsPage.addnewevent(currentEvent);
    await eventsPage.addNewShowing(SHOWING_INFO_1);

    // Check door list
    await doorList.goto();
    await doorList.setAllView();
    await doorList.searchShowing(currentEvent, SHOWING_INFO_1);
  } finally {
    // Remove the added event
    await eventsPage.goto();
    await eventsPage.setInactiveView();
    await page.locator(':text("' + currentEvent.eventName + '")').click();
    await eventsPage.deleteTheEvent(currentEvent);
  }
});

test('Open Seats in Doorlist', async ({page}) => {
  const currentEvent = new EventInfo(EVENT_INFO_1);
  const currentShowing = SHOWING_INFO_1;
  const eventsPage = new EventsPage(page);
  const doorList = new DoorListPage(page);
  try {
    // Add event and showing to check for in the door list
    await eventsPage.goto();
    await eventsPage.addnewevent(currentEvent);
    await eventsPage.activateEvent();
    await eventsPage.addNewShowing(currentShowing);

    // Check door list
    await doorList.goto();
    await doorList.searchShowing(currentEvent, currentShowing);
    await doorList.customerRow.filter({hasText: 'OPEN SEATS'})
      .filter({hasText: currentShowing.showingQuantity.toString()});
  } finally {
    // Remove the added event
    await eventsPage.goto();
    await page.locator(':text("' + currentEvent.eventName + '")').click();
    await eventsPage.deleteTheEvent(currentEvent);
  }
});

test('Purchased Seats in Doorlist', async ({page}, testInfo) => {
  const timeoutAdd = testInfo.retry * 5000;
  test.setTimeout(80000 + timeoutAdd);
  const currentEvent = new EventInfo(EVENT_INFO_1);
  const currentShowing = SHOWING_INFO_1;
  const currentPatron = new CustomerInfo(JANE_DOE);
  const currentCard = VALID_VISA_CREDIT;
  const ticketQuantity = 3;
  const eventsPage = new EventsPage(page);
  const doorList = new DoorListPage(page);
  const main = new MainPage(page);
  try {
    // Add event and showing to check for in the door list
    await eventsPage.goto();
    await eventsPage.addnewevent(currentEvent);
    await eventsPage.activateEvent();
    await eventsPage.addNewShowing(currentShowing);

    // Purchase tickets
    await main.goto();
    await main.purchaseTicket(currentPatron, currentCard, currentEvent, {timeoutAdd: timeoutAdd, qty: ticketQuantity});

    // Check door list
    await doorList.goto();
    await doorList.searchShowing(currentEvent, currentShowing);
    await doorList.customerRow.filter({hasText: 'OPEN SEATS'})
      .filter({hasText: (parseInt(currentShowing.showingQuantity) - ticketQuantity).toString()});
    await doorList.checkOrder(currentPatron, ticketQuantity);
  } finally {
    // Remove the added event
    await eventsPage.goto();
    await page.locator(':text("' + currentEvent.eventName + '")').click();
    await eventsPage.deleteTheEvent(currentEvent);
  }
});

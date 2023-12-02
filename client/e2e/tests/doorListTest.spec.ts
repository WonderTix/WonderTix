import { test, expect } from '@playwright/test';
import { DoorListPage } from '../pages/doorListPage';
import { EventsPage } from '../pages/EventsPage';
import { createUniqueCustomer, createUniqueEvent } from '../testData/factoryFunctions';
import { EVENT_INFO_2 } from '../testData/dataConstants/EventInfoConstants';
import { MainPage } from '../pages/mainPage';
import { SHOWING_INFO_1 } from '../testData/dataConstants/ShowingInfoConstants';
import { JANE_DOE } from '../testData/dataConstants/CustomerInfoConstants';
import { VALID_VISA_CREDIT } from '../testData/dataConstants/CreditCardConstants';


test('Check Home', async ({page}) => {
  const doorList = new DoorListPage(page);
  await doorList.goto();
  expect(doorList.getHeader, 'Door List');
});

test('Select Active Showing in Doorlist', async ({page}) => {
  const currentEvent = createUniqueEvent(EVENT_INFO_2);
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
    await eventsPage.deleteTheEvent(currentEvent.eventFullName);
  }
});

test('Select Inactive Showing in Doorlist', async ({page}) => {
  const currentEvent = createUniqueEvent(EVENT_INFO_2);
  const eventsPage = new EventsPage(page);
  const doorList = new DoorListPage(page);

  try {
    // Add event and showing to check for in the door list
    await eventsPage.goto();
    await eventsPage.addnewevent(currentEvent);
    await eventsPage.addNewShowing(SHOWING_INFO_1);

    // Check door list
    await doorList.goto();
    await doorList.setAllView()
    await doorList.searchShowing(currentEvent,SHOWING_INFO_1);
  } finally {
    // Remove the added event
    await eventsPage.goto();
    await eventsPage.setInactiveView();
    await page.locator(':text("' + currentEvent.eventName + '")').click();
    await eventsPage.deleteTheEvent(currentEvent.eventFullName);
  }
});

test('Open Seats in Doorlist', async ({page}) => {
  const currentEvent = createUniqueEvent(EVENT_INFO_2);
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
    await doorList.searchShowing(currentEvent,currentShowing);
    await doorList.customerRow.filter({hasText: "OPEN SEATS"})
      .filter({hasText: currentShowing.showingQuantity.toString()});
  } finally {
    // Remove the added event
    await eventsPage.goto();
    await page.locator(':text("' + currentEvent.eventName + '")').click();
    await eventsPage.deleteTheEvent(currentEvent.eventFullName);
  }
});

test('Purchased Seats in Doorlist', async ({page}, testInfo) => {
  const timeoutAdd = testInfo.retry * 5000;
  test.setTimeout(80000 + timeoutAdd);
  const currentEvent = createUniqueEvent(EVENT_INFO_2);
  const currentShowing = SHOWING_INFO_1;
  const currentPatron = createUniqueCustomer(JANE_DOE);
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
    await doorList.searchShowing(currentEvent,currentShowing);
    await doorList.customerRow.filter({hasText: "OPEN SEATS"})
      .filter({hasText: (parseInt(currentShowing.showingQuantity) - ticketQuantity).toString()});
    await doorList.checkOrder(currentPatron, ticketQuantity);
  } finally {
    // Remove the added event
    await eventsPage.goto();
    await page.locator(':text("' + currentEvent.eventName + '")').click();
    await eventsPage.deleteTheEvent(currentEvent.eventFullName);
  }
});
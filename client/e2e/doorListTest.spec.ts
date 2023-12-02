import {test, expect} from '@playwright/test';
import {DoorListPage} from './pages/doorListPage';
import {EventsPage} from './pages/EventsPage';
import {EventsInfo, EventsInfoTemplate2, JaneDoe, ShowingInfo1, ValidVisaCredit} from './testData/ConstsPackage';
import { MainPage } from './pages/mainPage';


test('Check Home', async ({page}) => {
  const doorList = new DoorListPage(page);
  await doorList.goto();
  expect(doorList.getHeader, 'Door List');
});

test('Select Active Showing in Doorlist', async ({page}) => {
  const currentEvent = new EventsInfo(EventsInfoTemplate2);
  const eventsPage = new EventsPage(page);
  const doorList = new DoorListPage(page);
  try {
    // Add event and showing to check for in the door list
    await eventsPage.goto();
    await eventsPage.addnewevent(currentEvent);
    await eventsPage.activateEvent();
    await eventsPage.addNewShowing(ShowingInfo1);

    // Check door list
    await doorList.goto();
    await doorList.searchShowing(currentEvent,ShowingInfo1);
  } finally {
    // Remove the added event
    await eventsPage.goto();
    await page.locator(':text("' + currentEvent.eventName + '")').click();
    await eventsPage.deleteTheEvent(currentEvent.eventFullName);
  }
});

test('Select Inactive Showing in Doorlist', async ({page}) => {
  const currentEvent = new EventsInfo(EventsInfoTemplate2);
  const eventsPage = new EventsPage(page);
  const doorList = new DoorListPage(page);
  try {
    // Add event and showing to check for in the door list
    await eventsPage.goto();
    await eventsPage.addnewevent(currentEvent);
    await eventsPage.addNewShowing(ShowingInfo1);

    // Check door list
    await doorList.goto();
    await doorList.setAllView()
    await doorList.searchShowing(currentEvent,ShowingInfo1);
  } finally {
    // Remove the added event
    await eventsPage.goto();
    await eventsPage.setInactiveView();
    await page.locator(':text("' + currentEvent.eventName + '")').click();
    await eventsPage.deleteTheEvent(currentEvent.eventFullName);
  }
});

test('Open Seats in Doorlist', async ({page}) => {
  const currentEvent = new EventsInfo(EventsInfoTemplate2);
  const currentShowing = ShowingInfo1;
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
  const currentEvent = new EventsInfo(EventsInfoTemplate2);
  const currentShowing = ShowingInfo1;
  const currentPatron = JaneDoe;
  const currentCard = ValidVisaCredit;
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
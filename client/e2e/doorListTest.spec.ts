import {test, expect} from '@playwright/test';
import {DoorListPage} from './pages/doorListPage';
import {EventsPage} from './pages/EventsPage';
import {EventsInfo, EventsInfoTemplate2, ShowingInfo1} from './testData/ConstsPackage';


test('Check Home', async ({page}) => {
  const doorList = new DoorListPage(page);
  await doorList.goto();
  expect(doorList.getHeader, 'Door List');
});

test('Select Active Showing', async ({page}) => {
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

test('Select Inactive Showing', async ({page}) => {
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

test('Confirm Open Seats', async ({page}) => {
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
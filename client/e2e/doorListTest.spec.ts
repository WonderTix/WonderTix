import {test, expect} from '@playwright/test';
import {DoorListPage} from './pages/doorListPage';
import {EventsPage} from './pages/EventsPage';
import {EventsInfo, EventsInfoTemplate2, ShowingInfo1} from './testData/ConstsPackage';


test('Check Home', async ({page}) => {
  const doorList = new DoorListPage(page);
  await doorList.goto();
  expect(doorList.getHeader, 'Door List');
});

test('Select a Showing', async ({page}) => {
  const event = new EventsInfo(EventsInfoTemplate2);
  try {
    //set up pages
    const eventsPage = new EventsPage(page);
    const doorList = new DoorListPage(page);

    //add event and showing to check for in the door list
    await eventsPage.goto();
    await eventsPage.addnewevent(event);
    await eventsPage.activateEvent();
    await eventsPage.addNewShowing(ShowingInfo1);

    //check door list
    await doorList.goto();
    await doorList.searchShowing(event,ShowingInfo1);
  } finally {
    //remove the added event
    const eventsPage = new EventsPage(page);
    await eventsPage.goto();
    await page.locator(':text("' + event.eventName + '")').click();
    await eventsPage.deleteTheEvent(event.eventFullName);
  }
});

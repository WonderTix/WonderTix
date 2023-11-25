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
    //add event and showing to check for in the door list
    const eventsPage = new EventsPage(page);
    await eventsPage.goto();
    await eventsPage.addnewevent(event);
    await eventsPage.activateEvent();
    await eventsPage.addNewShowing(ShowingInfo1);

    //check door list
    const doorList = new DoorListPage(page);
    await doorList.goto();
    await doorList.searchShowing(event,ShowingInfo1);
  } finally {
    //remove the added event
    const eventsPage2 = new EventsPage(page);
    await eventsPage2.goto();
    await page.locator(':text("' + event.eventName + '")').click();
    await eventsPage2.deleteTheEvent(event.eventFullName);
  }
});

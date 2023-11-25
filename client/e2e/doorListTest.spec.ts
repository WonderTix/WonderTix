import {test, expect} from '@playwright/test';
import {DoorListPage} from './pages/doorListPage';
import {EventsPage} from './pages/EventsPage';
import {EventsInfo2, ShowingInfo1} from './testData/ConstsPackage';


test('Check Home', async ({page}) => {
  const doorList = new DoorListPage(page);
  await doorList.goto();
  expect(doorList.getHeader, 'Door List');
});

test('Select a Showing', async ({page}) => {
  try {
    //add event and showing to check for in the door list
    const eventsPage = new EventsPage(page);
    await eventsPage.goto();
    await eventsPage.addnewevent(EventsInfo2);
    await eventsPage.activateEvent();
    await eventsPage.addNewShowing(ShowingInfo1);

    //check door list
    const doorList = new DoorListPage(page);
    await doorList.goto();
    await doorList.searchShowing(EventsInfo2,ShowingInfo1);
  } finally {
    //remove the added event
    const eventsPage2 = new EventsPage(page);
    await eventsPage2.goto();
    await page.locator(':text("' + EventsInfo2.eventName + '")').click();
    await eventsPage2.deleteTheEvent(EventsInfo2.eventFullName);
  }
});

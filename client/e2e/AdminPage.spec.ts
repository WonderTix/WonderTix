/* eslint-disable require-jsdoc */
import {test, expect} from '@playwright/test';
import {MainPage} from './pages/mainPage';
import {EventsPage} from './pages/EventsPage';
import {AdminPage} from './pages/AdminPage';
import {EventsInfo2} from './testData/ConstsPackage';
import {ShowingInfo2} from './testData/ConstsPackage';

test('Open admin page', async ({page}) => {
  const adminPage = new AdminPage(page);
  await adminPage.goto();
});

test('Open ticketing page', async ({page}) => {
  const adminPage = new AdminPage(page);
  await adminPage.gotoTicketing();
});

test('Purchase ticket for customer as admin', async ({page}) => {
  test.setTimeout(50000);
  const events = new EventsPage(page);
  await events.goto();
  await events.addnewevent(EventsInfo2);
  await events.addNewShowing(ShowingInfo2);
  try {
    const adminPage = new AdminPage(page);
    await adminPage.purchaseTicket('38-Test_event', '453');
  } finally {
    // await page.goto('/', { timeout: 5000 });
    await events.goto();
    await events.goToEventFromManage('Test_event Playbill Test_event Description An event for testing');
    await events.deleteTheEvent('Test_event Playbill Test_event Description An event for testing');
  }
});

function delay(ms: number) {
  return new Promise( (resolve) => setTimeout(resolve, ms) );
}

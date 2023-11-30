/* eslint-disable require-jsdoc */
import {test, expect} from '@playwright/test';
import {MainPage} from './pages/mainPage';
import {EventsPage} from './pages/EventsPage';
import {AdminPage} from './pages/AdminPage';
import {EventsInfoTemplate2} from './testData/ConstsPackage';
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
  test.setTimeout(100000);
  const events = new EventsPage(page);
  await events.goto();
  await events.addnewevent(EventsInfoTemplate2);
  await events.addNewShowing(ShowingInfo2);
  try {
    const adminPage = new AdminPage(page);
    await adminPage.purchaseTicket(EventsInfoTemplate2.eventName, ShowingInfo2.showingDateTime);
  } finally {
    // await page.goto('/', { timeout: 5000 });
    await events.goto();
    await events.goToEventFromManage(EventsInfoTemplate2.eventFullName);
    await events.deleteTheEvent(EventsInfoTemplate2.eventFullName);
  }
});

function delay(ms: number) {
  return new Promise( (resolve) => setTimeout(resolve, ms) );
}

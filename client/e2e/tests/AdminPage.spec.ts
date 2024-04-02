/* eslint-disable require-jsdoc */
import {test, expect} from '@playwright/test';
import {MainPage} from '../pages/mainPage';
import {EventsPage} from '../pages/EventsPage';
import {AdminPage} from '../pages/AdminPage';
import {EVENT_INFO_1} from '../testData/EventInfo';
import {SHOWING_INFO_2} from '../testData/ShowingInfo';

const testEmail = 'test987661234@wondertix.com';

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
  await events.addnewevent(EVENT_INFO_1);
  await events.activateEvent();
  await delay(500);
  await events.addNewShowing(SHOWING_INFO_2);
  try {
    const adminPage = new AdminPage(page);
    await adminPage.purchaseTicket(EVENT_INFO_1.eventName, SHOWING_INFO_2.showingWholeDate, testEmail);
  } finally {
    // await page.goto('/', { timeout: 5000 });
    await delay(1000);
    await events.goto();
    await events.goToEventFromManage(EVENT_INFO_1);
    await delay(500);
    await events.deleteTheEvent(EVENT_INFO_1);
  }
});

function delay(ms: number) {
  return new Promise( (resolve) => setTimeout(resolve, ms) );
}
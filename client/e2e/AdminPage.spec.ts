/* eslint-disable require-jsdoc */
import {test, expect} from '@playwright/test';
import {MainPage} from './pages/mainPage';
import {EventsPage} from './pages/EventsPage';
import {AdminPage} from './pages/adminPage';
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
  const events = new EventsPage(page);
  await events.goto();
  await events.addnewevent(EventsInfo2);
  await events.addNewShowing(ShowingInfo2);
  const adminPage = new AdminPage(page);
  await adminPage.gotoTicketing(); // ticketing url
  try {
    
  } catch (error) {
    
  }
});


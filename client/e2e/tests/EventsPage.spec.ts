/* eslint-disable require-jsdoc */
import {test} from '@playwright/test';
import {EventsPage} from '../pages/EventsPage';
import {EventInfo, EVENT_INFO_1, EVENT_INFO_2, EVENT_INFO_3} from '../testData/EventInfo';
import {SHOWING_INFO_1, SHOWING_INFO_2, SHOWING_INFO_3, SHOWING_INFO_4} from '../testData/ShowingInfo';

test('Homepage->Events', async ({page}) => {
  const eventsPage = new EventsPage(page);
  await eventsPage.goto();
});

/**
 * First we create a new event and add a new showing for it.
 * And we go back to homepage to see if it exists on the homepage.
 * Go to the newly created event from the manage ticketing page.
 * Add one more showing for it.
 * Search for two corresponding showing by their date and delete them.
 * Delete the newly created event at last.
 */
test('addDeleteEvents', async ({page})=>{
  const eventsPage = new EventsPage(page);
  const currentEvent = new EventInfo(EVENT_INFO_1);
  await eventsPage.goto();
  await eventsPage.addnewevent(currentEvent);
  await eventsPage.activateEvent();
  await eventsPage.addNewShowing(SHOWING_INFO_1);
  await eventsPage.checkNewEventOnHomePage(currentEvent);
  await eventsPage.goToEventFromManage(currentEvent);
  await eventsPage.addNewShowing(SHOWING_INFO_2);
  await eventsPage.searchDeleteShowing(SHOWING_INFO_1);
  await eventsPage.searchDeleteShowing(SHOWING_INFO_2);
  await eventsPage.deleteTheEvent(currentEvent);
});

// Test is looking for a seeded event.  It is then being reset via a template from ConstsPackage
// Need to refactor so that it's adding and looking at its own event, not a seeded event.
test.skip('editEvents', async ({page})=>{
  test.setTimeout(45000);
  const currentEvent3 = new EventInfo(EVENT_INFO_2);
  const currentEvent4 = new EventInfo(EVENT_INFO_3);
  const eventsPage = new EventsPage(page);
  const currentEvent = new EventInfo(EVENT_INFO_3);
  const currentEvent1 = new EventInfo(EVENT_INFO_2);
  await eventsPage.goto();
  // Go to the event information page first
  await eventsPage.addnewevent(currentEvent);
  await eventsPage.activateEvent();
  await eventsPage.addNewShowing(SHOWING_INFO_4);
  // Change the event's information a little bit
  try {
  await eventsPage.editTheEventInfo(currentEvent1);
  // Search for the event by its new name
  await eventsPage.searchForEventByName(currentEvent1);
  // Search for the event by its new description
  await eventsPage.editTheEventInfo(currentEvent1);
  await eventsPage.searchForEventByDes(currentEvent1);
  // Now let's change everything back
  await eventsPage.editTheEventInfo(currentEvent);
  } finally {
    await eventsPage.searchDeleteShowing(SHOWING_INFO_4);
    await eventsPage.deleteTheEvent(currentEvent);
  }
});


test('editShowing', async ({page})=>{
  const eventsPage = new EventsPage(page);
  const currentEvent = new EventInfo(EVENT_INFO_3);
  await eventsPage.goto();
  try {
  // Go to the event page first
    await eventsPage.addnewevent(currentEvent);
    await eventsPage.activateEvent();
    await eventsPage.addNewShowing(SHOWING_INFO_4);
  // Now we change some showing's information a little bit
    await eventsPage.editShowingInfo(SHOWING_INFO_3);
  // Then we change that back
    await eventsPage.editShowingInfo(SHOWING_INFO_4);
  } finally {
    await eventsPage.searchDeleteShowing(SHOWING_INFO_4);
    await eventsPage.deleteTheEvent(currentEvent);
   }
});

/**
 * Check if the default image works.
 */
test('checkDefaultImage', async ({page})=>{
  const eventsPage = new EventsPage(page);
  const currentEvent = new EventInfo(EVENT_INFO_3);
  await eventsPage.goto();
  await eventsPage.addDefaultIMGevent(currentEvent);
  await eventsPage.deleteTheEvent(currentEvent);
});

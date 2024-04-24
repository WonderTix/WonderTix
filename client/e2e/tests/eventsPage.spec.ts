import {test, expect} from '@playwright/test';
import {EventsPage} from '../pages/eventsPage';
import {
  EventInfo,
  EVENT_INFO_1,
  EVENT_INFO_2,
  EVENT_INFO_3, EVENT_INFO_4,
} from '../testData/EventInfo';
import {
  SHOWING_INFO_1,
  SHOWING_INFO_2,
  SHOWING_INFO_3,
  SHOWING_INFO_4,
} from '../testData/ShowingInfo';

test('Homepage->Events', async ({page}) => {
  const eventsPage = new EventsPage(page);

  await eventsPage.goTo();
  await expect(eventsPage.pageHeader).toHaveText('Select Event');
});

/**
 * First we create a new event and add a new showing for it.
 * And we go back to homepage to see if it exists on the homepage.
 * Go to the newly created event from the manage ticketing page.
 * Add one more showing for it.
 * Search for two corresponding showing by their date and delete them.
 * Delete the newly created event at last and check that it doesn't appear.
 */
test('Add and Delete Event and Showings', async ({page}) => {
  const eventsPage = new EventsPage(page);
  const currentEvent = new EventInfo(EVENT_INFO_1);

  // Add event and showing
  await eventsPage.goTo();
  await eventsPage.addNewEvent(currentEvent);
  await eventsPage.activateEvent();
  await eventsPage.addNewShowing(SHOWING_INFO_1);
  await eventsPage.goToHome();
  await expect(eventsPage.getEventOnHomePage(currentEvent)).toBeVisible();

  // Add second showing
  await eventsPage.goToEventFromManage(currentEvent);
  await eventsPage.addNewShowing(SHOWING_INFO_2);

  // Delete both showings and event
  await eventsPage.searchDeleteShowing(SHOWING_INFO_1);
  await eventsPage.searchDeleteShowing(SHOWING_INFO_2);
  await eventsPage.deleteTheEvent();
  await expect(eventsPage.getEventOnEventsPage(currentEvent)).not.toBeVisible();
});

test('Edit Event', async ({page}) => {
  const eventsPage = new EventsPage(page);
  const currentEvent = new EventInfo(EVENT_INFO_3);
  const currentEvent1 = new EventInfo(EVENT_INFO_2);
  const currentEvent2 = new EventInfo(EVENT_INFO_4);

  // Go to the event information page first
  await eventsPage.goTo();
  await eventsPage.addNewEvent(currentEvent);
  await eventsPage.activateEvent();
  await eventsPage.addNewShowing(SHOWING_INFO_4);
  try {
    // Change the event's information
    await eventsPage.editTheEventInfo(currentEvent1);

    // See the changes persist
    await expect(eventsPage.eventName).toHaveText(currentEvent1.eventName);
    await expect(eventsPage.eventDesc).toHaveText(currentEvent1.eventDescription);

    // Change the event's information again
    await eventsPage.editTheEventInfo(currentEvent2);

    // See the changes persist
    await expect(eventsPage.eventName).toHaveText(currentEvent2.eventName);
    await expect(eventsPage.eventDesc).toHaveText(currentEvent2.eventDescription);
  } finally {
    await eventsPage.deleteTheEvent();
  }
});

test('Edit Showing', async ({page}) => {
  const eventsPage = new EventsPage(page);
  const currentEvent = new EventInfo(EVENT_INFO_3);

  // Go to the event page first
  await eventsPage.goTo();
  await eventsPage.addNewEvent(currentEvent);
  await eventsPage.activateEvent();
  await eventsPage.addNewShowing(SHOWING_INFO_4);
  try {
    // Now we change the showing information
    await eventsPage.editShowingInfo(SHOWING_INFO_3);
    await expect(eventsPage.getShowingOnEventPage(SHOWING_INFO_3)).toBeVisible();

    // Then we change it back
    await eventsPage.editShowingInfo(SHOWING_INFO_4);
    await expect(eventsPage.getShowingOnEventPage(SHOWING_INFO_4)).toBeVisible();
  } finally {
    await eventsPage.deleteTheEvent();
  }
});

/**
 * Check if the default image works.
 */
test('Add event with default image', async ({page}) => {
  const eventsPage = new EventsPage(page);
  const currentEvent = new EventInfo(EVENT_INFO_3);

  await eventsPage.goTo();
  try {
    await eventsPage.addNewDefaultImageEvent(currentEvent);
    await expect(eventsPage.eventImage).toBeVisible();
  } finally {
    await eventsPage.deleteTheEvent();
  }
});

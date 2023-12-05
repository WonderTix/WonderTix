/* eslint-disable require-jsdoc */
import { test } from '@playwright/test';
import { EventsPage } from '../pages/EventsPage';
import { createUniqueEvent } from '../testData/factoryFunctions';
import { EVENT_INFO_1, EVENT_INFO_2, EVENT_INFO_3, EVENT_INFO_4 } from '../testData/dataConstants/EventInfoConstants';
import { SHOWING_INFO_1, SHOWING_INFO_2, SHOWING_INFO_3, SHOWING_INFO_4 } from '../testData/dataConstants/ShowingInfoConstants';

test('Homepage->Events', async ({page}) => {
  const eventsPage = new EventsPage(page);
  await eventsPage.goto();
});

test('addNewEvents', async ({page})=>{
  const eventsPage = new EventsPage(page);
  const currentEvent =  createUniqueEvent(EVENT_INFO_1);
  await eventsPage.goto();
  await eventsPage.addnewevent(currentEvent);
  await eventsPage.activeEvent();
  await eventsPage.deleteTheEvent(currentEvent.eventName,currentEvent.eventDescription);
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
  const currentEvent = createUniqueEvent(EVENT_INFO_2);
  await eventsPage.goto();
  await eventsPage.addnewevent(currentEvent);
  await eventsPage.activeEvent();
  await eventsPage.addNewShowing(SHOWING_INFO_1);
  await eventsPage.checkNewEventOnHomePage(currentEvent.eventDescription);
  await eventsPage.goToEventFromManage(currentEvent.eventName,currentEvent.eventDescription);
  await eventsPage.addNewShowing(SHOWING_INFO_2);
  await eventsPage.searchDeleteShowing(SHOWING_INFO_1.showingWholeDate);
  await eventsPage.searchDeleteShowing(SHOWING_INFO_2.showingWholeDate);
  await eventsPage.deleteTheEvent(currentEvent.eventName,currentEvent.eventDescription);
});

test('editEvents',async({page})=>{
  const eventsPage = new EventsPage(page);
  const currentEvent = createUniqueEvent(EVENT_INFO_4);
  const currentEvent1 = createUniqueEvent(EVENT_INFO_3);
  await eventsPage.goto();
  //Go to the event information page first
  await eventsPage.addnewevent(currentEvent);
  await eventsPage.activeEvent();
  await eventsPage.addNewShowing(SHOWING_INFO_4);
  //Change the event's information a little bit
  try {
  await eventsPage.editTheEventInfo(currentEvent1);
  //Search for the event by its new name
  await eventsPage.searchForEventByName(currentEvent1);
  //Search for the event by its new description
  await eventsPage.editTheEventInfo(currentEvent1);
  await eventsPage.searchForEventByDes(currentEvent1);
  //Now let's change everything back
  await eventsPage.editTheEventInfo(currentEvent);
  } finally {
    await eventsPage.searchDeleteShowing(SHOWING_INFO_4.showingWholeDate);
    await eventsPage.deleteTheEvent(currentEvent.eventName,currentEvent.eventDescription);
  }
});


test('editShowing', async ({page})=>{
  const eventsPage = new EventsPage(page);
  const currentEvent = createUniqueEvent(EVENT_INFO_4);
  await eventsPage.goto();
  try {
  //Go to the event page first
    await eventsPage.addnewevent(currentEvent);
    await eventsPage.activeEvent();
    await eventsPage.addNewShowing(SHOWING_INFO_4);
  //Now we change some showing's information a little bit
    await eventsPage.editShowingInfo(SHOWING_INFO_3);
  //Then we change that back
    await eventsPage.editShowingInfo(SHOWING_INFO_4);
  } finally{
    await eventsPage.searchDeleteShowing(SHOWING_INFO_4.showingWholeDate);
    await eventsPage.deleteTheEvent(currentEvent.eventName,currentEvent.eventDescription);
   }
});


test('checkDefaultImage',async({page})=>{
  const eventsPage = new EventsPage(page);
  const currentEvent = createUniqueEvent(EVENT_INFO_4);
  await eventsPage.goto();
  await eventsPage.addDefaultIMGevent(currentEvent);
  await eventsPage.deleteTheEvent(currentEvent.eventName,currentEvent.eventDescription); 
});
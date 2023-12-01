/* eslint-disable require-jsdoc */
import {test, expect} from '@playwright/test';
import {EventsPage} from './pages/EventsPage';
import {EventInfo} from './testData/ConstsPackage';
import {EventInfoTemplate1, EventInfoTemplate2, EventInfoTemplate3, EventInfoTemplate4} from './testData/ConstsPackage';
import {ShowingInfo1, ShowingInfo2, ShowingInfo3, ShowingInfo4} from './testData/ConstsPackage';

test('Homepage->Events', async ({page}) => {
  const eventsPage = new EventsPage(page);
  await eventsPage.goto();
});

test('addNewEvents', async ({page})=>{
  const eventsPage = new EventsPage(page);
  const currentEvent = new EventInfo(EventInfoTemplate1);
  await eventsPage.goto();
  await eventsPage.addnewevent(currentEvent);
  await eventsPage.activeEvent();
  await eventsPage.deleteTheEvent(currentEvent.eventFullName);
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
  // test.setTimeout(300000);
  const eventsPage = new EventsPage(page);
  const currentEvent = new EventInfo(EventInfoTemplate2);
  await eventsPage.goto();
  await eventsPage.addnewevent(currentEvent);
  await eventsPage.activeEvent();
  await eventsPage.addNewShowing(ShowingInfo1);
  await eventsPage.checkNewEventOnHomePage(EventInfoTemplate2.eventName,EventInfoTemplate2.suffix);
  await eventsPage.goToEventFromManage(currentEvent.eventFullName);
  await eventsPage.addNewShowing(ShowingInfo2);
  await eventsPage.searchDeleteShowing(ShowingInfo2.showingWholeDate);
  await eventsPage.searchDeleteShowing(ShowingInfo1.showingWholeDate);
  await eventsPage.deleteTheEvent(EventInfoTemplate2.eventFullName);
});

test('editEvents',async({page})=>{
  const eventsPage = new EventsPage(page);
  const currentEvent = new EventInfo(EventInfoTemplate4);
  const currentEvent1 = new EventInfo(EventInfoTemplate3);
  await eventsPage.goto();
  //Go to the event information page first
  await eventsPage.addnewevent(currentEvent);
  await eventsPage.activeEvent();
  await eventsPage.addNewShowing(ShowingInfo4);
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
    await eventsPage.searchDeleteShowing(ShowingInfo4.showingWholeDate);
    await eventsPage.deleteTheEvent(currentEvent.eventFullName);
  }
});


test('editShowing', async ({page})=>{
  const eventsPage = new EventsPage(page);
  const currentEvent = new EventInfo(EventInfoTemplate4);
  await eventsPage.goto();
  try {
  //Go to the event page first
    await eventsPage.addnewevent(currentEvent);
    await eventsPage.activeEvent();
    await eventsPage.addNewShowing(ShowingInfo4);
  //Now we change some showing's information a little bit
    await eventsPage.editShowingInfo(ShowingInfo3);
  //Then we change that back
    await eventsPage.editShowingInfo(ShowingInfo4);
  } finally{
    await eventsPage.searchDeleteShowing(ShowingInfo4.showingWholeDate);
    await eventsPage.deleteTheEvent(currentEvent.eventFullName);
   }
});

/**
 * create a new inactivated event 
 * go to inactive event lists to check if it exists 
 * and if it is, delete it
 */
test('checkActive',async({page})=>{
  const eventsPage = new EventsPage(page);
  const currentEvent = new EventInfo(EventInfoTemplate2);
  await eventsPage.goto();
  await eventsPage.addNewInactiveEvent(currentEvent);
  await eventsPage.deleteInactiveEvent(currentEvent.eventFullName);
});

test('checkDefaultImage',async({page})=>{
  const eventsPage = new EventsPage(page);
  const currentEvent = new EventInfo(EventInfoTemplate4);
  await eventsPage.goto();
  await eventsPage.addDefaultIMGevent(currentEvent);
  await eventsPage.deleteTheEvent(currentEvent.eventFullName) 
});


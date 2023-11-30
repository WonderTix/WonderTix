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
  await eventsPage.deleteTheEvent(currentEvent.eventFullName);
});

test('addDeleteEvents', async ({page})=>{
  // test.setTimeout(300000);
   const eventsPage = new EventsPage(page);
   const currentEvent = new EventInfo(EventInfoTemplate2);
  await eventsPage.goto();
  //await eventsPage.checkAndDeletePreviousEvents(EventsInfo2.eventFullName,ShowingInfo1.showingWholeDate,ShowingInfo2.showingWholeDate);
  //The ANE_Package2 is locate in ConstsPackage.ts file
  //First we create a new event
  await eventsPage.addnewevent(currentEvent);
  //Then we add a new showing for it
  await eventsPage.addNewShowing(ShowingInfo1);
  //Go back to homepage to see if it exists on the homepage
  await eventsPage.checkNewEventOnHomePage(EventInfoTemplate2.eventName,EventInfoTemplate2.suffix);
  //Go to the newly created event from the manage ticketing page
  await eventsPage.goToEventFromManage(currentEvent.eventFullName);
  //Add one more showing for it
  await eventsPage.addNewShowing(ShowingInfo2);
  //Search for two corresponding showing by their date and delete them
  await eventsPage.searchDeleteShowing(ShowingInfo2.showingWholeDate);
  await eventsPage.searchDeleteShowing(ShowingInfo1.showingWholeDate);
  //Delete the newly created event
  await eventsPage.deleteTheEvent(EventInfoTemplate2.eventFullName);
});

test('editEvents',async({page})=>{
  const eventsPage = new EventsPage(page);
  await eventsPage.goto();
  //This test we just use the second event "The Crucible" as an example
  //Go to the event information page first
  await eventsPage.addnewevent(EventInfoTemplate4);
  await eventsPage.addNewShowing(ShowingInfo4);
  //Change the event's information a little bit
  try {
  await eventsPage.editTheEventInfo(EventInfoTemplate3);
  //Search for the event by its new name
  await eventsPage.searchForEventByName(EventInfoTemplate3);
  //Search for the event by its new description
  await eventsPage.editTheEventInfo(EventInfoTemplate3);
  await eventsPage.searchForEventByDes(EventInfoTemplate3);
  //Now let's change everything back
  await eventsPage.editTheEventInfo(EventInfoTemplate4);
  } finally {
    await eventsPage.searchDeleteShowing(ShowingInfo4.showingWholeDate);
    await eventsPage.deleteTheEvent(EventInfoTemplate4.eventFullName);
  }
});

// Test is looking for a seeded event.  It is then being reset via a template from ConstsPackage
// Need to refactor so that it's adding and looking at its own event, not a seeded event.
/*
  test.fixme('editEvents', async ({page})=>{
  test.setTimeout(45000);
  const currentEvent3 = new EventInfo(EventInfoTemplate3);
  const currentEvent4 = new EventInfo(EventInfoTemplate4);
  const eventsPage = new EventsPage(page);
  await eventsPage.goto();
  // This test we just use the second event "The Crucible" as an example
  // Go to the event information page first
  await eventsPage.clickSecondEvent();
  // Change the event's information a little bit
  await eventsPage.editTheEventInfo(currentEvent3);
  // Search for the event by its new name
  await eventsPage.searchForEventByName(currentEvent3);
  // Search for the event by its new description
  await eventsPage.editTheEventInfo(currentEvent3);
  await eventsPage.searchForEventByDes(currentEvent3);
  // Now let's change everything back
  await eventsPage.editTheEventInfo(currentEvent4);
});
*/


// Also relies on a seeded event
test('editShowing', async ({page})=>{
  const eventsPage = new EventsPage(page);
  await eventsPage.goto();
  try {
  //This test we just use the first event "Angels In America" as an example
  //Go to the event page first
    await eventsPage.addnewevent(EventInfoTemplate4);
    await eventsPage.addNewShowing(ShowingInfo4);
  //Now we change some showing's information a little bit
    await eventsPage.editShowingInfo(ShowingInfo3);
  //Then we change that back
    await eventsPage.editShowingInfo(ShowingInfo4);
  } finally{
    await eventsPage.searchDeleteShowing(ShowingInfo4.showingWholeDate);
    await eventsPage.deleteTheEvent(EventInfoTemplate4.eventFullName);
   }
  //Let search for the showing by its whole infomation string
  //await eventsPage.clickSpecificShowing(ShowingInfo4.showingWholeDate);
});


test('checkActive',async({page})=>{
   const eventsPage = new EventsPage(page);
  await eventsPage.goto();
  await eventsPage.addNewInactiveEvent(EventInfoTemplate2);
  //go to inactive event lists to check if it exists 
  // and if it is, delete it
  await eventsPage.deleteInactiveEvent(EventInfoTemplate2.eventFullName);
});

test('checkDefaultImage',async({page})=>{
  const eventsPage = new EventsPage(page);
  await eventsPage.goto();
  await eventsPage.addDefaultIMGevent(EventInfoTemplate4);
  await eventsPage.deleteTheEvent(EventInfoTemplate4.eventFullName) 
});


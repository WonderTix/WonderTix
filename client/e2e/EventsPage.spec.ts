/* eslint-disable require-jsdoc */
import {test, expect} from '@playwright/test';
import {EventsPage} from './pages/EventsPage';
import { EventsInfo1, EventsInfo2, EventsInfo3, EventsInfo4 } from './testData/ConstsPackage';
import { ShowingInfo1, ShowingInfo2, ShowingInfo3, ShowingInfo4 } from './testData/ConstsPackage';



test('Homepage->Events',async({page}) => {
  const eventsPage = new EventsPage(page);
  await eventsPage.goto();
});

test('addNewEvents',async({page})=>{
  const eventsPage = new EventsPage(page);
  await eventsPage.goto();
  await eventsPage.addnewevent(EventsInfo1);
});

test('addDeleteEvents',async({page})=>{
  test.setTimeout(30);
  const eventsPage = new EventsPage(page);
  await eventsPage.goto();
  //The ANE_Package2 is locate in ConstsPackage.ts file
  //First we create a new event
  await eventsPage.addnewevent(EventsInfo2);
  await eventsPage.activateEvent();
  //Then we add a new showing for it
  await eventsPage.addNewShowing(ShowingInfo1);
  //Go back to homepage to see if it exists on the homepage
  await eventsPage.checkNewEventOnHomePage();
  //Go to the newly created event from the manage ticketing page
  await eventsPage.goToEventFromManage(EventsInfo2.eventFullName);
  //Add one more showing for it
  await eventsPage.addNewShowing(ShowingInfo2);
  //Search for two corresponding showing by their date and delete them
  await eventsPage.searchDeleteShowing(ShowingInfo2.showingWholeDate);
  await eventsPage.searchDeleteShowing(ShowingInfo1.showingWholeDate);
  //Delete the newly created event
  await eventsPage.deleteTheEvent(EventsInfo2.eventFullName);
});

test.fixme('editEvents',async({page})=>{
  test.setTimeout(45000);
  const eventsPage = new EventsPage(page);
  await eventsPage.goto();
  //This test we just use the second event "The Crucible" as an example
  //Go to the event information page first
  await eventsPage.clickSecondEvent();
  //Change the event's information a little bit
  await eventsPage.editTheEventInfo(EventsInfo3);
  //Search for the event by its new name
  await eventsPage.searchForEventByName(EventsInfo3);
  //Search for the event by its new description
  await eventsPage.editTheEventInfo(EventsInfo3);
  await eventsPage.searchForEventByDes(EventsInfo3);
  //Now let's change everything back
  await eventsPage.editTheEventInfo(EventsInfo4);
});

test('editEvents1',async({page})=>{
  const eventsPage = new EventsPage(page);
  await eventsPage.goto();
  await eventsPage.editEvents();
});

test('editShowing',async({page})=>{
  const eventsPage = new EventsPage(page);
  await eventsPage.goto();
  //This test we just use the first event "Angels In America" as an example
  //Go to the event page first
  await eventsPage.clickFirstEvent();
  //Now we change some showing's information a little bit
  await eventsPage.editShowingInfo(ShowingInfo3);
  //Then we change that back
  await eventsPage.editShowingInfo(ShowingInfo4);
  //Let search for the showing by its whole infomation string
  await eventsPage.clickSpecificShowing(ShowingInfo4.showingWholeDate);
});



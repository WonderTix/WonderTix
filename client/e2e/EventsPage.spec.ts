import {test , expect} from '@playwright/test';
import {EventsPage} from './pages/EventsPage';
import { addNewEvents_Package, ANE_Package1,ANE_Package2,ANE_Package3,ANE_Package4} from './testData/ConstsPackage';
import { goToEventFromManage_Package, GTE_Package1} from './testData/ConstsPackage';
import { editShowing_Package, ES_Package1,ES_Package2} from './testData/ConstsPackage';
import { addNewShowing_Package,ANS_Package1,ANS_Package2 } from './testData/ConstsPackage';
import { searchDeleteShowing_Package,SDS_Package1,SDS_Package2 } from './testData/ConstsPackage';


test('Homepage->Events',async({page}) => {
  const eventsPage = new EventsPage(page);
  await eventsPage.goto();
});

test('addNewEvents',async({page})=>{
  const eventsPage = new EventsPage(page);
  await eventsPage.goto();
  await eventsPage.addnewevent(ANE_Package1);
});

test('addDeleteEvents',async({page})=>{
  test.setTimeout(300000);
  const eventsPage = new EventsPage(page);
  await eventsPage.goto();
  //The ANE_Package2 is locate in ConstsPackage.ts file
  //First we create a new event
  await eventsPage.addnewevent(ANE_Package2);
  //Then we add a new showing for it
  await eventsPage.addNewShowing(ANS_Package1);
  //Go back to homepage to see if it exists on the homepage
  await eventsPage.checkNewEventOnHomePage();
  //Go to the newly created event from the manage ticketing page
  await eventsPage.goToEventFromManage(GTE_Package1);
  //Add one more showing for it
  await eventsPage.addNewShowing(ANS_Package2);
  //Search for two corresponding showing by their date and delete them
  await eventsPage.searchDeleteShowing(SDS_Package1);
  await eventsPage.searchDeleteShowing(SDS_Package2);
  //Delete the newly created event
  await eventsPage.deleteTheEvent(GTE_Package1);
});

test('editEvents',async({page})=>{
  const eventsPage = new EventsPage(page);
  await eventsPage.goto();
  //This test we just use the second event "The Crucible" as an example
  //Go to the event information page first
  await eventsPage.clickSecondEvent();
  //Change the event's information a little bit
  await eventsPage.editTheEventInfor(ANE_Package3);
  //Search for the event by its new name
  await eventsPage.searchForEventByName(ANE_Package3);
  //Search for the event by its new description
  await eventsPage.editTheEventInfor(ANE_Package3);
  await eventsPage.searchForEventByDes(ANE_Package3);
  //Now let's change everything back
  await eventsPage.editTheEventInfor(ANE_Package4);
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
  await eventsPage.editShowingInfor(ES_Package1);
  //Then we change that back
  await eventsPage.editShowingInfor(ES_Package2);
  //Let search for the showing by its whole infomation string
  await eventsPage.clickSpecificShowing(ES_Package2);
});



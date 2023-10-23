import {test , expect} from '@playwright/test';
import {EventsPage} from './pages/EventsPage';
import { addNewEvents_Package, ANE_Package1} from './testData/ConstsPackage';
import { addDeleteEvents_Package, ADE_package1} from './testData/ConstsPackage';
import { editevents1_Package, EDE_package1} from './testData/ConstsPackage';
import { editShowing_Package, ES_Package1} from './testData/ConstsPackage';

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
  await eventsPage.addDeleteEvents(ADE_package1);
});

test('editEvents',async({page})=>{
  const eventsPage = new EventsPage(page);
  await eventsPage.goto();
  await eventsPage.editEvents();
});

test('editEvents1',async({page})=>{
  const eventsPage = new EventsPage(page);
  await eventsPage.goto();
  await eventsPage.editEvents1(EDE_package1);
});

test('editShowing',async({page})=>{
  const eventsPage = new EventsPage(page);
  await eventsPage.goto();
  await eventsPage.editShowing(ES_Package1);
});



import {test , expect} from '@playwright/test';
import {EventsPage} from './pages/EventsPage';

test('Homepage->Events',async({page}) => {
  const eventsPage = new EventsPage(page);
  await eventsPage.goto();
});

test('addNewEvents',async({page})=>{
  const eventsPage = new EventsPage(page);
  await eventsPage.goto();  
  await eventsPage.addnewevent();
});

test('addDeleteEvents',async({page})=>{
  test.setTimeout(300000);
  const eventsPage = new EventsPage(page);
  await eventsPage.goto();  
  await eventsPage.addDeleteEvents();
});

test('editEvents',async({page})=>{
  const eventsPage = new EventsPage(page);
  await eventsPage.goto();
  await eventsPage.editEvents();
});

test('editEvents1',async({page})=>{
  const eventsPage = new EventsPage(page);
  await eventsPage.goto();
  await eventsPage.editEvents1();
});

test('editShowing',async({page})=>{
  const eventsPage = new EventsPage(page);
  await eventsPage.goto();
  await eventsPage.editShowing();
});



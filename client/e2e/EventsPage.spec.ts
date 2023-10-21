import {test , expect} from '@playwright/test';
import {EventsPage} from './pages/EventsPage';

test('Homepage->Events',async({page}) => {
  const eventsPage = new EventsPage(page);
  await eventsPage.goto();
});

test('addNewEvents',async({page})=>{
  const eventsPage = new EventsPage(page);
  const eventName: string = "S";
  const eventDescription: string = "123";
  const eventURL: string = "http://";
  await eventsPage.goto();
  await eventsPage.addnewevent(eventName,eventDescription,eventURL);
});

test('addDeleteEvents',async({page})=>{
  test.setTimeout(300000);
  const event1Name: string = "Test_event";
  const event1Description: string = "An event for testing";
  const event1URL: string = "https://www.hindustantimes.com/ht-img/img/2023/08/25/550x309/international_dog_day_1692974397743_1692974414085.jpg"
  const event1Showing1Date: string = "2023-10-11";
  const event1Showing1Time: string = "00:10";
  const event1Showing1Quantity: string = "10";
  const event1Showing2Date: string = "2023-10-17";
  const event1Showing2Time: string = "10:20";
  const event1Showing2Quantity: string = "010";
  const event1FullName: string ="Test_event Playbill Test_event Description An event for testing";
  const eventsPage = new EventsPage(page);
  await eventsPage.goto();
  await eventsPage.addDeleteEvents(event1Name,event1Description,event1URL,event1Showing1Date,event1Showing1Time,event1Showing1Quantity,event1Showing2Date,event1Showing2Time,event1Showing2Quantity,event1FullName);
});

test('editEvents',async({page})=>{
  const eventsPage = new EventsPage(page);
  await eventsPage.goto();
  await eventsPage.editEvents();
});

test('editEvents1',async({page})=>{
  const eventsPage = new EventsPage(page);
  const event2RevisedName: string = "The Crucible1";
  const event2Name: string = "The Crucible";
  const event2RevisedDescription: string = "111Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
  const event2Description: string = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.";
  const event2RevisedURL: string = "https://www.hindustantimes.com/ht-img/img/2023/08/25/550x309/international_dog_day_1692974397743_1692974414085.jpg";
  const event2URL: string = "https://upload.wikimedia.org/wikipedia/en/7/75/Cruciblecover.jpg";
  await eventsPage.goto();
  await eventsPage.editEvents1(event2RevisedName,event2Name,event2RevisedDescription,event2Description,event2RevisedURL,event2URL);
});

test('editShowing',async({page})=>{
  const eventsPage = new EventsPage(page);
  const eventShowingDate: string = "2021-09-16";
  const eventShowingQuantity: string = "101";
  const eventShowing1Date: string = "2021-09-15";
  const eventShowing1Quantity: string = "100";
  const eventShowing1DateString: string = "Wed, Sep 15 2021";
  await eventsPage.goto();
  await eventsPage.editShowing(eventShowingDate,eventShowingQuantity,eventShowing1Date,eventShowing1Quantity,eventShowing1DateString);
});



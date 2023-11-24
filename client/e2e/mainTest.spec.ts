import {test, expect} from '@playwright/test';
import {MainPage} from './pages/mainPage';
import {EventsPage} from './pages/EventsPage';
import {ContactPage} from './pages/contactPage';
import {DoorListPage} from './pages/doorListPage';
import {EventsInfo5, EventsInfo6, ShowingInfo2, ShowingInfo5, JohnDoe, ValidVisaCredit, JaneDoe} from './testData/ConstsPackage';

// Verify we can get to the main page and the event header is visible
test('Check Home', async ({page}) => {
  const main = new MainPage(page);
  await main.goto();
  await expect(main.headingEvent).toBeVisible();
});

// Navigate to the first showing on the main page and make sure the event title isn't blank
test('view show', async ({page}) => {
  const main = new MainPage(page);
  await main.goto();
  const showing = await main.goFirstShowing();
  expect(showing, 'Showing is empty').not.toBeNull();
});

// Go through order process and check both the success message and cart contents
test('check cart after ticket add', async ({page}) => {
  test.setTimeout(60000);
  const events = new EventsPage(page);
  const main = new MainPage(page);
  const currentEvent = EventsInfo5;
  const currentShowing = ShowingInfo2;
  await events.goto();
  await events.addnewevent(currentEvent);
  await events.activateEvent();
  await events.addNewShowing(currentShowing);
  try {
    await main.goto();
    const showing = await main.goSelectShowing(currentEvent);
    // Rebuild randoms to use a fixed selection using the EventsInfo and ShowingsInfo
    expect(showing).toEqual(currentEvent.eventName);
    const date = await main.selectRandomDate();
    expect(date).toEqual(currentShowing.showingWholeDate);
    const time = await main.selectRandomTime();
    const ticketType = await main.selectRandomTicketType();
    const quantity = await main.selectRandomQuantity();
    const dateParts = date.split(' ');
    let confirmMessage: string;
    confirmMessage = 'You added ' + quantity + ' ticket';
    if (parseInt(quantity) > 1) {
      confirmMessage += 's';
    }
    confirmMessage += ' to ' + showing + ' on ' + dateParts[1] + ' ' + dateParts[2] + ' to the cart.';
    await main.clickGetTickets();
    await main.checkAddTicketSuccess(confirmMessage);
    await main.clickTakeMeThere();
    const cartInfo = ticketType + ' - ' + dateParts[1] + ' - ' + time;
    await main.checkCart(currentEvent, cartInfo, quantity);
  } finally {
    await main.goto();
    await events.goToEventFromManage(currentEvent.eventFullName);
    // await events.searchDeleteShowing(currentShowing.showingWholeDate);
    await events.deleteTheEvent(currentEvent.eventFullName);
  }
});

// Order a ticket through Stripe using a valid customer and card and verify success message appears
test('check stripe purchase', async ({page}) => {
  test.setTimeout(80000);
  const currentPatron = JohnDoe;
  const currentCard = ValidVisaCredit;
  const currentEvent = EventsInfo5;
  const currentShowing = ShowingInfo2;
  const events = new EventsPage(page);
  const main = new MainPage(page);
  await events.goto();
  await events.addnewevent(currentEvent);
  await events.activateEvent();
  await events.addNewShowing(currentShowing);
  try {
    await main.goto();
    await main.purchaseTicket(currentPatron, currentCard, currentEvent);
    await expect(main.stripeOrderConfirmation).toBeVisible({timeout: 15000});
  } finally {
    await main.goto();
    await events.goToEventFromManage(EventsInfo5.eventFullName);
    // await events.searchDeleteShowing(ShowingInfo2.showingWholeDate);
    await events.deleteTheEvent(EventsInfo5.eventFullName);
  }
});

// Order a ticket through Stripe and ensure the contact appears on the Contact page.
// The delete contact function is not working, so contacts cannot be cleared after order.
test('check contact is added after order', async ({page}) => {
  test.setTimeout(80000);
  const currentPatron = JohnDoe;
  const currentCard = ValidVisaCredit;
  const currentEvent = EventsInfo5;
  const currentShowing = ShowingInfo2;
  const events = new EventsPage(page);
  const main = new MainPage(page);
  const contacts = new ContactPage(page);
  await events.goto();
  await events.addnewevent(currentEvent);
  await events.activateEvent();
  await events.addNewShowing(currentShowing);
  try {
    await main.goto();
    await main.purchaseTicket(currentPatron, currentCard, currentEvent);
    await contacts.goto();
    await contacts.searchCustomer(currentPatron);
    await contacts.checkCustomer(currentPatron);
  } finally {
    await main.goto();
    await events.goToEventFromManage(EventsInfo5.eventFullName);
    // await events.searchDeleteShowing(ShowingInfo2.showingWholeDate);
    await events.deleteTheEvent(EventsInfo5.eventFullName);
  }
});

// Select an accommodation during order and make sure it appears on the contact page with the associated person
test('check order accommodations', async ({page}) => {
  test.setTimeout(80000);
  const currentPatron = JaneDoe;
  const currentCard = ValidVisaCredit;
  const currentEvent = EventsInfo5;
  const currentShowing = ShowingInfo2;
  const events = new EventsPage(page);
  const main = new MainPage(page);
  const contacts = new ContactPage(page);
  await events.goto();
  await events.addnewevent(currentEvent);
  await events.activateEvent();
  await events.addNewShowing(currentShowing);
  try {
    await main.goto();
    await main.purchaseTicket(currentPatron, currentCard, currentEvent);
    await contacts.goto();
    await contacts.searchCustomer(currentPatron);
    await contacts.checkCustomer(currentPatron);
  } finally {
    await main.goto();
    await events.goToEventFromManage(EventsInfo5.eventFullName);
    // await events.searchDeleteShowing(ShowingInfo2.showingWholeDate);
    await events.deleteTheEvent(EventsInfo5.eventFullName);
  }
});

// Place a ticket in the cart and ensure both the increment and decrement buttons work
test('check ticket inc/dec in cart', async ({page}) => {
  test.setTimeout(60000);
  const events = new EventsPage(page);
  const main = new MainPage(page);
  const quantity = 2;
  const currentEvent = EventsInfo5;
  const currentShowing = ShowingInfo2;
  await events.goto();
  await events.addnewevent(currentEvent);
  await events.activateEvent();
  await events.addNewShowing(currentShowing);
  try {
    await main.goto();
    await main.goSelectShowing(currentEvent);
    await main.selectRandomDate();
    await main.selectRandomTime();
    await main.selectRandomTicketType();
    await main.selectTicketQuantity(quantity);
    await main.clickGetTickets();
    await main.clickTakeMeThere();
    await main.checkEventTicket(currentEvent, quantity);
    await main.incrementEventTicket(currentEvent);
    await main.checkEventTicket(currentEvent, quantity + 1);
    await main.decrementEventTicket(currentEvent);
    await main.checkEventTicket(currentEvent, quantity);
  } finally {
    await main.goto();
    await events.goToEventFromManage(currentEvent.eventFullName);
    // await events.searchDeleteShowing(currentShowing.showingWholeDate);
    await events.deleteTheEvent(currentEvent.eventFullName);
  }
});

// Order a ticket through stripe and ensure the ticket appears on the door list
test('check order on door list', async ({page}) => {
  test.setTimeout(100000);
  const currentPatron = JohnDoe;
  const currentCard = ValidVisaCredit;
  const currentEvent = EventsInfo6;
  const currentShowing = ShowingInfo5;
  const quantity = 2;
  const events = new EventsPage(page);
  const main = new MainPage(page);
  const doorList = new DoorListPage(page);
  await events.goto();
  await events.addnewevent(currentEvent);
  await events.activateEvent();
  await events.addNewShowing(currentShowing);
  try {
    await main.goto();
    await main.purchaseTicket(currentPatron, currentCard, currentEvent, quantity);
    await doorList.goto();
    await doorList.searchShowing(currentEvent, currentShowing);
    await doorList.checkOrder(currentPatron, quantity);
  } finally {
    await main.goto();
    await events.goToEventFromManage(currentEvent.eventFullName);
    // await events.searchDeleteShowing(currentShowing.showingWholeDate);
    await events.deleteTheEvent(currentEvent.eventFullName);
  }
});

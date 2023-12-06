import { test, expect } from '@playwright/test';
import { MainPage } from '../pages/mainPage';
import { EventsPage } from '../pages/EventsPage';
import { ContactPage } from '../pages/contactPage';
import { DoorListPage } from '../pages/doorListPage';
import { JOHN_DOE, JANE_DOE } from '../testData/dataConstants/CustomerInfoConstants';
import { EVENT_INFO_4, EVENT_INFO_5 } from '../testData/dataConstants/EventInfoConstants';
import { SHOWING_INFO_2, SHOWING_INFO_5 } from '../testData/dataConstants/ShowingInfoConstants';
import { createUniqueEvent, createUniqueCustomer } from '../testData/factoryFunctions';
import { VALID_VISA_CREDIT } from '../testData/dataConstants/CreditCardConstants';

// Verify we can get to the main page and the event header is visible
test('Check Home', async ({page}) => {
  const main = new MainPage(page);

  await main.goto();
  await expect(main.headingEvent).toBeVisible();
});

// Navigate to the first showing on the main page and make sure the event title isn't blank
test.skip('view show', async ({page}) => {
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

  const currentEvent = createUniqueEvent(EVENT_INFO_4);
  const currentShowing = SHOWING_INFO_2;

  await events.goto();
  await events.addnewevent(currentEvent);
  await events.activateEvent();
  await events.addNewShowing(currentShowing);
  
  try {
    await main.goto();
    const showing = await main.goSelectShowing(currentEvent);
    // Rebuild randoms to use a fixed selection using the EventInfo and ShowingInfo
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
    await events.goToEventFromManage(currentEvent);
    await events.deleteTheEvent(currentEvent);
  }
});

// Order a ticket through Stripe using a valid customer and card and verify success message appears
test('check stripe purchase', async ({page}, testInfo) => {
  const timeoutAdd = testInfo.retry * 5000;
  test.setTimeout(80000 + (timeoutAdd * 2)); // There are two places with extended timeouts

  const events = new EventsPage(page);
  const main = new MainPage(page);

  const currentEvent = createUniqueEvent(EVENT_INFO_4);
  const currentPatron = createUniqueCustomer(JOHN_DOE);

  const currentCard = VALID_VISA_CREDIT;
  const currentShowing = SHOWING_INFO_2;

  await events.goto();
  await events.addnewevent(currentEvent);
  await events.activateEvent();
  await events.addNewShowing(currentShowing);

  try {
    await main.goto();
    await main.purchaseTicket(currentPatron, currentCard, currentEvent, {timeoutAdd: timeoutAdd});
    await expect(main.stripeOrderConfirmation).toBeVisible({timeout: 15000 + timeoutAdd});
  } finally {
    await main.goto();
     await events.goToEventFromManage(currentEvent);
    await events.deleteTheEvent(currentEvent);
  }
});

// Order a ticket through Stripe and ensure the contact appears on the Contact page.
// The delete contact function is not working, so contacts cannot be cleared after order.
test('check contact is added after order', async ({page}, testInfo) => {
  const timeoutAdd = testInfo.retry * 5000;
  test.setTimeout(80000);

  const events = new EventsPage(page);
  const main = new MainPage(page);
  const contacts = new ContactPage(page);

  const currentEvent = createUniqueEvent(EVENT_INFO_4);
  const currentShowing = SHOWING_INFO_2;

  const currentPatron = createUniqueCustomer(JOHN_DOE);
  const currentCard = VALID_VISA_CREDIT;

  await events.goto();
  await events.addnewevent(currentEvent);
  await events.activateEvent();
  await events.addNewShowing(currentShowing);
  try {
    await main.goto();
    await main.purchaseTicket(currentPatron, currentCard, currentEvent, {timeoutAdd: timeoutAdd});
    await contacts.goto();
    await contacts.searchCustomer(currentPatron);
    await contacts.checkCustomer(currentPatron);
  } finally {
    await main.goto();
    await events.goToEventFromManage(currentEvent);
    await events.deleteTheEvent(currentEvent);
  }
});

// Select an accommodation during order and make sure it appears on the contact page with the associated person
test('check order accommodations', async ({page}, testInfo) => {
  const timeoutAdd = testInfo.retry * 5000;
  test.setTimeout(80000 + timeoutAdd);

  const events = new EventsPage(page);
  const main = new MainPage(page);
  const contacts = new ContactPage(page);

  const currentEvent = createUniqueEvent(EVENT_INFO_4);
  const currentShowing = SHOWING_INFO_2;

  const currentPatron = createUniqueCustomer(JANE_DOE);
  const currentCard = VALID_VISA_CREDIT;

  await events.goto();
  await events.addnewevent(currentEvent);
  await events.activateEvent();
  await events.addNewShowing(currentShowing);
  try {
    await main.goto();
    await main.purchaseTicket(currentPatron, currentCard, currentEvent, {timeoutAdd: timeoutAdd});
    await contacts.goto();
    await contacts.searchCustomer(currentPatron);
    await contacts.checkCustomer(currentPatron);
  } finally {
    await main.goto();
    await events.goToEventFromManage(currentEvent);
    await events.deleteTheEvent(currentEvent);
  }
});

// Place a ticket in the cart and ensure both the increment and decrement buttons work
test('check ticket inc/dec in cart', async ({page}) => {
  test.setTimeout(60000);
  
  const events = new EventsPage(page);
  const main = new MainPage(page);

  const currentEvent = createUniqueEvent(EVENT_INFO_4);
  const currentShowing = SHOWING_INFO_2;

  const quantity = 2;

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
     await events.goToEventFromManage(currentEvent);
    await events.deleteTheEvent(currentEvent);
  }
});

// Order a ticket through stripe and ensure the ticket appears on the door list
test('check order on door list', async ({page}, testInfo) => {
  const timeoutAdd = testInfo.retry * 5000;
  test.setTimeout(100000 + timeoutAdd);

  const events = new EventsPage(page);
  const main = new MainPage(page);
  const doorList = new DoorListPage(page);

  const currentEvent = createUniqueEvent(EVENT_INFO_5);
  const currentShowing = SHOWING_INFO_5;

  const currentPatron = createUniqueCustomer(JOHN_DOE);
  const currentCard = VALID_VISA_CREDIT;
  const quantity = 2;

  await events.goto();
  await events.addnewevent(currentEvent);
  await events.activateEvent();
  await events.addNewShowing(currentShowing);
  try {
    await main.goto();
    await main.purchaseTicket(currentPatron, currentCard, currentEvent, {qty: quantity, timeoutAdd: timeoutAdd});
    await doorList.goto();
    await doorList.searchShowing(currentEvent, currentShowing);
    await doorList.checkOrder(currentPatron, quantity);
  } finally {
    await main.goto();
    await events.goToEventFromManage(currentEvent);
    await events.deleteTheEvent(currentEvent);
  }
});

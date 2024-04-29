import {test, expect} from '@playwright/test';
import {MainPage} from '../pages/mainPage';
import {EventsPage} from '../pages/eventsPage';
import {ContactPage} from '../pages/contactPage';
import {DoorListPage} from '../pages/doorListPage';
import {CustomerInfo, JOHN_DOE, JANE_DOE} from '../testData/CustomerInfo';
import {EventInfo, EVENT_INFO_4, EVENT_INFO_5} from '../testData/EventInfo';
import {SHOWING_INFO_2, SHOWING_INFO_5} from '../testData/ShowingInfo';
import {VALID_VISA_CREDIT} from '../testData/CreditCard';

// Verify we can get to the main page and the event header is visible
test('Check Home', async ({page}) => {
  const main = new MainPage(page);

  await main.goTo();
  await expect(main.heading).toBeVisible();
});

test('View showing', async ({page}) => {
  const main = new MainPage(page);
  const events = new EventsPage(page);
  const currentEvent = new EventInfo(EVENT_INFO_4);

  await events.goTo();
  await events.addNewEvent(currentEvent);
  await events.activateEvent();
  await events.addNewShowing(SHOWING_INFO_2);

  try {
    await main.goTo();
    const eventTitle = await main.goSelectEvent(currentEvent);
    expect(eventTitle).toEqual(currentEvent.eventName);
  } finally {
    await main.goTo();
    await events.goToEventFromManage(currentEvent);
    await events.deleteTheEvent();
  }
});

// Go through order process and check cart contents
test('Check cart after ticket add', async ({page}) => {
  const events = new EventsPage(page);
  const main = new MainPage(page);

  const currentEvent = new EventInfo(EVENT_INFO_4);
  const currentShowing = SHOWING_INFO_2;

  await events.goTo();
  await events.addNewEvent(currentEvent);
  await events.activateEvent();
  await events.addNewShowing(currentShowing);

  try {
    await main.goTo();
    const eventTitle = await main.goSelectEvent(currentEvent);
    // Rebuild randoms to use a fixed selection using the EventInfo and ShowingInfo
    expect(eventTitle).toEqual(currentEvent.eventName);

    const date = await main.selectRandomDate();
    expect(date).toEqual(currentShowing.showingWholeDate);

    const time = await main.selectRandomTime();
    const ticketType = await main.selectRandomTicketType();
    const quantity = await main.selectRandomQuantity();
    const dateParts = date.split(' ');

    let confirmMessage: string;
    confirmMessage = `You added ${quantity} ticket`;
    if (parseInt(quantity) > 1) {
      confirmMessage += 's';
    }
    confirmMessage += ` to ${eventTitle} on ${dateParts[1]} ${dateParts[2]} to the cart.`;

    await main.clickGetTickets();
    await expect(main.successHeader).toBeVisible();
    await expect(main.getConfirmMessage(confirmMessage)).toBeVisible();

    await main.clickTakeMeThere();
    const cartInfo = `${ticketType.split(':')[0]} - ${dateParts[0]} ${
      dateParts[1]
    } ${dateParts[2]} - ${time}`;
    await main.checkCart(currentEvent, cartInfo, quantity);
  } finally {
    await main.goTo();
    await events.goToEventFromManage(currentEvent);
    await events.deleteTheEvent();
  }
});

// Order a ticket through Stripe using a valid customer and card and verify success message appears
test('Check stripe purchase', async ({page}, testInfo) => {
  const timeoutAdd = testInfo.retry * 5000;
  test.setTimeout(80000 + timeoutAdd * 2);

  const events = new EventsPage(page);
  const main = new MainPage(page);

  const currentEvent = new EventInfo(EVENT_INFO_4);
  const currentPatron = new CustomerInfo(JOHN_DOE);

  const currentCard = VALID_VISA_CREDIT;
  const currentShowing = SHOWING_INFO_2;

  await events.goTo();
  await events.addNewEvent(currentEvent);
  await events.activateEvent();
  await events.addNewShowing(currentShowing);

  try {
    await main.goTo();
    await main.purchaseTicket(currentPatron, currentCard, currentEvent, {
      timeoutAdd: timeoutAdd,
    });
    await expect(main.stripeOrderConfirmation).toBeVisible({
      timeout: 15000 + timeoutAdd,
    });
  } finally {
    await main.goTo();
    await events.goToEventFromManage(currentEvent);
    await events.deleteTheEvent();
  }
});

// Order a ticket through Stripe and ensure the contact appears on the Contact page.
// Select an accommodation during order and make sure it appears on the contact page with the associated person
test('Check contact with accommodation is created after order', async ({
  page,
}, testInfo) => {
  const timeoutAdd = testInfo.retry * 5000;
  test.setTimeout(80000 + timeoutAdd);

  const events = new EventsPage(page);
  const main = new MainPage(page);
  const contacts = new ContactPage(page);

  const currentEvent = new EventInfo(EVENT_INFO_4);
  const currentShowing = SHOWING_INFO_2;

  const currentPatron = new CustomerInfo(JANE_DOE);
  const currentCard = VALID_VISA_CREDIT;

  await events.goTo();
  await events.addNewEvent(currentEvent);
  await events.activateEvent();
  await events.addNewShowing(currentShowing);
  try {
    await main.goTo();
    await main.purchaseTicket(currentPatron, currentCard, currentEvent, {
      timeoutAdd: timeoutAdd,
    });
    await contacts.goTo();
    await contacts.searchCustomer(currentPatron);
    await contacts.checkCustomer(currentPatron);
  } finally {
    await main.goTo();
    await events.goToEventFromManage(currentEvent);
    await events.deleteTheEvent();
  }
});

// Place a ticket in the cart and ensure both the increment and decrement buttons work
test('Check ticket inc/dec in cart', async ({page}) => {
  const events = new EventsPage(page);
  const main = new MainPage(page);

  const currentEvent = new EventInfo(EVENT_INFO_4);
  const currentShowing = SHOWING_INFO_2;

  const quantity = 2;

  await events.goTo();
  await events.addNewEvent(currentEvent);
  await events.activateEvent();
  await events.addNewShowing(currentShowing);
  try {
    await main.goTo();
    await main.goSelectEvent(currentEvent);
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
    await main.goTo();
    await events.goToEventFromManage(currentEvent);
    await events.deleteTheEvent();
  }
});

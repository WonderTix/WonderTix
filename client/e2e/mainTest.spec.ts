import {test, expect} from '@playwright/test';
import {MainPage} from './pages/mainPage';
import {EventsPage} from './pages/EventsPage';
import {ContactPage} from './pages/contactPage';
import {EventsInfo2, ShowingInfo2, JohnDoe, ValidVisaCredit, JaneDoe} from './testData/ConstsPackage';

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

test('check cart after ticket add', async ({page}) => {
  test.setTimeout(60000);
  const events = new EventsPage(page);
  const main = new MainPage(page);
  await events.goto();
  await events.addnewevent(EventsInfo2);
  await events.addNewShowing(ShowingInfo2);
  try {
    await main.goto();
    const showing = await main.goSelectShowing(EventsInfo2);
    // Rebuild randoms to use a fixed selection using the EventsInfo and ShowingsInfo
    expect(showing).toEqual(EventsInfo2.eventName);
    const date = await main.selectRandomDate();
    expect(date).toEqual(ShowingInfo2.showingWholeDate);
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
    await main.checkCart(EventsInfo2.eventName, cartInfo, quantity);
  } finally {
    await main.goto();
    await events.goToEventFromManage(EventsInfo2.eventFullName);
    await events.searchDeleteShowing(ShowingInfo2.showingWholeDate);
    await events.deleteTheEvent(EventsInfo2.eventFullName);
  }
});

test('check successful purchase', async ({page}) => {
  test.setTimeout(80000);
  const currentPatron = JohnDoe;
  const currentCard = ValidVisaCredit;
  const currentEvent = EventsInfo2;
  const currentShowing = ShowingInfo2;
  const events = new EventsPage(page);
  const main = new MainPage(page);
  await events.goto();
  await events.addnewevent(currentEvent);
  await events.addNewShowing(currentShowing);
  try {
    await main.goto();
    await main.purchaseTicket(currentPatron, currentCard, currentEvent);
    await expect(main.stripeOrderConfirmation).toBeVisible({timeout: 15000});
  } finally {
    await main.goto();
    await events.goToEventFromManage(EventsInfo2.eventFullName);
    await events.searchDeleteShowing(ShowingInfo2.showingWholeDate);
    await events.deleteTheEvent(EventsInfo2.eventFullName);
  }
});

test('check contact is added after order', async ({page}) => {
  test.setTimeout(60000);
  const currentPatron = JohnDoe;
  const currentCard = ValidVisaCredit;
  const currentEvent = EventsInfo2;
  const currentShowing = ShowingInfo2;
  const events = new EventsPage(page);
  const main = new MainPage(page);
  const contacts = new ContactPage(page);
  await events.goto();
  await events.addnewevent(currentEvent);
  await events.addNewShowing(currentShowing);
  try {
    await main.goto();
    await main.purchaseTicket(currentPatron, currentCard, currentEvent);
    await contacts.goto();
    await contacts.searchCustomer(currentPatron);
    await contacts.checkCustomer(currentPatron);
  } finally {
    await main.goto();
    await events.goToEventFromManage(EventsInfo2.eventFullName);
    await events.searchDeleteShowing(ShowingInfo2.showingWholeDate);
    await events.deleteTheEvent(EventsInfo2.eventFullName);
  }
});

import {test, expect} from '@playwright/test';
import {MainPage} from './pages/mainPage';
import {EventsPage} from './pages/EventsPage';
import {EventsInfo2} from './testData/ConstsPackage';
import {ShowingInfo2} from './testData/ConstsPackage';

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
  expect(showing).not.toBeNull();
});

// Go through all the steps to add a ticket
// Captures returns needed to construct the confirmation message
// Verifies the 'Success!' message pops up with the correct event info
// Adds and removes its own event for test purposes
test('add ticket', async ({page}) => {
  const events = new EventsPage(page);
  const main = new MainPage(page);
  await events.goto();
  await events.addnewevent(EventsInfo2);
  await events.addNewShowing(ShowingInfo2);
  try {
    await main.goto();
    const showing = await main.goSelectShowing(EventsInfo2);
    expect(EventsInfo2.eventName).toEqual(showing);
    const date = await main.selectRandomDate();
    expect(ShowingInfo2.showingWholeDate).toEqual(date);
    await main.selectRandomTime();
    await main.selectRandomTicketType();
    const quantity = await main.selectRandomQuantity();
    const dateParts = date.split(' ');
    let confirmMessage: string;
    confirmMessage = 'You added ' + quantity + ' ticket';
    if (parseInt(quantity) > 1) {
      confirmMessage += 's';
    }
    confirmMessage += ' to ' + showing + ' on ' + dateParts[1] + ' ' + dateParts[2] + ' to the cart.';
    await main.clickGetTickets();
    expect(await main.checkAddTicketSucess(confirmMessage)).toBeTruthy();
  } finally {
    await main.goto();
    await events.goToEventFromManage(EventsInfo2.eventFullName);
    await events.searchDeleteShowing(ShowingInfo2.showingWholeDate);
    await events.deleteTheEvent(EventsInfo2.eventFullName);
  }
});

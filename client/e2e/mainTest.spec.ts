import {test, expect} from '@playwright/test';
import {MainPage} from './pages/mainPage';

// Verify we can get to the main page and the event header is visible
test('Check Home', async ({page}) => {
  const main = new MainPage(page);
  await main.goto();
  expect(await main.headingEvent).toBeVisible();
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
test('add ticket', async ({page}) => {
  const main = new MainPage(page);
  await main.goto();
  const showing = await main.goFirstShowing();
  const date = await main.selectRandomDate();
  await main.selectRandomTime();
  await main.selectRandomTicketType();
  const quantity = await main.selectRandomQuantity();
  const dateParts = date.split(' ');
  let confirmMessage;
  confirmMessage = 'You added ' + quantity + ' ticket';
  if (parseInt(quantity) > 1) {
    confirmMessage += 's';
  }
  confirmMessage += ' to ' + showing + ' on ' + dateParts[1] + ' ' + dateParts[2] + ' to the cart.';
  await main.clickGetTickets();
  expect(await main.checkAddTicketSucess(confirmMessage)).toBeTruthy();
});

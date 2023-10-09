import {test, expect} from '@playwright/test';
import {MainPage} from './pages/mainPage';

test('Check Home', async ({page}) => {
  const main = new MainPage(page);
  await main.goto();
  expect(await main.headingEvent).toBeVisible();
});

test('view show', async ({page}) => {
  const main = new MainPage(page);
  await main.goto();
  const showing = await main.goFirstShowing();
  expect(showing).not.toBeNull();
});

test('add ticket', async ({page}) => {
  const main = new MainPage(page);
  await main.goto();
  const showing = await main.goFirstShowing();
  console.log(showing);
  const date = await main.selectRandomDate();
  console.log(date);
  const ticketType = await main.selectRandomTicketType();
  console.log(ticketType);
  const quantity = await main.selectRandomQuantity();
  console.log(quantity);
});

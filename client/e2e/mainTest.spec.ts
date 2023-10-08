import {test, expect} from '@playwright/test';
import {MainPage} from './pages/mainPage';

test('Check Home', async ({page}) => {
  const main = new MainPage(page);
  await main.goto();
});

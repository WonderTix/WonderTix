import {test, expect} from '@playwright/test';
import {DoorListPage} from './pages/doorListPage';


test('Check Home', async ({page}) => {
  const doorList = new DoorListPage(page);
  await doorList.goto();
  expect(doorList.getHeader, 'Door List');
  // It's best to also check that the page loaded and not just the URL/Header, so we will look for the
  // <h1> tag that says "Door List" to ensure the page has loaded.
  await expect(page.getByRole('heading', {name: 'Door List'})).toBeVisible({timeout: 5000});
});

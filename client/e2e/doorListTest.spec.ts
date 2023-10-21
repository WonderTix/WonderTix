import {test, expect} from '@playwright/test';
import {DoorListPage} from './pages/doorListPage';


test('Check Home', async ({page}) => {
  const doorList = new DoorListPage(page);
  await doorList.goto();
  expect(await doorList.getHeader, 'Door List');
});
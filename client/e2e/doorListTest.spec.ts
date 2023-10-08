import {test, expect} from '@playwright/test';
import {DoorListPage} from './pages/doorListPage';


test('Check Home', async ({page}) => {
  const doorList = new DoorListPage(page);
  await doorList.goto();
  expect(await doorList.getHeader, 'Door List');
});

test('random show and time', async ({page}) => {
  const doorList = new DoorListPage(page);
  await doorList.goto();
  const showing = await doorList.selectRandomShow();
  console.log(await showing);
  const time = await doorList.selectRandomTime();
  console.log(await time);
});

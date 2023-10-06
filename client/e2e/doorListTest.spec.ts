import {test, expect} from '@playwright/test';
import {DoorListPage} from './pages/doorListPage';


test('Check Home', async ({page}) => {
  const doorList = new DoorListPage(page);
  expect(doorList.getHeader, 'Door List');
});

test('random show and time', async ({page}) => {
  const doorList = new DoorListPage(page);
  const showing = doorList.selectRandomShow();
  console.log(await showing);
  const time = doorList.selectRandomTime();
  console.log(await time);
});

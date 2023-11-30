import {test, expect} from '@playwright/test';
import {SeasonsPage} from './pages/seasonsPage';
import {EventsPage} from './pages/EventsPage';
import {EventsInfo, EventsInfoTemplate2} from './testData/ConstsPackage';
import {SeasonInfo1, SeasonInfo2} from './testData/ConstsPackage';

test('Homepage->Seasons', async ({page}) => {
    const seasonsPage = new SeasonsPage(page);
    await seasonsPage.goto();
  });

test('addNewSeasonWithEvent', async ({page})=>{
  // setup
  const eventsPage = new EventsPage(page);
  const currentEvent = new EventsInfo(EventsInfoTemplate2);
  const seasonsPage = new SeasonsPage(page);

  try {
    await eventsPage.goto();
    await eventsPage.addnewevent(currentEvent);
    await eventsPage.activateEvent();

    await seasonsPage.goto();
    await seasonsPage.addNewSeason(SeasonInfo1);
    await seasonsPage.addEventToSeason(currentEvent);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('addNewSeasonWithEvent error:', error.message);
    } else {
      console.error('addNewSeasonWithEvent unknown error:', error);
    }
  } finally {
    // cleanup
    await seasonsPage.goto();
    await seasonsPage.removeSeason(SeasonInfo1);

    // cleanup
    await eventsPage.goto();
    await page.locator(':text("' + currentEvent.eventName + '")').click();
    await eventsPage.deleteTheEvent(currentEvent.eventFullName);
  }
});

test('editSeason', async ({page})=>{
  const seasonsPage = new SeasonsPage(page);

  try {
    // setup
    await seasonsPage.goto();
    await seasonsPage.addNewSeason(SeasonInfo1);

    // test
    await seasonsPage.editSeason(SeasonInfo1, SeasonInfo2);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('editSeason error:', error.message);
    } else {
      console.error('editSeason unknown error:', error);
    }
  } finally {
    // cleanup
    await seasonsPage.goto();
    await seasonsPage.removeSeason(SeasonInfo2);
  }
});

test('removeEventFromSeason', async ({page})=>{
  const eventsPage = new EventsPage(page);
  const currentEvent = new EventsInfo(EventsInfoTemplate2);
  const seasonsPage = new SeasonsPage(page);
  try {
    // setup
    await eventsPage.goto();
    await eventsPage.addnewevent(currentEvent);
    await eventsPage.activateEvent();

    // setup
    await seasonsPage.goto();
    await seasonsPage.addNewSeason(SeasonInfo1);
    await seasonsPage.addEventToSeason(currentEvent);

    // test
    await seasonsPage.goto();
    await seasonsPage.removeEventFromSeason(SeasonInfo1, currentEvent);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('removeEventFromSeason error:', error.message);
    } else {
      console.error('removeEventFromSeason unknown error:', error);
    }
  } finally {
    // cleanup
    await seasonsPage.goto();
    await seasonsPage.removeSeason(SeasonInfo1);

    // cleanup
    await eventsPage.goto();
    await page.locator(':text("' + currentEvent.eventName + '")').click();
    await eventsPage.deleteTheEvent(currentEvent.eventFullName);
  }
});

test('removeSeason', async ({page})=>{
  const seasonsPage = new SeasonsPage(page);
  try {
    // setup
    await seasonsPage.goto();
    await seasonsPage.addNewSeason(SeasonInfo1);

    // test
    await seasonsPage.goto();
    await seasonsPage.removeSeason(SeasonInfo1);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('removeSeason error:', error.message);
    } else {
      console.error('removeSeason unknown error:', error);
    }
  }
});

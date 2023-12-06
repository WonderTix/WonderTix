import { test } from '@playwright/test';
import { SeasonsPage } from '../pages/seasonsPage';
import { EventsPage } from '../pages/EventsPage';
import { createUniqueEvent, createUniqueSeason } from '../testData/factoryFunctions';
import { EVENT_INFO_1 } from '../testData/dataConstants/EventInfoConstants';
import { SEASON_INFO_1 } from '../testData/dataConstants/SeasonInfoConstants';

test('Homepage->Seasons', async ({page}) => {
  const seasonsPage = new SeasonsPage(page);
  await seasonsPage.goto();
});

test('addNewSeasonWithEvent', async ({page}) => {
  const seasonsPage = new SeasonsPage(page);
  const eventsPage = new EventsPage(page);

  const uniqueEvent = createUniqueEvent(EVENT_INFO_1);
  const uniqueSeason = createUniqueSeason(SEASON_INFO_1);
  
  try {
    await eventsPage.goto();
    await eventsPage.addnewevent(uniqueEvent);
    await eventsPage.activateEvent();

    await seasonsPage.goto();
    await seasonsPage.addNewSeason(uniqueSeason);
    await seasonsPage.addEventToSeason(uniqueEvent);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('addNewSeasonWithEvent error:', error.message);
      console.error('addNewSeasonWithEvent error:', error.message);
    } else {
      console.error('addNewSeasonWithEvent unknown error:', error);
      console.error('addNewSeasonWithEvent unknown error:', error);
    }
  } finally {
    //cleanup
    const seasonsPage2 = new SeasonsPage(page);
    await seasonsPage2.goto();
    await seasonsPage2.removeSeason(uniqueSeason);

    // cleanup
    const eventsPage2 = new EventsPage(page);
    await eventsPage2.goto();
    await page.locator(':text("' + uniqueEvent.eventName + '")').click();
    await eventsPage2.deleteTheEvent(uniqueEvent);
  }
});

test('editSeason', async ({page}) => {
  const seasonsPage = new SeasonsPage(page);

  const uniqueSeason1 = createUniqueSeason(SEASON_INFO_1);
  const uniqueSeason2 = createUniqueSeason(SEASON_INFO_1);

  try {
    // setup
    await seasonsPage.goto();
    await seasonsPage.addNewSeason(uniqueSeason1);

    // test
    await seasonsPage.editSeason(uniqueSeason1, uniqueSeason2);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('editSeason error:', error.message);
      console.error('editSeason error:', error.message);
    } else {
      console.error('editSeason unknown error:', error);
      console.error('editSeason unknown error:', error);
    }
  } finally {
    //cleanup
    const seasonsPage2 = new SeasonsPage(page);
    await seasonsPage2.goto();
    await seasonsPage2.removeSeason(uniqueSeason2);
  }
});

test('removeEventFromSeason', async ({page}) => {
  const seasonsPage = new SeasonsPage(page);
  const eventsPage = new EventsPage(page);
  const uniqueEvent = createUniqueEvent(EVENT_INFO_1);
  const uniqueSeason = createUniqueSeason(SEASON_INFO_1);

  try {
    // setup
    await eventsPage.goto();
    await eventsPage.addnewevent(uniqueEvent);
    await eventsPage.activateEvent();

    // setup
    await seasonsPage.goto();
    await seasonsPage.addNewSeason(uniqueSeason);
    await seasonsPage.addEventToSeason(uniqueEvent);

    // test
    const seasonsPage2 = new SeasonsPage(page);
    await seasonsPage2.goto();
    await seasonsPage2.removeEventFromSeason(uniqueSeason, uniqueEvent);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('removeEventFromSeason error:', error.message);
      console.error('removeEventFromSeason error:', error.message);
    } else {
      console.error('removeEventFromSeason unknown error:', error);
      console.error('removeEventFromSeason unknown error:', error);
    }
  } finally {
    //cleanup
    const seasonsPage3 = new SeasonsPage(page);
    await seasonsPage3.goto();
    await seasonsPage3.removeSeason(uniqueSeason);

    // cleanup
    const eventsPage2 = new EventsPage(page);
    await eventsPage2.goto();
    await page.locator(':text("' + uniqueEvent.eventName + '")').click();
    await eventsPage2.deleteTheEvent(uniqueEvent);
  }
});

test('removeSeason', async ({page}) => {
  const seasonsPage = new SeasonsPage(page);
  const uniqueSeason = createUniqueSeason(SEASON_INFO_1);
  
  try {
    // setup
    await seasonsPage.goto();
    await seasonsPage.addNewSeason(uniqueSeason);

    // test
    const seasonsPage2 = new SeasonsPage(page);
    await seasonsPage2.goto();
    await seasonsPage2.removeSeason(uniqueSeason);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('removeSeason error:', error.message);
      console.error('removeSeason error:', error.message);
    } else {
      console.error('removeSeason unknown error:', error);
      console.error('removeSeason unknown error:', error);
    }
  }
});

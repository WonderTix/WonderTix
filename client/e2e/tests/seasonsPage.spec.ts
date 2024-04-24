import {test} from '@playwright/test';
import {SeasonsPage} from '../pages/seasonsPage';
import {EventsPage} from '../pages/eventsPage';
import {EventInfo, EVENT_INFO_1} from '../testData/EventInfo';
import {SeasonInfo, SEASON_INFO_1} from '../testData/SeasonInfo';

test('Homepage->Seasons', async ({page}) => {
  const seasonsPage = new SeasonsPage(page);
  await seasonsPage.goto();
});

test('addNewSeasonWithEvent', async ({page}) => {
  const seasonsPage = new SeasonsPage(page);
  const eventsPage = new EventsPage(page);

  const uniqueEvent = new EventInfo(EVENT_INFO_1);
  const uniqueSeason = new SeasonInfo(SEASON_INFO_1);

  try {
    await eventsPage.goTo();
    await eventsPage.addNewEvent(uniqueEvent);
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
    // cleanup
    const seasonsPage2 = new SeasonsPage(page);
    await seasonsPage2.goto();
    await seasonsPage2.removeSeason(uniqueSeason);

    // cleanup
    const eventsPage2 = new EventsPage(page);
    await eventsPage2.goTo();
    await page.locator(':text("' + uniqueEvent.eventName + '")').click();
    await eventsPage2.deleteTheEvent();
  }
});

test('editSeason', async ({page}) => {
  const seasonsPage = new SeasonsPage(page);

  const uniqueSeason1 = new SeasonInfo(SEASON_INFO_1);
  const uniqueSeason2 = new SeasonInfo(SEASON_INFO_1);

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
    // cleanup
    const seasonsPage2 = new SeasonsPage(page);
    await seasonsPage2.goto();
    await seasonsPage2.removeSeason(uniqueSeason2);
  }
});

test('removeEventFromSeason', async ({page}) => {
  const seasonsPage = new SeasonsPage(page);
  const eventsPage = new EventsPage(page);
  const uniqueEvent = new EventInfo(EVENT_INFO_1);
  const uniqueSeason = new SeasonInfo(SEASON_INFO_1);

  try {
    // setup
    await eventsPage.goTo();
    await eventsPage.addNewEvent(uniqueEvent);
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
    // cleanup
    const seasonsPage3 = new SeasonsPage(page);
    await seasonsPage3.goto();
    await seasonsPage3.removeSeason(uniqueSeason);

    // cleanup
    const eventsPage2 = new EventsPage(page);
    await eventsPage2.goTo();
    await page.locator(':text("' + uniqueEvent.eventName + '")').click();
    await eventsPage2.deleteTheEvent();
  }
});

test('removeSeason', async ({page}) => {
  const seasonsPage = new SeasonsPage(page);
  const uniqueSeason = new SeasonInfo(SEASON_INFO_1);

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

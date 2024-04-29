import {test, expect} from '@playwright/test';
import {SeasonsPage} from '../pages/seasonsPage';
import {EventsPage} from '../pages/eventsPage';
import {EventInfo, EVENT_INFO_1} from '../testData/EventInfo';
import {SeasonInfo, SEASON_INFO_1, SEASON_INFO_2} from '../testData/SeasonInfo';

test('Add new season with event', async ({page}) => {
  const seasonsPage = new SeasonsPage(page);
  const eventsPage = new EventsPage(page);

  const uniqueSeason = new SeasonInfo(SEASON_INFO_1);
  const uniqueEvent = new EventInfo(EVENT_INFO_1);

  await eventsPage.goTo();
  await eventsPage.addNewEvent(uniqueEvent);
  await eventsPage.activateEvent();
  try {
    await seasonsPage.goTo();
    await seasonsPage.addNewSeason(uniqueSeason);
    await expect(seasonsPage.seasonName).toHaveText(uniqueSeason.seasonName);
    await expect(seasonsPage.seasonStartDate).toHaveText(uniqueSeason.seasonWholeStart);
    await expect(seasonsPage.seasonEndDate).toHaveText(uniqueSeason.seasonWholeEnd);

    await seasonsPage.addEventToSeason(uniqueEvent);
    await expect(seasonsPage.seasonEventCard.filter({hasText: uniqueEvent.eventName})).toBeVisible();
  } finally {
    await seasonsPage.goTo();
    await seasonsPage.clickSeasonCard(uniqueSeason);
    await seasonsPage.removeSeason();

    await eventsPage.goToHome();
    await eventsPage.goToEventFromManage(uniqueEvent);
    await eventsPage.deleteTheEvent();
  }
});

test('Edit season', async ({page}) => {
  const seasonsPage = new SeasonsPage(page);

  const uniqueSeason1 = new SeasonInfo(SEASON_INFO_1);
  const uniqueSeason2 = new SeasonInfo(SEASON_INFO_2);

  try {
    // setup
    await seasonsPage.goTo();
    await seasonsPage.addNewSeason(uniqueSeason1);

    // test
    await seasonsPage.editSeason(uniqueSeason1, uniqueSeason2);
    await expect(seasonsPage.seasonName).toHaveText(uniqueSeason2.seasonName);
    await expect(seasonsPage.seasonStartDate).toHaveText(uniqueSeason2.seasonWholeStart);
    await expect(seasonsPage.seasonEndDate).toHaveText(uniqueSeason2.seasonWholeEnd);
  } finally {
    await seasonsPage.goTo();
    await seasonsPage.clickSeasonCard(uniqueSeason2);
    await seasonsPage.removeSeason();
  }
});

test('Remove event from season', async ({page}) => {
  const seasonsPage = new SeasonsPage(page);
  const eventsPage = new EventsPage(page);

  const uniqueSeason = new SeasonInfo(SEASON_INFO_1);
  const uniqueEvent = new EventInfo(EVENT_INFO_1);

  await eventsPage.goTo();
  await eventsPage.addNewEvent(uniqueEvent);
  await eventsPage.activateEvent();
  try {
    // setup
    await seasonsPage.goTo();
    await seasonsPage.addNewSeason(uniqueSeason);
    await seasonsPage.addEventToSeason(uniqueEvent);

    // test
    await expect(seasonsPage.seasonEventCard.filter({hasText: uniqueEvent.eventName})).toBeVisible();
    await seasonsPage.removeEventFromSeason(uniqueSeason, uniqueEvent);
    await expect(seasonsPage.seasonEventCard.filter({hasText: uniqueEvent.eventName})).not.toBeVisible();
  } finally {
    await seasonsPage.goTo();
    await seasonsPage.clickSeasonCard(uniqueSeason);
    await seasonsPage.removeSeason();

    await eventsPage.goToHome();
    await eventsPage.goToEventFromManage(uniqueEvent);
    await eventsPage.deleteTheEvent();
  }
});

test('Remove season', async ({page}) => {
  const seasonsPage = new SeasonsPage(page);
  const uniqueSeason = new SeasonInfo(SEASON_INFO_1);

  // setup
  await seasonsPage.goTo();
  await seasonsPage.addNewSeason(uniqueSeason);

  // test
  await seasonsPage.removeSeason();
  await expect(seasonsPage.seasonName).not.toBeVisible();
  await expect(seasonsPage.getSeasonCard(uniqueSeason)).not.toBeVisible();
});

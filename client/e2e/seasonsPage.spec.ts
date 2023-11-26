import {test , expect} from '@playwright/test';
import {SeasonsPage} from './pages/seasonsPage';
import {EventsPage} from './pages/EventsPage';
import { EventsInfo2, SeasonInfo2 } from './testData/ConstsPackage';
import { SeasonInfo1 } from './testData/ConstsPackage';

test('Homepage->Seasons',async({page}) => {
    const seasonsPage = new SeasonsPage(page);
    await seasonsPage.goto();
  });

test('addNewSeasonWithEvent',async({page})=>{
  // setup
  try {
    const eventsPage = new EventsPage(page);
    await eventsPage.goto();
    await eventsPage.addnewevent(EventsInfo2);
    await eventsPage.activateEvent()

    const seasonsPage = new SeasonsPage(page);
    await seasonsPage.goto();
    await seasonsPage.addNewSeason(SeasonInfo1);
    await seasonsPage.addEventToSeason(EventsInfo2);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("addNewSeasonWithEvent error:", error.message);
    } else {
      console.error("addNewSeasonWithEvent unknown error:", error);
    }
  } finally {
    //cleanup
    const seasonsPage2 = new SeasonsPage(page);
    await seasonsPage2.goto();
    await seasonsPage2.removeSeason(SeasonInfo1);

    // cleanup
    const eventsPage2 = new EventsPage(page);
    await eventsPage2.goto();
    await page.locator(':text("' + EventsInfo2.eventName + '")').click();
    await eventsPage2.deleteTheEvent(EventsInfo2.eventFullName);
  }
});

test('editSeason',async({page})=>{

  try {
    // setup
    const seasonsPage = new SeasonsPage(page);
    await seasonsPage.goto();
    await seasonsPage.addNewSeason(SeasonInfo1);

    // test
    await seasonsPage.editSeason(SeasonInfo1, SeasonInfo2);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("editSeason error:", error.message);
    } else {
      console.error("editSeason unknown error:", error);
    }
  } finally {
    //cleanup
    const seasonsPage2 = new SeasonsPage(page);
    await seasonsPage2.goto();
    await seasonsPage2.removeSeason(SeasonInfo2);
  }
});

test('removeEventFromSeason',async({page})=>{
  try {
    // setup
    const eventsPage = new EventsPage(page);
    await eventsPage.goto();
    await eventsPage.addnewevent(EventsInfo2);
    await eventsPage.activateEvent()
  
    // setup
    const seasonsPage = new SeasonsPage(page);
    await seasonsPage.goto();
    await seasonsPage.addNewSeason(SeasonInfo1);
    await seasonsPage.addEventToSeason(EventsInfo2);

    // test
    const seasonsPage2 = new SeasonsPage(page);
    await seasonsPage2.goto();
    await seasonsPage2.removeEventFromSeason(SeasonInfo1, EventsInfo2);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("removeEventFromSeason error:", error.message);
    } else {
      console.error("removeEventFromSeason unknown error:", error);
    }
  } finally {

    //cleanup
    const seasonsPage3 = new SeasonsPage(page);
    await seasonsPage3.goto();
    await seasonsPage3.removeSeason(SeasonInfo1);

    // cleanup
    const eventsPage2 = new EventsPage(page);
    await eventsPage2.goto();
    await page.locator(':text("' + EventsInfo2.eventName + '")').click();
    await eventsPage2.deleteTheEvent(EventsInfo2.eventFullName);
  }
});

test('removeSeason',async({page})=>{
  try {
    // setup
    const seasonsPage = new SeasonsPage(page);
    await seasonsPage.goto();
    await seasonsPage.addNewSeason(SeasonInfo1);

    // test
    const seasonsPage2 = new SeasonsPage(page);
    await seasonsPage2.goto();
    await seasonsPage2.removeSeason(SeasonInfo1);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error("removeSeason error:", error.message);
    } else {
      console.error("removeSeason unknown error:", error);
    }
  }
});
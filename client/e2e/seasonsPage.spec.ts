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
  // create new event
    const eventsPage = new EventsPage(page);
    await eventsPage.goto();
    await eventsPage.addnewevent(EventsInfo2);

    const seasonsPage = new SeasonsPage(page);
    await seasonsPage.goto();
    await seasonsPage.addNewSeason(SeasonInfo1);
    await seasonsPage.addEventToSeason(EventsInfo2);

    // cleanup
    const eventsPage2 = new EventsPage(page);
    await eventsPage2.goto();
    await page.locator(':text("' + EventsInfo2.eventName + '")').first().click();
    await eventsPage.deleteTheEvent(EventsInfo2.eventFullName);
});

test('editSeason',async({page})=>{
    const seasonsPage = new SeasonsPage(page);
    await seasonsPage.goto();
    await seasonsPage.editSeason(SeasonInfo1, SeasonInfo2);
});

test('removeEventFromSeason',async({page})=>{
    const seasonsPage = new SeasonsPage(page);
    await seasonsPage.goto();
    await seasonsPage.removeEventFromSeason();
});

test('removeSeason',async({page})=>{
    const seasonsPage = new SeasonsPage(page);
    await seasonsPage.goto();
    await seasonsPage.removeSeason(SeasonInfo2);
});
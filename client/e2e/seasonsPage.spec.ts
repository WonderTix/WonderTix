import {test , expect} from '@playwright/test';
import {SeasonsPage} from './pages/seasonsPage';

test('Homepage->Seasons',async({page}) => {
    const seasonsPage = new SeasonsPage(page);
    await seasonsPage.goto();
  });

test('addNewSeasonWithEvent',async({page})=>{
    const seasonsPage = new SeasonsPage(page);
    await seasonsPage.goto();
    await seasonsPage.addNewSeason();
    await seasonsPage.addEventToSeason();
});

test('editSeason',async({page})=>{
    const seasonsPage = new SeasonsPage(page);
    await seasonsPage.goto();
    await seasonsPage.editSeason();
});

test('removeEventFromSeason',async({page})=>{
    const seasonsPage = new SeasonsPage(page);
    await seasonsPage.goto();
    await seasonsPage.removeEventFromSeason();
    await seasonsPage.cleanupTestEvent();
});

test('removeSeason',async({page})=>{
    const seasonsPage = new SeasonsPage(page);
    await seasonsPage.goto();
    await seasonsPage.removeSeason();
});
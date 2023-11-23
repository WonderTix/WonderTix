import {type Locator, type Page, expect} from '@playwright/test';
import { SeasonsInfo } from '../testData/ConstsPackage';
import { EventsInfo } from '../testData/ConstsPackage';

export class SeasonsPage {
  readonly page: Page;

  // Homepage
  readonly emailButton: Locator;
  readonly manageTicketingButton: Locator;
  readonly dashboardSeasonsButton: Locator;

  // ../ticketing
  readonly SeasonHeading: Locator;
  readonly addSeasonButton: Locator;

  readonly pageHeader: Locator;
  readonly seasonNameBlank: Locator;
  readonly seasonStartDate: Locator;
  readonly seasonEndDate: Locator;
  readonly imageURL: Locator;

  readonly seasonOption1: Locator;
  readonly seasonOption2: Locator;

  readonly seasonEdit: Locator;
  readonly seasonSave: Locator;
  readonly seasonDelete: Locator;

  readonly seasonContinue: Locator;

  readonly DashboardButton: Locator;
  
  readonly addEvent: Locator;

  constructor(page: Page) {
    this.page = page;

    this.emailButton= page.getByText(process.env.TEST_EMAIL as string);

    this.manageTicketingButton=page.getByText('Manage Ticketing').first();
    this.dashboardSeasonsButton=page.getByRole('button', {name: 'Seasons'});

    this.pageHeader = page.getByRole('heading', { name: 'Select Season' });

    this.addSeasonButton = page.getByRole('button', { name: 'Add Season' });

    this.seasonNameBlank = page.getByLabel('Season Name:');
    this.seasonStartDate = page.getByLabel('Start Date:');
    this.seasonEndDate = page.getByLabel('End Date:');
    this.imageURL=page.getByLabel('Image URL:');

    this.seasonOption1=page.getByLabel('Use Default Image');
    this.seasonOption2=page.getByLabel('Active');

    this.seasonEdit=page.locator(".flex[data-mui-internal-clone-element=true]").first();
    this.seasonSave=page.getByRole('button', {name: 'Save'});
    this.seasonDelete=page.locator(".flex[data-mui-internal-clone-element=true]").last();

    this.seasonContinue=page.getByRole('button', { name: 'Continue' });

    this.addEvent=page.getByRole('button', { name: 'Add event' });

  }

  async addNewSeason(season: SeasonsInfo)
  {
    await this.addSeasonButton.click();
    await this.seasonNameBlank.fill(season.seasonName);
    await this.seasonStartDate.fill(season.seasonStart);
    await this.seasonEndDate.fill(season.seasonEnd);
    await this.imageURL.fill(season.seasonImgURL);
    await this.seasonSave.click();
    await this.seasonContinue.click();

    await expect(this.page.locator(':text("' + season.seasonName + '")')).toBeVisible();
  }

  async addEventToSeason(event: EventsInfo) 
  {
    await this.addEvent.click();
    await this.page.getByRole('button', { name: 'Add to Season'}).first().click();
    await this.page.getByRole('button', { name: 'Continue'}).click();

    await expect(this.page.locator(':text("' + event.eventName + '")')).toBeVisible();
  }

  async editSeason(old_season: SeasonsInfo, new_season: SeasonsInfo)
  {
    await this.page.locator(':text("' + old_season.seasonName + '")').first().click();
    await this.seasonEdit.click();
    await this.seasonNameBlank.fill(new_season.seasonName);
    await this.seasonStartDate.fill(new_season.seasonStart);
    await this.seasonEndDate.fill(new_season.seasonEnd);
    await this.imageURL.fill(new_season.seasonImgURL);
    await this.seasonSave.click();
    await this.seasonContinue.click();

    await expect(this.page.locator(':text("' + new_season.seasonName + '")')).toBeVisible();
  }

  async removeEventFromSeason()
  {
    await this.page.locator(':text("NewName")').first().click();
    await this.page.getByRole('button', { name: 'Remove Event'}).first().click();
    await this.page.getByRole('button', { name: 'Continue'}).click();

    await expect(this.page.locator(':text("Test_event")')).not.toBeVisible();
  }

  async removeSeason(season: SeasonsInfo)
  {
    await this.page.locator(':text("' + season.seasonName + '")').first().click();
    await this.seasonDelete.click();
    await this.page.getByRole('button', { name: 'Continue'}).click();

    await expect(this.page.locator(':text("' + season.seasonName + '")')).not.toBeVisible();
  }

  async goto(){
    await this.page.goto('/', { timeout: 90000 });
    await this.emailButton.click();
    await this.manageTicketingButton.click();
    await this.dashboardSeasonsButton.click();
    await expect(this.pageHeader).toBeVisible();
  }

}
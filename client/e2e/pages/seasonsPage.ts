import {type Locator, type Page, expect} from '@playwright/test';
import {EventsPage} from '../pages/EventsPage';
import { EventsInfo2 } from '../testData/ConstsPackage';

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

  async addNewSeason()
  {
    await this.addSeasonButton.click();
    await this.seasonNameBlank.fill('TestName');
    await this.seasonStartDate.fill('2020-02-02');
    await this.seasonEndDate.fill('2020-03-02');
    await this.imageURL.fill('https://www.hindustantimes.com/ht-img/img/2023/08/25/550x309/international_dog_day_1692974397743_1692974414085.jpg');
    await this.seasonSave.click();
    await this.seasonContinue.click();

    await expect(this.page.locator(':text("TestName")')).toBeVisible();
  }

  async addEventToSeason() 
  {
    // notes:
    // some goto methods are using loopholes to get to the page instead of the navigators

    // create new event
    const eventsPage = new EventsPage(this.page);
    await eventsPage.goto();
    await eventsPage.addnewevent(EventsInfo2);

    // go back to seasons
    const seasonsPage1 = new SeasonsPage(this.page);
    await seasonsPage1.goto();

    // remove from default season

    // click the first season that was created previously -- assuming its there
    await this.page.locator(':has-text("Start Date")').last().click();

    await this.page.getByRole('button', { name: 'Remove Event'}).last().click();

    await this.page.getByRole('button', { name: 'Continue'}).click();

    // go back to seasons
    const seasonsPage2 = new SeasonsPage(this.page);
    await seasonsPage2.goto();

    await this.page.locator(':text("TestName")').first().click();

    await this.addEvent.click();
    //await this.page.getByRole('button', { name: 'Add Event'}).click();
    await this.page.getByRole('button', { name: 'Add to Season'}).first().click();
    await this.page.getByRole('button', { name: 'Continue'}).click();

    await expect(this.page.locator(':text("TestName")')).toBeVisible();
  }

  async editSeason()
  {
    await this.page.locator(':text("TestName")').first().click();
    await this.seasonEdit.click();
    await this.seasonNameBlank.fill('NewName');
    await this.seasonStartDate.fill('2021-02-02');
    await this.seasonEndDate.fill('2021-03-02');
    await this.imageURL.fill('https://www.hindustantimes.com/ht-img/img/2023/08/25/550x309/international_dog_day_1692974397743_1692974414085.jpg');
    await this.seasonSave.click();
    await this.seasonContinue.click();

    await expect(this.page.locator(':text("NewName")')).toBeVisible();
  }

  async removeEventFromSeason()
  {
    await this.page.locator(':text("NewName")').first().click();
    await this.page.getByRole('button', { name: 'Remove Event'}).first().click();
    await this.page.getByRole('button', { name: 'Continue'}).click();

    await expect(this.page.locator(':text("Test_event")')).not.toBeVisible();
  }
  
  async cleanupTestEvent()
  {
    const eventsPage = new EventsPage(this.page);
    await eventsPage.goto();
    await this.page.locator(':text("Test_event")').first().click();
    // clean up the event we added
    await eventsPage.deleteTheEvent("Test_event Playbill Test_event Description An event for testing");
  }

  async removeSeason()
  {
    await this.page.locator(':text("NewName")').first().click();
    await this.seasonDelete.click();
    await this.page.getByRole('button', { name: 'Continue'}).click();

    await expect(this.page.locator(':text("NewName")')).not.toBeVisible();
  }

  async goto(){
    await this.page.goto('/', { timeout: 90000 });
    await this.emailButton.click();
    await this.manageTicketingButton.click();
    await this.dashboardSeasonsButton.click();
    await expect(this.pageHeader).toBeVisible();
  }

}
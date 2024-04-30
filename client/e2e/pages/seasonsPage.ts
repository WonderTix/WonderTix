/* eslint-disable require-jsdoc */
import {type Locator, type Page} from '@playwright/test';
import {EventInfo} from '../testData/EventInfo';
import {SeasonInfo} from '../testData/SeasonInfo';

export class SeasonsPage {
  readonly page: Page;

  // Season Select Page
  readonly loadingScreen: Locator;
  readonly addSeasonButton: Locator;

  // Individual Season
  readonly seasonNameInput: Locator;
  readonly seasonStartDateInput: Locator;
  readonly seasonEndDateInput: Locator;
  readonly imageURLInput: Locator;

  readonly seasonName: Locator;
  readonly seasonStartDate: Locator;
  readonly seasonEndDate: Locator;

  readonly seasonImageButton: Locator;
  readonly seasonActiveSwitch: Locator;

  readonly seasonEdit: Locator;
  readonly seasonSave: Locator;
  readonly seasonDelete: Locator;

  readonly seasonContinue: Locator;

  readonly closeAddEventsButton: Locator;
  readonly seasonEventCard: Locator;
  readonly addEvent: Locator;

  constructor(page: Page) {
    this.page = page;

    this.loadingScreen = page.getByTestId('loading-screen');
    this.addSeasonButton = page.getByRole('button', {name: 'Add Season'});

    this.seasonNameInput = page.getByLabel('Season Name:');
    this.seasonStartDateInput = page.getByLabel('Start Date:');
    this.seasonEndDateInput = page.getByLabel('End Date:');
    this.imageURLInput = page.getByLabel('Image URL:');

    this.seasonName = page.getByTestId('season-name');
    this.seasonStartDate = page.getByTestId('season-startdate');
    this.seasonEndDate = page.getByTestId('season-enddate');

    this.seasonImageButton = page.getByLabel('Use Default Image');
    this.seasonActiveSwitch = page.getByLabel('Active');

    this.seasonEdit = page.getByTestId('season-edit');
    this.seasonSave = page.getByRole('button', {name: 'Save'});
    this.seasonDelete = page.getByTestId('season-delete');

    this.seasonContinue = page.getByRole('button', {name: 'Continue'});

    this.closeAddEventsButton = page.getByRole('button', {name: 'Close'});
    this.seasonEventCard = page.getByTestId('season-event-card');
    this.addEvent = page.getByRole('button', {name: 'Add event'});
  }

  async addNewSeason(season: SeasonInfo) {
    await this.addSeasonButton.click();
    await this.seasonNameInput.fill(season.seasonName);
    await this.seasonStartDateInput.fill(season.seasonStart);
    await this.seasonEndDateInput.fill(season.seasonEnd);
    await this.imageURLInput.fill(season.seasonImgURL);
    await this.seasonSave.click();
    await this.seasonContinue.click();
  }

  async addEventToSeason(event: EventInfo) {
    await this.addEvent.click();
    const eventLocator = this.seasonEventCard.filter({
      hasText: event.eventName,
    });
    await eventLocator.getByTestId('event-add-to-season').click();
    await this.seasonContinue.click();
    await this.closeAddEventsButton.click();
  }

  async editSeason(oldSeason: SeasonInfo, newSeason: SeasonInfo) {
    await this.page.getByText(oldSeason.seasonName).click();
    await this.seasonEdit.click();
    await this.seasonNameInput.fill(newSeason.seasonName);
    await this.seasonStartDateInput.fill(newSeason.seasonStart);
    await this.seasonEndDateInput.fill(newSeason.seasonEnd);
    await this.imageURLInput.fill(newSeason.seasonImgURL);
    await this.seasonSave.click();
    await this.page.getByRole('button', {name: 'Continue'}).click();
  }

  async removeEventFromSeason(event: EventInfo) {
    const eventLocator = this.seasonEventCard.filter({
      hasText: event.eventName,
    });
    await eventLocator.getByTestId('event-remove').click();

    await this.seasonContinue.click();
  }

  async clickSeasonCard(season: SeasonInfo) {
    await this.page.getByText(season.seasonName).click();
  }

  getSeasonCard(season: SeasonInfo) {
    return this.page.getByText(season.seasonName);
  }

  async removeSeason() {
    await this.seasonDelete.click();
    await this.seasonContinue.click();
  }

  async goTo() {
    await this.page.goto('/ticketing/seasons', {timeout: 30000});
    await this.loadingScreen.waitFor({state: 'hidden', timeout: 30000});
  }
}

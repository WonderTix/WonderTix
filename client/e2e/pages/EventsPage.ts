import { type Locator, type Page ,expect} from '@playwright/test';
import { EventsInfo, SeasonInfo, ShowingInfo } from '../testData/ConstsPackage';
/*
Since many locators' names are created while a specific test is being written, some names are ill-considered,
of course we could optimize them later in the process to create as few locators as possible and to share
the same locator with multiple tests.
*/

export class EventsPage {
  readonly page: Page;
  readonly addButton: Locator;
  readonly eventNameBlank: Locator;
  readonly eventDesBlank: Locator;
  readonly imageURL: Locator;
  readonly pageHeader: Locator;
  readonly dashBoard: Locator;
  readonly editButton: Locator;
  readonly saveButton: Locator;

  readonly newEventSave: Locator;
  readonly leftBarEvent: Locator;
  readonly eventContinue: Locator;
  readonly eventClose: Locator;
  readonly eventOption1: Locator;
  readonly eventOption2: Locator;

  readonly editEventInfo: Locator;

  readonly editEventName: Locator;
  readonly editEventDes: Locator;
  readonly editOption1: Locator;
  readonly editCancel: Locator;
  readonly editAddShowing: Locator;
  readonly editCancelShowing: Locator;
  readonly editShowingId: Locator;
  readonly editEventDate: Locator;
  readonly editEventTime: Locator;
  readonly editTicketQuatity: Locator;
  readonly cancelShowingId: Locator;
  readonly homePage: Locator;
  readonly seeEventShowings: Locator;
  readonly takeMeThere: Locator;
  readonly getTickets: Locator;
  readonly backToEvents: Locator;
  readonly concessionTicket: Locator;
  readonly editShowingButton: Locator;
  readonly emailButton: Locator;
  readonly manageTicketingButton: Locator;
  readonly homePageRightSlide: Locator;
  readonly editEventsInfo: Locator;
  readonly ticketQuantityOption: Locator;
  readonly showingCard: Locator;
  readonly deleteButton: Locator;
  readonly activateEvent: Locator;
  readonly inactiveEventchecker: Locator;
  readonly seasonButton: Locator;
  readonly addSeasonButton: Locator;
  readonly editSeasonName: Locator;
  readonly editSeasonStartDate: Locator;
  readonly editSeasonEndDate: Locator;
  readonly editSeasonURL: Locator;
  readonly activeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    
    this.homePage=page.getByRole('button', { name: '/' });
    this.homePageRightSlide=page.locator('button:nth-child(4)');
    
    this.dashBoard = page.locator('a').filter({ hasText: 'Dashboard' }).first();
    this.editButton = page.getByRole('button', { name: 'Edit' });
    this.saveButton = page.getByRole('button', { name: 'Save' });
    
    this.pageHeader=page.getByRole('heading', { name: 'Select Event' });
    this.leftBarEvent=page.getByRole('list').locator('a').filter({ hasText: 'Events' });
    this.emailButton= page.getByText('test@wondertix.com');
    this.manageTicketingButton=page.getByText('Manage Ticketing').first();

    this.addButton = page.getByRole('button', { name: 'Add Event' });
    this.eventNameBlank= page.getByLabel('Event Name:');
    this.eventDesBlank= page.getByLabel('Event Description:');
    this.imageURL=page.getByLabel('Image URL:');
    this.newEventSave=page.getByLabel('Save');

    this.eventContinue=page.getByRole('button', { name: 'Continue' });
    this.eventClose=page.getByRole('button', { name: 'Close', exact: true });

    this.eventOption1=page.getByLabel('Use Default Image');
    this.eventOption2=page.getByLabel('Active');

    this.editEventInfo=page.locator('div').filter({ hasText: /^Event InformationEdit$/ }).getByRole('button');
    this.editEventsInfo=page.getByRole('button', { name: 'Edit' });
    this.editEventName=page.getByLabel('Event Name:');
    this.editEventDes=page.getByLabel('Event Description:');
    this.editOption1=page.getByLabel('Active');
    this.editCancel=page.getByRole('button', { name: 'Cancel' });
    this.editAddShowing=page.getByLabel('Add Showing');
    this.editCancelShowing=page.getByRole('button', { name: 'Cancel' });
    this.editShowingId=page.locator('div:nth-child(3) > .bg-blue-500').first();
    this.cancelShowingId=page.getByRole('button', { name: 'Cancel' });
    this.editEventDate=page.getByLabel('Event Date:');
    this.editEventTime=page.getByLabel('Event Time:');
    this.editTicketQuatity=page.getByLabel('Ticket Quantity:');
    this.seeEventShowings=page.locator('div:nth-child(6) > div > .p-6 > .flex > .py-2');
    this.getTickets=page.getByRole('button', { name: 'Get Tickets' });
    this.takeMeThere=page.getByRole('button', { name: 'Take me there!' });
    this.backToEvents=page.getByRole('button', { name: 'back to Events' });
    this.concessionTicket=page.getByRole('checkbox');
    this.editShowingButton=page.locator('div').filter({ hasText: /^Edit$/ }).getByRole('button');
    this.ticketQuantityOption=page.getByLabel('Ticket Quantity:');
    this.showingCard = page.getByTestId('showing-card');
    this.deleteButton = page.getByRole('button', { name: 'Delete' });
    this.activateEvent = page.getByLabel('Active');
    this.inactiveEventchecker = page.getByRole('button', { name: 'Inactive' });
    
    this.seasonButton = page.getByRole('button', { name: 'Seasons' });
    this.addSeasonButton = page.getByRole('button', { name: 'Add Season' });
    this.editSeasonName = page.getByLabel('Season Name:');
    this.editSeasonStartDate = page.getByLabel('Start Date:');
    this.editSeasonEndDate = page.getByLabel('End Date:');
    this.editSeasonURL = page.getByLabel('Image URL:');
    this.activeButton = page.getByLabel('Active');
  }

  async clickLeftBar()
  {
    await this.leftBarEvent.click();
  }

  /*
  asiync checkAndDeletePreviousEvents(eventName:string,showing1:string,showing2:string) {
    wihile (await this.page.getByText(eventName).isVisible()) {
      await this.page.getByRole('button', { name: eventName }).click();
      await this.searchDeleteShowing(showing1);
      await this.searchDeleteShowing(showing2);
      await this.deleteTheEvent(eventName);
     }
}*/

  /*
  To simulate only clicking the edit button and do almost nothing.
  This test is more geared toward testing the buttons.
  */
  async editEvents()
  {
    await this.editEventInfo.click();
    await this.editEventName.click();
    await this.editEventDes.click();
    await this.imageURL.click();
    await this.editOption1.uncheck();
    await this.editOption1.check();
    await this.editCancel.click();
    await this.editAddShowing.click();
    await this.editCancelShowing.click();
    await this.editShowingId.click();
    await this.cancelShowingId.click();
  }

  /**
  This test is basically testing the functionality of creating a new event without add any showing.
  For now, if we create an event without any showing, it won't appear on the homepage nor on the events page.
  And we need to pass in things like:
   "S",
  "123",
  "http://"
  */
  async addnewevent(anEvent:EventsInfo)
  {
     await this.addButton.click();
     await this.eventNameBlank.click();
     await this.page.getByLabel('Event Name:').fill(anEvent.eventName);
     await this.eventDesBlank.click();
     await this.page.getByLabel('Event Description:').fill(anEvent.eventDescription);
     await this.imageURL.click();
     await this.page.getByLabel('Image URL:').fill(anEvent.eventURL);
     await this.newEventSave.click();
     await this.eventContinue.click();
  }
  

  async addNewInactiveEvent(anEvent: EventsInfo)
 {
     await this.addButton.click();
     await this.eventNameBlank.click();
     await this.page.getByLabel('Event Name:').fill(anEvent.eventName);
     await this.eventDesBlank.click();
     await this.page.getByLabel('Event Description:').fill(anEvent.eventDescription);
     await this.imageURL.click();
     await this.page.getByLabel('Image URL:').fill(anEvent.eventURL);
     await this.activateEvent.uncheck()
     await this.newEventSave.click();
     await this.eventContinue.click();
 }

async addDefaultIMGevent(anEvent: EventsInfo)
  {
    await this.addButton.click();
     await this.eventNameBlank.click();
     await this.page.getByLabel('Event Name:').fill(anEvent.eventName);
     await this.eventDesBlank.click();
     await this.page.getByLabel('Event Description:').fill(anEvent.eventDescription);
     await this.eventOption1.check();
     await this.newEventSave.click();
     await this.eventContinue.click();
     await expect(this.page.getByRole('img', { name: 'Event Image Playbill' })).toBeVisible();
  }
 
/**
  We need to pass in things like:
  "2023-10-17",
  "10:20",
  "010"
*/
  async addNewShowing(aShowing:ShowingInfo)
  {
    await this.editAddShowing.click();
    await this.editEventDate.fill(aShowing.showingDate);
    await this.editEventTime.click();
    await this.editEventTime.fill(aShowing.showingTime);
    await this.editTicketQuatity.click();
    await this.editTicketQuatity.fill(aShowing.showingQuantity);
    await this.newEventSave.click();
    await this.eventContinue.click();
  }

  /** 
  We need to pass in things like:
  "Test_Season",
  "2023-11-01",
  "2023-11-09",
  "https://"
*/
  async addNewSeason(aSeason:SeasonInfo)
  {
    await this.addSeasonButton.click();
    await this.editSeasonName.fill(aSeason.SeasonName);
    await this.editSeasonStartDate.fill(aSeason.StartDate);
    await this.editSeasonEndDate.fill(aSeason.EndDate);
    await this.editSeasonURL.fill(aSeason.ImageURL);
    await this.activeButton.check();
    await this.saveButton.click();
    await this.eventContinue.click();
  }

  async deleteASeason(aSeason:SeasonInfo)
  {
    await this.editButton.click();
    await this.deleteButton.click();
    await this.eventContinue.click();
    await expect(this.page.getByRole('img', { name: aSeason.SeasonName+' '+aSeason.suffix })).not.toBeVisible();
  }

/**
  * We need to pass in things to the filter like:
  * "Wed, Oct 11 2023"
*/
  async searchDeleteShowing(Time:string)
  {
    await this.showingCard
    .filter({ hasText: Time})
    .getByRole('button', { name: 'Edit' })
    .click();
    await this.deleteButton.click();
    await this.eventContinue.click();
  }

  //**The weird thing is that Im not sure wheres the 'Playbill' comes from.
  async checkNewEventOnHomePage(event_name:string, suffix:string)
  {
    await this.homePage.click();
    await this.homePageRightSlide.click();
    await this.homePageRightSlide.click();
    await this.homePageRightSlide.click();
    await this.homePageRightSlide.click();
    await this.homePageRightSlide.click();
    await this.seeEventShowings.click();
    await expect(this.page.getByRole('img', { name: event_name+' '+suffix })).toBeVisible;
  }

/**
 * We need to pass in a event's full name like:
 * "Test_event Playbill Test_event Description An event for testing"
*/
  async goToEventFromManage(eventFullName: string)
  {
    await this.emailButton.click();
    await this.manageTicketingButton.click();
    await this.leftBarEvent.click();
    await this.page.getByRole('button', { name: eventFullName }).first().click();
  }

/**
 * We need to pass in a event's full name like:
 * "Test_event Playbill Test_event Description An event for testing"
*/
  async deleteTheEvent(eventFullName: string)
  {
    await this.editEventInfo.click();
    await this.deleteButton.click();
    await this.eventContinue.click();
    //await this.eventContinue.click();
    await this.leftBarEvent.click();
    await expect(this.page.getByRole('button', { name: eventFullName }).first()).not.toBeVisible();
  }

  async deleteInactiveEvent(eventFullName: string)
  {
    await this.leftBarEvent.click();
    await this.inactiveEventchecker.click();
    await this.page.getByRole('button', { name: eventFullName }).first().click();
    await this.deleteTheEvent(eventFullName);
  }

async editTheEventInfo(anEvent:EventsInfo)
{
    await this.editEventInfo.click();
    await this.editEventName.click();
    await this.editEventName.fill(anEvent.eventName);
    await this.eventDesBlank.fill(anEvent.eventDescription);
    await this.imageURL.fill(anEvent.eventURL);
    await this.newEventSave.click();
    await this.eventContinue.click();
}

async searchForEventByName(anEvent:EventsInfo)
{
  await this.page.getByText(anEvent.eventName, { exact: true }).click();
}

async searchForEventByDes(anEvent:EventsInfo)
{
  await this.page.getByText(anEvent.eventDescription).click();
}

/**
 * Only for change the first showing of an event
*/
async editShowingInfo(aShowing:ShowingInfo)
{
  //await this.page.locator('div:nth-child(3) > .bg-blue-500').first().click();
  await this.editShowingButton.click();
  await this.editEventDate.fill(aShowing.showingDate);
  await this.ticketQuantityOption.click();
  await this.ticketQuantityOption.fill(aShowing.showingQuantity);
  await this.page.getByLabel('Save').click();
  await this.eventContinue.click();
}

async clickSpecificShowing(showingWholeDate: string)
  {
    await this.page.getByText(showingWholeDate).click();
    await this.page.locator('div:nth-child(4) > p:nth-child(2)').first().click();
  }

  
async goto(){
    await this.page.goto('/', { timeout: 90000 });
    await this.emailButton.click();
    await this.manageTicketingButton.click();
    await this.leftBarEvent.click();
    await expect(this.pageHeader).toBeVisible();
  }

  async goToSeason(){
    await this.page.goto('/', { timeout: 90000 });
    await this.emailButton.click();
    await this.manageTicketingButton.click();
    await this.seasonButton.click();
}

async ticketingURL(){
    await this.page.goto('/ticketing', { timeout: 90000 });
  }

async backtoEvents(){
    await this.leftBarEvent.click();
  }
}


/* eslint-disable require-jsdoc */
import {type Locator, type Page, expect} from '@playwright/test';
import {EventsInfo, ShowingInfo} from '../testData/ConstsPackage';
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

  readonly activeViewOption : Locator;
  readonly inactiveViewOption : Locator;
  readonly allViewOption : Locator;

  readonly newEventSave: Locator;
  readonly deleteEventButton: Locator;
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
  readonly editTicketQuantity: Locator;
  readonly cancelShowingId: Locator;
  readonly homePage: Locator;
  readonly seeEventShowings: Locator;
  readonly takeMeThere: Locator;
  readonly getTickets: Locator;
  readonly backToEvents: Locator;
  readonly concessionTicket: Locator;
  readonly editShowingButton: Locator;

  readonly firstEvent:Locator;
  readonly secondEvent: Locator;

  readonly emailButton: Locator;
  readonly manageTicketingButton: Locator;
  readonly homePageRightSlide: Locator;
  readonly editEventsInfo: Locator;
  readonly ticketQuantityOption: Locator;
  readonly showingCard: Locator;
  readonly deleteShowingButton: Locator;
  constructor(page: Page) {
    this.page = page;


    this.homePage=page.getByRole('button', { name: '/' });
    this.homePageRightSlide=page.locator('button:nth-child(4)');
    this.firstEvent=page.getByRole('button', { name: 'Angels In America Playbill Angels In America Description Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' });
    this.secondEvent=page.getByRole('button', { name: 'The Crucible Playbill The Crucible Description Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' });

    this.pageHeader=page.getByRole('heading', { name: 'Select Event' });
    this.leftBarEvent=page.getByRole('list').locator('a').filter({ hasText: 'Events' });
    this.emailButton= page.getByText(process.env.TEST_EMAIL as string);
    this.manageTicketingButton=page.getByText('Manage Ticketing').first();

    this.activeViewOption = page.getByTestId('active-button');
    this.inactiveViewOption = page.getByTestId('inactive-button');
    this.allViewOption = page.getByTestId('all-button');

    this.addButton = page.getByRole('button', { name: 'Add Event' });
    this.eventNameBlank= page.getByLabel('Event Name:');
    this.eventDesBlank= page.getByLabel('Event Description:');
    this.imageURL=page.getByLabel('Image URL:');
    this.newEventSave=page.getByLabel('Save');
    this.deleteEventButton=page.getByTestId('event_delete_button');

    this.eventContinue=page.getByRole('button', { name: 'Continue' });
    this.eventClose=page.getByRole('button', { name: 'Close', exact: true });

    this.eventOption1=page.getByRole('button', { name: 'Default' });
    this.eventOption2=page.getByText('Active:', { exact: true });

    this.editEventInfo=page.getByTestId('event_edit_button');
    this.editEventsInfo=page.getByRole('button', { name: 'Edit' });
    this.editEventName=page.getByLabel('Event Name:');
    this.editEventDes=page.getByLabel('Event Description:');
    this.editOption1=page.getByText('Active:', { exact: true });
    this.editCancel=page.getByRole('button', { name: 'Cancel' });
    this.editAddShowing=page.getByLabel('Add Showing');
    this.editCancelShowing=page.getByRole('button', { name: 'Cancel' });
    this.editShowingId=page.locator('div:nth-child(3) > .bg-blue-500').first();
    this.cancelShowingId=page.getByRole('button', { name: 'Cancel' });
    this.editEventDate=page.getByLabel('Event Date:');
    this.editEventTime=page.getByLabel('Event Time:');
    this.editTicketQuantity=page.getByLabel('Ticket Quantity:');
    this.seeEventShowings=page.locator('div:nth-child(6) > div > .p-6 > .flex > .py-2');
    this.getTickets=page.getByRole('button', { name: 'Get Tickets' });
    this.takeMeThere=page.getByRole('button', { name: 'Take me there!' });
    this.backToEvents=page.getByRole('button', { name: 'back to Events' });
    this.concessionTicket=page.getByRole('checkbox');
    this.editShowingButton=page.locator('div').filter({ hasText: /^Edit$/ }).getByRole('button');
    this.ticketQuantityOption=page.getByLabel('Ticket Quantity:');
    this.showingCard=page.getByTestId('showing-card');
    this.deleteShowingButton=page.getByRole('button', { name: 'Delete' });
  }

  async clickLeftBar()
  {
    await this.leftBarEvent.click();
  }

  /*
  To simulate only clicking the edit button and do almost nothing.
  This test is more geared toward testing the buttons.
  */
  async editEvents()
  {
    await this.firstEvent.click();
    await this.editEventInfo.click();
    await this.editEventName.click();
    await this.editEventDes.click();
    await this.eventOption1.click();
    await this.imageURL.click();
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

  /**
   * Switches the status of the event's activeness.
   */
  async activateEvent() {
    await this.eventOption2.click();
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
    await this.editTicketQuantity.click();
    await this.editTicketQuantity.fill(aShowing.showingQuantity);
    await this.newEventSave.click();
    await this.eventContinue.click();
  }

/**
  * We need to pass in things to the filter like:
  * "Wed, Oct 11 2023"
*/
  async searchDeleteShowing(Time: string)
  {
    await this.showingCard
      .filter({ hasText: Time})
      .getByRole('button', { name: 'Edit' })
      .click();
    await this.deleteShowingButton.click();
    await this.eventContinue.click();
  }

  //**The weird thing is that Im not sure wheres the 'Playbill' comes from.
  async checkNewEventOnHomePage()
  {
    await this.homePage.click();
    await this.homePageRightSlide.click();
    await this.homePageRightSlide.click();
    await this.homePageRightSlide.click();
    await this.homePageRightSlide.click();
    await this.homePageRightSlide.click();
    await this.seeEventShowings.click();
    await expect(this.page.getByRole('img', { name: 'Test_event Playbill' })).toBeVisible;
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
    await this.deleteEventButton.click();
    await this.eventContinue.click();
    await this.leftBarEvent.click();
    await expect(this.page.getByRole('button', { name: eventFullName }).first()).not.toBeVisible();
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

  async clickSecondEvent()
  {
    await this.secondEvent.click();
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
    await this.page.locator('div:nth-child(3) > .bg-blue-500').first().click();
    await this.page.getByText('372').click();
    await this.editEventDate.fill(aShowing.showingDate);
    await this.ticketQuantityOption.click();
    await this.ticketQuantityOption.fill(aShowing.showingQuantity);
    await this.page.getByLabel('Save').click();
    await this.eventContinue.click();
  }

  async clickFirstEvent()
  {
    await this.firstEvent.click();
  }

  async clickSpecificShowing(showingWholeDate: string)
  {
    await this.page.getByText(showingWholeDate).click();
    await this.page.locator('div:nth-child(4) > p:nth-child(2)').first().click();
  }

  async goto()
  {
    await this.page.goto('/', { timeout: 90000 });
    await this.emailButton.click();
    await this.manageTicketingButton.click();
    await this.leftBarEvent.click();
    await expect(this.pageHeader).toBeVisible();
  }

  async ticketingURL()
  {
    await this.page.goto('/ticketing', { timeout: 90000 });
  }

  async backtoEvents()
  {
    await this.leftBarEvent.click();
  }

  /*
   * These next three functions all press the buttons that alter the
   * events available to view.
   */
  
  async setActiveView() {
    await this.activeViewOption.click();
  }

  async setInactiveView() {
    await this.inactiveViewOption.click();
  }

  async setAllView() {
    await this.allViewOption.click();
  }
}

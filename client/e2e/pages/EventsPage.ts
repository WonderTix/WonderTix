/* eslint-disable require-jsdoc */
import {type Locator, type Page, expect} from '@playwright/test';
import { EventInfo, ShowingInfo } from '../testData/interfaces';
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
  readonly leftBarEvent: Locator;
  readonly eventContinue: Locator;
  readonly eventClose: Locator;
  readonly deleteButton: Locator;
  readonly editEventInfo: Locator;

  readonly editEventName: Locator;
  readonly editEventDes: Locator;
  readonly editAddShowing: Locator;
  readonly editShowingId: Locator;
  readonly editEventDate: Locator;
  readonly editEventTime: Locator;
  readonly editTicketQuantity: Locator;
  readonly cancelButton: Locator;
  readonly homePage: Locator;
  readonly takeMeThere: Locator;
  readonly getTickets: Locator;
  readonly backToEvents: Locator;
  readonly concessionTicket: Locator;
  readonly editShowingButton: Locator;
  readonly emailButton: Locator;
  readonly manageTicketingButton: Locator;
  readonly homePageRightSlide: Locator;
  readonly ticketQuantityOption: Locator;
  readonly showingCard: Locator;
  readonly deleteShowingButton: Locator;
  readonly activateEventchecker: Locator;
  readonly inactiveEventchecker: Locator;

  constructor(page: Page) {
    this.page = page;

    this.homePage = page.getByRole('button', {name: '/'});
    this.homePageRightSlide = page.locator('button:nth-child(4)');

    this.pageHeader = page.getByRole('heading', {name: 'Select Event'});
    this.leftBarEvent = page
      .getByRole('list')
      .locator('a')
      .filter({hasText: 'Events'});
    this.emailButton = page.getByText(process.env.TEST_EMAIL as string);
    this.manageTicketingButton = page.getByText('Manage Ticketing').first();

    this.activeViewOption = page.getByTestId('active-button');
    this.inactiveViewOption = page.getByTestId('inactive-button');
    this.allViewOption = page.getByTestId('all-button');
    this.deleteButton = page.getByTestId('event-delete-button');
    this.addButton = page.getByRole('button', {name: 'Add Event'});
    this.eventNameBlank = page.getByLabel('Event Name:');
    this.eventDesBlank = page.getByLabel('Event Description:');
    this.imageURL = page.getByLabel('Image URL:');
    this.newEventSave = page.getByLabel('Save');

    this.eventContinue = page.getByRole('button', {name: 'Continue'});
    this.eventClose = page.getByRole('button', {name: 'Close', exact: true});

    this.editEventInfo = page.getByTestId('event-edit-button');
    this.editEventName = page.getByLabel('Event Name:');
    this.editEventDes = page.getByLabel('Event Description:');
    this.editAddShowing = page.getByLabel('Add Showing');
    this.editShowingId = page
      .locator('div:nth-child(3) > .bg-blue-500')
      .first();
    this.cancelButton = page.getByRole('button', {name: 'Cancel'});
    this.editEventDate = page.getByLabel('Event Date:');
    this.editEventTime = page.getByLabel('Event Time:');
    this.editTicketQuantity = page.getByLabel('Ticket Quantity:');
    this.getTickets = page.getByRole('button', {name: 'Get Tickets'});
    this.takeMeThere = page.getByRole('button', {name: 'Take me there!'});
    this.backToEvents = page.getByRole('button', {name: 'back to Events'});
    this.concessionTicket = page.getByRole('checkbox');
    this.editShowingButton = page
      .locator('div')
      .filter({hasText: /^Edit$/})
      .getByRole('button');
    this.ticketQuantityOption = page.getByLabel('Ticket Quantity:');
    this.showingCard = page.getByTestId('showing-card');
    this.deleteShowingButton = page.getByRole('button', {name: 'Delete'});
    this.activateEventchecker = page.getByLabel('controlled');
    this.inactiveEventchecker = page.getByRole('button', { name: 'Inactive' });
  }

  /**
   * This is a function for click the "Events" on the left bar  
   */
  async clickLeftBar() {
    await this.leftBarEvent.click();
  }

  /**
   * This test is basically testing the functionality of creating a new event without adding any showing.
   * For now, if we create an event without any showing, it won't appear on the homepage nor on the events page.
   * And we need to pass in things like:
   * "S",
   * "123",
   * "http://"
  */
  async addnewevent(anEvent: EventInfo) {
    await this.addButton.click();
    await this.eventNameBlank.click();
    await this.page.getByLabel('Event Name:').fill(anEvent.eventName);
    await this.eventDesBlank.click();
    await this.page
      .getByLabel('Event Description:')
      .fill(anEvent.eventDescription);
    await this.imageURL.click();
    await this.page.getByLabel('Image URL:').fill(anEvent.eventURL);
    await this.newEventSave.click();
    await this.eventContinue.click();
  }
  
  /**
   * Switches the status of the event's activeness.
   */
  async activateEvent()
  {
     await this.activateEventchecker.check();
  }
  
  /**
   * Create a new event using the default image.
   */
 async addDefaultIMGevent(anEvent: EventInfo)
  {
     await this.addButton.click();
     await this.eventNameBlank.click();
     await this.page.getByLabel('Event Name:').fill(anEvent.eventName);
     await this.eventDesBlank.click();
     await this.page.getByLabel('Event Description:').fill(anEvent.eventDescription);
     await this.newEventSave.click();
     await this.eventContinue.click();
     await expect(this.page.getByRole('img', { name: 'Event Image Playbill' })).toBeVisible();
  }

  /**
   * We need to pass in things like:
   * "2023-10-17",
   * "10:20",
   * "010"
   */
  async addNewShowing(showing: ShowingInfo) {
    await this.editAddShowing.click();
    await this.editEventDate.fill(showing.showingDate);
    await this.editEventTime.click();
    await this.editEventTime.fill(showing.showingTime24hour);
    await this.editTicketQuantity.click();
    await this.editTicketQuantity.fill(showing.showingQuantity);
    await this.newEventSave.click();
    await this.eventContinue.click();
  }

  /**
   * We need to pass in things to the filter like:
   * "Wed, Oct 11 2023Time: 12:10 AM"
   */
  async searchDeleteShowing(aShowing:ShowingInfo) {
   const showingCardLocator =  this.showingCard
      .filter({hasText: aShowing.showingWholeDate + 'Time:' + ' ' + aShowing.showingTime12hour})
      .getByRole('button', {name: 'Edit'}); 
   const disabled = await showingCardLocator.isDisabled();
    if (disabled)
    {
      await this.page.reload();
    }
    await showingCardLocator.click();
    await this.deleteShowingButton.click();
    await this.eventContinue.click();
  }

  /**
   * Go back to homepage to check if the newly-created
   * event exists on the homepage
   */
  async checkNewEventOnHomePage(anEvent: EventInfo) {
    await this.homePage.click();
    await expect(this.page.getByText(anEvent.eventDescription)).toBeVisible();
  }

  async goToEventFromManage(anEvent: EventInfo) {
    await this.emailButton.click();
    await this.manageTicketingButton.click();
    await this.leftBarEvent.click();
    await this.page.getByRole('button', {name: anEvent.eventName+' '+'Playbill'+' '+anEvent.eventName+' '+'Description'+' '+anEvent.eventDescription}).first().click();
  }
  
  /**
   * We need the event's full name like:
   * "Test_event Playbill Test_event Description An event for testing"
   */
  async deleteTheEvent(anEvent: EventInfo) {
    await this.deleteButton.click();
    await this.eventContinue.click();
    await this.leftBarEvent.click();
    await this.page.reload();
    await expect(this.page.getByRole('button', { name: anEvent.eventName+' '+'Playbill'+' '+anEvent.eventName+' '+'Description'+' '+anEvent.eventDescription})).not.toBeVisible();
  }
  
  async editTheEventInfo(anEvent: EventInfo) {
    const disabled = await this.editEventInfo.isDisabled();
    if (disabled)
    {
      await this.page.reload();
    }
    await this.editEventInfo.click();
    await this.editEventName.click();
    await this.editEventName.fill(anEvent.eventName);
    await this.eventDesBlank.fill(anEvent.eventDescription);
    await this.imageURL.fill(anEvent.eventURL);
    await this.newEventSave.click();
    await this.eventContinue.click();
     if (disabled)
    {
      await this.page.reload();
    }
  }

  async searchForEventByName(anEvent: EventInfo) {
    await this.page.getByText(anEvent.eventName, {exact: true}).click();
  }

  async searchForEventByDes(anEvent: EventInfo) {
    await this.page.getByText(anEvent.eventDescription).click();
  }

  /**
   * Only for change the first showing of an event
   */
  async editShowingInfo(aShowing: ShowingInfo) {
    const disabled = await this.editShowingButton.isDisabled();
    if (disabled)
    {
      await this.page.reload();
    }
     await this.editShowingButton.click();
     await this.editEventDate.fill(aShowing.showingDate);
     await this.ticketQuantityOption.click();
     await this.ticketQuantityOption.fill(aShowing.showingQuantity);
     await this.page.getByLabel('Save').click();
     await this.eventContinue.click();
  }

  async goto() {
    await this.page.goto('/', {timeout: 90000});
    await this.emailButton.click();
    await this.manageTicketingButton.click();
    await this.leftBarEvent.click();
    await expect(this.pageHeader).toBeVisible();
  }

  async ticketingURL() {
    await this.page.goto('/ticketing', {timeout: 90000});
  }

  async backtoEvents() {
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

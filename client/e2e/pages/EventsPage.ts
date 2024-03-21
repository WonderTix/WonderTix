/* eslint-disable require-jsdoc */
import {type Locator, type Page, expect} from '@playwright/test';
import {EventInfo} from '../testData/EventInfo';
import {ShowingInfo} from '../testData/ShowingInfo';
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
  readonly newShowingSave: Locator;
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
  readonly eventCancelButton: Locator;
  readonly showingCancelButton: Locator;
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
    this.newEventSave = page.getByTestId('event-save-button');

    this.eventContinue = page.getByRole('button', {name: 'Continue'});
    this.eventClose = page.getByRole('button', {name: 'Close', exact: true});

    this.editEventInfo = page.getByTestId('event-edit-button');
    this.editEventName = page.getByLabel('Event Name:');
    this.editEventDes = page.getByLabel('Event Description:');
    this.editAddShowing = page.getByLabel('Add Showing');
    this.newShowingSave = page.getByTestId('showing-save-button');
    this.editShowingId = page
      .locator('div:nth-child(3) > .bg-blue-500')
      .first();
    this.eventCancelButton = page.getByTestId('event-leave-edit');
    this.showingCancelButton = page.getByTestId('showing-leave-edit');
    this.editEventDate = page.getByLabel('Event Date:');
    this.editEventTime = page.getByLabel('Event Time:');
    this.editTicketQuantity = page.getByLabel('Ticket Quantity:');
    this.getTickets = page.getByRole('button', {name: 'Get Tickets'});
    this.takeMeThere = page.getByRole('button', {name: 'Take me there!'});
    this.backToEvents = page.getByRole('button', {name: 'back to Events'});
    this.concessionTicket = page.getByRole('checkbox');
    this.editShowingButton = page
        .locator('button')
        .filter({hasText: /^Edit$/});
    this.ticketQuantityOption = page.getByLabel('Ticket Quantity:');
    this.showingCard = page.getByTestId('showing-card');
    this.deleteShowingButton = page.getByRole('button', {name: 'Delete'});
    this.activateEventchecker = page.locator('#active' );
    this.inactiveEventchecker = page.getByRole('button', {name: 'Inactive'});
  }

  /**
   * Clicks the "Events" on the left bar
   */
  async clickLeftBar() {
    await this.leftBarEvent.click();
  }

  /**
   * Asynchronously adds a new event with the provided event information.
   *
   * @param {EventInfo} anEvent - Object with event details to be added, including:
   *    - `eventName`: Name of the event.
   *    - `eventDescription`: Description of the event.
   *    - `eventURL`: URL of the event image.
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
  async activateEvent() {
     await this.activateEventchecker.check();
  }

  /**
   * Creates a new event using the default image.
   */
 async addDefaultIMGevent(anEvent: EventInfo) {
     await this.addButton.click();
     await this.eventNameBlank.click();
     await this.page.getByLabel('Event Name:').fill(anEvent.eventName);
     await this.eventDesBlank.click();
     await this.page.getByLabel('Event Description:').fill(anEvent.eventDescription);
     await this.newEventSave.click();
     await this.eventContinue.click();
     await expect(this.page.getByRole('img', {name: 'Event Image Playbill'})).toBeVisible();
  }

  /**
   * Adds a new showing to the events page.
   *
   * @param {ShowingInfo} showing - Object with showing details, including:
   *    - `showingDate`: Date of showing (YYYY-MM-DD format, e.g., "2023-10-17").
   *    - `showingTime24hour`: Time of showing in 24-hour format (e.g., "10:20").
   *    - `showingQuantity`: Number of tickets available (e.g., "010").
   */
  async addNewShowing(showing: ShowingInfo) {
    await this.editAddShowing.click();
    await this.editEventDate.fill(showing.showingDate);
    await this.editEventTime.click();
    await this.editEventTime.fill(showing.showingTime24hour);
    await this.editTicketQuantity.click();
    await this.editTicketQuantity.fill(showing.showingQuantity);
    await this.page.getByTestId('add-row-button').click();
    await this.page.locator('tr select').selectOption('General Admission - Adult');
    await this.page.getByLabel('Ticket Type Quantity').fill(showing.showingQuantity);
    await this.newShowingSave.click();
    await this.eventContinue.click();
  }

  /**
   * Searches for and deletes a specific showing based on the provided showing details.
   *
   * @param {ShowingInfo} aShowing - Object with showing details to be deleted, data needed:
   *    - `showingDate`: Date of showing (YYYY-MM-DD format, e.g., "2023-10-17").
   *    - `showingTime12hour`: Time in 12-hour format (e.g., '12:10 AM').
   */
  async searchDeleteShowing(aShowing: ShowingInfo) {
    const showingCardLocator = this.showingCard
      .filter({
        hasText:
          aShowing.showingWholeDate +
          'Time:' +
          ' ' +
          aShowing.showingTime12hour,
      });
    const showingID = await showingCardLocator.locator(":text('Showing ID: ') + p").textContent();
    const deleteButton = this.page.getByTestId(`${showingID}-showing-delete-button`);
    const disabled = await deleteButton.isDisabled();
    if (disabled) {
      await this.page.reload();
    }
    await deleteButton.click();
    await this.eventContinue.click();
  }

  /**
   * Go back to homepage to check if the newly-created
   * event exists on the homepage
   */
  async checkNewEventOnHomePage(anEvent: EventInfo) {
    await this.homePage.click();
    await expect(this.page.getByText(anEvent.eventDescription).first()).toBeVisible();
  }

  async goToEventFromManage(anEvent: EventInfo) {
    await this.emailButton.click();
    await this.manageTicketingButton.click();
    await this.leftBarEvent.click();
    await this.page.getByRole('button', {name: anEvent.eventName+' '+'Playbill'+' '+anEvent.eventName+' '+'Description'+' '+anEvent.eventDescription}).first().click();
  }

 /**
  * Asynchronously deletes an existing event based on provided event details.
  *
  * @param {EventInfo} anEvent - Object with event details to be deleted, the data needed:
  *    - `eventName`: Name of the event.
  *    - `eventDescription`: Description of the event.
  */
  async deleteTheEvent(anEvent: EventInfo) {
    await this.deleteButton.click();
    await this.eventContinue.click();
    await this.leftBarEvent.click();
    await this.page.reload();
    await expect(this.page.getByRole('button', {name: anEvent.eventName+' '+'Playbill'+' '+anEvent.eventName+' '+'Description'+' '+anEvent.eventDescription})).not.toBeVisible();
  }

  /**
   * Asynchronously edits the information of an existing event.
   *
   * @param {EventInfo} anEvent - Object with updated event details, including:
   *    - `eventName`: New name of the event.
   *    - `eventDescription`: New description of the event.
   *    - `eventURL`: New URL of the event image.
   */
  async editTheEventInfo(anEvent: EventInfo) {
    const disabled = await this.editEventInfo.isDisabled();
    if (disabled) {
      await this.page.reload();
    }
    await this.editEventInfo.click();
    await this.editEventName.click();
    await this.editEventName.fill(anEvent.eventName);
    await this.eventDesBlank.fill(anEvent.eventDescription);
    await this.imageURL.fill(anEvent.eventURL);
    await this.newEventSave.click();
    await this.eventContinue.click();
     if (disabled) {
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
    * Asynchronously edits the showing information.
    *
    * @param {ShowingInfo} aShowing - The showing information to be edited.
    *    - `showingDate`: Date of the showing (e.g., '2023-10-11').
    *    - `showingTime24hour`: Time in 24-hour format (e.g., '00:10').
    *    - `showingQuantity`: Quantity of showings (e.g., '10').
    */
  async editShowingInfo(aShowing: ShowingInfo) {
    const editShowingButton = this.page.getByTestId(new RegExp('.*-showing-edit-button'));
    const disabled = await editShowingButton.isDisabled();
    if (disabled) {
      await this.page.reload();
    }
    await editShowingButton.click();
    await this.editEventDate.fill(aShowing.showingDate);
    await this.ticketQuantityOption.click();
    await this.ticketQuantityOption.fill(aShowing.showingQuantity);
    await this.page.getByTestId('showing-save-button').click();
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

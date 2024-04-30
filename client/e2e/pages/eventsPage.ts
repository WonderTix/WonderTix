/* eslint-disable require-jsdoc */
import {type Locator, type Page} from '@playwright/test';
import {EventInfo} from '../testData/EventInfo';
import {ShowingInfo} from '../testData/ShowingInfo';

export class EventsPage {
  readonly page: Page;
  readonly addButton: Locator;
  readonly eventNameInput: Locator;
  readonly eventDescInput: Locator;
  readonly imageURLInput: Locator;
  readonly pageHeader: Locator;

  readonly activeViewOption: Locator;
  readonly inactiveViewOption: Locator;
  readonly allViewOption: Locator;

  readonly eventSave: Locator;
  readonly showingSave: Locator;
  readonly leftBarEvent: Locator;
  readonly continueButton: Locator;
  readonly deleteButton: Locator;
  readonly editEventInfo: Locator;

  readonly eventName: Locator;
  readonly eventDesc: Locator;
  readonly eventImage: Locator;

  readonly addShowing: Locator;
  readonly eventDateInput: Locator;
  readonly eventTimeInput: Locator;
  readonly ticketQtyInput: Locator;
  readonly addTicketTypeButton: Locator;
  readonly eventCancelButton: Locator;
  readonly showingCancelButton: Locator;
  readonly homePage: Locator;
  readonly emailButton: Locator;
  readonly manageTicketingButton: Locator;
  readonly showingCard: Locator;
  readonly activateEventchecker: Locator;

  constructor(page: Page) {
    this.page = page;

    this.homePage = page.getByRole('button', {name: '/'});
    this.leftBarEvent = page
      .getByRole('list')
      .locator('a')
      .filter({hasText: 'Events'});
    this.emailButton = page.getByText(process.env.TEST_EMAIL as string);

    this.manageTicketingButton = page.getByText('Manage Ticketing').first();

    this.pageHeader = page.getByRole('heading', {name: 'Select Event'});
    this.activeViewOption = page.getByTestId('active-button');
    this.inactiveViewOption = page.getByTestId('inactive-button');
    this.allViewOption = page.getByTestId('all-button');
    this.addButton = page.getByRole('button', {name: 'Add Event'});

    this.eventNameInput = page.getByLabel('Event Name:');
    this.eventDescInput = page.getByLabel('Event Description:');
    this.imageURLInput = page.getByLabel('Image URL:');
    this.eventSave = page.getByTestId('event-save-button');
    this.eventCancelButton = page.getByTestId('event-leave-edit');

    this.eventName = page.getByTestId('event-name');
    this.eventDesc = page.getByTestId('event-description');
    this.eventImage = page.getByRole('img', {name: 'Event Image Playbill'});
    this.activateEventchecker = page.locator('#active');
    this.editEventInfo = page.getByTestId('event-edit-button');
    this.deleteButton = page.getByTestId('event-delete-button');

    this.continueButton = page.getByRole('button', {name: 'Continue'});

    this.showingCard = page.getByTestId('showing-card');
    this.addShowing = page.getByLabel('Add Showing');
    this.showingSave = page.getByTestId('showing-save-button');
    this.showingCancelButton = page.getByTestId('showing-leave-edit');
    this.eventDateInput = page.getByLabel('Event Date:');
    this.eventTimeInput = page.getByLabel('Event Time:');
    this.ticketQtyInput = page.getByLabel('Ticket Quantity:');
    this.addTicketTypeButton = page.getByTestId('add-row-button');
  }

  async goTo() {
    await this.page.goto('/', {timeout: 90000});
    await this.emailButton.click();
    await this.manageTicketingButton.click();
    await this.leftBarEvent.click();
  }

  async goToHome() {
    await this.homePage.click();
  }

  async goToEventFromManage(anEvent: EventInfo) {
    await this.emailButton.click();
    await this.manageTicketingButton.click();
    await this.leftBarEvent.click();
    await this.page
      .getByRole('button', {
        name:
          anEvent.eventName +
          ' ' +
          'Playbill' +
          ' ' +
          anEvent.eventName +
          ' ' +
          'Description' +
          ' ' +
          anEvent.eventDescription,
      })
      .first()
      .click();
  }

  async goToInactiveEventFromManage(anEvent: EventInfo) {
    await this.emailButton.click();
    await this.manageTicketingButton.click();
    await this.leftBarEvent.click();
    await this.setInactiveView();
    await this.page
      .getByRole('button', {
        name:
          anEvent.eventName +
          ' ' +
          'Playbill' +
          ' ' +
          anEvent.eventName +
          ' ' +
          'Description' +
          ' ' +
          anEvent.eventDescription,
      })
      .first()
      .click();
  }

  /**
   * Asynchronously adds a new event with the provided event information.
   *
   * @param {EventInfo} anEvent - Object with event details to be added, including:
   *    - `eventName`: Name of the event.
   *    - `eventDescription`: Description of the event.
   *    - `eventURL`: URL of the event image.
   */
  async addNewEvent(anEvent: EventInfo) {
    await this.addButton.click();
    await this.eventNameInput.fill(anEvent.eventName);
    await this.eventDescInput.fill(anEvent.eventDescription);
    await this.imageURLInput.fill(anEvent.eventURL);
    await this.eventSave.click();
    await this.continueButton.click();
  }

  /**
   * Creates a new event using the default image.
   *
   * @param {EventInfo} anEvent
   */
  async addNewDefaultImageEvent(anEvent: EventInfo) {
    await this.addButton.click();
    await this.eventNameInput.fill(anEvent.eventName);
    await this.eventDescInput.fill(anEvent.eventDescription);
    await this.eventSave.click();
    await this.continueButton.click();
  }

  /**
   * Switches the status of the event's activeness.
   */
  async activateEvent() {
    await this.activateEventchecker.check();
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
    await this.addShowing.click();
    await this.eventDateInput.fill(showing.showingDate);
    await this.eventTimeInput.fill(showing.showingTime24hour);
    await this.ticketQtyInput.fill(showing.showingQuantity);
    await this.addTicketTypeButton.click();
    await this.page
      .locator('tr select')
      .selectOption('General Admission - Adult');
    await this.page
      .getByLabel('Ticket Type Quantity')
      .fill(showing.showingQuantity);
    await this.showingSave.click();
    await this.continueButton.click();
  }

  /**
   * Searches for and deletes a specific showing based on the provided showing details.
   *
   * @param {ShowingInfo} aShowing - Object with showing details to be deleted, data needed:
   *    - `showingDate`: Date of showing (YYYY-MM-DD format, e.g., "2023-10-17").
   *    - `showingTime12hour`: Time in 12-hour format (e.g., '12:10 AM').
   */
  async searchDeleteShowing(aShowing: ShowingInfo) {
    const showingCardLocator = this.showingCard.filter({
      hasText: `${aShowing.showingWholeDate}Time: ${aShowing.showingTime12hour}`,
    });
    const showingID = await showingCardLocator
      .locator(':text(\'Showing ID: \') + p')
      .textContent();
    const deleteButton = this.page.getByTestId(
      `${showingID}-showing-delete-button`,
    );
    const disabled = await deleteButton.isDisabled();
    if (disabled) {
      await this.page.reload();
    }
    await deleteButton.click();
    await this.continueButton.click();
  }

  /**
   * Asynchronously deletes an existing event based on provided event details.
   */
  async deleteTheEvent() {
    await this.deleteButton.click();
    await this.continueButton.click();
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
    await this.eventNameInput.fill(anEvent.eventName);
    await this.eventDescInput.fill(anEvent.eventDescription);
    await this.imageURLInput.fill(anEvent.eventURL);
    await this.eventSave.click();
    await this.continueButton.click();
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
    await this.eventDateInput.fill(aShowing.showingDate);
    await this.eventTimeInput.fill(aShowing.showingTime24hour);
    await this.ticketQtyInput.fill(aShowing.showingQuantity);
    await this.page.getByTestId('showing-save-button').click();
    await this.continueButton.click();
  }

  getEventOnHomePage(event: EventInfo) {
    return this.page.getByText(event.eventName);
  }

  getEventOnEventsPage(event: EventInfo) {
    return this.page.getByRole('button', {name: event.eventName});
  }

  getShowingOnEventPage(showing: ShowingInfo) {
    return this.showingCard.filter({
      hasText: `${showing.showingWholeDate}Time: ${showing.showingTime12hour}`,
    });
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

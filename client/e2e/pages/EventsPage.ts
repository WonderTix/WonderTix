import { type Locator, type Page ,expect} from '@playwright/test';
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

  readonly newEventSave: Locator;
  readonly leftBarEvent: Locator;
  readonly eventContinue: Locator;
  readonly eventClose: Locator;
  readonly eventOption1: Locator;
  readonly eventOption2: Locator;

  readonly editEventInfor: Locator;

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
  readonly cancelShwoingId: Locator;
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
  readonly editEventsInfor: Locator;
  readonly ticketQuantityOption: Locator;
  readonly showingCard: Locator;
  readonly deleteButton: Locator;
  constructor(page: Page) {
    this.page = page;


    this.homePage=page.getByRole('button', { name: '/' });
    this.homePageRightSlide=page.locator('button:nth-child(4)');
    this.firstEvent=page.getByRole('button', { name: 'Angels In America Playbill Angels In America Description Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' });
    this.secondEvent=page.getByRole('button', { name: 'The Crucible Playbill The Crucible Description Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' });

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

    this.editEventInfor=page.locator('div').filter({ hasText: /^Event InformationEdit$/ }).getByRole('button');
    this.editEventsInfor=page.getByRole('button', { name: 'Edit' });
    this.editEventName=page.getByLabel('Event Name:');
    this.editEventDes=page.getByLabel('Event Description:');
    this.editOption1=page.getByLabel('Active');
    this.editCancel=page.getByRole('button', { name: 'Cancel' });
    this.editAddShowing=page.getByLabel('Add Showing');
    this.editCancelShowing=page.getByRole('button', { name: 'Cancel' });
    this.editShowingId=page.locator('div:nth-child(3) > .bg-blue-500').first();
    this.cancelShwoingId=page.getByRole('button', { name: 'Cancel' });
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
    await this.editEventInfor.click();
    await this.editEventName.click();
    await this.editEventDes.click();
    await this.imageURL.click();
    await this.editOption1.uncheck();
    await this.editOption1.check();
    await this.editCancel.click();
    await this.editAddShowing.click();
    await this.editCancelShowing.click();
    await this.editShowingId.click();
    await this.cancelShwoingId.click();
  }

  /*
  This test is basically testing the functionality of creating a new event without add any showing.
  For now, if we create an event withou showing, it won't appear on the homepage nor on the events page.
  */
  async addnewevent(eventName:string, eventDescription:string,eventURL:string)
  {
     await this.addButton.click();
     await this.eventNameBlank.click();
     await this.page.getByLabel('Event Name:').fill(eventName);
     await this.eventDesBlank.click();
     await this.page.getByLabel('Event Description:').fill(eventDescription);
     await this.imageURL.click();
     await this.page.getByLabel('Image URL:').fill(eventURL);
     await this.eventOption1.check();
     await this.eventOption1.uncheck();
     await this.eventOption2.check();
     await this.eventOption2.uncheck();
     await this.eventOption1.check();
     await this.newEventSave.click();
     await this.eventContinue.click();
  }

  /*
  1. Create an event by giving its name, description, URL, *AND* adding a showing
  2. Go back to homepage to check if an new event exists.
  3. Go to the events page and click the newly created event.
  4. Delete its showing.
  5. Delete this event.
  6. Make sure there's no such event anymore.
     Now the thing we could focus more on is that probably we wanna test canceling a specific
     showing of an event, we might need to pass in the showing's id. However, we'd better bring up a good way
     to get that id.
  */
  async addDeleteEvents(event1Name:string, event1Description:string, event1URL:string, event1Showing1Date:string, event1Showing1Time:string, event1Showing1Quantity:string, event1Showing2Date: string, event1Showing2Time: string, event1Showing2Quantity: string, event1FullName: string)
  {
    await this.addButton.click();
    await this.eventNameBlank.click();
    await this.page.getByLabel('Event Name:').fill(event1Name);
    await this.eventDesBlank.click();
    await this.page.getByLabel('Event Description:').fill(event1Description);
    await this.imageURL.click();
    await this.page.getByLabel('Image URL:').fill(event1URL);
    await this.newEventSave.click();
    await this.eventContinue.click();
    await this.editAddShowing.click();
    await this.editEventDate.fill(event1Showing1Date);
    await this.editEventTime.click();
    await this.editEventTime.fill(event1Showing1Time);
    await this.editTicketQuatity.click();
    await this.editTicketQuatity.fill(event1Showing1Quantity);
    await this.newEventSave.click();
    await this.eventContinue.click();
    await this.homePage.click();
    await this.homePageRightSlide.click();
    await this.homePageRightSlide.click();
    await this.homePageRightSlide.click();
    await this.homePageRightSlide.click();
    await this.homePageRightSlide.click();
    await this.seeEventShowings.click();
    await expect(this.page.getByRole('img', { name: 'Test_event Playbill' })).toBeVisible;

    //We dont test buying ticket for this section.
    //await this.page.getByRole('combobox').first().selectOption('Wed Oct 11 2023 00:10:00 GMT-0700');
    //await this.page.getByRole('combobox').first().selectOption('452');
    //await this.page.locator('div').filter({ hasText: /^Ticket Typeselect ticket typeGeneral Admission - Adult: \$20\.00$/ }).getByRole('combobox').selectOption('General Admission - Adult');
    //await this.page.locator('div').filter({ hasText: /^Quantityselect qty12345678910$/ }).getByRole('combobox').selectOption('2');
    //await this.concessionTicket.check();
    //await this.getTickets.click();
    //await this.takeMeThere.click();
    //await this.backToEvents.click();
   /*
    //Now we delete a showing --method0: only for currently there's only one showing
    //
    await this.emailButton.click();
    await this.manageTicketingButton.click();
    await this.leftBarEvent.click();
    await this.page.getByRole('button', { name: 'Test_event Playbill Test_event Description An event for testing' }).first().click();
    await this.page.getByRole('button', { name: 'Edit' }).nth(1).click();
    await this.page.getByRole('button', { name: 'Delete' }).click();
    await this.eventContinue.click();
   */
  /*
   //Now we delete a showing --method1: let's create a new showing then delete it(by clicking descending id to find the most recently created one)
    await this.emailButton.click();
    await this.manageTicketingButton.click();
    await this.leftBarEvent.click();
    await this.page.getByRole('button', { name: 'Test_event Playbill Test_event Description An event for testing' }).first().click();
    await this.editAddShowing.click();
    await this.editEventDate.fill('2023-10-17');
    await this.editEventTime.fill('10:20');
    await this.editTicketQuatity.fill('010');
    await this.newEventSave.click();
    await this.eventContinue.click();
    await this.page.getByRole('combobox').selectOption('5');//display showings by descending showingid order
    await this.page.getByRole('button', { name: 'Edit' }).nth(1).click();
    await this.page.getByRole('button', { name: 'Delete' }).click();
    await this.eventContinue.click();
    await expect(this.page.getByText('Date: Tue, Oct 17 2023Time: 10:20 AMTotal Tickets: 10Available Ti')).not.toBeVisible();
    */
    //Now we delete a showing --method2: search a specific showing then delete it
    //
    await this.emailButton.click();
    await this.manageTicketingButton.click();
    await this.leftBarEvent.click();
    await this.page.getByRole('button', { name: event1FullName }).first().click();
    await this.editAddShowing.click();
    await this.editEventDate.fill(event1Showing2Date);
    await this.editEventTime.fill(event1Showing2Time);
    await this.editTicketQuatity.fill(event1Showing2Quantity);
    await this.newEventSave.click();
    await this.eventContinue.click();

    await this.showingCard
    .filter({ hasText: 'Wed, Oct 11 2023'})
    .getByRole('button', { name: 'Edit' })
    .click();
    await this.deleteButton.click();
    await this.eventContinue.click();

    await this.showingCard
    .filter({ hasText: 'Tue, Oct 17 2023'})
    .getByRole('button', { name: 'Edit' })
    .click();
    await this.deleteButton.click();
    await this.eventContinue.click();


    //The last paragraph of the URL is the id of the event
    //await this.page.getByLabel('Delete event 52').click();
    await this.editEventInfor.click();
    await this.deleteButton.click();
    await this.eventContinue.click();
    await this.eventContinue.click();
    await this.leftBarEvent.click();
    await expect(this.page.getByRole('button', { name: event1FullName }).first()).not.toBeVisible();
  }


/*
This test is for testing the functionality of editing an event, same for the showing
*/
  async editEvents1(event2RevisedName: string, event2Name: string, event2RevisedDescription: string, event2Description: string, event2RevisedURL: string, event2URL: string)
  {
    await this.secondEvent.click();
    await this.editEventInfor.click();
    await this.editEventName.click();
    await this.editEventName.fill(event2RevisedName);
    await this.newEventSave.click();
    await this.eventContinue.click();
    await this.page.getByText(event2RevisedName, { exact: true }).click();
    await this.editEventInfor.click();
    await this.editEventName.click();
    await this.editEventName.fill(event2Name);
    await this.eventDesBlank.fill(event2RevisedDescription);
    await this.newEventSave.click();
    await this.eventContinue.click();
    await this.page.getByText(event2RevisedDescription).click();
    await this.editEventInfor.click();
    await this.eventDesBlank.click();
    await this.eventDesBlank.fill(event2Description);
    await this.newEventSave.click();
    await this.eventContinue.click();
    await this.editEventInfor.click();
    await this.imageURL.click();
    await this.imageURL.fill(event2RevisedURL);
    await this.newEventSave.click();
    await this.eventContinue.click();
    await this.page.getByRole('img', { name: 'Event Image Playbill' }).click();
    await this.editEventInfor.click();
    await this.imageURL.click();
    await this.imageURL.fill(event2URL);
    await this.newEventSave.click();
    await this.eventContinue.click();
    await this.page.getByRole('img', { name: 'Event Image Playbill' }).click();
  }

  /*
  This test is for checking the functionality of editing a showing
  */
   async editShowing(eventShowingDate: string, eventShowingQuantity: string, eventShowing1Date: string, eventShowing1Quantity:string, eventShowing1DateString:string)
   {
    await this.firstEvent.click();
    await this.page.locator('div:nth-child(3) > .bg-blue-500').first().click();
    await this.page.getByText('372').click();
    await this.editEventDate.fill(eventShowingDate);
    await this.ticketQuantityOption.click();
    await this.ticketQuantityOption.fill(eventShowingQuantity);
    await this.page.getByLabel('Save').click();
    await this.eventContinue.click();

    await this.page.locator('div:nth-child(3) > .bg-blue-500').first().click();
    await this.editEventDate.fill(eventShowing1Date);
    await this.ticketQuantityOption.click();
    await this.ticketQuantityOption.fill(eventShowing1Quantity);
    await this.page.getByLabel('Save').click();
    await this.eventContinue.click();
    await this.page.getByText(eventShowing1DateString).click();
    await this.page.locator('div:nth-child(4) > p:nth-child(2)').first().click();
  }


   async goto(){
    await this.page.goto('/', { timeout: 90000 });
    await this.emailButton.click();
    await this.manageTicketingButton.click();
    await this.leftBarEvent.click();
    await expect(this.pageHeader).toBeVisible();
  }

  async ticketingURL(){
    await this.page.goto('/ticketing', { timeout: 90000 });
  }

  async backtoEvents(){
    await this.leftBarEvent.click();
  }
}
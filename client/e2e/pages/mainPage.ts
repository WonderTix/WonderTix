/* eslint-disable require-jsdoc */

import {type Locator, type Page, expect} from '@playwright/test';
import {EventsInfo, ShowingInfo, CreditCard, Customer} from '../testData/ConstsPackage';

export class MainPage {
  readonly page: Page;

  readonly firstShowing: Locator;
  readonly headingEvent: Locator;

  // Below elements are actually on the event template
  // Should event template be its own page object?
  readonly selectDate: Locator;
  readonly selectTime: Locator;
  readonly selectTicketType: Locator;
  readonly selectQuantity: Locator;
  readonly addConcessionsTicket: Locator;
  readonly getTickets: Locator;
  readonly titleEvent: Locator;
  readonly successHeader: Locator;
  readonly cartFromSuccess: Locator;
  readonly checkoutFromCart: Locator;

  // Below elements are on the checkout workflow
  readonly cartContinue: Locator;
  readonly cartFirstName: Locator;
  readonly cartLastName: Locator;
  readonly cartStreetAddress: Locator;
  readonly cartPostCode: Locator;
  readonly cartCountry: Locator;
  readonly cartPhone: Locator;
  readonly cartEmail: Locator;
  readonly cartSource: Locator;
  readonly cartAccommodations: Locator;
  readonly cartNext: Locator;
  readonly stripeEmail: Locator;
  readonly stripeCardNumber: Locator;
  readonly stripeDate: Locator;
  readonly stripeCVC: Locator;
  readonly stripeFullName: Locator;
  readonly stripeZIP: Locator;
  readonly stripeCheckout: Locator;
  readonly stripeOrderConfirmation: Locator;

  constructor(page: Page) {
    this.page = page;

    this.firstShowing = page.getByRole('button', {name: 'See Showings'}).first();
    this.headingEvent = page.getByRole('heading', {name: 'Events'});
    this.selectDate = page.locator('#date-select');
    this.selectTime = page.locator('#time-select');
    this.selectTicketType = page.locator('#ticket-type-select');
    this.selectQuantity = page.locator('#qty-select');
    this.addConcessionsTicket = page.locator('#add-concessions-ticket');
    this.getTickets = page.getByTestId('get-tickets');
    this.titleEvent = page.getByTestId('event-title');
    this.successHeader = page.getByRole('heading', {name: 'Success!'});
    this.cartFromSuccess = page.getByRole('button', {name: 'Take me there!'});
    this.checkoutFromCart = page.getByRole('button', {name: 'Proceed To Checkout'});

    this.cartContinue = page.getByRole('button', {name: 'Continue'});
    this.cartFirstName = page.locator('#first-name');
    this.cartLastName = page.locator('#last-name');
    this.cartStreetAddress = page.locator('#address');
    this.cartPostCode = page.locator('#zipcode');
    this.cartCountry = page.locator('#country');
    this.cartPhone = page.locator('#phone-number');
    this.cartEmail = page.locator('#contact-email');
    this.cartSource = page.locator('#visit-source');
    this.cartAccommodations = page.locator('#seating-acc');
    this.cartNext = page.getByRole('button', {name: 'Next'});
    this.stripeEmail = page.locator('#email');
    this.stripeCardNumber = page.locator('#cardNumber');
    this.stripeDate = page.locator('#cardExpiry');
    this.stripeCVC = page.locator('#cardCvc');
    this.stripeFullName = page.locator('#billingName');
    this.stripeZIP = page.locator('#billingPostalCode');
    this.stripeCheckout = page.getByTestId('hosted-payment-submit-button');
    this.stripeOrderConfirmation = page.getByText('Thank you for your purchase!');
  }

  // Initial page navigation - sends browser session to the root address
  // Sets long timeout to account for various delays while testing in dev
  async goto() {
    await this.page.goto('/', {timeout: 90000});
  }

  async getShowingLocator(showingName: string) {
    return this.page.getByText(showingName).first();
  }

  // Click the 'See Showings' button of the first event on the main page
  // Return the name of that showing
  async goFirstShowing() {
    await this.firstShowing.click();
    const title = await this.titleEvent.textContent();
    return title;
  }

  // Find and go to the showing associated with the EventsInfo parameter
  // Return the name of that showing
  async goSelectShowing(eventInfo: EventsInfo) {
    const eventCard = await this.getShowingLocator(eventInfo.eventName + eventInfo.eventDescription + 'See Showings');
    await eventCard.getByRole('button', {name: 'See Showings'}).click();
    const title = await this.titleEvent.textContent();
    return title;
  }

  // Helper function - selects a random option in a dropdown box
  // allInnerTexts does not work on FireFox and WebKit
  // The evaluate function sends a JS snippet to build a string that's roughly an equivalent
  // There is a minor bug, but the error is discarded in the shift operation
  // Array must have length of at least two, or no selectable options exist
  // String shift removes the first item in the array
  // Select a random option from the array, set that option, and return the text
  private async selectRandomOption(optionBox: Locator) {
    const allOptions = (await optionBox.evaluate((sel) => {
      var list;
      var i;
      for (i=0; i< sel.options.length; i++) {
        list = list + sel.options[i].text + "\n";
      }
      return list.slice(0, -1);
    })).split('\n');
    expect(allOptions.length).toBeGreaterThanOrEqual(2);
    allOptions.shift();
    const randomOption = allOptions[Math.floor(Math.random() * (allOptions).length)];
    await optionBox.selectOption(randomOption);
    return randomOption;
  }

  // The below selectXX functions simply pass the option locator into the helper above and
  // return the selected text
  async selectRandomDate() {
    const randomDate = await this.selectRandomOption(this.selectDate);
    return randomDate;
  }

  async selectRandomTime() {
    const randomTime = await this.selectRandomOption(this.selectTime);
    return randomTime;
  }

  async selectRandomTicketType() {
    const randomTicketType = await this.selectRandomOption(this.selectTicketType);
    return randomTicketType;
  }

  async selectRandomQuantity() {
    const randomQuantity = await this.selectRandomOption(this.selectQuantity);
    return randomQuantity;
  }

  // Click the Get Tickets button on the event page
  async clickGetTickets() {
    await this.getTickets.click();
  }

  // Verify specified elements are on the popup after clicking the Get Tickets button
  // Verifies the 'Success!' header is visible and the event details text is correct
  // Event details message must be composed in the calling test and passed into this function
  async checkAddTicketSuccess(message: string) {
    expect(await this.successHeader).toBeVisible();
    expect(await this.page.getByText(message)).toBeVisible();
  }

  async clickTakeMeThere() {
    await this.cartFromSuccess.click();
  }

  async checkCart(name: string, info:string, quantity: string) {
    await this.page.getByText(name).isVisible();
    await this.page.getByText(info).isVisible();
    await this.page.getByText(quantity, {exact: true}).isVisible();
  }

  async clickCartCheckout() {
    await this.checkoutFromCart.click();
    await this.cartContinue.click();
  }

  async fillCustomerInfo(customer: Customer) {
    await this.cartFirstName.fill(customer.firstName);
    await this.cartLastName.fill(customer.lastName);
    await this.cartStreetAddress.fill(customer.streetAddress);
    await this.cartPostCode.fill(customer.postCode);
    await this.cartCountry.fill(customer.country);
    await this.cartPhone.fill(customer.phoneNumber);
    await this.cartEmail.fill(customer.email);
    await this.cartAccommodations.selectOption({value: customer.accommodations});
  }

  async clickCartNext() {
    await this.cartNext.click();
  }

  async fillStripeInfo(customer: Customer, ccInfo: CreditCard) {
    await this.stripeEmail.fill(customer.email);
    await this.stripeCardNumber.fill(ccInfo.cardNumber);
    await this.stripeDate.fill(ccInfo.date);
    await this.stripeCVC.fill(ccInfo.CVC);
    await this.stripeFullName.fill(customer.fullName);
    await this.stripeZIP.fill(customer.postCode);
  }

  async clickStripeCheckout() {
    await this.stripeCheckout.click();
  }

  async purchaseTicket(customer: Customer, creditCard: CreditCard, showing: EventsInfo) {
    await this.goSelectShowing(showing);
    // Rebuild randoms to use a fixed selection using the EventsInfo and ShowingsInfo
    await this.selectRandomDate();
    await this.selectRandomTime();
    await this.selectRandomTicketType();
    await this.selectRandomQuantity();
    await this.clickGetTickets();
    await this.clickTakeMeThere();
    await this.clickCartCheckout();
    await this.fillCustomerInfo(customer);
    await this.clickCartNext();
    await this.fillStripeInfo(customer, creditCard);
    await this.clickStripeCheckout();
  }
}

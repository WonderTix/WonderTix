/* eslint-disable require-jsdoc */
import {type Locator, type Page, expect} from '@playwright/test';
import {CreditCardInfo} from '../testData/CreditCard';
import {CustomerInfo} from '../testData/CustomerInfo';
import {EventInfo} from '../testData/EventInfo';

export class MainPage {
  readonly page: Page;

  readonly firstShowing: Locator;
  readonly heading: Locator;

  readonly loadingScreen: Locator;

  // Below elements are actually on the event template
  // Should event template be its own page object?
  readonly dateOption: Locator;
  readonly timeOption: Locator;
  readonly ticketInput: Locator;
  readonly getTickets: Locator;
  readonly titleEvent: Locator;
  readonly successHeader: Locator;
  readonly cartFromSuccess: Locator;
  readonly checkoutFromCart: Locator;

  // Below elements are on the checkout workflow
  readonly cartTicketCard: Locator;
  readonly cartSubtotal: Locator;
  readonly cartContinue: Locator;
  readonly cartFirstName: Locator;
  readonly cartLastName: Locator;
  readonly cartStreetAddress: Locator;
  readonly cartPostCode: Locator;
  readonly cartCity: Locator;
  readonly cartState: Locator;
  readonly cartCountry: Locator;
  readonly cartPhone: Locator;
  readonly cartEmail: Locator;
  readonly cartConfirmEmail: Locator;
  readonly cartSource: Locator;
  readonly cartAccommodations: Locator;
  readonly cartNext: Locator;
  readonly stripeEmail: Locator;
  readonly stripeCardNumber: Locator;
  readonly stripeDate: Locator;
  readonly stripeCVC: Locator;
  readonly stripeFullName: Locator;
  readonly stripeZIP: Locator;
  readonly stripeSaveInfo: Locator;
  readonly stripeCheckout: Locator;
  readonly stripeOrderConfirmation: Locator;

  constructor(page: Page) {
    this.page = page;

    this.loadingScreen = page.getByTestId('loading-screen');
    this.firstShowing = page
      .getByRole('button', {name: 'Select Date & Time'})
      .first();
    this.heading = page.getByRole('heading', {name: 'Events'});

    this.dateOption = page.getByTestId('date-option');
    this.timeOption = page.getByTestId('time-option');
    this.ticketInput = page.getByTestId('ticket-input');
    this.getTickets = page.getByTestId('get-tickets');
    this.titleEvent = page.getByTestId('event-title');
    this.successHeader = page.getByRole('heading', {name: 'Success!'});
    this.cartFromSuccess = page.getByRole('button', {name: 'Take me there!'});
    this.checkoutFromCart = page.getByRole('button', {
      name: 'Proceed To Checkout',
    });

    this.cartTicketCard = page.getByTestId('cart-item-card');
    this.cartSubtotal = page.getByTestId('subtotal-display');
    this.cartContinue = page.getByRole('button', {name: 'Continue'});
    this.cartFirstName = page.locator('#first-name');
    this.cartLastName = page.locator('#last-name');
    this.cartStreetAddress = page.locator('#address');
    this.cartPostCode = page.locator('#zipcode');
    this.cartCity = page.locator('#city');
    this.cartState = page.locator('#state');
    this.cartCountry = page.locator('#country');
    this.cartPhone = page.locator('#phone-number');
    this.cartEmail = page.locator('#contact-email');
    this.cartConfirmEmail = page.locator('#confirm-email');
    this.cartSource = page.locator('#visit-source');
    this.cartAccommodations = page.locator('#seating-acc');
    this.cartNext = page.getByRole('button', {name: 'Next'});
    this.stripeEmail = page.locator('#email');
    this.stripeCardNumber = page.locator('#cardNumber');
    this.stripeDate = page.locator('#cardExpiry');
    this.stripeCVC = page.locator('#cardCvc');
    this.stripeFullName = page.locator('#billingName');
    this.stripeZIP = page.locator('#billingPostalCode');
    this.stripeSaveInfo = page.locator('#enableStripePass');
    this.stripeCheckout = page.getByTestId('hosted-payment-submit-button');
    this.stripeOrderConfirmation = page.getByText(
      'Thank you for your purchase!',
    );

    // Use your saved information
    // Cancel
  }

  // Initial page navigation - sends browser session to the root address
  // Sets long timeout to account for various delays while testing in dev
  async goTo() {
    await this.page.goto('/', {timeout: 60000});
    // Wait for the loading screen to be hidden
    await this.loadingScreen.waitFor({state: 'hidden', timeout: 30000});
  }

  async getEventLocator(eventName: string) {
    return this.page.getByText(eventName).first();
  }

  // Find and go to the showing associated with the EventInfo parameter
  // Return the name of that showing
  async goSelectEvent(eventInfo: EventInfo) {
    const eventCard = await this.getEventLocator(
      eventInfo.eventName + eventInfo.eventDescription + 'Select Date & Time',
    );
    await eventCard.getByRole('button', {name: 'Select Date & Time'}).click();
    return this.titleEvent.textContent();
  }

  /**
   * Selects a random option from a list of options.
   *
   * @param {Locator} option - The Playwright Locator object that matches multiple options.
   * @returns The locator of the randomly selected option.
   */
  private async getRandomOption(option: Locator) {
    const numberOfOptions = await option.count();
    const randomIndex = Math.floor(Math.random() * numberOfOptions);
    return option.locator(`nth=${randomIndex}`);
  }

  async selectRandomDate() {
    const dateOption = await this.getRandomOption(this.dateOption);
    await dateOption.click();
    return dateOption.textContent();
  }

  async selectRandomTime() {
    const timeOption = await this.getRandomOption(this.timeOption);
    await timeOption.click();
    return timeOption.getByTestId('time-option-value').textContent();
  }

  async selectQuantityForRandomTicketType(
    maxQty?: number,
    qty?: number,
  ) {
    let quantity: number;
    if (maxQty !== undefined) quantity = Math.max(Math.floor(Math.random() * maxQty), 1);
    else if (qty !== undefined) quantity = qty;
    else quantity = 2;

    const numberOfOptions = await this.ticketInput.count();
    const randomIndex = Math.floor(Math.random() * numberOfOptions);
    const ticketType = await this.ticketInput
      .getByTestId('ticket-type-name')
      .textContent();

    for (let i = 0; i < quantity; i++) {
      await this.ticketInput
        .locator(`nth=${randomIndex}`)
        .getByLabel('Add one ticket')
        .click();
    }
    return {ticketType, quantity};
  }

  // Click the Get Tickets button on the event page
  async clickGetTickets() {
    await this.getTickets.click();
  }

  getConfirmMessage(msg: string) {
    return this.page.getByText(msg);
  }

  // Clicks to go to cart on success popup for ticket add
  async clickTakeMeThere() {
    await this.cartFromSuccess.click();
  }

  // Checks cart info against the chosen event, date/time/ticket type, and quantity
  async checkCart(event: EventInfo, info: string, quantity: string) {
    await expect(this.cartTicketCard.getByText(event.eventName)).toBeVisible();
    await expect(this.page.getByText(info)).toBeVisible();
    await expect(this.cartTicketCard.getByTestId('item-quantity')).toHaveText(
      quantity,
    );
  }

  // Click checkout button from cart and clear the continue button
  async clickCartCheckout() {
    await this.checkoutFromCart.click();
    await this.cartContinue.click();
  }

  // Fills out the customer info from the customer parameter
  async fillCustomerInfo(customer: CustomerInfo) {
    await this.cartFirstName.fill(customer.firstName);
    await this.cartLastName.fill(customer.lastName);
    await this.cartStreetAddress.fill(customer.streetAddress);
    await this.cartPostCode.fill(customer.postCode);
    await this.cartCity.fill(customer.city);
    await this.cartState.fill(customer.state);
    await this.cartCountry.fill(customer.country);
    await this.cartPhone.fill(customer.phoneNumber);
    await this.cartEmail.fill(customer.email);
    await this.cartConfirmEmail.fill(customer.email);
    await this.cartAccommodations.selectOption({
      value: customer.accommodations,
    });
    await this.cartAccommodations.selectOption({
      value: customer.accommodations,
    });
  }

  // Goes next from the customer info
  async clickCartNext() {
    await this.cartNext.click();
  }

  // Fill out data on Stripe page. Currently uses both a Customer and CreditCard.
  // Stripe is slow and sometimes has an account popup after email entry.
  // This function waits to see if it will pop up and handle it appropriately.
  async fillStripeInfo(
    customer: CustomerInfo,
    ccInfo: CreditCardInfo,
    timeoutAdd = 0,
  ) {
    await this.page.waitForTimeout(10000 + timeoutAdd);
    if (await this.page.getByText('Use your saved information').isVisible()) {
      await this.page.getByRole('button', {name: 'Cancel'}).click();
    }
    await this.stripeCardNumber.fill(ccInfo.cardNumber);
    await this.stripeDate.click();
    await this.page.waitForTimeout(500); // Small delay to ensure the field retains focus
    await this.stripeDate.fill(ccInfo.date);

    await this.stripeCVC.fill(ccInfo.CVC);
    await this.stripeFullName.fill(customer.fullName);
    await this.stripeZIP.fill(customer.postCode);
    if (await this.stripeSaveInfo.isChecked()) {
      await this.stripeSaveInfo.click();
    }
  }

  // Click to purchase ticket at stripe
  async clickStripeCheckout() {
    await this.stripeCheckout.click();
  }

  // Function to complete an order from the main page through Stripe purchase.
  // Takes in a customer, credit card, event, and an optional quantity of tickets to purchase.
  // Date, time, and ticket type will be selected randomly.
  // Qty will be used to determine quantity if passed, otherwise will use a random quantity as well.
  async purchaseTicket(
    customer: CustomerInfo,
    creditCard: CreditCardInfo,
    event: EventInfo,
    options?: {qty?: number; timeoutAdd?: number},
  ) {
    if (options == undefined) options = {qty: 2, timeoutAdd: 0};
    if (options.qty == undefined) options.qty = 2;
    if (options.timeoutAdd == undefined) options.timeoutAdd = 0;
    await this.goSelectEvent(event);
    await this.selectRandomDate();
    await this.selectRandomTime();
    await this.selectQuantityForRandomTicketType(undefined, options.qty);
    await this.clickGetTickets();
    await this.clickTakeMeThere();
    await this.clickCartCheckout();
    await this.fillCustomerInfo(customer);
    await this.clickCartNext();
    await this.fillStripeInfo(customer, creditCard, options.timeoutAdd);
    await this.clickStripeCheckout();
    await this.stripeOrderConfirmation.waitFor({
      state: 'visible',
      timeout: 30000,
    });
  }

  // Increase number of tickets for an event by one
  // Uses the event parameter to find the event to increment.
  async incrementEventTicket(event: EventInfo) {
    const cartCard = this.cartTicketCard.filter({hasText: event.eventName});
    await cartCard.getByTestId('increment-item').click();
  }

  // Decrease number of tickets for an event by one.
  // Uses the event parameter to find the event to decrement.
  async decrementEventTicket(event: EventInfo) {
    const cartCard = this.cartTicketCard.filter({hasText: event.eventName});
    await cartCard.getByTestId('decrement-item').click();
  }

  // Checks the quantity and total of the chosen ticket is correct.
  // Currently assumes ticket cost is $20, and does not check the overall subtotal.
  async checkEventTicket(event: EventInfo, qty: number) {
    const cartCard = this.cartTicketCard.filter({hasText: event.eventName});
    await expect(cartCard.getByTestId('item-quantity')).toHaveText(
      qty.toString(),
    );
    const price = '$' + (qty * 20).toString() + '.00';
    await expect(cartCard.getByTestId('card-item-subtotal')).toHaveText(price);
  }
}

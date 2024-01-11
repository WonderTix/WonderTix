/* eslint-disable require-jsdoc */
import {type Locator, type Page, expect} from '@playwright/test';
import {CreditCardInfo} from '../testData/CreditCard';
import {CustomerInfo} from '../testData/CustomerInfo';
import {EventInfo} from '../testData/EventInfo';

export class MainPage {
  readonly page: Page;

  readonly firstShowing: Locator;
  readonly headingEvent: Locator;

  readonly loadingScreen: Locator;

  // Below elements are actually on the event template
  // Should event template be its own page object?
  readonly selectDate: Locator;
  readonly selectTime: Locator;
  readonly selectTicketType: Locator;
  readonly selectQuantity: Locator;
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
  readonly stripeSaveInfo: Locator;
  readonly stripeCheckout: Locator;
  readonly stripeOrderConfirmation: Locator;

  constructor(page: Page) {
    this.page = page;

    this.loadingScreen = page.getByTestId('loading-screen');
    this.firstShowing = page
      .getByRole('button', {name: 'Select Date & Time'})
      .first();
    this.headingEvent = page.getByRole('heading', {name: 'Events'});
    this.selectDate = page.locator('#date-select');
    this.selectTime = page.locator('#time-select');
    this.selectTicketType = page.locator('#ticket-type-select');
    this.selectQuantity = page.locator('#qty-select');
    this.getTickets = page.getByTestId('get-tickets');
    this.titleEvent = page.getByTestId('event-title');
    this.successHeader = page.getByRole('heading', {name: 'Success!'});
    this.cartFromSuccess = page.getByRole('button', {name: 'Take me there!'});
    this.checkoutFromCart = page.getByRole('button', {
      name: 'Proceed To Checkout',
    });

    this.cartTicketCard = page.getByTestId('cart-ticket-card');
    this.cartSubtotal = page.getByTestId('subtotal-display');
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
  async goto() {
    await this.page.goto('/', {timeout: 60000});
    // Wait for the loading screen to be hidden
    await this.loadingScreen.waitFor({state: 'hidden', timeout: 30000});
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

  // Find and go to the showing associated with the EventInfo parameter
  // Return the name of that showing
  async goSelectShowing(eventInfo: EventInfo) {
    const eventCard = await this.getShowingLocator(
      eventInfo.eventName + eventInfo.eventDescription + 'Select Date & Time',
    );
    await eventCard.getByRole('button', {name: 'Select Date & Time'}).click();
    const title = await this.titleEvent.textContent();
    return title;
  }

  /**
   * Selects a random option from a dropdown box.
   *
   * This function addresses compatibility issues with 'allInnerTexts' in Firefox and WebKit.
   * It utilizes 'evaluate' to create a string array of dropdown option texts.
   * The function waits up to 5000ms to ensure the dropdown has at least two options.
   * If fewer than two options are available after the wait, it throws an error.
   * The first option is typically discarded as a placeholder or non-valid choice.
   *
   * @param {Locator} optionBox - The Playwright Locator object for the dropdown.
   * @returns {Promise<string>} - The text of the randomly selected option.
   *
   * Note: A brief pause between checks is included to avoid rapid polling.
   */
  private async selectRandomOption(optionBox: Locator) {
    let allOptions: string[] = [];
    const startTime = Date.now();
    const timeout = 5000; // 5000ms timeout

    // Wait for the options to populate
    while (Date.now() - startTime < timeout) {
      allOptions = (
        await optionBox.evaluate((sel: HTMLSelectElement) => {
          let list = '';
          for (let i = 0; i < sel.options.length; i++) {
            list += sel.options[i].text + '\n';
          }
          return list.slice(0, -1);
        })
      ).split('\n');

      if (allOptions.length >= 2) {
        break;
      }

      await this.page.waitForTimeout(100); // Wait for a short period before checking again
    }

    // Check if the number of options is sufficient
    if (allOptions.length < 2) {
      throw new Error('Not enough options in the dropdown');
    }
    allOptions.shift();
    const randomOption =
      allOptions[Math.floor(Math.random() * allOptions.length)];
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
    const randomTicketType = await this.selectRandomOption(
      this.selectTicketType,
    );
    return randomTicketType;
  }

  async selectRandomQuantity() {
    const randomQuantity = await this.selectRandomOption(this.selectQuantity);
    return randomQuantity;
  }

  async selectTicketQuantity(qty: number) {
    await this.selectQuantity.selectOption(qty.toString());
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

  // Clicks to go to cart on success popup for ticket add
  async clickTakeMeThere() {
    await this.cartFromSuccess.click();
  }

  // Checks cart info against the chosen event, date/time/ticket type, and quantity
  async checkCart(event: EventInfo, info: string, quantity: string) {
    await this.page.getByText(event.eventName).isVisible();
    await this.page.getByText(info).isVisible();
    await this.page.getByText(quantity, {exact: true}).isVisible();
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
    await this.cartCountry.fill(customer.country);
    await this.cartPhone.fill(customer.phoneNumber);
    await this.cartEmail.fill(customer.email);
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

  // Fill out data on Stripe page.  Currently uses both a Customer and CreditCard.
  // Stripe is slow and sometimes has an account popup after email entry.
  // This function waits to see if it will pop up and handle it appropriately.
  async fillStripeInfo(customer: CustomerInfo, ccInfo: CreditCardInfo, timeoutAdd = 0) {
    await this.stripeEmail.fill(customer.email);
    await this.page.waitForTimeout(10000 + timeoutAdd);
    if (await this.page.getByText('Use your saved information').isVisible()) {
      this.page.getByRole('button', {name: 'Cancel'}).click();
    }
    await this.stripeCardNumber.fill(ccInfo.cardNumber);
    
    await this.stripeDate.click();
    await this.page.waitForTimeout(500); // Small delay to ensure the field retains focus
    await this.stripeDate.fill(ccInfo.date);

    await this.stripeCVC.fill(ccInfo.CVC);
    await this.stripeFullName.fill(customer.fullName);
    await this.stripeZIP.fill(customer.postCode);
    await this.stripeSaveInfo.click();
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
    await this.goSelectShowing(event);
    // Rebuild randoms to use a fixed selection using the EventsInfo and ShowingsInfo
    await this.selectRandomDate();
    await this.selectRandomTime();
    await this.selectRandomTicketType();
    await this.selectTicketQuantity(options.qty);
    await this.clickGetTickets();
    await this.clickTakeMeThere();
    await this.clickCartCheckout();
    await this.fillCustomerInfo(customer);
    await this.clickCartNext();
    await this.fillStripeInfo(customer, creditCard, options.timeoutAdd);
    await this.clickStripeCheckout();
  }

  // Increase number of tickets for an event by one
  // Uses the event parameter to find the event to increment.
  async incrementEventTicket(event: EventInfo) {
    const cartCard = this.cartTicketCard.filter({hasText: event.eventName});
    await cartCard.getByTestId('increment-ticket').click();
  }

  // Decrease number of tickets for an event by one.
  // Uses the event parameter to find the event to decrement.
  async decrementEventTicket(event: EventInfo) {
    const cartCard = this.cartTicketCard.filter({hasText: event.eventName});
    await cartCard.getByTestId('decrement-ticket').click();
  }

  // Checks the quantity and total of the chosen ticket is correct.
  // Currently assumes ticket cost is $20, and does not check the overall subtotal.
  async checkEventTicket(event: EventInfo, qty: number) {
    const cartCard = this.cartTicketCard.filter({hasText: event.eventName});
    expect(await cartCard.getByTestId('ticket-quantity').textContent()).toBe(
      qty.toString(),
    );
    const price = '$' + (qty * 20).toString() + '.00';
    expect(
      await cartCard.getByTestId('card-ticket-subtotal').textContent(),
    ).toBe(price);
  }
}

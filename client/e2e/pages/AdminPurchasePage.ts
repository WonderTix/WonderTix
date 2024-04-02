/* eslint-disable require-jsdoc */
import test, {type Locator, type Page, expect} from '@playwright/test';
import {CustomerInfo} from '../testData/CustomerInfo';
import {CreditCardInfo} from '../testData/CreditCard';

/*
 Since many locators' names are created while a specific test is being written, some names are ill-considered,
 of course we could optimize them later in the process to create as few locators as possible and to share
 the same locator with multiple tests.
 */

export class AdminPurchasePage {
  readonly page: Page;

  readonly homePage: Locator;
  readonly loadingScreen: Locator;
  readonly purchaseTicketButton: Locator;

  readonly eventDropdown: Locator;
  readonly eventTimeDropdown: Locator;
  readonly ticketTypeDropdown: Locator;
  readonly checkoutButton: Locator;

  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly streetAddress: Locator;
  readonly postalCode: Locator;
  readonly country: Locator;
  readonly phone: Locator;
  readonly email: Locator;
  readonly howFoundOut: Locator;
  readonly seatingAccomodations: Locator;
  readonly comments: Locator;
  readonly donationAmount: Locator;
  readonly backNext: Locator;
  readonly nextPageButton: Locator;

  readonly email2: Locator;
  readonly popupWindow: Locator;
  readonly creditCardNum: Locator;
  readonly creditCardDate: Locator;
  readonly creditCardCVC: Locator;
  readonly creditCardName: Locator;
  readonly creditCardZip: Locator;
  readonly secureSave: Locator;
  readonly payPhoneNum: Locator;
  readonly paySubmit: Locator;
  readonly purchaseSuccessful: Locator;

  constructor(page: Page) {
    this.page = page;

    this.homePage = page.getByRole('button', {name: '/'});
    this.loadingScreen = page.getByTestId('loading-screen');
    this.purchaseTicketButton = page.getByRole('button', {
      name: 'Purchase Tickets',
    });

    // Admin Purchase Page locators
    this.eventDropdown = page.getByRole('combobox');
    this.eventTimeDropdown = page.getByRole('combobox').nth(1);
    this.ticketTypeDropdown = page.getByRole('combobox').nth(2);
    this.checkoutButton = page.getByRole('button', {
      name: 'Proceed to Checkout',
    });

    // Admin Checkout Page locators
    this.firstName = page.getByPlaceholder('First Name');
    this.lastName = page.getByPlaceholder('Last Name');
    this.streetAddress = page.getByPlaceholder('Street Address');
    this.postalCode = page.getByPlaceholder('Postal Code');
    this.country = page.getByPlaceholder('Country');
    this.phone = page.getByPlaceholder('Phone');
    this.email = page.getByPlaceholder('Email');
    this.howFoundOut = page.getByPlaceholder('How did you hear about us?');
    this.seatingAccomodations = page.getByLabel('Seating Accommodations');
    this.comments = page.getByPlaceholder('What do you want us to know?');
    this.donationAmount = page.getByPlaceholder('Enter donation amount');
    this.backNext = page.getByText('BackNext');
    this.nextPageButton = page.getByRole('button', {name: 'Next'});

    // Stripe Page locators
    this.email2 = page.getByLabel('Email');
    this.popupWindow = page.getByText('Use your saved information');
    this.purchaseSuccessful = page.getByText('Thank you for your purchase!');
    this.creditCardNum = page.getByPlaceholder('1234 1234 1234 1234');
    this.creditCardDate = page.getByPlaceholder('MM / YY');
    this.creditCardCVC = page.getByPlaceholder('CVC');
    this.creditCardName = page.getByPlaceholder('Full name on card');
    this.creditCardZip = page.getByPlaceholder('ZIP');
    this.secureSave = page.locator('#enableStripePass');
    this.payPhoneNum = page.getByPlaceholder('(201) 555-0123');
    this.paySubmit = page.getByTestId('hosted-payment-submit-button');
  }

  async goTo() {
    await this.page.goto('/admin', {timeout: 30000});
    await this.loadingScreen.waitFor({state: 'hidden', timeout: 30000});
  }

  async goToTicketing() {
    await this.page.goto('/ticketing', {timeout: 30000});
    await this.loadingScreen.waitFor({state: 'hidden', timeout: 30000});
  }

  async goToHome() {
    await this.page.goto('/', {timeout: 30000});
    await this.loadingScreen.waitFor({state: 'hidden', timeout: 30000});
  }

  async dynamicDropDownSelector(eventName: string) {
    const comboboxSelector = 'select';
    const comboboxes = await this.page.$$(comboboxSelector);

    if (comboboxes.length > 0) {
      const firstCombobox = comboboxes[0];
      const options = await firstCombobox.$$('option');

      await this.selectOptionByTextRegex(firstCombobox, options, /Test_event/i);
    }
  }

  /**
   *
   * @param dropdown
   * @param options
   * @param regex
   */
  async selectOptionByTextRegex(dropdown, options, regex: RegExp) {
    for (const option of options) {
      const optionText = await option.innerText();
      if (regex.test(optionText)) {
        await dropdown.selectOption(optionText);
      }
    }
  }

  async dynamicDropDownSelectorTime(eventName: string) {
    const comboboxSelector = 'select';
    const comboboxes = await this.page.$$(comboboxSelector);

    if (comboboxes.length > 0) {
      const secondCombobox = comboboxes[1];
      const options = await secondCombobox.$$('option');

      await this.selectOptionByTextRegexTime(secondCombobox, options, /Tue/i);
    }
  }

  /**
   *
   * @param dropdown
   * @param options
   * @param regex
   */
  async selectOptionByTextRegexTime(dropdown, options, regex: RegExp) {
    for (const option of options) {
      const optionText = await option.innerText();
      if (regex.test(optionText)) {
        await dropdown.selectOption(optionText);
      }
    }
  }

  /**
   * Purchase a ticket via admin purchase including the Stripe panels.
   *
   * @param {string} eventName
   * @param {string} eventTime
   * @param {CreditCardInfo} creditCard
   * @param {CustomerInfo} customer
   * @returns {Promise<void>}
   */
  async purchaseTicket(
    eventName: string,
    eventTime: string,
    creditCard: CreditCardInfo,
    customer: CustomerInfo,
  ): Promise<void> {
    await this.goToTicketing();
    await this.purchaseTicketButton.click();
    await this.page.waitForTimeout(600);
    await this.dynamicDropDownSelector(eventName);
    await this.dynamicDropDownSelectorTime(eventTime);
    await this.ticketTypeDropdown.selectOption('1');
    await this.checkoutButton.click();

    await this.fillCustomerInfo(customer);
    await this.backNext.click();
    await this.nextPageButton.click();

    await this.page.waitForTimeout(10000);
    await this.fillStripeInfo(customer, creditCard);
    await this.paySubmit.click();
  }

  /**
   * Fills in Contact form with small amount of information required by
   * admin purchase.
   *
   * @param {CustomerInfo} customer
   * @returns {Promise<void>}
   */
  async fillCustomerInfo(
    customer: CustomerInfo,
  ): Promise<void> {
    await this.firstName.click();
    await this.firstName.fill(customer.firstName);
    await this.lastName.click();
    await this.lastName.fill(customer.lastName);
    await this.email.click();
    await this.email.fill(customer.email);
    await this.phone.click();
    await this.phone.fill(customer.phoneNumber);
    await this.seatingAccomodations.selectOption(customer.accommodations);
    await this.donationAmount.click();
    await this.donationAmount.fill(customer.donationAmount);
  }

  /**
   * Fill in information to the Stripe checkout page.
   *
   * @param {CustomerInfo} customer
   * @param {CreditCardInfo} creditCard
   * @returns {Promise<void>}
   */
  async fillStripeInfo(
    customer: CustomerInfo,
    creditCard: CreditCardInfo,
  ): Promise<void> {
    if (await this.popupWindow.isVisible()) {
      await this.page.getByRole('button', {name: 'Cancel'}).click();
    }
    await this.creditCardNum.fill(creditCard.cardNumber);
    await this.creditCardDate.click();
    await this.page.waitForTimeout(500);
    await this.creditCardDate.fill(creditCard.date);
    await this.creditCardCVC.fill(creditCard.CVC);
    await this.creditCardName.fill(customer.fullName);
    await this.creditCardZip.fill(customer.postCode);
    if (await this.secureSave.isChecked()) {
      await this.secureSave.click();
    }
  }
}

/**
 *
 * @param ms
 */
function delay(ms: number) {
  return new Promise( (resolve) => setTimeout(resolve, ms));
}

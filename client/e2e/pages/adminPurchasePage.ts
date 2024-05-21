/* eslint-disable require-jsdoc */
import {ElementHandle, type Locator, type Page} from '@playwright/test';
import {CustomerInfo} from '../testData/CustomerInfo';
import {CreditCardInfo} from '../testData/CreditCard';

export class AdminPurchasePage {
  readonly page: Page;

  readonly loadingScreen: Locator;
  readonly purchaseSuccessfulScreen: Locator;

  readonly pageHeader: Locator;
  readonly eventDropdown: Locator;
  readonly eventTimeDropdown: Locator;
  readonly ticketTypeDropdown: Locator;
  readonly checkoutButton: Locator;

  readonly firstName: Locator;
  readonly lastName: Locator;
  readonly phone: Locator;
  readonly email: Locator;
  readonly emailConfirmation: Locator;
  readonly seatingAccomodations: Locator;
  readonly donationAmount: Locator;
  readonly backNext: Locator;
  readonly nextPageButton: Locator;

  readonly stripePopupWindow: Locator;
  readonly creditCardNum: Locator;
  readonly creditCardDate: Locator;
  readonly creditCardCVC: Locator;
  readonly creditCardName: Locator;
  readonly creditCardZip: Locator;
  readonly secureSave: Locator;
  readonly paySubmit: Locator;

  constructor(page: Page) {
    this.page = page;

    this.loadingScreen = page.getByTestId('loading-screen');
    this.purchaseSuccessfulScreen = page.getByText('Thank you for your purchase!');

    // Admin Purchase Page locators
    this.pageHeader = page.getByRole('heading', {name: 'Purchase Tickets'});
    this.eventDropdown = page.getByRole('combobox').nth(0);
    this.eventTimeDropdown = page.getByRole('combobox').nth(1);
    this.ticketTypeDropdown = page.getByRole('combobox').nth(2);
    this.checkoutButton = page.getByRole('button', {
      name: 'Proceed to Checkout',
    });

    // Admin Checkout Page locators
    this.firstName = page.getByPlaceholder('First Name');
    this.lastName = page.getByPlaceholder('Last Name');
    this.phone = page.getByPlaceholder('Phone');
    this.email = page.getByPlaceholder('Email', {exact: true});
    this.emailConfirmation = page.getByPlaceholder('Confirm Email');
    this.seatingAccomodations = page.getByLabel('Seating Accommodations');
    this.donationAmount = page.getByPlaceholder('Enter donation amount');
    this.backNext = page.getByText('BackNext');
    this.nextPageButton = page.getByRole('button', {name: 'Next'});

    // Stripe Page locators
    this.stripePopupWindow = page.getByText('Use your saved information');
    this.creditCardNum = page.getByPlaceholder('1234 1234 1234 1234');
    this.creditCardDate = page.getByPlaceholder('MM / YY');
    this.creditCardCVC = page.getByPlaceholder('CVC');
    this.creditCardName = page.getByPlaceholder('Full name on card');
    this.creditCardZip = page.getByPlaceholder('ZIP');
    this.secureSave = page.locator('#enableStripePass');
    this.paySubmit = page.getByTestId('hosted-payment-submit-button');
  }

  async goTo() {
    await this.page.goto('/ticketing/purchaseticket', {timeout: 30000});
    await this.loadingScreen.waitFor({state: 'hidden', timeout: 30000});
  }

  async goToHome() {
    await this.page.goto('/', {timeout: 30000});
    await this.loadingScreen.waitFor({state: 'hidden', timeout: 30000});
  }

  /**
   * Selects an element of a dropdown based on selector and search string.
   *
   * @param {Locator} dropdownSelector
   * @param {string} searchString
   * @returns {Promise<void>}
   */
  async dynamicDropDownSelector(
    dropdownSelector: Locator,
    searchString: string,
  ): Promise<void> {
    const dropdownElement = await dropdownSelector.elementHandle();
    const options = await dropdownElement.$$('option');
    await this.selectOptionByTextRegex(
      dropdownElement,
      options,
      new RegExp(searchString, 'i'),
    );
  }

  /**
   *
   * @param {ElementHandle} dropdown
   * @param {ElementHandle[]} options
   * @param {RegExp} regex
   */
  async selectOptionByTextRegex(
    dropdown: ElementHandle,
    options: ElementHandle[],
    regex: RegExp,
  ) {
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
    await this.dynamicDropDownSelector(this.eventDropdown, eventName);
    await this.dynamicDropDownSelector(this.eventTimeDropdown, eventTime);
    await this.dynamicDropDownSelector(this.ticketTypeDropdown, 'General Admission');
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
  async fillCustomerInfo(customer: CustomerInfo): Promise<void> {
    await this.firstName.click();
    await this.firstName.fill(customer.firstName);
    await this.lastName.click();
    await this.lastName.fill(customer.lastName);
    await this.email.click();
    await this.email.fill(customer.email);
    await this.emailConfirmation.click();
    await this.emailConfirmation.fill(customer.email);
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
    if (await this.stripePopupWindow.isVisible()) {
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

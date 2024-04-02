/* eslint-disable require-jsdoc */
import test, {type Locator, type Page, expect} from '@playwright/test';
import {CustomerInfo} from '../testData/CustomerInfo';

/*
 Since many locators' names are created while a specific test is being written, some names are ill-considered,
 of course we could optimize them later in the process to create as few locators as possible and to share
 the same locator with multiple tests.
 */

export class AdminPurchasePage {
  readonly page: Page;

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
  readonly sms0: Locator;
  readonly sms1: Locator;
  readonly sms2: Locator;
  readonly sms3: Locator;
  readonly sms4: Locator;
  readonly sms5: Locator;
  readonly submitPopup: Locator;
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
    this.sms0 = page.getByTestId('sms-code-input-0');
    this.sms1 = page.getByTestId('sms-code-input-1');
    this.sms2 = page.getByTestId('sms-code-input-2');
    this.sms3 = page.getByTestId('sms-code-input-3');
    this.sms4 = page.getByTestId('sms-code-input-4');
    this.sms5 = page.getByTestId('sms-code-input-5');
    this.submitPopup = page.getByTestId('hosted-payment-submit-button');
    this.purchaseSuccessful = page.getByText('Thank you for your purchase!');
    this.creditCardNum = page.getByPlaceholder('1234 1234 1234 1234');
    this.creditCardDate = page.getByPlaceholder('MM / YY');
    this.creditCardCVC = page.getByPlaceholder('CVC');
    this.creditCardName = page.getByPlaceholder('Full name on card');
    this.creditCardZip = page.getByPlaceholder('ZIP');
    this.secureSave = page.getByLabel(
      /Securely save my information for 1-click checkout/,
    );
    this.payPhoneNum = page.getByPlaceholder('(201) 555-0123');
    this.paySubmit = page.getByTestId('hosted-payment-submit-button');
  }

  async goto() {
    await this.page.goto('/admin', {timeout: 30000});
  }

  async gotoTicketing() {
    await this.page.goto('/ticketing', {timeout: 30000});
  }

  async gotoHome() {
    await this.page.goto('/', {timeout: 30000});
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
        return;
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
        return;
      }
    }
  }

  /**
   * Purchase a ticket via admin purchase including the Stripe panels.
   *
   * @param {string} eventName
   * @param {string} eventTime
   * @param {CustomerInfo} customer
   * @returns {Promise<void>}
   */
  async purchaseTicket(
    eventName: string,
    eventTime: string,
    customer: CustomerInfo,
  ): Promise<void> {
    await this.gotoTicketing();
    await this.purchaseTicketButton.click();
    await delay(500);
    await this.dynamicDropDownSelector(eventName);
    await delay(500);
    await this.dynamicDropDownSelectorTime(eventTime);
    await this.ticketTypeDropdown.selectOption('1');
    await delay(500);
    await this.checkoutButton.click();

    await this.fillCustomerInfo(customer);
    await this.backNext.click();
    await this.nextPageButton.click();

    await delay(2000);
    await this.email2.click();
    await this.email2.fill(customer.email);
    await delay(3000);
    if (await this.popupWindow.isVisible()) {
      // Scenario for verification pop-up
      await this.sms0.click();
      await this.sms0.fill('4');
      await this.sms1.fill('2');
      await this.sms2.fill('4');
      await this.sms3.fill('2');
      await this.sms4.fill('4');
      await this.sms5.fill('2');
      await this.submitPopup.click();
      await this.page.goto('https://localhost:3000/success');
      expect(await this.purchaseSuccessful.isVisible());
    } else {
      // Scenario for new/unregistered e-mail
      await this.creditCardNum.click();
      await this.creditCardNum.fill('4242 4242 4242 4242');
      await this.creditCardDate.click();
      await this.creditCardDate.fill('12 / 34');
      await this.creditCardCVC.click();
      await this.creditCardCVC.fill('487');
      await this.creditCardName.click();
      await this.creditCardName.fill(customer.fullName);
      await this.creditCardZip.click();
      await this.creditCardZip.fill(customer.postCode);
      await this.secureSave.check();
      await this.payPhoneNum.click();
      await this.payPhoneNum.fill(customer.phoneNumber);
      await this.paySubmit.click();
      await this.page.goto('https://localhost:3000/success');
      expect(await this.purchaseSuccessful.isVisible());
    }
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
}

/**
 *
 * @param ms
 */
function delay(ms: number) {
  return new Promise( (resolve) => setTimeout(resolve, ms));
}

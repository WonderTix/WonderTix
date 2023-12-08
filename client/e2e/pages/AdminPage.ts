/* eslint-disable require-jsdoc */
import test, {type Locator, type Page, expect} from '@playwright/test';
/*
Since many locators' names are created while a specific test is being written, some names are ill-considered,
of course we could optimize them later in the process to create as few locators as possible and to share
the same locator with multiple tests.
*/

export class AdminPage {
  readonly page: Page;

  readonly purchaseTicketButton: Locator;
  readonly eventDropDown: Locator;
  readonly eventTime: Locator;
  readonly admissionType: Locator;
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
  readonly sms0: Locator; readonly sms1: Locator; readonly sms2: Locator;
  readonly sms3: Locator; readonly sms4: Locator; readonly sms5: Locator;
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

    this.purchaseTicketButton = page.getByRole('button', {name: 'Purchase Tickets'}); // for "EventInfo2" / "ShowingInfo2"
    this.eventDropDown = page.getByRole('combobox');
    // this.eventTime = page.locator('div').filter({hasText: /^Select TimeTue, Oct 17 - 10:20 AM$/}).getByRole('combobox');
    this.eventTime = page.getByRole('combobox').nth(1);
    this.admissionType = page.locator('div').filter({hasText: /^Select TypeGeneral Admission - AdultGeneral Admission - ChildVIP$/});
    this.checkoutButton = page.getByRole('button', {name: 'Proceed to Checkout'});
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
    this.secureSave = page.getByLabel(/Securely save my information for 1-click checkout/);
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

  // ADD THIS FUNCTION TO YOUR CODE
  async dynamicDropDownSelector(eventName: string) {
    // Replace 'your-combobox-selector' with the selector for combobox elements
    const comboboxSelector = 'select';

    // Find all combobox elements on the page
    const comboboxes = await this.page.$$(comboboxSelector);

    if (comboboxes.length > 0) {
      const firstCombobox = comboboxes[0];

      // Get options within the first combobox
      const options = await firstCombobox.$$('option');

      // Define your regex pattern
      const regexPattern = /Test_event/i; // Replace 'YourRegexPatternHere' with your regex pattern

      // Function to find and select the option that matches the regex pattern
      /**
       *
       * @param dropdown
       * @param regex
       */
      async function selectOptionByTextRegex(dropdown, regex) {
        for (const option of options) {
          const optionText = await option.innerText();
          if (regex.test(optionText)) {
            await dropdown.selectOption(optionText);
            console.log(`Selected option: ${optionText}`);
            return;
          }
        }
        console.log('No matching option found.');
      }

      // Call the function with your regex pattern and the first combobox element
      await selectOptionByTextRegex(firstCombobox, regexPattern);
    } else {
      console.log('No combobox elements found.');
    }
  }
  // END FUNCTION
  // ADD THIS FUNCTION TO YOUR CODE
  async dynamicDropDownSelectorTime(eventName: string) {
    // Replace 'your-combobox-selector' with the selector for combobox elements
    const comboboxSelector = 'select';

    // Find all combobox elements on the page
    const comboboxes = await this.page.$$(comboboxSelector);

    if (comboboxes.length > 0) {
      const secondCombobox = comboboxes[1];

      // Get options within the first combobox
      const options = await secondCombobox.$$('option');

      // Define your regex pattern
      const regexPattern = /Tue/i; // Replace 'YourRegexPatternHere' with your regex pattern

      // Function to find and select the option that matches the regex pattern
      /**
       *
       * @param dropdown
       * @param regex
       */
      async function selectOptionByTextRegexTime(dropdown, regex) {
        for (const option of options) {
          const optionText = await option.innerText();
          if (regex.test(optionText)) {
            await dropdown.selectOption(optionText);
            console.log(`Selected option: ${optionText}`);
            return;
          }
        }
        console.log('No matching option found.');
      }

      // Call the function with your regex pattern and the first combobox element
      await selectOptionByTextRegexTime(secondCombobox, regexPattern);
    } else {
      console.log('No combobox elements found.');
    }
  }
  // END FUNCTION

  async purchaseTicket(eventName: string, eventTime: string, testEmail: string) {
    await this.gotoTicketing(); // ticketing url
    await this.purchaseTicketButton.click();
    await delay(1000);
    await this.dynamicDropDownSelector(eventName);
    await delay(1000);
    await this.dynamicDropDownSelectorTime(eventTime);
    await this.admissionType.getByRole('combobox').selectOption('1');
    await delay(500);
    await this.checkoutButton.click();
    await this.firstName.click();
    await this.firstName.fill('Betty');
    await this.lastName.click();
    await this.lastName.fill('Wilson');
    await this.email.click();
    await this.email.fill('test@wondertix.com');
    await this.streetAddress.click();
    await this.streetAddress.fill('1111 42nd St');
    await this.postalCode.click();
    await this.postalCode.fill('97200');
    await this.country.click();
    await this.country.fill('United States');
    await this.phone.click();
    await this.phone.fill('5031112222');
    await this.howFoundOut.click();
    await this.howFoundOut.fill('Referral');
    await this.seatingAccomodations.selectOption('Wheel Chair');
    await this.comments.click();
    await this.comments.fill('I look forward to this movie.');
    await this.donationAmount.click();
    await this.donationAmount.fill('5.00');
    await this.backNext.click();
    await this.nextPageButton.click();
    await delay(2000);
    await this.email2.click();
    await this.email2.fill(testEmail);
    await delay(3000);
    if (await this.popupWindow.isVisible()) { // Scenario for verification pop-up
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
    } else { // Scenario for new/unregistered e-mail
      await this.creditCardNum.click();
      await this.creditCardNum.fill('4242 4242 4242 4242');
      await this.creditCardDate.click();
      await this.creditCardDate.fill('12 / 34');
      await this.creditCardCVC.click();
      await this.creditCardCVC.fill('487');
      await this.creditCardName.click();
      await this.creditCardName.fill('Betty Smith Wilson');
      await this.creditCardZip.click();
      await this.creditCardZip.fill('97200');
      await this.secureSave.check();
      await this.payPhoneNum.click();
      await this.payPhoneNum.fill('(503) 424-2424');
      await this.paySubmit.click();
      await this.page.goto('https://localhost:3000/success');
      expect(await this.purchaseSuccessful.isVisible());
    }
  }
}

/**
 *
 * @param ms
 */
function delay(ms: number) {
  return new Promise( (resolve) => setTimeout(resolve, ms) );
}

/* eslint-disable require-jsdoc */
import {test, expect} from '@playwright/test';
import {MainPage} from './pages/mainPage';
import {EventsPage} from './pages/EventsPage';
import {AdminPage} from './pages/AdminPage';
import {EventsInfo2} from './testData/ConstsPackage';
import {ShowingInfo2} from './testData/ConstsPackage';

test('Open admin page', async ({page}) => {
  const adminPage = new AdminPage(page);
  await adminPage.goto();
});

test('Open ticketing page', async ({page}) => {
  const adminPage = new AdminPage(page);
  await adminPage.gotoTicketing();
});

test('Purchase ticket for customer as admin', async ({page}) => {
  test.setTimeout(50000);
  const events = new EventsPage(page);
  await events.goto();
  await events.addnewevent(EventsInfo2);
  await events.addNewShowing(ShowingInfo2);
  try {
    const adminPage = new AdminPage(page);
    await adminPage.purchaseTicket('32-Angels In America', '372');
    // await page.getByRole('button', { name: 'Purchase Tickets' }).click();
    // await page.getByRole('combobox').first().selectOption('32-Angels In America');
    // await page.getByRole('combobox').nth(1).selectOption('372');
    // await page.locator('div').filter({ hasText: /^Select TypeGeneral Admission - AdultGeneral Admission - ChildVIP$/ })
    // .getByRole('combobox').selectOption('1');
    // await page.getByRole('button', { name: 'Proceed to Checkout' }).click();
    // await page.getByPlaceholder('First Name').click();
    // await page.getByPlaceholder('First Name').fill('Betty');
    // await page.getByPlaceholder('Last Name').click();
    // await page.getByPlaceholder('Last Name').fill('Wilson');
    // await page.getByPlaceholder('Street Address').click();
    // await page.getByPlaceholder('Street Address').fill('1111 42nd St');
    // await page.getByPlaceholder('Postal Code').click();
    // await page.getByPlaceholder('Postal Code').fill('97200');
    // await page.getByPlaceholder('Country').click();
    // await page.getByPlaceholder('Country').fill('United States');
    // await page.getByPlaceholder('Phone').click();
    // await page.getByPlaceholder('Phone').fill('5031112222');
    // await page.getByPlaceholder('Email').click();
    // await page.getByPlaceholder('Email').fill('test@wondertix.com');
    // await page.getByPlaceholder('How did you hear about us?').click();
    // await page.getByPlaceholder('How did you hear about us?').fill('Referral');
    // await page.getByLabel('Seating Accommodations').selectOption('Wheel Chair');
    // await page.getByPlaceholder('Comments').click();
    // await page.getByPlaceholder('Comments').fill('I look forward to this movie.');
    // await page.getByPlaceholder('Enter donation amount').click();
    // await page.getByPlaceholder('Enter donation amount').fill('5.00');
    // await page.getByText('BackNext').click();
    // await page.getByRole('button', {name: 'Next'}).click();
    // await delay(2000);
    // await page.getByLabel('Email').click();
    // await page.getByLabel('Email').fill('test@wondertix.com');
    // await delay(5000);
    // if (await page.getByText('Use your saved information').isVisible()) { // Scenario for verification pop-up
    //   await page.getByTestId('sms-code-input-0').click();
    //   await page.getByTestId('sms-code-input-0').fill('4');
    //   await page.getByTestId('sms-code-input-1').fill('2');
    //   await page.getByTestId('sms-code-input-2').fill('4');
    //   await page.getByTestId('sms-code-input-3').fill('2');
    //   await page.getByTestId('sms-code-input-4').fill('4');
    //   await page.getByTestId('sms-code-input-5').fill('2');
    //   await page.getByTestId('hosted-payment-submit-button').click();
    //   await page.goto('https://localhost:3000/success');
    //   expect(page.getByText('Thank you for your purchase!') != null);
    // } else { // Scenario for new/unregistered e-mail
    //   await page.getByPlaceholder('1234 1234 1234 1234').click();
    //   await page.getByPlaceholder('1234 1234 1234 1234').fill('4242 4242 4242 4242');
    //   await page.getByPlaceholder('MM / YY').click();
    //   await page.getByPlaceholder('MM / YY').fill('12 / 34');
    //   await page.getByPlaceholder('CVC').click();
    //   await page.getByPlaceholder('CVC').fill('487');
    //   await page.getByPlaceholder('Full name on card').click();
    //   await page.getByPlaceholder('Full name on card').fill('Betty Smith Wilson');
    //   await page.getByPlaceholder('ZIP').click();
    //   await page.getByPlaceholder('ZIP').fill('97200');
    //   await page.getByLabel(/Securely save my information for 1-click checkout/).check();
    //   await page.getByPlaceholder('(201) 555-0123').click();
    //   await page.getByPlaceholder('(201) 555-0123').fill('(503) 424-2424');
    //   await page.getByTestId('hosted-payment-submit-button').click();
    //   await page.goto('https://localhost:3000/success');
    //   expect(page.getByText('Thank you for your purchase!') != null);
    // }
  } finally {
    await page.goto('/', { timeout: 5000 });
    await events.goToEventFromManage(EventsInfo2.eventFullName);
    await events.deleteTheEvent(EventsInfo2.eventFullName);
  }
});

function delay(ms: number) {
  return new Promise( (resolve) => setTimeout(resolve, ms) );
}

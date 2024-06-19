/* eslint-disable require-jsdoc */
import {type Locator, type Page, expect} from '@playwright/test';
import {CustomerInfo, seatingAccOptions} from '../testData/CustomerInfo';

export class ContactPage {
  readonly page: Page;

  readonly searchContactButton: Locator;
  readonly searchParameterSelect: Locator;
  readonly searchValue: Locator;
  readonly searchParameterSelectOption: Locator;
  readonly contactRows: Locator;
  readonly removeButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchContactButton = page.getByTestId('contact-search-button');
    this.searchValue = page.getByLabel('Search Value');
    this.searchParameterSelect = page.locator('#search-parameter-select-0');
    this.searchParameterSelectOption = page.getByRole('option', {
      name: 'Email',
    });
    this.removeButton = page.getByRole('button', {name: 'Remove'});
    this.contactRows = page.locator('.MuiDataGrid-row');
  }

  async goTo() {
    await this.page.goto('/admin/contacts');
  }

  async searchCustomer(customer: CustomerInfo) {
    await this.searchParameterSelect.click();
    await this.searchParameterSelectOption.click();
    await this.searchValue.fill(customer.email);
    await this.searchContactButton.click();
  }

  getContactRow(customer: CustomerInfo) {
    const address = `${customer.streetAddress ?? ''} ${customer.city ?? ''}${
      customer.streetAddress || customer.city ? ',' : ''
    }${customer.state ?? ''} ${customer.postCode ?? ''} ${
      customer.country ?? ''
    }`;

    return this.contactRows
      .filter({hasText: customer.firstName})
      .filter({hasText: customer.lastName})
      .filter({hasText: customer.email})
      .filter({hasText: address})
      .filter({hasText: customer.phoneNumber})
      .filter({hasText: seatingAccOptions[customer.accommodations]});
  }
}

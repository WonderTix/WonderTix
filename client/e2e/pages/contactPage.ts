/* eslint-disable require-jsdoc */
import {type Locator, type Page, expect} from '@playwright/test';
import {CustomerInfo} from '../testData/CustomerInfo';

export class ContactPage {
  readonly page: Page;

  readonly searchContactButton: Locator;
  readonly searchParameterSelect: Locator;
  readonly searchValue: Locator;
  readonly searchParameterSelectOption: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchContactButton = page.getByTestId('contact-search-button');
    this.searchValue = page.getByLabel('Search Value');
    this.searchParameterSelect = page.locator('#search-parameter-select-0');
    this.searchParameterSelectOption = page.getByRole('option', {
      name: 'Email',
    });
  }

  async goto() {
    await this.page.goto('/admin/contacts');
  }

  async searchCustomer(customer: CustomerInfo) {
    await this.searchParameterSelect.click();
    await this.searchParameterSelectOption.click();
    await this.searchValue.fill(customer.email);
    await this.searchContactButton.click();
  }

  async checkCustomer(customer: CustomerInfo) {
    const address = `${customer.streetAddress ?? ''} ${customer.city ?? ''}${
      customer.streetAddress || customer.city ? ',' : ''
    }${customer.state ?? ''} ${customer.postCode ?? ''} ${
      customer.country ?? ''
    }`;
    await this.searchValue.clear();
    await expect(
      this.page.getByText(customer.email, {exact: true}),
    ).toBeVisible();
    await expect(
      this.page.getByText(customer.firstName, {exact: true}),
    ).toBeVisible();
    await expect(
      this.page.getByText(customer.lastName, {exact: true}),
    ).toBeVisible();
    await expect(this.page.getByText(address, {exact: true})).toBeVisible();
    await expect(
      this.page.getByText(customer.phoneNumber, {exact: true}),
    ).toBeVisible();
  }

  // Incomplete, page functionality not implemented
  async deleteCustomer(customer: CustomerInfo) {
    await this.searchCustomer(customer);
  }
}

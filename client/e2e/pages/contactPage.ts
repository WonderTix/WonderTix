/* eslint-disable require-jsdoc */

import {type Locator, type Page, expect} from '@playwright/test';
import {CreditCard, Customer} from '../testData/ConstsPackage';

export class ContactPage {
    readonly page: Page;

    readonly searchContact: Locator;
    readonly searchContactButton: Locator;

    readonly customerCard: Locator;

    readonly customerName: Locator;
    readonly customerID: Locator;
    readonly customerEmail: Locator;
    readonly customerPhone: Locator;
    readonly customerAddress: Locator;
    readonly customerNewsletter: Locator;
    readonly customerDonor: Locator;
    readonly customerAccommodations: Locator;
    readonly customerVIP: Locator;
    readonly customerVolunteer: Locator;

    constructor(page: Page) {
        this.page = page;

        this.searchContact = page.getByTestId('contact-search');
        this.searchContactButton = page.getByTestId('contact-search-button');

        this.customerCard = page.getByTestId('customer-card');

        this.customerName = page.getByTestId('customer-name');
        this.customerID = page.getByTestId('customer-id');
        this.customerEmail = page.getByTestId('customer-email');
        this.customerPhone = page.getByTestId('customer-phone');
        this.customerAddress = page.getByTestId('customer-address');
        this.customerNewsletter = page.getByTestId('customer-newsletter');
        this.customerDonor = page.getByTestId('customer-donorbadge');
        this.customerAccommodations = page.getByTestId('customer-accommodation');
        this.customerVIP = page.getByTestId('customer-vip');
        this.customerVolunteer = page.getByTestId('customer-volunteer');
    }

    async goto() {
        await this.page.goto('/admin/contacts');
    }

    async searchCustomer(customer: Customer) {
        await this.searchContact.fill(customer.fullName);
        await this.searchContactButton.click();
    }

    async checkCustomer(customer: Customer) {
        const currentCard = await this.customerCard.filter({hasText: customer.fullName});
        const name = await currentCard.getByTestId('customer-name').textContent();
        expect(await currentCard.getByTestId('customer-name').textContent()).toBe(customer.fullName);
        expect(await currentCard.getByTestId('customer-email').textContent()).toBe(customer.email);
        expect(await currentCard.getByTestId('customer-address').textContent()).toBe(customer.streetAddress);
        expect(await currentCard.getByTestId('customer-phone').textContent()).toBe(customer.phoneNumber);
    }

    // Incomplete, page functionality not implemented
    async deleteCustomer(customer: Customer) {
        await this.searchCustomer(customer);
        await this.customerCard.filter({hasText: customer.fullName}).getByRole('button', {name: 'Remove Customer'}).click();
    }
}

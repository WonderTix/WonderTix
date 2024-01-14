/* eslint-disable require-jsdoc */
import {type Locator, type Page, expect} from '@playwright/test';
import {CustomerInfo} from '../testData/CustomerInfo';

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

        this.customerCard = page.getByTestId('contact-card');

        this.customerName = page.getByTestId('name');
        this.customerID = page.getByTestId('id');
        this.customerEmail = page.getByTestId('email');
        this.customerPhone = page.getByTestId('phone');
        this.customerAddress = page.getByTestId('address');
        this.customerNewsletter = page.getByTestId('newsletter');
        this.customerDonor = page.getByTestId('donorbadge');
        this.customerAccommodations = page.getByTestId('accommodation');
        this.customerVIP = page.getByTestId('vip');
        this.customerVolunteer = page.getByTestId('volunteer');
    }

    async goto() {
        await this.page.goto('/admin/contacts');
    }

    async searchCustomer(customer: CustomerInfo) {
        await this.searchContact.fill(customer.fullName);
        await this.searchContactButton.click();
    }

    async checkCustomer(customer: CustomerInfo) {
        const currentCard = this.customerCard.filter({hasText: customer.fullName});
        expect(await currentCard.getByTestId('name').textContent()).toBe(customer.fullName);
        expect(await currentCard.getByTestId('email').textContent()).toBe(customer.email);
        expect(await currentCard.getByTestId('address').textContent()).toBe(`${customer.streetAddress}, ${customer.city}, ${customer.state} ${customer.postCode}, ${customer.country}`);
        expect(await currentCard.getByTestId('phone').textContent()).toBe(customer.phoneNumber);
        expect(await currentCard.getByTestId('accommodation').textContent()).toBe(customer.accommodations);
    }

    // Incomplete, page functionality not implemented
    async deleteCustomer(customer: CustomerInfo) {
        await this.searchCustomer(customer);
        await this.customerCard.filter({hasText: customer.fullName}).getByRole('button', {name: 'Remove Contact'}).click();
    }
}

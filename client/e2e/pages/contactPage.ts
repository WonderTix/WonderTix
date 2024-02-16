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
    readonly customerComments: Locator;
    readonly customerVIP: Locator;
    readonly customerVolunteer: Locator;

    constructor(page: Page) {
        this.page = page;

        this.searchContact = page.getByTestId('contact-search');
        this.searchContactButton = page.getByTestId('contact-search-button');

        this.customerCard = page.getByTestId('contact-card');

        this.customerName = page.getByTestId('contact-name');
        this.customerID = page.getByTestId('contact-id');
        this.customerEmail = page.getByTestId('contact-email');
        this.customerPhone = page.getByTestId('contact-phone');
        this.customerAddress = page.getByTestId('contact-address');
        this.customerNewsletter = page.getByTestId('contact-newsletter');
        this.customerDonor = page.getByTestId('contact-donorbadge');
        this.customerAccommodations = page.getByTestId('contact-accommodation');
        this.customerComments = page.getByTestId('contact-comments');
        this.customerVIP = page.getByTestId('contact-vip');
        this.customerVolunteer = page.getByTestId('contact-volunteer');
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
        expect(await currentCard.getByTestId('contact-name').textContent()).toBe(customer.fullName);
        expect(await currentCard.getByTestId('contact-email').textContent()).toBe(customer.email);
        expect(await currentCard.getByTestId('contact-address').textContent()).toBe(customer.streetAddress);
        expect(await currentCard.getByTestId('contact-city').textContent()).toBe(customer.city);
        expect(await currentCard.getByTestId('contact-state').textContent()).toBe(customer.state);
        expect(await currentCard.getByTestId('contact-country').textContent()).toBe(customer.country);
        expect(await currentCard.getByTestId('contact-postalCode').textContent()).toBe(customer.postCode);
        expect(await currentCard.getByTestId('contact-phone').textContent()).toBe(customer.phoneNumber);
        expect(await currentCard.getByTestId('contact-accommodation').textContent()).toBe(customer.accommodations);
        expect(await currentCard.getByTestId('contact-comments').textContent()).toBe(customer.comments);
    }

    // Incomplete, page functionality not implemented
    async deleteCustomer(customer: CustomerInfo) {
        await this.searchCustomer(customer);
        await this.customerCard.filter({hasText: customer.fullName}).getByRole('button', {name: 'Remove Contact'}).click();
    }
}

/* eslint-disable require-jsdoc */

import {type Locator, type Page, expect} from '@playwright/test';
import {CreditCard, Customer} from '../testData/ConstsPackage';

export class ContactPage {
    readonly page: Page;

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
}

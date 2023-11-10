/* eslint-disable require-jsdoc */

import {type Locator, type Page, expect} from '@playwright/test';
import {CreditCard, Customer} from '../testData/ConstsPackage';

export class ContactPage {
    readonly page: Page;
    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('/admin/contacts');
    }
}
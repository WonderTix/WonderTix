## WonderTix Playwright Testing Guide

### 1. Introduction to Playwright

#### What is Playwright?
Playwright is a modern automation framework that enables developers to write reliable end-to-end tests for web applications. It provides capabilities to interact with web pages, emulate browsers, and produce consistent results across different platforms.

#### Why Playwright for WonderTix?
At WonderTix, we've chosen Playwright for our end-to-end (e2e) testing needs. E2E tests are essential as they simulate real user scenarios, ensuring that our application works seamlessly from the user's perspective. With Playwright, we aim to achieve robust, fast, and reliable tests that help us maintain the high quality of our platform.

### 2. Learning Resources

Before diving into writing tests, it's crucial to familiarize yourself with the Playwright framework. Here are some recommended resources:

- [Getting Started with Playwright and VS Code](#)
- [Debugging Playwright tests in VS Code](#)
- [Generating Playwright Tests in VS Code record and pick locator tools](#)
- [Playwright's UI Mode: Watch mode and time travel debugging](#)

Make sure to watch them to gain a clear understanding of working with Playwright. Install the official [Playwright VSCode Extension](#) to leverage the convenient tools provided.

### 3. Setting Up Playwright

To run Playwright locally, make sure you've executed the command `npm install` to install all necessary packages. For further insights and resources, explore the [official Playwright documentation](https://playwright.dev/) on their website.

### 4. Page Object Model (POM) in WonderTix

Our POM structure consists of:
- **Page Object Files (POF)**: These files represent individual pages or components of the application. They contain locators for elements, methods to interact with those elements, and commonly repeated assertions.
- **Spec/Test Files**: These files contain the test cases that use the methods from the POFs.

#### Utilizing the Page Object Model:
For WonderTix, we utilize the Page Object Model. Familiarize yourself with the POM by referring to the [official Playwright documentation on POM](https://playwright.dev/docs/pom). You can also reference the Login Page Object `LoginPage.ts` used by the `./client/e2e/auth.setup.ts` file located at `./client/e2e/pages/loginPage.ts`.

#### Writing a Page Object File:

##### Structure:
- Define locators using Playwright's `page.getBy*` methods.
- Define methods that perform actions or navigations on the page.
- Include commonly repeated assertions directly within the methods.

##### Example POF (`DashboardPage.js`):
```javascript
import {type Locator, type Page} from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  // ... (locators)

  constructor(page: Page) {
    this.page = page;
    // ... (initialize locators)
  }

  // Page Object Functions
  async goto() {
    // ... (navigation logic)
  }

  async DoorList() {
    // ... (action logic)
    // Commonly repeated assertion after action
    await expect(this.page.getByRole('heading', {name: 'Door List'})).toBeVisible();
  }
  // ... (other methods)
}
```

#### Writing a Spec/Test File:

##### Structure:
- Import the necessary POFs.
- Use the methods from the POFs to perform actions and verifications.
- Include unique assertions specific to the test case.

##### Example Spec (`dashboard.spec.js`):
```javascript
import {test, expect} from '@playwright/test';
import {DashboardPage} from './pages/dashboardPage';

test('Homepage->Ticketing Dashboard', async ({page}) => {
  const dashboard = new DashboardPage(page);
  // ... (test logic)
});
```

### 5. Running Your Tests

#### 1. Locally Against Running Instances of Docker

Before pushing your code or creating a pull request, it's essential to run your tests locally. This is the first layer of verification. By running tests against local instances of Docker, you can quickly identify and fix any issues, ensuring that the tests are robust and reliable. This step is crucial as it helps in early detection of potential problems, saving time in the later stages of the development cycle.

**Steps**:
1. Ensure your Docker containers for the required services are up and running.
2. Execute your Playwright tests locally.
3. Address any test failures or issues that arise.

#### 2. Prior to Merging to Main in a PR (GitHub Actions Sandbox)

Once you've ensured that your tests pass locally, the next layer of verification is running them in a GitHub Actions sandbox environment. This is triggered automatically when you create a pull request. The tests are executed in a controlled environment, ensuring that they work as expected in a setup similar to the production environment.

**Note**: It's essential to monitor the results of these tests in the GitHub Actions dashboard. Any failures here should be addressed before merging the PR.

#### 3. Against Deployed Versions of WonderTix

After your changes are merged to the main branch, tests are run against the deployed versions of WonderTix. This is the final layer of verification, ensuring that the application works as expected in a real-world, production-like environment.

**Steps**:
1. Monitor the test results in the CI/CD pipeline dashboard.
2. If any tests fail, it's crucial to address them immediately to ensure the stability and reliability of the deployed application.

### 6. Best Practices

- **Descriptive Method Names**: Ensure methods describe the action or verification clearly.
- **Avoid Hardcoding**: Use environment variables or configuration files for dynamic values.
- **Consistency**: Maintain a consistent structure and naming convention across all POFs and spec files.
- **Reuse**: Maximize the reuse of methods across different test cases to reduce redundancy.

### 7. Tips for Test Writers

- Familiarize yourself with the existing POFs and spec files to understand the current structure and style.
- When adding new tests, check if there's an existing method in the POF that can be reused.
- Always ensure your tests are atomic, meaning they should be independent and not rely on the state from a previous test.
- Regularly run your tests locally before pushing changes to ensure they pass consistently.

### 8. Conclusion

By following the above guidelines and understanding the structure of our POM in WonderTix, you'll be well-equipped to write effective and maintainable e2e tests using Playwright. Remember to always run your tests at each layer of verification to ensure the high quality and reliability of WonderTix. Happy testing!

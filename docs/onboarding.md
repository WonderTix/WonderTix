## Wondertix Onboarding Guide
Compiled by Jaeger Tang. Modified by Eben Weisman for the Winter/Spring Team. Last updated 3/20/2024. 

#### Contents
```
Part 1: Setting up the Local Environment
    Wondertix Setup:
        Get the Source Code:
            Visit our GitHub repository
            Notes on Setup:
Part 2: Getting Comfortable with GitHub and Git Operations
    Familiarity with GitHub:
        1. GitHub Basics:
        2. Git Operations:
    Please review the following documentation:
Part 3: Introduction to Playwright
    What is Playwright?
    Why Playwright for Wondertix?
    Learning Resources:
        Playwright Tutorials:
        Setting Up Playwright:
Part 4: Writing Playwright Tests
    Utilizing the Page Object Model:
    Authentication:
    User Stories:
    Additional Support:
Part 5: Supplemental Reading
    Wondertix Deployment Overview:
    Wondertix Deployment Strategy:
    Shihao_E2E_Test.docx:
Part 6: Feedback and Collaboration
```

Welcome to the Wondertix team! We're excited to have you on board. Below you will find a comprehensive guide to set up your local environment and begin writing Playwright tests for Wondertix. Please follow each step carefully to ensure a smooth onboarding process.

### Part 1: Setting up the Local Environment

#### Wondertix Setup

##### Visit our GitHub repository

Follow the setup instructions outlined in the README to clone the repository and install the necessary dependencies to run Wondertix locally.

[Wondertix README](https://github.com/Wondertix/Wondertix)

The README in the GitHub repository provides crucial information and should be your first reference for setting up Wondertix.

##### Notes on Setup:
- Local build uses docker to spin up client, server, and database locally. 
  - Your client endpoint is https://localhost:3000
  - Your backend api endpoint is https://localhost:8000/api/docs

Get the Auth0 Keys and Stripe Keys from your team lead. 

Whenever you change your `.env` variables, make sure to completely rebuild your docker images:

```
   docker-compose down
   docker-compose build --no-cache
   docker-compose up -d --build
```

### Part 2: Getting Comfortable with GitHub and Git Operations

#### Familiarity with GitHub

Engaging with a shared codebase might be a new experience for some team members. Thus, understanding GitHub and its operations is vital for smooth collaboration and integration.

#### GitHub Basics
- Ensure you have a GitHub account and are added to the Wondertix repository.
- Understand the GitHub interface, issues, pull requests, and other essential features. Refer to the guide: Git/PR Conventions

#### Git Operations
- **Branch Operations:** Get used to creating, checking out, and switching between branches. This ensures you always work on the appropriate section of the code without affecting others.
- **Pull Requests:** Learn how to create a pull request. This allows others to review your changes before they get merged into the main branch.
Rebase and Merge: Familiarize yourself with updating your local branch. You can use either `rebase` or `merge` operations to align with the latest changes in the main branch. Refer to the guide: Updating Your Branch.
- **Resolving Merge Conflicts:** Encountering merge conflicts is common when multiple people work on the same codebase. If you come across merge conflicts and are unsure about resolving them, don't hesitate to reach out. Pair with a team lead or a teammate for assistance.

The more you interact with GitHub, the more confident and efficient you'll become. Remember, collaboration is the key, and there's always someone willing to help when you need it.

#### Please review the following documentation:

[Git/PR Conventions](git-conventions.md): This document provides guidelines and best practices for working with Git and creating pull requests.

[Updating Your Branch](updating-your-branch.md): Learn the ins and outs of keeping your branch updated with the latest changes from the main codebase

### Part 3: Introduction to Playwright

#### What is Playwright?

Playwright is a modern automation framework that enables developers to write reliable end-to-end tests for web applications. It provides capabilities to interact with web pages, emulate browsers, and produce consistent results across different platforms.

#### Why Playwright for Wondertix?

At Wondertix, we've chosen Playwright for our end-to-end (e2e) testing needs. E2E tests are essential as they simulate real user scenarios, ensuring that our application works seamlessly from the user's perspective. With Playwright, we aim to achieve robust, fast, and reliable tests that help us maintain the high quality of our platform.

#### Learning Resources

Before diving into writing tests, it's crucial to familiarize yourself with the Playwright framework. Here are some recommended resources:

**Playwright Tutorials:**
[Getting Started with Playwright and VS Code](https://www.youtube.com/watch?v=Xz6lhEzgI5I)
[Debugging Playwright tests in VS Code](https://www.youtube.com/watch?v=tJF7UhA59Gc)
[Generating Playwright Tests in VS Code record and pick locator tools](https://www.youtube.com/watch?v=LM4yqrOzmFE)
[Playwright's UI Mode: Watch mode and time travel debugging](https://www.youtube.com/watch?v=d0u6XhXknzU&list=PLQ6Buerc008dhme8fC80zmhohqpkA0aXI&index=4)

Make sure to watch them to gain a clear understanding of working with Playwright. **Install the official Playwright VSCode Extension** to leverage the convenient tools provided. 

#### Setting Up Playwright:
To run Playwright locally, make sure you've executed the command `npm install` to install all necessary packages. For further insights and resources, explore the official [Playwright documentation](https://playwright.dev/) on their website.

### Part 4: Writing Playwright Tests
Now that you're equipped with knowledge about Playwright and have set up your local environment, it's time to delve deeper. The SF23 Deployment team is in the early stages of drafting tests. By weeks 2 and 3, we'll offer more specific guidance on the tests you'll be contributing to Wondertix. For the time being, focus on exploring the Wondertix website and getting familiar with Playwright.

#### Utilizing the Page Object Model:
For Wondertix, we will be utilizing the Page Object Model. Refer to the documentation here:
[https://playwright.dev/docs/pom](https://playwright.dev/docs/pom.)


Note: You can reference the Login Page Object `LoginPage.ts` used by the `./client/e2e/auth.setup.ts` file located at `./client/e2e/pages/loginPage.ts`.


#### Authentication:
For handling user authentication, we followed the steps outlined here:
[https://playwright.dev/docs/auth](https://playwright.dev/docs/auth)

**Primary documentation, ticket management, and issues tracking should all be done on GitHub.**

Work closely with your team, and don't hesitate to ask questions or seek clarification. Feel free and encouraged to post in the SW need-help channel on discord.

#### Additional Support:
Keep in touch with your team lead for any additional assistance or resources needed during your onboarding process.

### Part 5: Supplemental Reading

[Wondertix Deployment Overview](deployment-overview.md)
For those keen on understanding the intricacies of our deployment process, this document offers a high-level overview of how Wondertix deployment functions. It's designed to address the curiosity of our developers and provide clarity on the deployment workflow.

[Wondertix Deployment Strategy](deployment-strategy.md)
Dive deeper into the deployment strategy of the Wondertix project with this document. It explains the various deployment environments we will use, and the principles guiding the transition of code between these environments.

[Shihao_E2E_Test.docx](e2e-testing.md)
Delve into Shihao Li's research document, a comprehensive exploration of E2E testing, focusing on the capabilities of Playwright and Cypress for the Wondertix deployment team.

We encourage you to review these resources to gain a comprehensive understanding of our deployment and testing practices and strategies.

**Please be aware:** These documents are dynamic and may evolve over time.

### Part 6: Feedback and Collaboration
We value your feedback and collaboration:

Share your insights, suggestions, and feedback with the team. Utilize Slack, including the `#wtix-testing` and the `#playwright` channels.
 
Collaborate effectively with other teams to ensure the smooth integration and testing of Wondertix.

Once again, welcome to the team, and happy coding! Your contribution is essential in making Wondertix a huge success. 

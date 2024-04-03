## Wondertix Playwright Guide

### Introduction

Playwright is our platform for conducting end-to-end (E2E) testing of the Wondertix website.  Our implementations are written in Typescript.  For the basics of how to install, beginning tutorials, and other setup instructions see the onboarding guide: WonderTix Onboarding Guide for the FW23 Team

### Architecture

There are three primary components to test creation: the page object, test data, and the test scripts.

#### Page Objects

Page objects are located in the e2e/pages folder.  The purpose of a page object is to contain the logic needed for manipulating a web page.  This consists of all the locators needed for testing and the functions needed to interact with them.  
Examples of such functions might include finding a clicking on a specific event in a page.  Another might be to fill out a form with user info.  Depending on the workflow needs, these functions may be aggregated as well.  As another example, mainPage.ts contains separate functions to navigate individual sections to purchase a ticket - these functions would be used for conducting tests within the purchasing workflow.  However, there is also a function that simply executes the entire workflow from finding an event through purchasing a ticket - this is useful for tests that require a ticket to be purchased, but do not need to check any states within the purchase process itself.
In general, whenever some form of user data is required, use Test Data objects.  Even if only one or two members of the object are required, pass the entire object.  Simple string and number parameters should be limited to cases where it does not make sense to include the data inside of a test data object.

#### Test Scripts

The actual test scripts are located in the e2e/tests folder.  Each test acts as a user workflow on the web page.  Utilizing the page object model, these tests rarely interact with a page directly.  Instead, they set up the page objects needed, any test data objects required, and then execute the functions contained by the page objects to execute the intended workflow.
Except for the case of using expect statements, test scripts do not need to access page locators or test data elements directly.  Any missing page functionality should be added to the page object and then called from the test script.
Expect statements may use locators directly, but even these should be from the page object.  This allows for easier maintenance - in the case of an update to the codebase, only the page object would need modification instead of an indeterminate number of tests.  Likewise, expects may need to access members of a test data object as the single source of truth.
While test scripts are generally the correct location for expect statements, it is acceptable to locate them inside of the page object.  Sometimes extra logic is needed to identify a specific locator, or a page is being checked against an entire test data object - in these cases it may make more sense to create a function in the page object that contains the required expects.

#### Test Data Objects

The test data objects are located in e2e/testData.  Wondertix is built on multiple discrete sets of data: events, showings, customers, and more.  Rather than requiring test creators to hardcode such data into their tests, the test data structure allows for the creation of data sets that can then be reused across tests.  Aside from enhancing code reusability, this also allows for implementation of other features such as object randomization - an important feature in allowing parallel testing.
Another intended feature is to create not just valid test data, but ‘bad’ data for checking how the site handles errors.  For example, we can define multiple credit cards that are valid or invalid in various ways to ensure that invalid credit cards do not trigger a successful purchase.
Within the test data folder, there are two main sections.  Inside of the main folder are multiple Typescript files, each corresponding to a particular kind of test data - events, customers, etc.  Inside the supportFunctions folder are helper functions used within the test data implementations.
Inside each Typescript file are at least two sections - more depending on the test data requirements.  The common elements across all data sets are both interfaces and pre-defined const declarations.
Interfaces define the set of data being used.  Each interface describes the purpose of the entire object - for example, the CustomerInfo interface contains data such as a name, address, and various possible order preferences.
The const objects act as pre-defined sets of data that a tester may call.  In simple cases, these objects may be called directly.  However, some kinds of data require a degree of randomization which is where an additional element to each test data file comes into play.
When randomization is needed, the interfaces are also defined into classes.  These classes have a single purpose - the only way to create a class is to pass an already-defined object compatible with the base interface.  When called in this way, the class constructor will append a UUID to the relevant elements, thus ensuring appropriate randomization within the data object.  Because of this, these class objects should always be preferred when they exist.

### Best Practices

#### Filtering locators in templates

Wondertix contains many templates - each event on the main page is generated from a template, the events shown on the administration pages are another template, and so on.  This means the only method of differentiating the related locators in an active environment are by their contents.
One of the easiest ways of doing this is by utilizing locator filters.  By default, referencing a locator returns all possible matches:

```
const someLocator = page.getByTestID('event-card');
// Fetches all locators that contain the test ID 'event-card'
```

Adding a filter narrows down the resulting array:

```
const eventLocator = page.getByTestID('event-card').filter({hasText: ‘Event Name’);
// Fetches all locators that contain the test ID 'event-card', then selects
// the locator that contains ‘Event Name’.
```

Note that even the filtered array may contain multiple locators - the filter must be specific enough to select only one locator.  This is one of the reasons we use randomizing elements in our test data objects, as it makes it easier to perform this kind of filtering.

#### Find a dropdown selection

Dropdowns can be tricky.  If an option value or text is known directly, you can simply select that option.  However, some dropdowns in Wondertix hold data elements not accessible by the test - for example, in some admin pages the event selection includes a show ID that is determined by the database and is otherwise unknown to the test.
The trick is each dropdown option is a locator in its own right.  Nesting locator selections and filters can help identify the desired dropdown when a full text value is unknown:

```
Const allEventOptions = await this.chooseEvent.getByRole('option');
// Fetches all options within the dropdown

Const desiredEventOptions = allEventOptions.filter({hasText: 'Event Name'}); 
// Finds the option with 'Event Name'
```

As with filtering template locators, the filter must be specific enough to identify only one locator.  Once the option is found, it can be used to select the option in the selector locator:

```
eventDropdown.selectOption(desiredEventOptions.textContent());
```

#### Starting a new page object

Beginning a new page object can be intimidating.  It can be tempting to open a page and start reaching for all the locators you can.  Don’t do this!
Instead, begin by recording your intended workflow in Playwright.  Then use the locators in the recorded test for your starting point, only adding more as you discover you need them.
There is one thing to mind when using Playwright’s recorded locators.  The methods Playwright uses are not always ideal.  In particular, watch for cases where it uses the .first() method, and when it selects a locator by text content.  In the first case, if Playwright is looking at a dynamic element of the page (say, a particular event or customer) there is never a guarantee that the first locator will be the desired locator.  The second case may fail for similar reasons - if it’s looking for dynamic content, then the text being searched for may be changed and a static locator may not be the right answer.

#### Timeouts

Some elements in testing may take longer for various reasons due to system bottlenecks, slower code elements, or independent resources.  Other times the test may simply be a longer test.  It may be tempting to simply add timeouts, but timeouts should be used sparingly - tests are re-run multiple times, and each timeout increase has a multiplicative effect on the total test runtime.
Instead, check for problematic code first - if there’s another way to accomplish a piece of logic, try that.  If a locator method truly needs its timeout extended, minimize the extension as much as possible.  If a test itself simply takes too long, consider if the test should be broken down into multiple smaller tests.

#### Integrating test data objects

In general, page objects should be tasked with accessing the contents of a test data object, not the test scripts.  Even if only a single data member is needed, construct page object functions such that they accept entire tests data objects instead of a string parameter or equivalent.  This allows easier reuse of functions - a test writer doesn’t have to determine the correct data member to send, they can just send the entire object and let the page function figure it out.

#### Test data cleanup

While the test object randomization largely eliminates issues with stale data, it is still recommended to clean up leftover test data where possible.  While not possible to do inside of a test with complete reliability, the current pattern is to use a try-finally block.  Declare all needed test data objects early in the function to ensure they’re available inside the function scope, then execute the primary test logic inside of a try block.  After the try block, call all the needed cleanup functions inside of the finally block.  By doing this, even if the test fails it will attempt to clean up after itself.

### Common Issues

#### Stripe

While the `mainPage.ts` should contain the code needed to work with the current Stripe implementation, there are a few issues to note if updates need to be made.
First, Stripe sometimes generates a pop-up after the email address is entered.  Due to the API latency, this popup may occur a few moments into the script and cause issues.  We have discovered the best way to handle this is by waiting for a few seconds after entering the email, checking for the pop-up, then closing it if it exists.
Second, the latency has periodically triggered the locator fill function to focus on the wrong locator.  This may be resolved with a very short wait prior to the fill - no longer than a few hundred milliseconds.
Third, some of the locators - especially the success message - are slow to pop up.  Locators for those may need to have their internal timeouts extended in some environments.  Check the Timeouts best practices for further guidance. 

#### Functions/Expects not working

Don’t forget your parens after a function name.  They’re easy to miss and because it’s legal code will not trigger an error!  Without parens, Typescript fetches a function reference instead of calling the function.  If this happens, the reference simply goes away, and the function is silently skipped.


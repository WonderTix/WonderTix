/*
  Use Playwright to request a page load from a deployed client.
  The URL is passed in as an argument. This is used in our workflows
  to allow containers to fully spin up before receiving public traffic,
  enabling seamless deployment of new revisions to Cloud Run.
*/
const playwright = require('playwright');

(async () => {
  let browser;
  let context;
  try {
    browser = await playwright.chromium.launch({headless: true});
    context = await browser.newContext();
    const page = await browser.newPage();

    const loadPage = async () => {
      try {
        console.log('Attempting to load client...');
        await page.goto(process.argv[2], {
          waitUntil: 'networkidle',
          timeout: 180000 // 3 minutes
        });
        console.log('Client has fully loaded.');
      } catch (e) {
        console.error('Load request timed out.')
      }
    };
    await loadPage();

  } catch (e) {
    console.error('An unexpected error occurred:', e.message);
  } finally {
    if (context) {
      await context.close();
    }
    if (browser) {
      await browser.close();
    }
  }
})();


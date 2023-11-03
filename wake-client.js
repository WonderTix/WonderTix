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
        await page.goto(process.argv[2], { timeout: 5000 });
      } catch (e) {
        console.log('Sent load request. Waiting...');
      }
    };

    const attempts = 5;
    for (let i = 0; i < attempts; i++) {
      await loadPage();
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  } catch (e) {
    console.error('An unexpected error occurred:', e.message);
  } finally {
    if (browser) {
      await context.close();
      await browser.close();
    }
  }
})();


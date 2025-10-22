const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.google.com/',
    specPattern: 'cypress/e2e/**/*.cy.js', // {js,jsx,ts,tsx}
    video: false,
    screenshotOnRunFailure: false,
    chromeWebSecurity: false, // cross-origin iframes 
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    trashAssetsBeforeRuns: true,
    fixturesFolder: 'cypress/fixtures',
    screenshotsFolder: 'cypress/screenshots',
    videosFolder: 'cypress/videos',
    retries: {
      runMode: 0,
      openMode: 0,
    },
    env: {
      NODE_ENV: 'test',
    },

    setupNodeEvents(on, config) {

      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.name === 'chrome' || browser.name === 'edge') {
          launchOptions.args.push('--disable-dev-shm-usage');
          launchOptions.args.push('--window-size=1920,1080');
        }
        return launchOptions;
      });
    },
  },
});


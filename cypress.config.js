const { defineConfig } = require("cypress");
const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib');
const exec = require('child_process').execSync;
const path = require("path")

module.exports = defineConfig({
  viewportWidth: 1920,
  viewportHeight: 1080,
  waitForAnimations: true,
  animationDistanceThreshold: 5,
  defaultCommandTimeout: 40000,
  execTimeout: 40000,
  pageLoadTimeout: 40000,
  requestTimeout: 40000,
  responseTimeout: 40000,
  video: true,
  videosFolder: 'cypress/videos',
  screenshotsFolder: 'cypress/screenshots',
  chromeWebSecurity: false,
  screenshotOnRunFailure: true,
  trashAssetsBeforeRuns: true,
  reporter: 'cypress-multi-reporters',
  reporterOptions: {
    reporterEnabled: "cypress-mochawesome-reporter, mocha-junit-reporter",
    cypressMochawesomeReporterReporterOptions: {
      reportDir: "cypress/reports",
      charts: true,
      reportPageTitle: "Cypress Report",
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false,
    },
    mochaJunitReporterReporterOptions: {
      mochaFile: "cypress/reports/junit/results-[hash].xml"
    },
  },
  retries: {
    runMode: 0,
    openMode: 0,
  },

  e2e: {
    testIsolation: true,
    env: {
      vornameComponentName: `VornameComponent_${Date.now()}`,
      baseUrl: 'https://practicesoftwaretesting.com'
    },
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      on('task', {
        deleteDownloadsFolder() {
          const fs = require('fs-extra');
          const downloadsFolder = 'cypress/downloads';
          fs.emptyDirSync(downloadsFolder);
          return null;
        }
      });
      on('before:run', async (details) => {
        console.log('override before:run');
        await beforeRunHook(details);
        //If you are using other than Windows remove below two lines
        // await exec("IF EXIST cypress\\screenshots rmdir /Q /S cypress\\screenshots")
        // await exec("IF EXIST cypress\\reports rmdir /Q /S cypress\\reports")
      });
      on('after:run', async () => {
        console.log('override after:run');
        //if you are using other than Windows remove below line (having await exec)
        exec("npx jrm ./cypress/reports/junitreport.xml ./cypress/reports/junit/*.xml");
        await afterRunHook();
      });


      on('before:browser:launch', (browser = {}, launchOptions) => {
        console.log('Launching browser: %s. Headless = %s', browser.name, browser.isHeadless);
        const width = 1920;
        const height = 1080;
        console.log('Setting the browser window size to: %d x %d', width, height);

        if (browser.name === 'chrome' && browser.isHeadless) {
          launchOptions.args.push(`--window-size=${width},${height}`);
          launchOptions.args.push('--force-device-scale-factor=1');
        }

        if (browser.name === 'chrome') {
          launchOptions.args.push('--disable-dev-shm-usage');
        }
        return launchOptions;
      });

      function getConfigurationByFile(file) {
        const pathToConfigFile = path.resolve("cypress/configs", `${file}.json`);
        return require(pathToConfigFile);
      }
      const fileName = config.env.configFile || "default";
      return getConfigurationByFile(fileName);
    },
    specPattern: 'cypress/e2e/**/*.cy.js',
    projectId: 'econ-cypress-e2e-test'
  },
});

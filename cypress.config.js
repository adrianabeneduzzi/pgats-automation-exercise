const { defineConfig } = require('cypress');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://www.automationexercise.com',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    video: true,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 60000,
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'cypress/reports',
      charts: true,
      reportPageTitle: 'Relatorio - PGATS Automation Exercise',
      embeddedScreenshots: true,
      inlineAssets: true,
      saveAllAttempts: false
    },
    env: {
      // Optional: set TEST_USER_EMAIL and TEST_USER_PASSWORD in GitHub Actions secrets
      // if you want to use a pre-existing account. The suite creates temporary users by default.
    }
  }
});

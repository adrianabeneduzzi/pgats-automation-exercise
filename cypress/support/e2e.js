import 'cypress-mochawesome-reporter/register';
import './commands';

// The practice site may display third-party ad/analytics errors unrelated to the tests.
Cypress.on('uncaught:exception', (err) => {
  if (/advert|ads|google|gtag|analytics/i.test(err.message)) return false;
  return undefined;
});

import { testSeoFixtures, testFixtures } from './testFixtures';

describe('editor rendering', () => {
  before(function () {
    if (Cypress.env('MATCH_CONTENT_STATE') && !Cypress.env('debug')) this.skip();
  });

  context('seo', () => {
    beforeEach(() => {
      cy.switchToDesktop();
      cy.switchOnSeoMode();
    });

    afterEach(() => {
      cy.switchOffSeoMode();
    });

    testSeoFixtures();
  });

  context('desktop', () => {
    beforeEach(() => {
      cy.switchToDesktop();
    });

    testFixtures();
  });
});

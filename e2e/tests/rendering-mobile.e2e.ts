import { testFixtures } from './testFixtures';

describe('editor rendering', () => {
  before(function () {
    if (Cypress.env('MATCH_CONTENT_STATE') && !Cypress.env('debug')) this.skip();
  });

  context('mobile', () => {
    beforeEach(() => cy.switchToMobile());

    testFixtures({ isMobile: true });
  });
});

import { fixturesToTestOnSeo } from './settings';
import { usePluginsConfig } from '../cypress/testAppConfig';

const testFixtureOnSsr = (fixture: string) =>
  it(`render ${fixture} in ssr`, () => {
    const testAppConfig = {
      ...usePluginsConfig({
        video: {
          exposeButtons: ['video', 'soundCloud', 'youTube'],
        },
      }),
    };
    cy.loadTestAppOnSsr('ricos', fixture, testAppConfig);
    cy.percySnapshot();
  });

describe('editor rendering', () => {
  before(function () {
    if (Cypress.env('MATCH_CONTENT_STATE') && !Cypress.env('debug')) this.skip();
  });

  context('seoSSR', () => {
    beforeEach(() => {
      cy.switchToDesktop();
      cy.switchOnSeoMode();
    });

    fixturesToTestOnSeo.forEach(testFixtureOnSsr);
  });
});

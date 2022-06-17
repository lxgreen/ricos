import type { Fixture, FixtureConfig } from './settings';
import { fixturesToTestOnSeo, fixtures, DEFAULT_MOBILE_WIDTHS } from './settings';

const testFixture = (fixture: Fixture, opts: { isMobile?: boolean; sufix?: string } = {}) => {
  const { isMobile = false, sufix = '' } = opts;
  const fixtureConfig: FixtureConfig = typeof fixture === 'string' ? { fixture } : fixture;
  const { fixture: fixtureName, config, additionalCommands, label } = fixtureConfig;
  const name = label || fixtureName;
  it(`render ${name}`, function () {
    cy.loadRicosEditorAndViewer(fixtureName, config).focusEditor();
    cy.wait(200).setEditorSelection(0, 0).wait(200);
    if (additionalCommands) {
      additionalCommands(cy);
    }
    cy.percySnapshot(
      `${this.test.title} - ${isMobile ? 'mobile' : 'desktop'}${sufix ? ` [${sufix}]` : ''}`,
      isMobile ? DEFAULT_MOBILE_WIDTHS : {}
    );
  });
};

export const testFixtures = (opts: { isMobile?: boolean } = {}) => {
  const { isMobile = false } = opts;
  fixtures.forEach(fixture => testFixture(fixture, { isMobile }));
};
export const testSeoFixtures = () =>
  fixturesToTestOnSeo.forEach(fixture => testFixture(fixture, { sufix: 'seo' }));

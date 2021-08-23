import { fixturesToTestOnSeo, fixtures, Fixture, FixtureConfig } from './settings';

const testFixture = (fixture: Fixture) => {
  const fixtureConfig: FixtureConfig = typeof fixture === 'string' ? { fixture } : fixture;
  const { fixture: fixtureName, config, additionalCommands } = fixtureConfig;
  it(`render ${fixtureName}`, function() {
    cy.loadRicosEditorAndViewer(fixtureName, config);
    if (additionalCommands) {
      additionalCommands(cy);
    }
    cy.eyesCheckWindow(this.test.title);
  });
};

export const testFixtures = () => fixtures.forEach(testFixture);
export const testSeoFixtures = () => fixturesToTestOnSeo.forEach(testFixture);

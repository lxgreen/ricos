import fixturesNames from './fixtures/preview';

describe('preview', () => {
  beforeEach(() => cy.switchToDesktop());

  afterEach(() => cy.matchContentSnapshot());

  describe('desktop', () => {
    fixturesNames.forEach((name, index) => {
      if (index !== 8) {
        it(name, () => {
          cy.loadRicosEditorAndViewer(`preview/example${index + 1}`, { showDefaultPreview: true });
          cy.wait(5000);
          cy.percySnapshot();
        });
      }
    });
  });
});

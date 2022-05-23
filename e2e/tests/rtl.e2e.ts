import { getFooterToolbarConfig } from '../cypress/testAppConfig';
import { PLUGIN_COMPONENT, ACTION_BUTTONS } from '../cypress/dataHooks';
import { DEFAULT_MOBILE_WIDTHS } from './settings';
describe('rtl', () => {
  beforeEach(() => cy.switchToHebrew());

  afterEach(() => cy.matchContentSnapshot());

  context('desktop', () => {
    beforeEach(() => cy.switchToDesktop());

    it('render plugin shortcut with search in rtl', () => {
      cy.loadRicosEditorAndViewer(
        'newLines',
        getFooterToolbarConfig({ morePluginsMenu: { showSearch: true } })
      )
        .focusEditor()
        .openFooterPluginMenu();
      cy.percySnapshot();
    });

    it('render plugin toolbar in rtl', () => {
      cy.loadRicosEditorAndViewer().focusEditor().openSideToolbar();
      cy.percySnapshot();
    });

    it('render text toolbar in rtl', () => {
      cy.loadRicosEditorAndViewer('plain')
        .setEditorSelection(0, 8)
        .get('[data-hook=inlineToolbar]')
        .should('be.visible')
        .get('[data-hook=addPluginFloatingToolbar]')
        .should('be.visible');
      cy.percySnapshot();
    });

    it('render rtl and ltr text correctly', () => {
      cy.loadRicosEditorAndViewer('hebrew');
      cy.percySnapshot();
    });

    it('render external modal in rtl', () => {
      cy.loadRicosEditorAndViewer('images')
        .openPluginToolbar(PLUGIN_COMPONENT.IMAGE)
        .openSettings()
        .get('[data-hook="imageSettingsCaptionInput"]')
        .blur();
      cy.percySnapshot();
    });

    it('render text with indentation in rtl', () => {
      cy.loadRicosEditorAndViewer('hebrew_with_indentation');
      cy.percySnapshot();
    });
  });

  context('mobile', () => {
    beforeEach(() => cy.switchToMobile());

    it('render add plugin modal in rtl', function () {
      cy.loadRicosEditorAndViewer().focusEditor().openAddPluginModal();
      cy.wait(200);
      cy.percySnapshot(this.test.title, DEFAULT_MOBILE_WIDTHS);
    });

    it('render rtl and ltr text correctly', () => {
      cy.loadRicosEditorAndViewer('hebrew');
      cy.percySnapshot();
    });

    it('render external modal in rtl', function () {
      cy.loadRicosEditorAndViewer('images')
        .openPluginToolbar(PLUGIN_COMPONENT.IMAGE)
        .openSettings()
        .get(`[data-hook=${ACTION_BUTTONS.SAVE}]`)
        .blur();
      cy.percySnapshot(this.test.title, DEFAULT_MOBILE_WIDTHS);
    });

    it('render text with indentation in rtl', function () {
      cy.loadRicosEditorAndViewer('hebrew_with_indentation');
      cy.percySnapshot(this.test.title, DEFAULT_MOBILE_WIDTHS);
    });
  });
});

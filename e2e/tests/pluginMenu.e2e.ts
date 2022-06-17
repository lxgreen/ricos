import { getPluginMenuConfig, getFooterToolbarConfig, plugins } from '../cypress/testAppConfig';
import { STATIC_TOOLBAR_BUTTONS } from '../cypress/dataHooks';
import type { TestAppConfig } from '../../examples/main/src/types';

const pluginMenuRenderer = (title: string, config?: TestAppConfig) => {
  cy.loadRicosEditorAndViewer('newLines', config).focusEditor().openSideToolbar();
  cy.percySnapshot(title);
};

const footerPluginMenuRenderer = (title: string, config?: TestAppConfig) => {
  cy.loadRicosEditorAndViewer('newLines', config).focusEditor().openFooterPluginMenu();
  cy.percySnapshot(title);
};

describe('plugin menu test', () => {
  context('plugin menu', () => {
    it('should render horizontal plugin menu', function () {
      pluginMenuRenderer(this.test.title);
    });
    it('should render plugin menu', function () {
      pluginMenuRenderer(this.test.title, getPluginMenuConfig());
    });
    it('should render plugin menu with search', function () {
      pluginMenuRenderer(this.test.title, getPluginMenuConfig({ showSearch: true }));
    });
    it('should render plugin menu with sections', function () {
      pluginMenuRenderer(this.test.title, getPluginMenuConfig({ splitToSections: true }));
    });
    it('should render plugin menu with sections & search', function () {
      pluginMenuRenderer(
        this.test.title,
        getPluginMenuConfig({ splitToSections: true, showSearch: true })
      );
    });
  });
  context('footer toolbar', () => {
    it('should render shortcut menu', function () {
      footerPluginMenuRenderer(this.test.title, getFooterToolbarConfig({ morePluginsMenu: {} }));
    });
    it('should render plugin shortcut with search', function () {
      footerPluginMenuRenderer(
        this.test.title,
        getFooterToolbarConfig({ morePluginsMenu: { showSearch: true } })
      );
    });
    it('should render shortcut menu with sections', function () {
      footerPluginMenuRenderer(
        this.test.title,
        getFooterToolbarConfig({ morePluginsMenu: { splitToSections: true } })
      );
    });
    it('should filter out shortcut plugins from more menu', function () {
      footerPluginMenuRenderer(
        this.test.title,
        getFooterToolbarConfig({
          pluginsToDisplayInToolbar: [
            'wix-draft-plugin-divider',
            'wix-draft-plugin-image',
            'wix-draft-plugin-html',
            'wix-draft-plugin-map',
            'wix-draft-plugin-gallery',
          ],
          morePluginsMenu: {},
        })
      );
    });
  });

  context('side menu modals', () => {
    beforeEach('load editor', () => {
      const config = {
        plugins: [plugins.emoji, plugins.giphy],
      };
      cy.loadRicosEditorAndViewer('newLines', config);
    });

    it('open emoji modal from side menu', () => {
      cy.focusEditor().openSideToolbar().clickOnPluginMenuButton(STATIC_TOOLBAR_BUTTONS.EMOJI);
      cy.percySnapshot();
    });
  });
});

import { useTheming, getPluginMenuConfig, usePlugins, plugins } from '../cypress/testAppConfig';
import { DEFAULT_MOBILE_WIDTHS } from './settings';

function testFlow(title: string) {
  cy.setEditorSelection(111, 7);
  cy.wait(200);
  cy.percySnapshot(title + ' (formatting selection)');

  cy.setEditorSelection(171, 14);
  cy.wait(200);
  cy.percySnapshot(title + ' (link selection)');
}

const snapshot = (title, isDesktop) => {
  cy.wait(2000);
  cy.percySnapshot(
    `${title}  - ${isDesktop ? 'desktop' : 'mobile'}`,
    isDesktop ? {} : DEFAULT_MOBILE_WIDTHS
  );
  isDesktop && testFlow(title);
};

function tests({ isDesktop }: { isDesktop?: boolean }) {
  it('no palette, no cssOverride', function () {
    cy.loadRicosEditorAndViewer('storybook-example-app', {
      ...useTheming({ skipCssOverride: true }),
      ...usePlugins(plugins.all),
      ...getPluginMenuConfig(),
    }).focusEditor();
    snapshot(this.test.title, isDesktop);
  });

  it('no palette, cssOverride', function () {
    cy.loadRicosEditorAndViewer('storybook-example-app', usePlugins(plugins.all)).focusEditor();
    snapshot(this.test.title, isDesktop);
  });

  it('palette, no cssOverride', function () {
    cy.loadRicosEditorAndViewer('storybook-example-app', {
      ...usePlugins(plugins.all),
      ...useTheming({
        skipCssOverride: true,
        paletteType: 'light',
      }),
    }).focusEditor();
    snapshot(this.test.title, isDesktop);
  });

  it('palette, cssOverride', function () {
    cy.loadRicosEditorAndViewer('storybook-example-app', {
      ...usePlugins(plugins.all),
      ...useTheming({ paletteType: 'light' }),
    }).focusEditor();
    snapshot(this.test.title, isDesktop);
  });

  it('dark palette, no cssOverride', function () {
    cy.loadRicosEditorAndViewer('storybook-example-app', {
      ...usePlugins(plugins.all),
      ...useTheming({
        skipCssOverride: true,
        paletteType: 'dark',
      }),
    }).focusEditor();
    snapshot(this.test.title, isDesktop);
  });

  it('dark palette, no cssOverride, no container', function () {
    cy.loadRicosEditorAndViewer('storybook-example-app', {
      ...usePlugins(plugins.all),
      ...useTheming({
        skipCssOverride: true,
        paletteType: 'dark',
        disableContainer: true,
      }),
    }).focusEditor();
    snapshot(this.test.title, isDesktop);
  });

  it('dark palette, no cssOverride, no container, contentBgColor', function () {
    cy.loadRicosEditorAndViewer('storybook-example-app', {
      ...usePlugins(plugins.all),
      ...useTheming({
        skipCssOverride: true,
        paletteType: 'dark',
        disableContainer: true,
        contentBgColor: true,
      }),
    }).focusEditor();
    snapshot(this.test.title, isDesktop);
  });

  it('dark palette, cssOverride', function () {
    cy.loadRicosEditorAndViewer('storybook-example-app', {
      ...usePlugins(plugins.all),
      ...useTheming({ paletteType: 'dark' }),
    }).focusEditor();
    snapshot(this.test.title, isDesktop);
  });

  it('dark palette, no cssOverride, fallbackColor=red', function () {
    cy.loadRicosEditorAndViewer('storybook-example-app', {
      ...usePlugins(plugins.all),
      ...useTheming({ paletteType: 'dark', skipCssOverride: true, fallbackColor: '%23FF0000' }),
    }).focusEditor();
    snapshot(this.test.title, isDesktop);
  });

  it('dark palette, no cssOverride, settingsActionColor=blue', function () {
    cy.loadRicosEditorAndViewer('storybook-example-app', {
      ...usePlugins(plugins.all),
      ...useTheming({
        paletteType: 'dark',
        skipCssOverride: true,
        settingsActionColor: '%233899EC',
        focusActionColor: '%233899EC',
      }),
    }).focusEditor();
    snapshot(this.test.title, isDesktop);
  });

  it('customStyles', function () {
    cy.loadRicosEditorAndViewer('storybook-example-app', {
      ...usePlugins(plugins.all),
      ...useTheming({ useCustomStyles: true, skipCssOverride: true }),
    }).focusEditor();
    snapshot(this.test.title, isDesktop);
  });
}

describe('Theming', () => {
  afterEach(() => cy.matchContentSnapshot());

  context('desktop', () => {
    beforeEach(() => cy.switchToDesktop());

    tests({ isDesktop: true });
  });

  context('mobile', () => {
    beforeEach(() => cy.switchToMobile());

    tests({});
  });
});

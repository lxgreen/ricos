import {
  PLUGIN_COMPONENT,
  PLUGIN_TOOLBAR_BUTTONS,
  GALLERY_SETTINGS,
  GALLERY_IMAGE_SETTINGS,
  GIPHY_PLUGIN,
  IMAGE_SETTINGS,
  VIDEO_SETTINGS,
  AUDIO_PLUGIN,
  ACTION_BUTTONS,
  STATIC_TOOLBAR_BUTTONS,
} from '../cypress/dataHooks';
import { usePlugins, plugins, usePluginsConfig, useExperiments } from '../cypress/testAppConfig';
import { DEFAULT_MOBILE_WIDTHS } from './settings';

describe('plugins', () => {
  afterEach(() => cy.matchContentSnapshot());

  context('viewerToolbar', () => {
    before(() => {
      cy.on('window:before:load', win => {
        cy.stub(win, 'open').as('windowOpen');
      });
    });

    const shouldHaveOpenedTwitter = () => {
      const text =
        // eslint-disable-next-line max-len
        'text=%E2%80%9Crunway%20heading%20towards%20a%20streamlined%20cloud%20solution.%20%20User%E2%80%A6%E2%80%9C%E2%80%94';
      // TODO: fix test, it is not running the checks
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore: function should not be passed as argument but to `then` chained function
      cy.url(url => {
        const originUrl = 'url=' + encodeURI(url.toString());
        const twitterUrl = `https://twitter.com/intent/tweet?${text}&${originUrl}`;
        cy.get('@windowOpen').should('be.calledWith', twitterUrl);
      });
    };

    it('render viewer toolbar and tweet', () => {
      cy.loadRicosEditorAndViewer('nested-lists');
      cy.getViewer().trigger('mouseover');
      cy.setViewerSelection(476, 98);
      cy.getTwitterButton().should('be.visible');
      cy.percySnapshot();
      cy.getTwitterButton().click();
      shouldHaveOpenedTwitter();
    });
  });

  context('image', () => {
    beforeEach('load editor', () => {
      cy.switchToDesktop();
    });

    it('render image toolbar and settings', function () {
      cy.loadRicosEditor('images');
      cy.openPluginToolbar(PLUGIN_COMPONENT.IMAGE);
      cy.openSettings();
      cy.percySnapshot(this.test.title + ' - settings');
      cy.addImageTitle();
      cy.percySnapshot(this.test.title + ' - add image title');
      cy.editImageTitle();
      cy.percySnapshot(this.test.title + ' - in plugin editing');
      cy.openSettings().deleteImageTitle();
      cy.percySnapshot(this.test.title + ' - delete image title');
      cy.addImageLink();
      cy.percySnapshot(this.test.title + ' - add a link');
      cy.openPluginToolbar(PLUGIN_COMPONENT.IMAGE).pluginSizeOriginal();
      cy.percySnapshot(this.test.title + '  - plugin original size');
      cy.openPluginToolbar(PLUGIN_COMPONENT.IMAGE).shrinkPlugin(PLUGIN_COMPONENT.IMAGE);
      cy.percySnapshot(this.test.title + '  - plugin toolbar');
      cy.openPluginToolbar(PLUGIN_COMPONENT.IMAGE).pluginSizeBestFit();
      cy.percySnapshot(this.test.title + '  - plugin content size');
      cy.openPluginToolbar(PLUGIN_COMPONENT.IMAGE).pluginSizeFullWidth();
      cy.percySnapshot(this.test.title + '  - plugin full width size');
    });

    it('render image with link', () => {
      cy.loadRicosEditorAndViewer('image-with-link');
      cy.getImageLink();
    });

    it('render image with loader - loading in component data', () => {
      cy.loadRicosEditorAndViewer('image-with-loader-percent');
      cy.get(`[data-hook=loader]`).should('to.be.visible');
    });

    it('should disable image expand', function () {
      cy.loadRicosEditorAndViewer('images');
      cy.openPluginToolbar(PLUGIN_COMPONENT.IMAGE);
      cy.openSettings();
      cy.percySnapshot(this.test.title + ' - settings open');
      cy.get(`[data-hook=${IMAGE_SETTINGS.IMAGE_EXPAND_TOGGLE}]`).click();
      cy.wait(200);
      cy.percySnapshot(this.test.title + ' - expand click');
      cy.get(`[data-hook=${ACTION_BUTTONS.SAVE}]`).click();
      cy.wait(200);
      cy.get(`[data-hook=${PLUGIN_COMPONENT.IMAGE}]`).eq(2).parent().click();
      cy.percySnapshot(this.test.title + ' - final');
    });
  });

  context('full screen', () => {
    beforeEach('load editor', () => cy.switchToDesktop());

    context('image full screen', () => {
      beforeEach('load editor', () => cy.loadRicosEditorAndViewer('images'));

      it('expand image on full screen', () => {
        cy.get(`[data-hook=${PLUGIN_COMPONENT.IMAGE}]:last`).parent().click();
        cy.loadOutOfViewImagesInGallery();
        cy.waitForGalleryImagesToLoad();
        cy.percySnapshot();
      });
    });

    context('image full screen in hebrew', () => {
      beforeEach('load editor', () => {
        cy.switchToHebrew();
        cy.loadRicosEditorAndViewer('images');
      });

      afterEach(() => {
        cy.switchToEnglish();
      });

      it('expand image on full screen in hebrew', () => {
        cy.get(`[data-hook=${PLUGIN_COMPONENT.IMAGE}]:last`).parent().click();
        cy.loadOutOfViewImagesInGallery();
        cy.waitForGalleryImagesToLoad();
        cy.percySnapshot();
      });
    });

    context('innerRCE images full screen', () => {
      beforeEach('load editor', () =>
        cy.loadRicosEditorAndViewer('inner-rce-images', usePlugins(plugins.all))
      );

      it('expand inner-rce images on full screen', () => {
        cy.get(`[data-hook=${PLUGIN_COMPONENT.IMAGE}]`).eq(2).parent().click();
        cy.loadOutOfViewImagesInGallery();
        cy.waitForGalleryImagesToLoad();
        cy.get('img[data-idx="0"]', {
          timeout: 10000,
        }).should('be.visible');
        cy.percySnapshot();
        cy.get('[data-hook=nav-arrow-next]').click({ force: true });

        cy.get('[data-hook=nav-arrow-back]').should('be.visible');
        cy.get('img[data-idx="1"]', {
          timeout: 10000,
        }).should('be.visible');
      });
    });

    context('gallery full screen', () => {
      beforeEach('load editor', () =>
        cy.loadRicosEditorAndViewer('gallery').waitForGalleryImagesToLoad()
      );

      it('expand gallery image on full screen', () => {
        cy.get('[data-hook=ricos-viewer] [data-hook=item-wrapper]', {
          timeout: 10000,
        })
          .eq(1)
          .click({ force: true });
        cy.get('[data-hook=fullscreen-root] [data-hook=image-item]', {
          timeout: 10000,
        }).should('be.visible');
        // cy.percySnapshot({
        //   tag: 'gallery fullscreen open on second image',
        //   target: 'window',
        //   fully: false,
        // });
        cy.get(`[data-hook=${'nav-arrow-back'}]`).click({ force: true });
        cy.get('[data-hook=fullscreen-root] [data-hook=image-item]', {
          timeout: 10000,
        }).should('be.visible');
        // cy.percySnapshot({
        //   tag: 'gallery fullscreen previous image',
        //   target: 'window',
        //   fully: false,
        // });
        cy.get(`[data-hook=${'fullscreen-close-button'}]`).click();
      });
    });
  });

  context('gallery', () => {
    beforeEach('load editor', () => {
      cy.switchToDesktop();
    });

    it('render gallery plugin', function () {
      cy.loadRicosEditorAndViewer('gallery').waitForGalleryImagesToLoad();
      cy.openPluginToolbar(PLUGIN_COMPONENT.GALLERY).shrinkPlugin(PLUGIN_COMPONENT.GALLERY);
      cy.waitForDocumentMutations();
      cy.percySnapshot(this.test.title + ' toolbar');
      cy.openGalleryAdvancedSettings();
      cy.loadOutOfViewImagesInGallery();
      cy.waitForGalleryImagesToLoad();
      cy.percySnapshot(this.test.title + ' settings');
    });

    it('render gallery out of view', function () {
      cy.loadRicosEditorAndViewer('gallery-out-of-view');
      cy.get(`[data-hook=${PLUGIN_COMPONENT.GALLERY}]`).eq(3);
      cy.scrollTo('bottom');
      cy.waitForDocumentMutations();
      cy.percySnapshot(`${this.test.title} - in view`);
    });

    context('organize media', () => {
      it('allow to manipulate the media items', function () {
        const firstImage = `[data-hook=${GALLERY_SETTINGS.IMAGE}]:first`;
        // const anyImage = `[data-hook=${GALLERY_SETTINGS.IMAGE}]`;
        cy.loadRicosEditorAndViewer('gallery')
          .openPluginToolbar(PLUGIN_COMPONENT.GALLERY)
          .shrinkPlugin(PLUGIN_COMPONENT.GALLERY)
          .waitForGalleryImagesToLoad()
          .openGalleryAdvancedSettings()
          .openGallerySettings()
          .waitForGalleryImagesToLoad();
        cy.percySnapshot(this.test.parent.title + ' - render settings');
        cy.get(firstImage).click();
        cy.get(`[data-hook=${GALLERY_SETTINGS.DELETE}]`);
        cy.waitForGalleryImagesToLoad();
        cy.percySnapshot(this.test.parent.title + ' - select an item');
        cy.get(`[data-hook=${GALLERY_SETTINGS.SELECT_ALL}]`).click();
        cy.waitForGalleryImagesToLoad();
        cy.percySnapshot(this.test.parent.title + ' - select all items');
        cy.get(`[data-hook=${GALLERY_SETTINGS.DESELECT}]`).click();
        cy.waitForGalleryImagesToLoad();
        cy.percySnapshot(this.test.parent.title + ' - deselect items');
        // TODO: stabalize reordering tests
        // cy.dragAndDrop(firstImage, anyImage, 1);
        // cy.get(firstImage);
        // cy.waitForGalleryImagesToLoad();
        // cy.percySnapshot(this.test.parent.title + ' - reorder images');
        cy.get(firstImage).click();
        cy.get(`[data-hook=${GALLERY_SETTINGS.DELETE}]`).click();
        cy.get(firstImage);
        cy.waitForGalleryImagesToLoad();
        cy.percySnapshot(this.test.parent.title + ' - delete an item');
        cy.get(`[data-hook=${GALLERY_SETTINGS.SELECT_ALL}]`).click();
        cy.get(`[data-hook=${GALLERY_SETTINGS.DELETE}]`).click();
        cy.waitForGalleryImagesToLoad();
        cy.percySnapshot(this.test.parent.title + ' - delete all items');
      });
    });

    context('media settings', () => {
      it('allow to update media content', function () {
        cy.loadRicosEditorAndViewer('gallery')
          .openPluginToolbar(PLUGIN_COMPONENT.GALLERY)
          .shrinkPlugin(PLUGIN_COMPONENT.GALLERY)
          .waitForGalleryImagesToLoad()
          .openGalleryAdvancedSettings()
          .openGallerySettings()
          .openGalleryImageSettings()
          .get(`[data-hook=${GALLERY_IMAGE_SETTINGS.PREVIEW}]:first`);
        cy.percySnapshot(this.test.parent.title + ' - render item settings');
        cy.get(`[data-hook=${GALLERY_IMAGE_SETTINGS.TITLE}]`).type('Amazing Title');
        cy.get(`[data-hook=${GALLERY_IMAGE_SETTINGS.LINK}]`).type('Stunning.com');
        cy.get(`[data-hook=${GALLERY_IMAGE_SETTINGS.LINK_NOFOLLOW}]`).click();
        cy.waitForGalleryImagesToLoad();
        cy.percySnapshot(this.test.parent.title + ' - enter image settings');
        cy.get(`[data-hook=${GALLERY_IMAGE_SETTINGS.DONE}]:first`).click();
        cy.openGalleryImageSettings();
        cy.waitForGalleryImagesToLoad();
        cy.percySnapshot(this.test.parent.title + ' - settings saved & title shows on image ');
        cy.get(`[data-hook=${GALLERY_IMAGE_SETTINGS.DELETE}]`).click({ force: true });
        cy.get(`[data-hook=${GALLERY_IMAGE_SETTINGS.PREVIEW}]:first`);
        cy.waitForGalleryImagesToLoad();
        cy.percySnapshot(this.test.parent.title + ' - delete a media item');
        cy.get(`[data-hook=${GALLERY_IMAGE_SETTINGS.DELETE}]`).click({ force: true });
        cy.get(`[data-hook=${GALLERY_SETTINGS.UPLOAD}]`);
        cy.waitForGalleryImagesToLoad();
        cy.percySnapshot(this.test.parent.title + ' - delete all items');
      });

      // TODO: title and link image tests
      // // eslint-disable-next-line mocha/no-skipped-tests
      // it.skip('allow to add a title', function() {
      //   cy.addGalleryImageTitle().checkTitle();
      //   cy.percySnapshot(this.test.parent.title + ' - ' + this.test.title);
      // });
    });

    context('settings', () => {
      it('should render all tabs', function () {
        cy.loadRicosEditorAndViewer('gallery')
          .openPluginToolbar(PLUGIN_COMPONENT.GALLERY)
          .openGalleryAdvancedSettings();
        cy.percySnapshot(this.test.parent.title + ' - render settings tab');
        cy.get(`[data-hook=advanced_settings_Tab]:first`).click();
        cy.percySnapshot(this.test.parent.title + ' - render layout tab');
        cy.get(`[data-hook=manage_media_Tab]:first`).click();
        cy.percySnapshot(this.test.parent.title + ' - render manage media tab');
      });

      it('should disable gallery expand', function () {
        cy.loadRicosEditorAndViewer('gallery');
        cy.openPluginToolbar(PLUGIN_COMPONENT.GALLERY);
        cy.openSettings('ADV_SETTINGS');
        // cy.percySnapshot(this.test.title + ' - settings');
        cy.get(`[data-hook=${GALLERY_SETTINGS.GALLERY_EXPAND_TOGGLE}]`).click();
        cy.wait(200);
        // cy.percySnapshot(this.test.title + ' - after disable expend mode setting');
        cy.get(`[data-hook=${ACTION_BUTTONS.SAVE}]`).click();
        cy.wait(200);
        cy.get(`[data-hook=${PLUGIN_COMPONENT.GALLERY}]`).eq(1).parent().click();
        cy.percySnapshot(this.test.parent.title + ' - after click');
      });
    });
  });

  context('video', () => {
    beforeEach('load editor', () => {
      cy.switchToDesktop();
      cy.loadRicosEditorAndViewer('empty');
    });

    it('render upload modal', () => {
      cy.openVideoUploadModal();
      cy.percySnapshot();
    });

    it('add a video from URL', () => {
      cy.openVideoUploadModal().addVideoFromURL();
      cy.openPluginToolbar(PLUGIN_COMPONENT.VIDEO).shrinkPlugin(PLUGIN_COMPONENT.VIDEO);
      cy.focusEditor()
        .type('{uparrow}') //try to fix bug where sometimes it doesn't type
        .type('{uparrow}')
        .type('Will this fix the flakiness?');
      cy.waitForMediaToLoad();
      cy.percySnapshot();
    });

    it('add a custom video', () => {
      cy.openVideoUploadModal().addCustomVideo();
      cy.openPluginToolbar(PLUGIN_COMPONENT.VIDEO).shrinkPlugin(PLUGIN_COMPONENT.VIDEO);
      cy.focusEditor()
        .type('{uparrow}') //try to fix bug where sometimes it doesn't type
        .type('{uparrow}')
        .type('Will this fix the flakiness?');
      cy.waitForMediaToLoad();
      cy.percySnapshot();
    });

    it('should toggle download option', () => {
      cy.loadRicosEditorAndViewer('video');
      cy.openPluginToolbar(PLUGIN_COMPONENT.VIDEO);
      cy.openSettings();
      cy.wait(500);
      cy.percySnapshot('video setting open');
      cy.get(`[data-hook=${VIDEO_SETTINGS.DOWNLOAD_TOGGLE}]`).click();
      cy.percySnapshot('video setting - toggle download');
      cy.get(`[data-hook=${ACTION_BUTTONS.SAVE}]`).click();
    });
  });

  context('youTube', () => {
    const testAppConfig = {
      ...usePlugins(plugins.video),
      ...usePluginsConfig({
        video: {
          exposeButtons: ['video', 'soundCloud', 'youTube'],
        },
      }),
    };
    beforeEach('load editor', () => {
      cy.switchToDesktop();
      cy.loadRicosEditorAndViewer('empty', testAppConfig);
    });

    it(`open youTube modal`, () => {
      cy.openEmbedModal(STATIC_TOOLBAR_BUTTONS.YOUTUBE);
      cy.percySnapshot();
    });
  });

  context('giphy', () => {
    beforeEach('load editor', () => {
      cy.switchToDesktop();
    });

    it('render giphy plugin toolbar', () => {
      cy.loadRicosEditorAndViewer('giphy');
      cy.openPluginToolbar(PLUGIN_COMPONENT.GIPHY).clickToolbarButton(
        PLUGIN_TOOLBAR_BUTTONS.SMALL_CENTER
      );
      cy.get(`button[data-hook=${PLUGIN_TOOLBAR_BUTTONS.REPLACE}][tabindex=0]`).click();
      cy.get(`[data-hook=${GIPHY_PLUGIN.UPLOAD_MODAL}] img`);
      cy.percySnapshot();
    });
  });

  context('emoji', () => {
    beforeEach('load editor', () => {
      cy.switchToDesktop();
    });

    // it('render some emojies', function() {
    //   cy.loadRicosEditorAndViewer('empty');
    //   cy.get(`button[data-hook=${PLUGIN_COMPONENT.EMOJI}]`).click();
    //   cy.percySnapshot('render emoji modal');
    //   cy.get(`[data-hook=emoji-5]`).click();
    //   cy.get(`[data-hook=emoji-group-5]`).click();
    //   cy.get(`[data-hook=emoji-95]`).click();
    //   cy.get(`[data-hook=emoji-121]`).click();
    //   cy.percySnapshot();
    // });
  });

  context('audio', () => {
    const testAppConfig = {
      ...usePlugins(plugins.audio),
      ...usePluginsConfig({
        audio: {
          exposeButtons: ['audio', 'soundCloud', 'spotify'],
        },
      }),
    };

    beforeEach('load editor', () => {
      cy.switchToDesktop();
      cy.loadRicosEditorAndViewer('empty', testAppConfig);
    });

    it('should render custom audio modals', () => {
      cy.clickOnStaticButton(STATIC_TOOLBAR_BUTTONS.AUDIO);
      cy.percySnapshot('should render upload tab section');
      cy.get(`[data-hook=Embed_Tab]`).click();
      cy.percySnapshot('should render embed section after embed click');
    });

    it('should render audio player', () => {
      cy.clickOnStaticButton(STATIC_TOOLBAR_BUTTONS.AUDIO);
      cy.get(`[data-hook=${AUDIO_PLUGIN.CUSTOM}]`).click().waitForMediaToLoad();
      cy.percySnapshot('should render custom audio player');
      cy.get(`button[data-hook=${PLUGIN_TOOLBAR_BUTTONS.REPLACE}]`).click();
      cy.get(`[data-hook=Embed_Tab]`).click();
      cy.get(`[data-hook=${AUDIO_PLUGIN.INPUT}]`).clear().type('spotify.com');
      cy.get(`[data-hook=${ACTION_BUTTONS.SAVE}]`).click();
      cy.get('iframe').should('be.visible');
    });

    it('should render audio settings', () => {
      cy.loadRicosEditorAndViewer('audio', testAppConfig);
      cy.openPluginToolbar(PLUGIN_COMPONENT.AUDIO);
      cy.clickToolbarButton(PLUGIN_TOOLBAR_BUTTONS.SETTINGS);
      cy.get(`[data-hook=audioSettings]`);
      cy.percySnapshot('should render audio settings');
      cy.get(`[data-hook=audioSettingsAudioNameInput]`).clear();
      cy.get(`[data-hook=audioSettingsAuthorNameInput]`).clear();
      cy.percySnapshot('should render settings with empty inputs');
      // eslint-disable-next-line cypress/no-unnecessary-waiting
      cy.get(`[data-hook=file-input-label]`).click().wait(300);
      cy.percySnapshot('should render settings with cover image');
      cy.get(`[data-hook=AudioDownloadToggle]`).click();
      cy.percySnapshot('should enable audio download');
      cy.get(`[data-hook=${ACTION_BUTTONS.SAVE}]`).click();
      cy.get(`[data-hook=audioContextMenu]`).eq(1).click();
      cy.get(`[data-hook=audioDownloadIcon]`).should('be.visible');
      cy.percySnapshot('should render audio with enabled download options');
    });
  });
});

describe('New Url Input modals', () => {
  context('render new url input modals on desktop', () => {
    const testAppConfig = {
      plugins: [plugins.linkPreview, plugins.video, plugins.verticalEmbed],
      ...useExperiments({
        newVideoVerticalAndSocialModals: { namespace: 'ricos', value: 'true', enabled: true },
      }),
    };

    beforeEach('load editor', () => {
      cy.switchToDesktop();
      cy.loadRicosEditorAndViewer('empty', testAppConfig);
    });

    it('should render new video modals', () => {
      cy.openVideoUploadModal();
      cy.percySnapshot('should render embed section');
      cy.get(`[data-hook=Upload_Tab]`).click();
      cy.percySnapshot('should render upload section after upload click');
    });

    it(`should render new social embed modals`, () => {
      cy.openEmbedModal(STATIC_TOOLBAR_BUTTONS.INSTAGRAM);
      cy.percySnapshot('should render instagram modal');
    });

    it('should render new vertical embed modals', () => {
      cy.openEmbedModal(STATIC_TOOLBAR_BUTTONS.EVENT);
      cy.percySnapshot('should render events vertical modal');
    });
  });

  context('render new url input modals on mobile', () => {
    const testAppConfig = {
      plugins: [plugins.linkPreview, plugins.video, plugins.verticalEmbed],
      ...useExperiments({
        newVideoVerticalAndSocialModals: { namespace: 'ricos', value: 'true', enabled: true },
      }),
    };

    beforeEach('load editor', () => {
      cy.switchToMobile();
      cy.loadRicosEditorAndViewer('empty', testAppConfig);
    });

    it('should render new video modals on mobile', () => {
      cy.openAddPluginModal();
      cy.wait(500);
      cy.get(`[data-hook=VideoPlugin_InsertButton]`).click();
      cy.percySnapshot('should render mobile embed section', DEFAULT_MOBILE_WIDTHS);
      cy.get(`[data-hook=Upload_Tab]`).click();
      cy.percySnapshot('should render mobile upload section', DEFAULT_MOBILE_WIDTHS);
    });

    it('should render new vertical embed modals on mobile', () => {
      cy.openAddPluginModal();
      cy.wait(500);
      cy.get(`[data-hook=Events_InsertButton]`)
        .click()
        .percySnapshot('should render events vertical mobile modal', DEFAULT_MOBILE_WIDTHS);
    });

    it('should render new social embed modals on mobile', () => {
      cy.openAddPluginModal();
      cy.wait(500);
      cy.get(`[data-hook=Instagram_InsertButton]`)
        .click()
        .percySnapshot('should render instagram mobile modal', DEFAULT_MOBILE_WIDTHS);
    });
  });
});

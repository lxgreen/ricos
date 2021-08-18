import { TestAppConfig } from '../../examples/main/src/types';
import { usePlugins, plugins, useConsumerTheming } from '../cypress/testAppConfig';

export interface FixtureConfig {
  fixture: string;
  config?: TestAppConfig;
  additionalCommands?: (cy: Cypress.cy) => void;
}

export type Fixture = string | FixtureConfig;

export const fixtures: Fixture[] = [
  'headers',
  'images',
  'inline-styles',
  'lists',
  'nested-lists',
  'aligment_with_punctuations',
  {
    fixture: 'multiple-collapsible-lists-rich-text',
    config: usePlugins(plugins.all),
  },
  'indent_blocks_lists_with_alignment',
  'quote',
  // {
  //   fixture: 'facebook-video',
  //   additionalCommands: cy => {
  //     cy.waitForVideoToLoad();
  //     cy.wait(200);
  //   },
  // },
  'gif',
  'giphy',
  // {
  //   fixture: 'html',
  //   additionalCommands: cy => {
  //     cy.waitForHtmlToLoad();
  //   },
  // },
  {
    fixture: 'gallery-layouts',
    additionalCommands: cy => {
      cy.scrollTo(0, 100);
      cy.waitForDocumentMutations();
      cy.scrollTo(0, 0);
      cy.loadOutOfViewImagesInGallery();
      cy.waitForGalleryImagesToLoad();
    },
  },
  'old-image-format',
  'hashtag-and-link',
  'images-sizes',
  'images-original-size',
  'all-images-cases-part-1',
  'all-images-cases-part-2',
  'all-images-cases-part-3',
  'unsupported-blocks',
  {
    fixture: 'file-inside-table',
    config: usePlugins(plugins.all),
  },
  {
    fixture: 'link-preview-render',
    config: usePlugins(plugins.all),
  },
  {
    fixture: 'blog-fixture',
    config: useConsumerTheming('blog', true),
  },
  {
    fixture: 'blog-fixture',
    config: useConsumerTheming('blog'),
  },
  {
    fixture: 'poll',
    config: usePlugins(plugins.poll),
  },
];

export const fixturesToTestOnSeo: Fixture[] = ['images'];

export const DEFAULT_DESKTOP_BROWSERS: Eyes.Open.Options['browser'] = [
  { width: 1440, height: 900, name: 'chrome' },
];

export const DEFAULT_MOBILE_BROWSERS: Eyes.Open.Options['browser'] = [
  { deviceName: 'iPhone X' },
  { deviceName: 'iPad' },
];

import { HTML_TYPE, VIDEO_TYPE } from 'ricos-content';
import {
  AvailableExperiments,
  AddPluginMenuConfig,
  FooterToolbarConfig,
} from 'wix-rich-content-common';
import { TestAppConfig } from '../../examples/main/src/types';

export const defaultConfig: TestAppConfig = {
  plugins: ['partialPreset'],
  toolbarConfig: {},
  pluginsConfig: {
    [HTML_TYPE]: {
      exposeButtons: ['html'],
    },
    [VIDEO_TYPE]: {
      exposeButtons: ['video', 'soundCloud'],
    },
  },
};

export const getPluginMenuConfig = (
  addPluginMenuConfig: AddPluginMenuConfig = {}
): TestAppConfig => {
  return {
    toolbarConfig: { addPluginMenuConfig },
  };
};

export const getFooterToolbarConfig = (
  footerToolbarConfig: FooterToolbarConfig = {}
): TestAppConfig => {
  return {
    toolbarConfig: { footerToolbarConfig },
  };
};

export const useTheming = ({
  paletteType,
  skipCssOverride,
  useCustomStyles,
  useParagraphLineHeight,
  fallbackColor,
  disableContainer,
  contentBgColor,
  settingsActionColor,
  focusActionColor,
}: TestAppConfig['theme']): TestAppConfig => {
  return {
    theme: {
      paletteType,
      skipCssOverride,
      useCustomStyles,
      useParagraphLineHeight,
      fallbackColor,
      disableContainer,
      contentBgColor,
      settingsActionColor,
      focusActionColor,
    },
  };
};

export const useConsumerTheming = (consumer: string, applyOuterStyle?: boolean): TestAppConfig => {
  return {
    consumer,
    applyOuterStyle,
  };
};

export const usePlugins = (plugin: string): TestAppConfig => {
  return { plugins: [plugin] };
};

export const usePluginsConfig = (pluginsConfig: TestAppConfig['pluginsConfig']): TestAppConfig => {
  return {
    pluginsConfig,
  };
};

export const useUploadConfig = {
  isNativeUpload: true,
};

export const plugins = {
  embedsPreset: 'embedsPreset',
  spoilerPreset: 'spoilerPreset',
  linkPreview: 'linkPreview',
  verticalEmbed: 'verticalEmbed',
  actionButton: 'actionButton',
  html: 'html',
  headings: 'headings',
  textPlugins: 'textPlugins',
  all: 'all',
  giphy: 'giphy',
  emoji: 'emoji',
  collapsibleList: 'collapsibleList',
  table: 'table',
  video: 'video',
  poll: 'poll',
};

export const useExperiments = (experiment: AvailableExperiments): TestAppConfig => {
  return { experiments: experiment };
};

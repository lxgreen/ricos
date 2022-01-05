import { createLinkPlugin } from './createLinkPlugin';
import type { LinkPluginEditorConfig } from './types';
import { LINK_TYPE } from './types';
import { DEFAULTS } from './defaults';
import type { EditorPluginCreator } from 'wix-rich-content-common';
import { createLinkData } from './createLinkData';

export const pluginLink: EditorPluginCreator<LinkPluginEditorConfig> = config => {
  const pluginConfig = { ...DEFAULTS.config, ...config };
  return {
    config: pluginConfig,
    type: LINK_TYPE,
    createPlugin: createLinkPlugin,
    ModalsMap: {},
    createPluginData: createLinkData,
  };
};

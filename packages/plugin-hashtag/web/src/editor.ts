import { createHashtagPlugin } from './createHashtagPlugin';
import type { HashtagPluginEditorConfig } from './types';
import { HASHTAG_TYPE } from './types';
import { DEFAULTS } from './defaults';
import type { EditorPluginCreator } from 'wix-rich-content-common';

export const pluginHashtag: EditorPluginCreator<HashtagPluginEditorConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: HASHTAG_TYPE,
    createPlugin: createHashtagPlugin,
    ModalsMap: {},
  };
};

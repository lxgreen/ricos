import { createLineSpacingPlugin } from './createLineSpacingPlugin';
import type { LineSpacingPluginEditorConfig } from './types';
import { LINE_SPACING_TYPE } from './types';
import { ModalsMap } from './modals';
import type { EditorPluginCreator } from 'wix-rich-content-common';
import { DEFAULTS } from './defaults';

export const pluginLineSpacing: EditorPluginCreator<LineSpacingPluginEditorConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: LINE_SPACING_TYPE,
    createPlugin: createLineSpacingPlugin,
    ModalsMap,
  };
};

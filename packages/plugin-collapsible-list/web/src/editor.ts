import { createCollapsibleListPlugin } from './createCollapsibleListPlugin';
import type { CollapsibleListPluginEditorConfig } from './types';
import { COLLAPSIBLE_LIST_TYPE } from './types';
import { ModalsMap } from './modals';
import { DEFAULTS } from './defaults';
import type { EditorPluginCreator } from 'wix-rich-content-common';

export const pluginCollapsibleList: EditorPluginCreator<
  CollapsibleListPluginEditorConfig
> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: COLLAPSIBLE_LIST_TYPE,
    createPlugin: createCollapsibleListPlugin,
    ModalsMap,
  };
};

import { createCollapsibleListPlugin } from './createCollapsibleListPlugin';
import type { CollapsibleListPluginEditorConfig } from './types';
import { COLLAPSIBLE_LIST_TYPE } from './types';
import { ModalsMap } from './modals';
import { DEFAULTS } from './defaults';
import type { EditorPluginCreator } from 'wix-rich-content-common';
import { createCollapsibleListData } from './createCollapsibleListData';
import { tiptapExtensions } from './tiptap/tiptap';
import type { TiptapEditorPlugin } from 'ricos-tiptap-types';
import { getAddButtons } from './getAddButtons';

export const pluginCollapsibleList: EditorPluginCreator<
  CollapsibleListPluginEditorConfig
> = config => {
  const pluginConfig: CollapsibleListPluginEditorConfig = { ...DEFAULTS.config, ...config };
  return {
    config: pluginConfig,
    type: COLLAPSIBLE_LIST_TYPE,
    createPlugin: createCollapsibleListPlugin,
    ModalsMap,
    createPluginData: createCollapsibleListData,
    tiptapExtensions,
    addButtons: getAddButtons(),
  } as TiptapEditorPlugin;
};

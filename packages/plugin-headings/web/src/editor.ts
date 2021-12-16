import { TiptapEditorPlugin } from 'ricos-tiptap-types';
import { EditorPluginCreator } from 'wix-rich-content-common';
import { createHeadingsPlugin } from './createHeadingsPlugin';
import { DEFAULTS } from './defaults';
import { ModalsMap } from './modals';
import { createTiptapExtensions } from './tiptap';
import { HeadingsPluginEditorConfig, HEADINGS_DROPDOWN_TYPE } from './types';

export const pluginHeadings: EditorPluginCreator<HeadingsPluginEditorConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: HEADINGS_DROPDOWN_TYPE,
    createPlugin: createHeadingsPlugin,
    ModalsMap,
    tiptapExtensions: createTiptapExtensions(config),
  } as TiptapEditorPlugin;
};

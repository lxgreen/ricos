import { createTextColorPlugin } from './createTextColorPlugin';
import { createTextHighlightPlugin } from './createTextHighlightPlugin';
import {
  TEXT_COLOR_TYPE,
  TEXT_HIGHLIGHT_TYPE,
  TextColorPluginEditorConfig,
  TextHighlightPluginEditorConfig,
} from './types';
import { DEFAULTS } from './constants';
import { ModalsMap } from './modals';
import { EditorPluginCreator } from 'wix-rich-content-common';
import { TiptapEditorPlugin } from 'ricos-tiptap-types';
import { getTiptapExtensions } from './tiptap';

export const pluginTextColor: EditorPluginCreator<TextColorPluginEditorConfig> = config => {
  return {
    config: { ...DEFAULTS.configTextColor.editor, ...config },
    type: TEXT_COLOR_TYPE,
    createPlugin: createTextColorPlugin,
    ModalsMap,
    tiptapExtensions: getTiptapExtensions(config),
  } as TiptapEditorPlugin;
};

export const pluginTextHighlight: EditorPluginCreator<TextHighlightPluginEditorConfig> = config => {
  return {
    config: { ...DEFAULTS.configTextHighlight.editor, ...config },
    type: TEXT_HIGHLIGHT_TYPE,
    createPlugin: createTextHighlightPlugin,
    ModalsMap: {},
  };
};

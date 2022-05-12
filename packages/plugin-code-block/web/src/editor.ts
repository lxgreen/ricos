import { createCodeBlockPlugin } from './createCodeBlockPlugin';
import type { CodeBlockPluginEditorConfig } from './types';
import { CODE_BLOCK_TYPE } from './types';
import { DEFAULTS } from './defaults';
import type { EditorPluginCreator } from 'wix-rich-content-common';
import { tiptapExtensions } from './tiptap';
import type { TiptapEditorPlugin } from 'ricos-tiptap-types';

export const pluginCodeBlock: EditorPluginCreator<CodeBlockPluginEditorConfig> = config => {
  const pluginConfig = { ...DEFAULTS.config, ...config };
  return {
    config: pluginConfig,
    type: CODE_BLOCK_TYPE,
    createPlugin: createCodeBlockPlugin,
    ModalsMap: {},
    tiptapExtensions,
  } as TiptapEditorPlugin;
};

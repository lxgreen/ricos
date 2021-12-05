import { createExternalMentionsPlugin } from './createMentionsPlugin';
import { MENTION_TYPE, MentionsPluginEditorConfig } from './types';
import { DEFAULTS } from './defaultSettings';
import { EditorPluginCreator } from 'wix-rich-content-common';
import { createMentionData } from './createMentionData';
import { createTiptapExtensions } from './tiptap';
import { TiptapEditorPlugin } from 'wix-tiptap-editor';

export const pluginMentions: EditorPluginCreator<MentionsPluginEditorConfig> = config => {
  const pluginConfig = { ...DEFAULTS.config, ...config };
  return {
    config: pluginConfig,
    type: MENTION_TYPE,
    createPlugin: createExternalMentionsPlugin,
    ModalsMap: {},
    createPluginData: createMentionData,
    tiptapExtensions: createTiptapExtensions(pluginConfig),
  } as TiptapEditorPlugin;
};

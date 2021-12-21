import { createPollPlugin } from './createPollPlugin';
import { POLL_TYPE, PollPluginEditorConfig } from './types';
import { DEFAULT_COMPONENT_DATA } from './defaults';
import { ModalsMap } from './modals';
import { EditorPluginCreator } from 'wix-rich-content-common';
import { createPollData } from './createPollData';
import { createRicosExtensions } from './tiptap';
import { TiptapEditorPlugin } from 'ricos-tiptap-types';

export const pluginPoll: EditorPluginCreator<PollPluginEditorConfig> = config => {
  const pluginConfig: PollPluginEditorConfig = { ...DEFAULT_COMPONENT_DATA.config, ...config };
  return {
    config: pluginConfig,
    type: POLL_TYPE,
    createPlugin: createPollPlugin,
    ModalsMap,
    createPluginData: createPollData,
    configFixer: ({ helpers }) => (pluginConfig.uploadHandler = helpers?.handleFileUpload),
    tiptapExtensions: createRicosExtensions(pluginConfig),
  } as TiptapEditorPlugin;
};

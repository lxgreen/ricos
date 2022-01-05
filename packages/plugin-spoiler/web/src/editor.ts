import { createSpoilerPlugin } from './createSpoilerPlugin';
import type { SpoilerPluginEditorConfig } from './types';
import { SPOILER_TYPE } from './types';
import SpoilerEditorWrapper from './Components/Wrappers/SpoilerEditorWrapper';
import type { EditorPluginCreator } from 'wix-rich-content-common';
import { DEFAULTS } from './defaults';
import { createTiptapExtensions } from './tiptap';
import type { TiptapEditorPlugin } from 'ricos-tiptap-types';
export { SpoilerEditorWrapper };
export { default as BlockSpoilerComponent } from './Components/BlockSpoilerComponent';

export const pluginSpoiler: EditorPluginCreator<SpoilerPluginEditorConfig> = config => {
  const pluginConfig = { ...DEFAULTS.config, SpoilerEditorWrapper, ...config };
  return {
    config: pluginConfig,
    type: SPOILER_TYPE,
    createPlugin: createSpoilerPlugin,
    ModalsMap: {},
    tiptapExtensions: createTiptapExtensions(pluginConfig),
  } as TiptapEditorPlugin;
};

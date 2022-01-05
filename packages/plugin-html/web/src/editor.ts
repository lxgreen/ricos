import { createHtmlPlugin } from './createHtmlPlugin';
import type { HtmlPluginEditorConfig } from './types';
import { HTML_TYPE } from './types';
import { DEFAULTS_CONFIG } from './defaults';
import type { EditorPluginCreator } from 'wix-rich-content-common';
import { createHtmlData } from './createHtmlData';

export const pluginHtml: EditorPluginCreator<HtmlPluginEditorConfig> = config => {
  return {
    config: { ...DEFAULTS_CONFIG, ...config },
    type: HTML_TYPE,
    createPlugin: createHtmlPlugin,
    ModalsMap: {},
    createPluginData: createHtmlData,
  };
};

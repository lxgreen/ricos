import { createBasePlugin } from 'wix-rich-content-plugin-commons';
import { TEXT_HIGHLIGHT_TYPE, TextHighlightPluginEditorConfig } from './types';
import { createTextHighlightToolbar } from './toolbar/createToolbar';
import { DEFAULTS } from './constants';
import { CreatePluginFunction } from 'wix-rich-content-common';

const createTextHighlightPlugin: CreatePluginFunction<TextHighlightPluginEditorConfig> = config => {
  const type = TEXT_HIGHLIGHT_TYPE;
  const { theme, [type]: settings = {}, ...rest } = config;
  const toolbar = createTextHighlightToolbar(config);
  return createBasePlugin({
    theme,
    toolbar,
    type,
    settings,
    defaultPluginData: DEFAULTS.configTextHighlight.editor,
    ...rest,
  });
};

createTextHighlightPlugin.functionName = TEXT_HIGHLIGHT_TYPE;

export { createTextHighlightPlugin };

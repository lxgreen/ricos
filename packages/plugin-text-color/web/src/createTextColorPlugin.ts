import { createBasePlugin } from 'wix-rich-content-plugin-commons';
import { TEXT_COLOR_TYPE, TextColorPluginEditorConfig } from './types';
import { createTextColorToolbar } from './toolbar/createToolbar';
import { DEFAULTS } from './constants';
import { CreatePluginFunction } from 'wix-rich-content-common';

const createTextColorPlugin: CreatePluginFunction<TextColorPluginEditorConfig> = config => {
  const type = TEXT_COLOR_TYPE;
  const { theme, [type]: settings = {}, ...rest } = config;
  const toolbar = createTextColorToolbar(config);
  return createBasePlugin({
    theme,
    toolbar,
    type,
    settings,
    defaultPluginData: DEFAULTS.configTextColor.editor,
    ...rest,
  });
};

createTextColorPlugin.functionName = TEXT_COLOR_TYPE;

export { createTextColorPlugin };

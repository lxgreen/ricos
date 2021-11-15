import {
  TEXT_COLOR_TYPE,
  TEXT_HIGHLIGHT_TYPE,
  TextColorPluginViewerConfig,
  TextHighlightPluginViewerConfig,
} from './types';
import { DEFAULTS } from './constants';
import { ViewerPluginCreator } from 'wix-rich-content-common';
export { TEXT_COLOR_TYPE, TEXT_HIGHLIGHT_TYPE };

export const pluginTextColor: ViewerPluginCreator<TextColorPluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS.configTextColor.viewer, ...config },
    type: TEXT_COLOR_TYPE,
  };
};

export const pluginTextHighlight: ViewerPluginCreator<TextHighlightPluginViewerConfig> = config => {
  return {
    config: { ...DEFAULTS.configTextHighlight.viewer, ...config },
    type: TEXT_HIGHLIGHT_TYPE,
  };
};

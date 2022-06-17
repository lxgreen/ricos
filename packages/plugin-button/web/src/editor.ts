import { createActionButtonPlugin, createLinkButtonPlugin } from './createButtonPlugin';
import { DEFAULT_CONFIG } from './constants';
import type { LinkButtonPluginEditorConfig, ActionButtonPluginEditorConfig } from './types';
import { LINK_BUTTON_TYPE, ACTION_BUTTON_TYPE } from './types';
import { ModalsMap } from './modals';
import type { EditorPluginCreator } from 'wix-rich-content-common';
import { createButtonData } from './createButtonData';
import { getToolbarButtons } from './getToolbarButtons';

const pluginButton = (createPlugin, type, config) => {
  return {
    config: { ...DEFAULT_CONFIG, ...config },
    type,
    createPlugin,
    ModalsMap,
    createPluginData: createButtonData,
    toolbarButtons: getToolbarButtons(config),
  };
};

export const pluginLinkButton: EditorPluginCreator<LinkButtonPluginEditorConfig> = config => {
  return pluginButton(createLinkButtonPlugin, LINK_BUTTON_TYPE, config);
};

export const pluginActionButton: EditorPluginCreator<ActionButtonPluginEditorConfig> = config => {
  return pluginButton(createActionButtonPlugin, ACTION_BUTTON_TYPE, config);
};

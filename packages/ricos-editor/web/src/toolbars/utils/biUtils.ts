import { Version, Helpers, ToolbarType } from 'wix-rich-content-common';

export const getBiFunctions = (helpers: Helpers) => {
  const onInlineToolbarOpen = toolbarType =>
    helpers?.onInlineToolbarOpen?.({
      toolbarType,
      version: Version.currentVersion,
    });
  const onToolbarButtonClick = (
    name: string,
    toolbarType: ToolbarType,
    value?: string | boolean,
    pluginId?: string
  ) => {
    helpers?.onToolbarButtonClick?.({
      buttonName: name,
      pluginId,
      type: toolbarType,
      value: value === undefined ? undefined : typeof value === 'boolean' ? `${!value}` : value,
      version: Version.currentVersion,
    });
    if (pluginId && value && typeof value === 'string') {
      helpers?.onPluginAdd?.(pluginId, 'FormattingToolbar', Version.currentVersion);
      helpers?.onPluginAddSuccess?.(pluginId, 'FormattingToolbar', value, Version.currentVersion);
    }
  };
  return { onInlineToolbarOpen, onToolbarButtonClick };
};

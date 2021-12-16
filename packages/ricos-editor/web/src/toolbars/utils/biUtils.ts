import {
  Version,
  Helpers,
  ToolbarType,
  ANCHOR_CATEGORY,
  WEB_ADDRESS_CATEGORY,
  ADD_PLUGIN_LINK_BI,
  OnPluginAction,
  OnAddPluginLink,
} from 'wix-rich-content-common';

export const getBiFunctions = (helpers: Helpers, contentId?: string) => {
  const onInlineToolbarOpen = toolbarType =>
    helpers?.onInlineToolbarOpen?.({
      toolbarType,
      version: Version.currentVersion,
      contentId,
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
      contentId,
    });
    if (pluginId && value && typeof value === 'string') {
      helpers?.onPluginAdd?.(pluginId, 'FormattingToolbar', Version.currentVersion, contentId);
      helpers?.onPluginAddSuccess?.(
        pluginId,
        'FormattingToolbar',
        value,
        Version.currentVersion,
        contentId
      );
    }
  };

  const onAddPluginLink: OnAddPluginLink = (data, plugin_id) => {
    const { url, anchor, target, rel } = data;
    const params = anchor
      ? { anchor, category: ANCHOR_CATEGORY }
      : {
          link: url,
          rel,
          newTab: target === '_blank',
          category: WEB_ADDRESS_CATEGORY,
        };
    onPluginAction(ADD_PLUGIN_LINK_BI, { plugin_id, params });
  };

  const onPluginAction: OnPluginAction = (eventName, params) =>
    helpers.onPluginAction?.(eventName, { ...params, version: Version.currentVersion });

  return { onInlineToolbarOpen, onToolbarButtonClick, onAddPluginLink };
};

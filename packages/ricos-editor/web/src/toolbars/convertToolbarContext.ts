import { ToolbarType } from 'wix-rich-content-common';
import type { AddLinkData } from 'wix-rich-content-common';
import { getBiFunctions } from './utils/biUtils';

const getPluginConfig = ({ pluginType, plugins }) =>
  plugins?.find(plugin => plugin.type === pluginType)?.config;

const getLinkPanelData = ({
  helpers,
  contentId,
  plugins,
  linkPanelSettings,
  linkSettings,
  isMobile,
}) => {
  const biFunctions = helpers && getBiFunctions(helpers, contentId);

  const onAddPluginLink = (data: AddLinkData) => {
    biFunctions?.onAddPluginLink?.(data, 'TEXT');
  };

  const linkConfig = getPluginConfig({ pluginType: 'LINK', plugins });

  const linkPanelData = {
    linkTypes: linkConfig?.linkTypes,
    onLinkAdd: linkConfig?.onLinkAdd,
    uiSettings: { linkPanel: linkPanelSettings },
    linkSettings,
    isMobile,
    onAddPluginLink,
  };

  return linkPanelData;
};

export const convertToolbarContext = ({
  contentId,
  isMobile,
  theme,
  locale,
  helpers,
  plugins,
  linkPanelSettings,
  linkSettings,
  experiments,
  toolbarSettings,
  cssOverride,
  t,
  getEditorCommands,
}) => {
  const { useStaticTextToolbar } = toolbarSettings || {};
  const textToolbarType = isMobile
    ? ToolbarType.MOBILE
    : useStaticTextToolbar
    ? ToolbarType.STATIC
    : ToolbarType.INLINE;

  const defaultLineSpacing = getPluginConfig({
    pluginType: 'line-spacing',
    plugins,
  })?.defaultSpacing;

  const headingsData = {
    ...getPluginConfig({ pluginType: 'wix-rich-content-plugin-headings', plugins }),
  };

  const colorPickerData = {
    TEXT_COLOR: getPluginConfig({ pluginType: 'wix-rich-content-text-color', plugins }),
    TEXT_HIGHLIGHT: getPluginConfig({
      pluginType: 'wix-rich-content-text-highlight',
      plugins,
    }),
  };

  const linkPanelData = getLinkPanelData({
    helpers,
    contentId,
    plugins,
    linkPanelSettings,
    linkSettings,
    isMobile,
  });

  const toolbarsContextData = {
    theme,
    isMobile,
    t,
    linkPanelData,
    colorPickerData,
    headingsData,
    experiments,
    defaultLineSpacing,
    cssOverride,
    //
    textToolbarType,
    toolbarSettings,
    locale,
    getEditorCommands,
  };
  return toolbarsContextData;
};

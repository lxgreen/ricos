import { InsertPluginIcon, AdsenseIcon } from './icons';
import { INSERT_PLUGIN_BUTTONS } from 'wix-rich-content-editor-common';
import type { AddButton } from 'ricos-types';
import { htmlButtonsTypes } from './defaults';
import { HTML_TYPE } from './types';
import htmlDataDefaults from 'ricos-schema/dist/statics/html.defaults.json';
import { compact } from 'lodash';

export const getAddButtons = (config): AddButton[] => {
  const { exposeButtons = [htmlButtonsTypes.html], siteDomain } = config || {};
  const index = exposeButtons.indexOf(htmlButtonsTypes.adsense);
  if (!siteDomain && index > -1) {
    exposeButtons.splice(index, 1);
  }
  const buttonsMap: Record<string, AddButton> = {
    [htmlButtonsTypes.html]: {
      id: 'html',
      label: INSERT_PLUGIN_BUTTONS.HTML,
      icon: InsertPluginIcon,
      tooltip: 'HtmlPlugin_InsertButton_Tooltip',
      command: editorCommands => {
        editorCommands.insertBlock(HTML_TYPE, htmlDataDefaults);
        return true;
      },
      menuConfig: {
        tags: 'Video_plugin_search_tags',
      },
    },
    [htmlButtonsTypes.adsense]: {
      id: 'adsense',
      label: INSERT_PLUGIN_BUTTONS.ADSENSE,
      icon: AdsenseIcon,
      tooltip: 'AdSensePlugin_InsertButton_Tooltip',
      command: editorCommands => {
        editorCommands.insertBlock(HTML_TYPE, htmlDataDefaults);
        return true;
      },
      menuConfig: {
        tags: 'Video_plugin_search_tags',
        group: 'embed',
      },
    },
  };

  return compact(exposeButtons.map(buttonType => buttonsMap[buttonType]));
};

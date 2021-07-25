import { merge } from 'lodash';
import { DEFAULT_CONFIG } from './constants';
import {
  CreatePluginsDataMap,
  LINK_BUTTON_TYPE,
  ACTION_BUTTON_TYPE,
  Node_Type,
} from 'wix-rich-content-common';
import { convertNodeDataToDraft } from 'ricos-content/libs/toDraftData';

export const createButtonData:
  | CreatePluginsDataMap[typeof LINK_BUTTON_TYPE]
  | CreatePluginsDataMap[typeof ACTION_BUTTON_TYPE]
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  | any = (pluginData = {}, isRicosSchema = false) => {
  const buttonData = isRicosSchema
    ? convertNodeDataToDraft(Node_Type.BUTTON, pluginData)
    : pluginData;
  return merge({}, DEFAULT_CONFIG, buttonData);
};

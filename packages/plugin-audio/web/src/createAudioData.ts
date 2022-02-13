import { merge } from 'lodash';
import { DEFAULTS } from './defaults';
import type { CreatePluginsDataMap, RICOS_AUDIO_TYPE } from 'wix-rich-content-common';
import { Node_Type } from 'wix-rich-content-common';
import { convertNodeDataToDraft } from 'ricos-content/libs/toDraftData';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createAudioData: CreatePluginsDataMap[typeof RICOS_AUDIO_TYPE] | any = (
  pluginData = {},
  isRicosSchema = false
) => {
  const audioData = isRicosSchema
    ? convertNodeDataToDraft(Node_Type.AUDIO, pluginData)
    : pluginData;
  return merge({}, DEFAULTS, audioData);
};

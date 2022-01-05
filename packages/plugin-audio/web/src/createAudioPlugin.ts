import createToolbar from './toolbar/createToolbar';
import { Component, DEFAULTS } from './audio-component';
import type { AudioPluginEditorConfig } from './types';
import { AUDIO_TYPE } from './types';
import { createBasePlugin } from 'wix-rich-content-plugin-commons';
import type { CreatePluginFunction } from 'wix-rich-content-common';

const createAudioPlugin: CreatePluginFunction<AudioPluginEditorConfig> = config => {
  const { helpers, t, [AUDIO_TYPE]: settings = {}, isMobile, ...rest } = config;

  return createBasePlugin({
    component: Component,
    type: AUDIO_TYPE,
    toolbar: createToolbar({
      t,
      settings,
      isMobile,
    }),
    helpers,
    settings,
    t,
    isMobile,
    defaultPluginData: DEFAULTS,
    ...rest,
  });
};

createAudioPlugin.functionName = AUDIO_TYPE;

export { createAudioPlugin };

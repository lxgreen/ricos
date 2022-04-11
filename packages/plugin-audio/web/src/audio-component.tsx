import React from 'react';
import AudioViewer from './audio-viewer';
import type { AudioPluginEditorConfig } from './types';
import { AUDIO_TYPE } from './types';
import { DEFAULTS } from './defaults';
import type {
  ComponentData,
  Helpers,
  RichContentTheme,
  TranslationFunction,
} from 'wix-rich-content-common';
import { MediaItemErrorMsg } from 'wix-rich-content-ui-components';

interface Props {
  componentData: ComponentData;
  settings: AudioPluginEditorConfig;
  theme: RichContentTheme;
  helpers: Helpers;
  isMobile: boolean;
  t?: TranslationFunction;
  isLoading?: boolean;
  tempData?: boolean;
}

class AudioComponent extends React.Component<Props> {
  static type = { AUDIO_TYPE };

  render() {
    const { componentData, settings, theme, helpers, isMobile, isLoading, t } = this.props;
    return (
      <>
        <AudioViewer
          componentData={componentData}
          settings={settings}
          theme={theme}
          helpers={helpers}
          isMobile={isMobile}
          isLoading={componentData?.tempData || isLoading}
          disabled
        />
        {componentData?.error && <MediaItemErrorMsg error={componentData?.error} t={t} />}
      </>
    );
  }
}

export { AudioComponent as Component, DEFAULTS };

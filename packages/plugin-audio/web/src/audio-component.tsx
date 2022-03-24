import React from 'react';
import AudioViewer from './audio-viewer';
import type { AudioPluginEditorConfig } from './types';
import { AUDIO_TYPE } from './types';
import { DEFAULTS } from './defaults';
import type { ComponentData, Helpers, RichContentTheme } from 'wix-rich-content-common';
import { Loader } from 'wix-rich-content-ui-components';

interface Props {
  componentData: ComponentData;
  settings: AudioPluginEditorConfig;
  theme: RichContentTheme;
  helpers: Helpers;
  isMobile: boolean;
  isLoading?: boolean;
  tempData?: boolean;
}

class AudioComponent extends React.Component<Props> {
  static type = { AUDIO_TYPE };

  render() {
    const { componentData, settings, theme, helpers, isMobile, isLoading } = this.props;
    return (
      <>
        <AudioViewer
          componentData={componentData}
          settings={settings}
          theme={theme}
          helpers={helpers}
          isMobile={isMobile}
          disabled
        />
        {(componentData?.tempData || isLoading) && <Loader theme={theme} type={'medium'} />}
      </>
    );
  }
}

export { AudioComponent as Component, DEFAULTS };

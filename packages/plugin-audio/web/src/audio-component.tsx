import React from 'react';
import AudioViewer from './audio-viewer';
import type { AudioPluginEditorConfig } from './types';
import { AUDIO_TYPE } from './types';
import { DEFAULTS } from './defaults';
import type { ComponentData, Helpers, RichContentTheme } from 'wix-rich-content-common';

interface Props {
  componentData: ComponentData;
  settings: AudioPluginEditorConfig;
  theme: RichContentTheme;
  helpers: Helpers;
  isMobile: boolean;
}

class AudioComponent extends React.Component<Props> {
  static type = { AUDIO_TYPE };

  render() {
    const { componentData, settings, theme, helpers, isMobile } = this.props;
    return (
      <AudioViewer
        componentData={componentData}
        settings={settings}
        theme={theme}
        helpers={helpers}
        isMobile={isMobile}
      />
    );
  }
}

export { AudioComponent as Component, DEFAULTS };

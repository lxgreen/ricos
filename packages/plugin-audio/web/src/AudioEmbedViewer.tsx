import React from 'react';
import type { ComponentData, Helpers, RichContentTheme } from 'wix-rich-content-common';
import HtmlComponent from 'wix-rich-content-plugin-html/libs/HtmlComponent';
import type { AudioPluginEditorConfig } from './types';

interface Props {
  componentData: ComponentData;
  settings: AudioPluginEditorConfig;
  theme: RichContentTheme;
  isMobile: boolean;
  helpers?: Helpers;
}

const AudioEmbedViewer: React.FC<Props> = ({ isMobile, componentData, settings, theme }) => {
  const {
    audio: {
      src: { url },
    },
    html,
  } = componentData;

  const htmlCompProps = {
    componentData: {
      html,
      srcType: 'html',
      src: unescape(html),
      config: {
        link: { rel: '', url, target: '_blank' },
        height: '100%',
        width: '100%',
      },
    },
    settings,
    theme,
    isMobile,
  };
  return <HtmlComponent {...htmlCompProps} />;
};

export default AudioEmbedViewer;

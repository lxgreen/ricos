import type { FC } from 'react';
import React, { useMemo } from 'react';
import type { RichContentTheme, ComponentData, Helpers } from 'wix-rich-content-common';
import { mergeStyles } from 'wix-rich-content-common';
import type { AudioPluginViewerConfig } from './types';
import ReactPlayerWrapper from './ReactPlayerWrapper';
import styles from '../statics/styles/audio.scss';
import AudioEmbedViewer from './AudioEmbedViewer';

const getAudioSrc = (src, settings) => {
  if (src?.url) return src.url;
  if (settings && settings?.getAudioUrl) {
    return settings.getAudioUrl(src);
  } else {
    console.error('must set getAudioUrl in plugin config when using custom video source!', src); //eslint-disable-line no-console
  }
  return src;
};

interface Props {
  componentData: ComponentData;
  settings: AudioPluginViewerConfig;
  theme: RichContentTheme;
  helpers: Helpers;
  isMobile: boolean;
  disabled?: boolean;
}

const AudioViewer: FC<Props> = ({
  theme,
  isMobile,
  helpers,
  settings,
  disabled,
  componentData,
}) => {
  const classes = useMemo(() => mergeStyles({ styles, theme }), [theme]);
  const { audio = {}, authorName, name, coverImage, disableDownload } = componentData;
  const url = getAudioSrc(audio?.src, settings);
  const shouldEmbed = componentData.html;

  return (
    <div className={classes.container} data-hook="audio-container">
      {!shouldEmbed ? (
        <ReactPlayerWrapper
          theme={theme}
          url={url}
          name={name}
          authorName={authorName}
          coverImage={coverImage}
          disableDownload={disableDownload}
          helpers={helpers}
          isMobile={isMobile}
          showControls={!!audio?.src?.url}
          disabled={disabled}
        />
      ) : (
        <AudioEmbedViewer
          componentData={componentData}
          settings={settings}
          theme={theme}
          isMobile={isMobile}
        />
      )}
    </div>
  );
};

export default AudioViewer;

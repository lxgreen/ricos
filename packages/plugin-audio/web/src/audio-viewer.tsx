import type { FC } from 'react';
import React, { useMemo } from 'react';
import type { RichContentTheme, ComponentData, Helpers } from 'wix-rich-content-common';
import { mergeStyles } from 'wix-rich-content-common';
import styles from '../statics/styles/audio.scss';
import type { AudioPluginViewerConfig } from './types';

interface Props {
  componentData: ComponentData;
  settings: AudioPluginViewerConfig;
  theme: RichContentTheme;
  helpers: Helpers;
  isMobile: boolean;
}

const AudioViewer: FC<Props> = ({ theme }) => {
  const classes = useMemo(() => mergeStyles({ styles, theme }), [theme]);

  return (
    <div className={classes.container} data-hook="audio-container">
      This is my new audio plugin!
    </div>
  );
};

export default AudioViewer;

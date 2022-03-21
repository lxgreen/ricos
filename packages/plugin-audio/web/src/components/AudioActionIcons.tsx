import React from 'react';
import { PlayIcon, PauseIcon } from 'wix-rich-content-ui-components';

interface Props {
  handlePause: () => void;
  handlePlay: () => void;
  isPlaying: boolean;
  disabled?: boolean;
}

const AudioActionIcons: React.FC<Props> = ({ isPlaying, handlePause, handlePlay, disabled }) => {
  const onKeyPress = e => {
    if (e.key === 'Enter') {
      isPlaying ? handlePause() : handlePlay();
    }
  };
  const props = {
    tabIndex: 0,
    onClick: isPlaying ? handlePause : handlePlay,
    onKeyPress: e => onKeyPress(e),
  };

  const PlayPauseIconComponent = disabled || !isPlaying ? PlayIcon : PauseIcon;

  return <PlayPauseIconComponent {...props} />;
};

export default AudioActionIcons;

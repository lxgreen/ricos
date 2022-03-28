import React from 'react';
import { PlayIcon, PauseIcon, LoaderIcon } from 'wix-rich-content-ui-components';
import styles from '../../statics/styles/audio.rtlignore.scss';
interface Props {
  handlePause: () => void;
  handlePlay: () => void;
  isPlaying: boolean;
  disabled?: boolean;
  isLoading?: boolean;
}

const AudioActionIcons: React.FC<Props> = ({
  isPlaying,
  handlePause,
  handlePlay,
  disabled,
  isLoading,
}) => {
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

  return isLoading ? (
    <LoaderIcon className={styles.audio_loader_icon} />
  ) : (
    <PlayPauseIconComponent {...props} />
  );
};

export default AudioActionIcons;

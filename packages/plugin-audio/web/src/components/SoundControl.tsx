import React from 'react';
import {
  SoundIcon,
  SoundMutedIcon,
  Slider,
  SLIDER_TRACK_SIZE,
} from 'wix-rich-content-ui-components';
import styles from '../../statics/styles/audio.scss';

const SoundControl = ({ volume, setVolume, muted, handleMute, theme, handleVolumeChange }) => {
  const onKeyPress = e => {
    if (e.key === 'Enter') {
      handleMute();
    }
  };

  const onKeyDown = e => {
    const shouldDecrease = e.key === 'ArrowDown' && volume > 0;
    const shouldIncrease = e.key === 'ArrowUp' && volume < 1;
    const newVolume = shouldDecrease ? volume - 0.1 : shouldIncrease ? volume + 0.1 : volume;
    setVolume(parseFloat(newVolume.toFixed(1)));
  };

  const SoundIconComponent = muted ? SoundMutedIcon : SoundIcon;

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className={styles.audio_volume_wrapper}
      onKeyPress={onKeyPress}
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
      onKeyDown={onKeyDown}
    >
      <div className={styles.volume_slider_wrapper}>
        <Slider
          theme={theme}
          min={0}
          max={1}
          step="any"
          value={volume}
          onChange={handleVolumeChange}
          onChangeCommitted={handleVolumeChange}
          languageDir="ltr"
          dataHook="audioVolumeSlider"
          trackSize={SLIDER_TRACK_SIZE.small}
        />
      </div>
      <SoundIconComponent className={styles.audio_sound_icon} onClick={handleMute} />
    </div>
  );
};

export default SoundControl;

/* eslint-disable no-console */
import React, { useState, useRef, useEffect } from 'react';
import ReactPlayer from 'react-player';
import {
  AudioDuration,
  AudioDetails,
  AudioImage,
  SoundControl,
  ContextMenu,
  AudioActionIcons,
} from './components';
import {
  DownloadIcon,
  PlaybackIcon,
  Slider,
  SLIDER_TRACK_SIZE,
  SLIDER_THUMB_VISIBILITY,
} from 'wix-rich-content-ui-components';
import { downloadFile, playbackRates, AUDIO_BI_VALUES } from './consts';
import classNames from 'classnames';
import type { Helpers } from 'wix-rich-content-common';
import { AUDIO_TYPE } from './types';
import { debounce } from 'lodash';
import styles from '../statics/styles/audio.rtlignore.scss';
import type { RichContentTheme } from 'ricos-types/src/commonTypes';

interface Props {
  url: string;
  theme: RichContentTheme;
  isMobile: boolean;
  coverImage?: { id: string; original_file_name: string };
  authorName?: string;
  name?: string;
  disableDownload?: boolean;
  showControls?: boolean;
  disabled?: boolean;
  isLoading?: boolean;
  helpers?: Helpers;
}

const ReactPlayerWrapper: React.FC<Props> = ({
  url,
  authorName,
  name,
  disableDownload,
  coverImage,
  helpers,
  isMobile,
  showControls,
  disabled,
  theme,
  isLoading,
}) => {
  const [URL, setURL] = useState(url);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [played, setPlayed] = useState(0);
  const [volume, setVolume] = useState(1);
  const [lastVolume, setLastVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showPlaybackMenu, setShowPlaybackMenu] = useState(false);
  const [showContextMenu, setShowContextMenu] = useState(false);
  const [isStoppedBySeek, setIsStoppedBySeek] = useState(false);
  const [currentWidth, setCurrentWidth] = useState(0);
  const resizeWidths = { small: 320 };
  const reactPlayerSize = showControls ? '100%' : 0;
  const hasDetails = authorName || name;
  const reactPlayerRef = useRef<ReactPlayer>(null);
  const customPlayerRef = useRef<HTMLDivElement>(null);
  const onDownload = () => downloadFile(URL, name || 'untitled');
  const playBackMenuData = playbackRates.map(({ text, rate }) => ({
    text,
    onClick: () => {
      setPlaybackRate(rate);
      setShowPlaybackMenu(false);
    },
    selected: playbackRate === rate,
  }));
  const contextMenuOptions = {
    download: {
      text: 'Download',
      onClick: () => {
        helpers?.onViewerAction?.(AUDIO_TYPE, 'Click', AUDIO_BI_VALUES.FILE_DOWNLOADED);
        onDownload();
        setShowContextMenu(false);
      },
      dataHook: 'audioDownloadIcon',
      icon: DownloadIcon,
    },
    playback: {
      text: 'Playback Speed',
      onClick: () => {
        setShowContextMenu(false);
        setShowPlaybackMenu(true);
      },
      dataHook: 'audioPlaybackIcon',
      icon: PlaybackIcon,
    },
  };

  const contextMenuData = disableDownload
    ? [contextMenuOptions.playback]
    : [contextMenuOptions.download, contextMenuOptions.playback];

  const handleProgress = state => {
    if (!seeking) {
      setPlayed(state.played);
    }
  };
  const onEnded = () =>
    helpers?.onViewerAction?.(AUDIO_TYPE, 'playAudio', AUDIO_BI_VALUES.PLAYBACK_COMPLETED);

  const handleDuration = (num: number) => setDuration(num);
  const handleSeekChange = (num: number) => {
    isPlaying && setIsStoppedBySeek(true);
    handlePause();
    setSeeking(true);
    setPlayed(num);
  };
  const handleVolumeChange = (num: number) => setVolume(num);
  const handlePlay = () => setIsPlaying(true);
  const handlePause = () => setIsPlaying(false);

  const handleContextMenuClick = () => {
    showContextMenu || showPlaybackMenu ? onClickOutside() : setShowContextMenu(true);
  };

  const handleSeekMouseUp = (num: number) => {
    reactPlayerRef?.current?.seekTo(num);
    setSeeking(false);
    isStoppedBySeek && handlePlay();
    setIsStoppedBySeek(false);
  };

  const handleMute = () => {
    if (volume !== 0) {
      setLastVolume(volume);
      setVolume(0);
    } else {
      setVolume(lastVolume);
    }
  };

  const onClickOutside = () => {
    setShowContextMenu(false);
    setShowPlaybackMenu(false);
  };

  const renderAudioDuration = () => (
    <AudioDuration
      elapsed={played * duration}
      duration={duration}
      isMobile={isMobile}
      isBasic={resizeWidths.small >= currentWidth}
    />
  );

  useEffect(() => {
    let resizer;
    if (window?.ResizeObserver) {
      resizer = new ResizeObserver(
        debounce(entries => {
          setCurrentWidth(Math.round(entries[0].contentRect.width));
        }, 60)
      );
    }
    customPlayerRef.current && resizer?.observe?.(customPlayerRef?.current);
    () => {
      resizer?.unobserve?.(customPlayerRef?.current);
    };
  }, []);

  useEffect(() => {
    handlePause();
    setURL(url);
  }, [showControls, url]);

  return (
    <div>
      {!showControls && (
        <div
          className={classNames(styles.customPlayer, {
            [styles.customPlayer_basic]: !hasDetails,
            [styles.customPlayer_small_fit]: resizeWidths.small >= currentWidth,
            [styles.customPlayer_mobile]: isMobile,
            [styles.customPlayer_with_image]: coverImage,
          })}
          ref={customPlayerRef}
        >
          {coverImage && (
            <AudioImage
              coverImage={coverImage}
              getImageUrl={helpers?.getImageUrl}
              isSmallImage={!hasDetails}
            />
          )}
          <div className={styles.track_wrapper}>
            {hasDetails && <AudioDetails authorName={authorName} title={name} />}
            {isMobile && hasDetails && !disableDownload && (
              <DownloadIcon className={styles.audio_download_icon} onClick={onDownload} />
            )}
            <div className={styles.trackContainer}>
              <AudioActionIcons
                handlePlay={handlePlay}
                handlePause={handlePause}
                isPlaying={isPlaying}
                disabled={disabled}
                isLoading={isLoading}
                helpers={helpers}
              />
              {!isMobile && renderAudioDuration()}
              <div className={styles.track_sliders_wrapper}>
                <Slider
                  theme={theme}
                  languageDir="ltr"
                  value={played}
                  dataHook="audioSlider"
                  onChange={handleSeekChange}
                  onChangeCommitted={handleSeekMouseUp}
                  step="any"
                  min={0}
                  max={1}
                  thumbVisibility={SLIDER_THUMB_VISIBILITY.hover}
                  trackSize={SLIDER_TRACK_SIZE.small}
                  liveSiteWiring
                />
                <SoundControl
                  theme={theme}
                  volume={volume}
                  setVolume={setVolume}
                  handleMute={handleMute}
                  muted={volume === 0}
                  handleVolumeChange={handleVolumeChange}
                />
              </div>
              {isMobile && renderAudioDuration()}
              <div className={styles.audio_contextMenu_wrapper}>
                {!isMobile && (
                  <ContextMenu
                    onClickOutside={onClickOutside}
                    contextMenuData={contextMenuData}
                    playBackMenuData={playBackMenuData}
                    showContextMenu={showContextMenu}
                    showPlaybackMenu={showPlaybackMenu}
                    onClick={handleContextMenuClick}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      <ReactPlayer
        url={URL}
        ref={reactPlayerRef}
        playing={disabled ? false : isPlaying}
        playbackRate={playbackRate}
        onPause={handlePause}
        onPlay={handlePlay}
        width={reactPlayerSize}
        height={reactPlayerSize}
        controls={showControls}
        volume={volume}
        onProgress={handleProgress}
        onDuration={handleDuration}
        data-loaded={!isLoading}
        onEnded={onEnded}
        config={{
          file: {
            forceAudio: true,
          },
        }}
      />
    </div>
  );
};

export default ReactPlayerWrapper;

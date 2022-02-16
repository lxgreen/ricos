import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { findDOMNode } from 'react-dom';
import { mergeStyles } from 'wix-rich-content-common';
import { MediaItemErrorMsg, Loader } from 'wix-rich-content-ui-components';
import { get } from 'lodash';
import VideoViewer from './video-viewer';
import styles from '../statics/styles/default-video-styles.scss';
import { VIDEO_TYPE_LEGACY, VIDEO_TYPE } from './types';

const DEFAULTS = Object.freeze({
  config: {
    size: 'content',
    alignment: 'center',
  },
});

class VideoComponent extends React.Component {
  static type = { VIDEO_TYPE_LEGACY, VIDEO_TYPE };

  constructor(props) {
    super(props);
    const isPlayable = !props.blockProps;
    this.state = {
      isLoaded: false,
      isPlayable,
    };
  }

  componentDidMount() {
    this.handlePlayerFocus();
  }

  componentDidUpdate() {
    this.handlePlayerFocus();
  }

  handlePlayerFocus() {
    // eslint-disable-next-line react/no-find-dom-node
    const element = findDOMNode(this).querySelector('iframe, video');
    if (element) {
      element.tabIndex = -1;
    }
  }

  handleReady = player => {
    if (!this.state.isLoaded && !this.props.componentData.tempData) {
      this.setState({ isLoaded: true });
    }
    this.handleDuration(player);
  };

  handleDuration = player => {
    setTimeout(() => {
      const duration = player.getDuration();
      if (duration) {
        this.saveDurationToData(duration);
      } else {
        this.setState({ shouldRenderDurationFix: true });
      }
    }, 3000);
  };

  renderOverlay = styles => {
    return <div className={classNames(styles.video_overlay)} />;
  };

  renderLoader = () => {
    const isCustomVideo = get(this.props, 'componentData.isCustomVideo');
    return (
      <div className={this.styles.videoOverlay}>
        <Loader type={'medium'} isVerySlowFakeLoader={isCustomVideo} />
      </div>
    );
  };

  onReload = () => {
    this.setState({ isLoaded: false });
  };

  saveDurationToData = duration => {
    const { componentData } = this.props;
    this.props.store.update(
      'componentData',
      { ...componentData, duration },
      this.props.block.getKey()
    );
  };

  renderPlayer = () => {
    const { theme, componentData, disabled, settings, setComponentUrl } = this.props;
    return (
      <VideoViewer
        componentData={componentData}
        settings={settings}
        onReady={this.handleReady}
        disabled={disabled}
        theme={theme}
        setComponentUrl={setComponentUrl}
        onReload={this.onReload}
        isLoaded={this.state.isLoaded}
      />
    );
  };

  renderPlayerDurationFix = () => {
    const { theme, componentData, settings } = this.props;
    const stylesHide = {
      width: 0,
      height: 0,
      position: 'absolute',
      overflow: 'hidden',
      visibility: 'hidden',
    };

    return (
      <div style={stylesHide}>
        <VideoViewer
          componentData={componentData}
          theme={theme}
          settings={settings}
          onReady={player => {
            player.getInternalPlayer().play();
          }}
          onDuration={duration => {
            this.setState({ shouldRenderDurationFix: false });
            this.saveDurationToData(duration);
          }}
          muted
        />
      </div>
    );
  };

  onKeyDown = e => {
    if (e.key === 'Enter' || e.key === ' ') {
      this.props.onClick();
    }
  };

  render() {
    this.styles = this.styles || mergeStyles({ styles, theme: this.props.theme });
    const {
      className,
      onClick,
      t,
      componentData: { error },
      isDraggable = true,
    } = this.props;
    const { isPlayable, isLoaded, shouldRenderDurationFix } = this.state;
    const containerClassNames = classNames(this.styles.video_container, className || '');
    /* eslint-disable jsx-a11y/no-static-element-interactions */
    return (
      <div
        data-hook="videoPlayer"
        onClick={onClick}
        className={containerClassNames}
        onKeyDown={this.onKeyDown}
        draggable={isDraggable}
      >
        {!isPlayable && this.renderOverlay(this.styles, this.props.t)}
        {this.renderPlayer()}
        {shouldRenderDurationFix ? this.renderPlayerDurationFix() : null}
        {!isLoaded && !error && this.renderLoader()}
        {error && <MediaItemErrorMsg error={error} t={t} />}
      </div>
    );
    /* eslint-enable jsx-a11y/no-static-element-interactions */
  }
}

VideoComponent.propTypes = {
  componentData: PropTypes.object.isRequired,
  settings: PropTypes.object.isRequired,
  blockProps: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  theme: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  setComponentUrl: PropTypes.func,
  store: PropTypes.object.isRequired,
  block: PropTypes.object.isRequired,
  isDraggable: PropTypes.bool,
};

export { VideoComponent as Component, DEFAULTS };

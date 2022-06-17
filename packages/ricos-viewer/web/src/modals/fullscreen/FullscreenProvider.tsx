import type { ReactElement } from 'react';
import React, { Component, Fragment, Children, Suspense } from 'react';
import { emptyState } from 'ricos-common';
import type { Helpers, AvailableExperiments } from 'wix-rich-content-common';
import getImagesData from 'wix-rich-content-fullscreen/libs/getImagesData';
import type { DraftContent, FullscreenProps } from '../../index';

interface Props {
  children: ReactElement;
  helpers?: Helpers;
  initialState?: DraftContent;
  isModalSuspended: boolean;
  isMobile: boolean;
  fullscreenProps?: FullscreenProps;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  experiments?: AvailableExperiments;
}

interface State {
  isExpanded: boolean;
  index: number;
  expandModeData?: ExpandModeData;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  FullscreenModal?: any;
}

export type ExpandModeData = {
  images: Record<string, unknown>;
  imageMap: Record<number, number>;
};

export default class FullscreenProvider extends Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
      index: 0,
    };
  }

  _FullscreenModal;

  _renderFullscreenInterval;

  componentDidMount() {
    const { experiments } = this.props;
    const imagesData = getImagesData(this.props.initialState || emptyState);

    if (imagesData.images.length > 0) {
      this.setState({ expandModeData: imagesData });
      this.lazyLoadFullscreen();
      if (this.props.isMobile) {
        const timeout = parseInt(experiments?.optimizeFullScreenModal?.value || '0');
        this._renderFullscreenInterval = setTimeout(() => {
          this.renderFullScreenModal();
        }, timeout);
      }
    }
  }

  renderFullScreenModal() {
    this.setState({ FullscreenModal: this._FullscreenModal });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.initialState !== this.props.initialState) {
      const imagesData = getImagesData(nextProps.initialState || emptyState);
      if (!this._FullscreenModal && imagesData.images.length > 0) {
        this.lazyLoadFullscreen();
      }
      this.setState({ expandModeData: imagesData });
    }
  }

  componentWillUnmount() {
    clearTimeout(this._renderFullscreenInterval);
  }

  lazyLoadFullscreen() {
    const FullscreenModal = React.lazy(
      () => import(/* webpackChunkName: "FullscreenModalViewer"  */ './FullscreenModal')
    );
    this._FullscreenModal = FullscreenModal;
  }

  onClose = () => this.setState({ isExpanded: false });

  addExpand = config => {
    const { isModalSuspended } = this.props;
    if (isModalSuspended) {
      return config;
    }
    const onExpand = (blockKey: string, innerIndex = 0) => {
      const { expandModeData, FullscreenModal } = this.state;
      // protective code in case that image was clicked before fullscreen is set
      if (!FullscreenModal && !this._FullscreenModal) {
        return false;
      }

      if (!FullscreenModal && this._FullscreenModal) {
        this.renderFullScreenModal();
      }

      this.setState({
        isExpanded: true,
        // if expandModeData is not defined - expand the first image
        index: expandModeData ? expandModeData.imageMap[blockKey] + innerIndex : 0,
      });
    };
    const imageConfig = config['wix-draft-plugin-image'];
    const galleryConfig = config['wix-draft-plugin-gallery'];
    if (imageConfig && !imageConfig.onExpand) {
      config['wix-draft-plugin-image'] = { ...imageConfig, onExpand };
    }
    if (galleryConfig && !galleryConfig.onExpand) {
      config['wix-draft-plugin-gallery'] = { ...galleryConfig, onExpand };
    }
    return config;
  };

  onChildHover = () => {
    const { FullscreenModal } = this.state;
    if (!FullscreenModal && this._FullscreenModal) {
      this.renderFullScreenModal();
    }
  };

  render() {
    const { isExpanded, index, expandModeData, FullscreenModal } = this.state;
    const { children, initialState, isModalSuspended, isMobile, fullscreenProps } = this.props;
    const config = this.addExpand(children.props.config);
    return (
      <Fragment>
        {Children.only(React.cloneElement(children, { config, onHover: this.onChildHover }))}
        {FullscreenModal && (
          <Suspense fallback={<div />}>
            <FullscreenModal
              dataHook={'RicosFullScreen'}
              initialState={initialState || emptyState}
              isOpen={isExpanded && !isModalSuspended}
              images={expandModeData?.images || []}
              onClose={this.onClose}
              index={index}
              isMobile={isMobile}
              {...fullscreenProps}
            />
          </Suspense>
        )}
      </Fragment>
    );
  }
}

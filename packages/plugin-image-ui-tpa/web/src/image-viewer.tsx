import React, { RefObject } from 'react';
import classNames from 'classnames';
import { IMAGE_TYPE, ImagePluginViewerConfig, ImageConfig } from './types';
import { get, includes, isEqual, isFunction } from 'lodash';
import {
  mergeStyles,
  validate,
  anchorScroll,
  addAnchorTagToUrl,
  GlobalContext,
  Helpers,
  RichContentTheme,
  SEOSettings,
  CustomAnchorScroll,
} from 'wix-rich-content-common';

import { Image, LoadingBehaviorOptions, HoverEffectOptions } from 'wix-ui-tpa/Image';
// eslint-disable-next-line max-len

import { getImageSrc } from 'wix-rich-content-common/libs/imageUtils';

import pluginImageSchema from 'wix-rich-content-common/dist/statics/schemas/plugin-image.schema.json';
import { DEFAULTS } from './consts';
import styles from '../statics/styles/image-viewer.rtlignore.scss';
import ExpandIcon from './icons/expand';
import InPluginInput from './InPluginInput';

interface ImageViewerProps {
  componentData: {
    config: ImageConfig;
    src: { fallback: string; width: number; height: number; source: string; file_name: string };
    metadata?: { caption?: unknown; alt?: string | undefined };
    [key: string]: unknown;
    disableDownload?: boolean;
    disableExpand?: boolean;
  };
  className: string;
  dataUrl: string;
  settings: ImagePluginViewerConfig;
  defaultCaption: string;
  entityIndex: number;
  onCaptionChange: () => void;
  setFocusToBlock: () => void;
  theme: RichContentTheme;
  helpers: Helpers;
  disableRightClick: boolean;
  getInPluginEditingMode: () => unknown;
  setInPluginEditingMode: () => unknown;
  isMobile: boolean;
  setComponentUrl: (highres?: string) => unknown;
  seoMode: SEOSettings;
  blockKey: string;
  isLoading: boolean;
  customAnchorScroll?: CustomAnchorScroll;
}

interface ImageSrc {
  preload: string;
  highres: string;
}

interface ImageViewerState {
  container?: HTMLDivElement;
  fallbackImageSrc?: ImageSrc;
}

class ImageViewer extends React.Component<ImageViewerProps, ImageViewerState> {
  preloadRef: RefObject<HTMLImageElement>;

  imageRef: RefObject<HTMLImageElement>;

  styles!: Record<string, string>;

  constructor(props) {
    super(props);
    validate(props.componentData, pluginImageSchema);
    this.state = {};
    this.preloadRef = React.createRef();
    this.imageRef = React.createRef();
  }

  static contextType = GlobalContext;

  shouldUseSrcSet() {
    const { experiments } = this.context;
    return experiments?.useSrcSet?.enabled;
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.componentData, this.props.componentData)) {
      validate(nextProps.componentData, pluginImageSchema);
    }
  }

  getImageDataUrl(): ImageSrc | null {
    return this.props.dataUrl
      ? {
          preload: this.props.dataUrl,
          highres: this.props.dataUrl,
        }
      : null;
  }

  onImageLoadError = () => {
    const {
      componentData: { src },
    } = this.props;

    if (src && src.fallback) {
      this.setState({
        fallbackImageSrc: {
          preload: src.fallback,
          highres: src.fallback,
        },
      });
    }
  };

  renderTitle(data, styles) {
    const config = data.config || {};
    return (
      !!config.showTitle && (
        <div className={classNames(styles.imageTitle)}>{(data && data.title) || ''}</div>
      )
    );
  }

  renderDescription(data, styles) {
    const config = data.config || {};
    return (
      !!config.showDescription && (
        <div className={classNames(styles.imageDescription)}>
          {(data && data.description) || ''}
        </div>
      )
    );
  }

  renderCaption(caption) {
    const { onCaptionChange, setFocusToBlock, setInPluginEditingMode } = this.props;
    const { imageCaption, link } = this.styles;
    const classes = classNames(imageCaption, this.hasLink() && link);
    return onCaptionChange ? (
      <InPluginInput
        setInPluginEditingMode={setInPluginEditingMode}
        className={classes}
        value={caption}
        onChange={onCaptionChange}
        setFocusToBlock={setFocusToBlock}
      />
    ) : (
      <span dir="auto" className={classes}>
        {caption}
      </span>
    );
  }

  shouldRenderCaption() {
    const { getInPluginEditingMode, settings, componentData, defaultCaption } = this.props;
    const caption = componentData.metadata?.caption;

    if (includes(get(settings, 'toolbar.hidden'), 'settings')) {
      return false;
    }
    if (
      caption === undefined ||
      (caption === '' && !getInPluginEditingMode?.()) ||
      caption === defaultCaption
    ) {
      return false;
    }
    const data = componentData || DEFAULTS;
    if (data.config.size === 'original' && data.src && data.src.width) {
      return data.src.width >= 350;
    }
    return true;
  }

  handleExpand = e => {
    e.preventDefault();
    const {
      settings: { onExpand },
      helpers = {},
    } = this.props;
    helpers.onViewerAction?.(IMAGE_TYPE, 'Click', 'expand_image');
    this.hasExpand() && onExpand?.(this.props.blockKey);
  };

  scrollToAnchor = e => {
    const {
      componentData: {
        config: { link: { anchor } = {} },
      },
      customAnchorScroll,
    } = this.props;
    if (customAnchorScroll) {
      customAnchorScroll(e, anchor as string);
    } else {
      const anchorString = `viewer-${anchor}`;
      const element = document.getElementById(anchorString);
      addAnchorTagToUrl(anchorString);
      anchorScroll(element, this.context.experiments);
    }
  };

  hasLink = () => this.props.componentData?.config?.link?.url;

  hasAnchor = () => this.props.componentData?.config?.link?.anchor;

  onKeyDown = e => {
    // Allow key events only in viewer
    if ((e.key === 'Enter' || e.key === ' ') && !this.props.getInPluginEditingMode) {
      this.handleClick(e);
    }
  };

  handleClick = e => {
    if (this.hasLink()) {
      return null;
    } else if (this.hasAnchor()) {
      e.preventDefault();
      e.stopPropagation(); // fix problem with wix platform, where it wouldn't scroll and sometimes jump to different page
      this.scrollToAnchor(e);
    } else {
      this.handleExpand(e);
    }
  };

  handleRef = e => {
    if (!this.state.container) {
      this.setState({ container: e }); //saving the container on the state to trigger a new render
    }
  };

  handleContextMenu = e => {
    const {
      componentData: { disableDownload = false },
    } = this.props;
    return disableDownload && e.preventDefault();
  };

  hasExpand = () => {
    const { componentData, settings } = this.props;
    let disableExpand = false;
    if (componentData.disableExpand !== undefined) {
      disableExpand = componentData.disableExpand;
    } else if (settings.disableExpand !== undefined) {
      disableExpand = settings.disableExpand;
    }
    return !disableExpand && settings.onExpand;
  };

  renderExpandIcon = () => {
    return (
      <div className={this.styles.expandContainer}>
        <ExpandIcon className={this.styles.expandIcon} onClick={this.handleExpand} />
      </div>
    );
  };

  // eslint-disable-next-line complexity
  render() {
    this.styles = this.styles || mergeStyles({ styles, theme: this.props.theme });
    const { componentData, className, settings, setComponentUrl, helpers } = this.props;
    const { fallbackImageSrc } = this.state;
    const data = componentData || DEFAULTS;
    let { metadata } = componentData;
    if (!metadata) {
      metadata = {};
    }
    const itemClassName = classNames(this.styles.imageWrapper, className, {
      [this.styles.pointer]: this.hasExpand() as boolean,
    });

    const _getImageSrc = src => {
      if (fallbackImageSrc) {
        return fallbackImageSrc;
      }
      if (typeof src === 'object' && !src.source && src.file_name) {
        return src.file_name;
      } else {
        getImageSrc(src, helpers?.getImageUrl);
      }
    };

    const imageClassName = this.styles.image;
    const imageSrc = fallbackImageSrc || this.getImageDataUrl() || _getImageSrc(data.src);
    let imageProps = {};
    if (data.src && settings && settings.imageProps) {
      imageProps = isFunction(settings.imageProps)
        ? settings.imageProps(data.src)
        : settings.imageProps;
    }

    console.log('image props stiil need to be handled', imageProps); //eslint-disable-line

    setComponentUrl?.(imageSrc?.highres);

    const accesibilityProps = !this.hasLink() && { role: 'button', tabIndex: 0 };

    /* eslint-disable jsx-a11y/no-static-element-interactions */

    return (
      <div
        data-hook="imageViewer"
        className={this.styles.imageContainer}
        ref={this.handleRef}
        onContextMenu={this.handleContextMenu}
        {...accesibilityProps}
      >
        <div
          className={itemClassName}
          aria-label={metadata.alt}
          onClick={this.handleClick}
          onKeyDown={this.onKeyDown}
        >
          <Image
            src={imageSrc}
            className={imageClassName}
            width={data.src?.width}
            height={data.src?.height}
            alt={metadata.alt}
            loadingBehavior={LoadingBehaviorOptions.blur}
            hoverEffect={HoverEffectOptions.zoom}
            fluid
          />

          {this.hasExpand() && this.renderExpandIcon()}
        </div>
        {this.renderTitle(data, this.styles)}
        {this.renderDescription(data, this.styles)}
        {this.shouldRenderCaption() && this.renderCaption(metadata.caption)}
      </div>
    );
  }
}

export default ImageViewer;

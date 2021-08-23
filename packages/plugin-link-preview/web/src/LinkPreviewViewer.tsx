/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable camelcase */
import React, { Component } from 'react';
import { isEqual } from 'lodash';
import {
  mergeStyles,
  validate,
  getHost,
  ComponentData,
  Helpers,
  RichContentTheme,
} from 'wix-rich-content-common';
import pluginLinkPreviewSchema from 'wix-rich-content-common/dist/statics/schemas/plugin-link-preview.schema.json';
import styles from '../statics/styles/link-preview.scss';
import HtmlComponent from 'wix-rich-content-plugin-html/libs/HtmlComponent';
import { LinkPreviewPluginEditorConfig, LINK_PREVIEW_TYPE } from './types';

interface LinkPreviewViewerProps {
  componentData: Omit<ComponentData, 'link'> & {
    link: {
      url: string;
      target?: string;
      rel?: string;
    };
  };
  settings: LinkPreviewPluginEditorConfig;
  theme: RichContentTheme;
  isMobile: boolean;
  iframeSandboxDomain: string;
  helpers?: Helpers;
}

class LinkPreviewViewer extends Component<LinkPreviewViewerProps, { imageHeight?: number }> {
  image: HTMLDivElement | null = null;

  styles: Record<string, string>;

  constructor(props: LinkPreviewViewerProps) {
    super(props);
    const { componentData, theme } = props;
    validate(componentData, pluginLinkPreviewSchema);
    this.state = {};
    this.styles = mergeStyles({ styles, theme });
  }

  componentWillReceiveProps(nextProps: LinkPreviewViewerProps) {
    if (!isEqual(nextProps.componentData, this.props.componentData)) {
      validate(nextProps.componentData, pluginLinkPreviewSchema);
    }
  }

  componentDidMount() {
    validate(this.props.componentData, pluginLinkPreviewSchema);
    this.setState({ imageHeight: this.image?.offsetHeight });
  }

  getUrlForDisplay = (url: string) => url.replace(/^https?:\/\//, '');

  onLinkPreviewClick = () =>
    this.props.helpers?.onViewerAction?.(
      LINK_PREVIEW_TYPE,
      'Click',
      this.props.componentData.config.link.url || ''
    );

  render() {
    const { componentData, theme, isMobile, settings, iframeSandboxDomain } = this.props;
    const { enableEmbed = true } = settings;
    const { imageHeight } = this.state;

    const {
      title,
      description,
      thumbnail_url: thumbnailUrl,
      html,
      config: {
        link: { url },
      },
    } = componentData;
    const {
      linkPreview,
      linkPreviewUrl,
      linkPreviewInfo,
      linkPreviewTitle,
      linkPreviewImage,
      linkPreviewDescription,
    } = this.styles;

    if (enableEmbed && html) {
      const htmlCompProps = {
        componentData: {
          ...componentData,
          srcType: 'html',
          src: unescape(html),
          config: {},
        },
        settings,
        theme,
        isMobile,
        iframeSandboxDomain,
      };
      return <HtmlComponent {...htmlCompProps} />;
    } else {
      return (
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
        <figure
          className={linkPreview}
          data-hook="linkPreviewViewer"
          onClick={this.onLinkPreviewClick}
        >
          {thumbnailUrl && (
            <div
              style={{
                width: isMobile ? '110px' : imageHeight,
                height: imageHeight,
                backgroundImage: `url(${thumbnailUrl})`,
              }}
              className={linkPreviewImage}
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              alt={title}
              ref={ref => (this.image = ref)}
            />
          )}
          <section className={linkPreviewInfo}>
            <div className={linkPreviewUrl}>{this.getUrlForDisplay(getHost(url) || url)}</div>
            <figcaption className={linkPreviewTitle}>{title}</figcaption>
            {description && <div className={linkPreviewDescription}>{description}</div>}
          </section>
        </figure>
      );
    }
  }
}

export default LinkPreviewViewer;

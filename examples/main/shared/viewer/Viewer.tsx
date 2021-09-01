import React, { PureComponent, RefObject } from 'react';
import { RichContentViewer } from 'wix-rich-content-viewer';
import {
  DraftContent,
  SEOSettings,
  AvailableExperiments,
  LinkPreviewData,
} from 'wix-rich-content-common';
import * as Plugins from './ViewerPlugins';
import theme from '../theme/theme'; // must import after custom styles
import { TextSelectionToolbar, TwitterButton } from 'wix-rich-content-text-selection-toolbar';
import { GALLERY_TYPE } from 'wix-rich-content-plugin-gallery';
import { RicosViewer } from 'ricos-viewer';

const anchorTarget = '_blank';
const rel = { nofollow: true };

interface ExampleViewerProps {
  initialState?: DraftContent;
  isMobile?: boolean;
  locale: string;
  scrollingElementFn?: () => Element;
  seoMode?: SEOSettings;
  experiments: AvailableExperiments;
  linkPreviewPopoverFetchData?: (url: string) => Promise<LinkPreviewData>;
}

interface ExampleViewerState {
  disabled: boolean;
}

export default class Viewer extends PureComponent<ExampleViewerProps, ExampleViewerState> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  viewerRef: RefObject<any>;

  constructor(props: ExampleViewerProps) {
    super(props);
    this.state = {
      disabled: false,
    };
    this.viewerRef = React.createRef();
  }

  getConfig = () => {
    const { scrollingElementFn } = this.props;
    const additionalConfig = {
      [GALLERY_TYPE]: { scrollingElement: scrollingElementFn },
    };
    return Plugins.getConfig(additionalConfig);
  };

  render() {
    const {
      isMobile,
      initialState,
      locale,
      seoMode,
      experiments,
      linkPreviewPopoverFetchData,
    } = this.props;
    const { disabled } = this.state;
    const helpers = {
      // This is for debugging only
      onViewerAction: async (pluginId, actionName, value) =>
        // eslint-disable-next-line no-console
        console.log('onViewerAction', pluginId, actionName, value),
      // eslint-disable-next-line no-console
      onViewerLoaded: async (...args) => console.log('onViewerLoaded', ...args),
    };

    return (
      <>
        <div id="rich-content-viewer" ref={this.viewerRef} className="viewer">
          <RicosViewer
            content={initialState}
            plugins={Plugins.viewerPlugins}
            locale={locale}
            linkSettings={{ rel, anchorTarget }}
            isMobile={isMobile}
            cssOverride={theme}
            mediaSettings={{ pauseMedia: disabled }}
            seoSettings={seoMode}
            experiments={experiments}
            linkPreviewPopoverFetchData={linkPreviewPopoverFetchData}
          >
            <RichContentViewer helpers={helpers} />
          </RicosViewer>
        </div>
        {!isMobile ? (
          <TextSelectionToolbar container={this.viewerRef.current}>
            {selectedText => (
              <TwitterButton selectedText={selectedText} onViewerAction={helpers.onViewerAction} />
            )}
          </TextSelectionToolbar>
        ) : null}
      </>
    );
  }
}

import type { FunctionComponent, ReactElement } from 'react';
import React, { Component, Children } from 'react';

import pluginsStrategy from './pluginsStrategy/pluginsStrategy';
import themeStrategy from './themeStrategy/themeStrategy';
import { merge } from 'lodash';

import previewStrategy from './previewStrategy/previewStrategy';
import type { PreviewConfig } from 'wix-rich-content-preview';
import type { RicosEditorProps, RicosViewerProps, RichContentProps, BasePlugin } from './types';
import {
  convertRelStringToObject,
  convertRelObjectToString,
} from 'wix-rich-content-common/libs/linkConverters';
import { applyBIGenerics } from './biCallbacks';
import { pipe } from 'fp-ts/function';
import type { EditorCommands, IUploadObserver, RichContentTheme, ThemeData } from 'ricos-types';
import UploadContextWrapper from './withUploadContext';

interface EngineProps extends RicosEditorProps, RicosViewerProps {
  children: ReactElement;
  plugins?: BasePlugin[];
  RicosModal: FunctionComponent;
  isViewer: boolean;
  isPreviewExpanded?: boolean;
  onPreviewExpand?: PreviewConfig['onPreviewExpand'];
  getContentId: () => string | undefined;
  editorCommands?: EditorCommands;
  localeResource?: Record<string, string>;
  UploadObserver?: IUploadObserver;
}

export class RicosEngine extends Component<EngineProps> {
  static defaultProps = { locale: 'en', isMobile: false };

  runStrategies() {
    const {
      cssOverride,
      plugins = [],
      isViewer = false,
      content,
      preview,
      theme: ricosTheme,
      isPreviewExpanded = false,
      onPreviewExpand,
      children,
      experiments,
    } = this.props;

    const { theme, html, themeData } = themeStrategy({
      plugins,
      cssOverride,
      ricosTheme,
      experiments,
    });
    const htmls: ReactElement[] = [];
    if (html) {
      htmls.push(html);
    }

    const strategiesProps = merge(
      { theme },
      pluginsStrategy({
        themeData: themeData as ThemeData,
        isViewer,
        plugins,
        childProps: children.props,
        cssOverride: theme as RichContentTheme,
        content,
        experiments,
      })
    );

    const { initialState: previewContent, ...previewStrategyResult } = previewStrategy({
      isViewer,
      isPreviewExpanded,
      onPreviewExpand,
      previewConfig: preview,
      content,
    });

    return {
      strategyProps: merge(strategiesProps, previewStrategyResult),
      previewContent,
      htmls,
    };
  }

  render() {
    const {
      _rcProps,
      children,
      isMobile,
      addAnchors,
      toolbarSettings,
      modalSettings = {},
      isPreviewExpanded,
      placeholder,
      content,
      getContentId,
      RicosModal,
      onError,
      mediaSettings = {},
      linkSettings = {},
      linkPanelSettings = {},
      maxTextLength,
      textAlignment,
      onAtomicBlockFocus,
      experiments,
      iframeSandboxDomain,
      textWrap = true,
      editorCommands,
      isViewer,
      locale,
      localeResource,
      UploadObserver,
    } = this.props;

    const { strategyProps, previewContent, htmls } = this.runStrategies();

    const { useStaticTextToolbar, textToolbarContainer, getToolbarSettings } =
      toolbarSettings || {};

    const { openModal, closeModal, ariaHiddenId, container, onModalOpen, onModalClose } =
      modalSettings;
    const { pauseMedia, disableRightClick, fullscreenProps } = mediaSettings;
    const { anchorTarget = '_blank', customAnchorScroll } = linkSettings;
    let { relValue, rel } = linkSettings;
    const {
      blankTargetToggleVisibilityFn,
      nofollowRelToggleVisibilityFn,
      showNewTabCheckbox,
      showNoFollowCheckbox,
    } = linkPanelSettings;
    if (blankTargetToggleVisibilityFn) {
      // eslint-disable-next-line no-console
      console.warn(
        // eslint-disable-next-line max-len
        `blankTargetToggleVisibilityFn is deprecated, Please use showNewTabCheckbox prop instead.`
      );
      linkPanelSettings.showNewTabCheckbox =
        linkPanelSettings.blankTargetToggleVisibilityFn?.() || showNewTabCheckbox;
    }
    if (nofollowRelToggleVisibilityFn) {
      // eslint-disable-next-line no-console
      console.warn(
        // eslint-disable-next-line max-len
        `nofollowRelToggleVisibilityFn is deprecated, Please use showNoFollowCheckbox prop instead.`
      );
      linkPanelSettings.showNoFollowCheckbox =
        linkPanelSettings.nofollowRelToggleVisibilityFn?.() || showNoFollowCheckbox;
    }
    if (relValue) {
      // eslint-disable-next-line no-console
      console.warn(
        // eslint-disable-next-line max-len
        `relValue is deprecated, Please use rel prop instead.`
      );
      rel = convertRelStringToObject(relValue) || rel;
    }
    relValue = convertRelObjectToString(rel);
    const disableDownload = mediaSettings?.disableDownload || disableRightClick;
    // any of ricos props that should be merged into child
    const isPreview = () => !!(previewContent && !isPreviewExpanded);
    const ricosPropsToMerge: RichContentProps = {
      addAnchors,
      isMobile,
      maxTextLength,
      textToolbarType:
        !isMobile && (textToolbarContainer || useStaticTextToolbar) ? 'static' : 'inline',
      config: {
        getToolbarSettings,
        uiSettings: { disableDownload, linkPanel: linkPanelSettings },
      },
      initialState: previewContent || content,
      placeholder,
      onError,
      helpers: {
        openModal,
        closeModal,
        isPreview,
      },
      disabled: pauseMedia,
      anchorTarget,
      relValue,
      customAnchorScroll,
      textAlignment,
      onAtomicBlockFocus,
      experiments,
      iframeSandboxDomain,
      textWrap,
    };

    const mergedRCProps = pipe(
      merge(strategyProps, _rcProps, ricosPropsToMerge, children.props),
      applyBIGenerics(getContentId)
    );

    const useUploadContext = !isViewer && experiments?.useUploadContext?.enabled;

    const modal = (
      <RicosModal
        key={'ricosElement'}
        parentClass={this.props?.theme?.parentClass}
        ariaHiddenId={ariaHiddenId}
        isModalSuspended={isPreview()}
        container={container}
        fullscreenProps={fullscreenProps}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        {...(mergedRCProps as any)}
        onModalOpen={onModalOpen}
        onModalClose={onModalClose}
        editorCommands={editorCommands}
      >
        {Children.only(React.cloneElement(children, mergedRCProps))}
      </RicosModal>
    );

    return [
      ...htmls,
      useUploadContext ? (
        <UploadContextWrapper
          {...{
            locale,
            localeResource,
            editorCommands,
            helpers: mergedRCProps.helpers,
            UploadObserver,
            isMobile,
          }}
        >
          {modal}
        </UploadContextWrapper>
      ) : (
        modal
      ),
    ];
  }
}

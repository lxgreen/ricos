/* eslint-disable brace-style */
import type { Node } from 'prosemirror-model';
import type { RefObject } from 'react';
import React, { createRef, forwardRef, useContext } from 'react';
import type { RicosEditorProps } from 'ricos-common';
import { ContentQueryProvider } from 'ricos-content-query';
import { EditorContextConsumer, EditorContextProvider } from 'ricos-context';
import { ModalProvider } from 'ricos-modals';
import type { PluginsContextValue } from 'ricos-plugins';
import { PluginsContext } from 'ricos-plugins';
import { Shortcuts } from 'ricos-shortcuts';
import type { TiptapAdapter } from 'ricos-tiptap-types';
import type { RicosPortal as RicosPortalType } from 'ricos-types';
import type { EditorCommands, EditorContextType, Pubsub } from 'wix-rich-content-common';
import { getLangDir } from 'wix-rich-content-common';
import { getEmptyDraftContent, TOOLBARS } from 'wix-rich-content-editor-common';
import { Content, ToolbarContext } from 'wix-rich-content-toolbars-v3';
import type { ToolbarContextType } from 'wix-rich-content-toolbars-v3/src/utils/toolbarContexts';
import type { RichContentAdapter } from 'wix-tiptap-editor';
import { initializeTiptapAdapter } from 'wix-tiptap-editor';
import RicosPortal from '../modals/RicosPortal';
import { LocaleResourceProvider } from '../RicosContext/locale-resource-provider';
import type { RicosEditorRef } from '../RicosEditorRef';
import { convertToolbarContext } from '../toolbars/convertToolbarContext';
import FloatingAddPluginMenu from '../toolbars/FloatingPluginMenu/FloatingAddPluginMenu';
import { FooterToolbar } from '../toolbars/FooterToolbar';
import PluginsToolbar from '../toolbars/PluginToolbar';
import pluginsConfigMerger from '../utils/pluginsConfigMerger/pluginsConfigMerger';
import RicosEditor from './RicosEditor';
import RicosStyles from './RicosStyles';
import RicosToolbars from './RicosToolbars';
import { UploadProvider } from './UploadProvider';

type State = {
  error: string;
};

interface Props extends RicosEditorProps {
  pluginsContext: PluginsContextValue;
}

export class FullRicosEditor extends React.Component<Props, State> implements RicosEditorRef {
  content = Content.create<Node[]>([]);

  state = { error: '' };

  editor = React.createRef<RicosEditorRef>();

  portalRef: RefObject<RicosPortalType>;

  private readonly tiptapAdapter: TiptapAdapter;

  constructor(props) {
    super(props);
    this.portalRef = createRef<RicosPortalType>();
    this.tiptapAdapter = initializeTiptapAdapter(props);
  }

  static getDerivedStateFromError(error: string) {
    return { error };
  }

  initPlugins = plugins => {
    const { _rcProps, pluginsContext } = this.props;
    plugins.forEach(plugin => pluginsContext.plugins.register(plugin));
    const { handleFileUpload, handleFileSelection } = _rcProps?.helpers || {};
    pluginsContext.plugins.configure({ handleFileUpload, handleFileSelection });
  };

  componentDidMount() {
    const { plugins, _rcProps } = this.props;
    const configuredPlugins = pluginsConfigMerger(plugins, _rcProps) || [];
    this.initPlugins(configuredPlugins);
    this.forceUpdate();
  }

  componentWillUnmount() {
    this.props.pluginsContext.plugins.destroy();
  }

  componentDidCatch(error, errorInfo) {
    console.error({ error, errorInfo });
  }

  focus: RicosEditorRef['focus'] = () => {
    this.editor.current?.focus();
  };

  blur: RicosEditorRef['blur'] = () => {
    this.editor.current?.blur();
  };

  getContent: RicosEditorRef['getContent'] = (postId, forPublish, shouldRemoveErrorBlocks = true) =>
    this.editor.current?.getContent(postId, forPublish, shouldRemoveErrorBlocks) ||
    Promise.resolve(getEmptyDraftContent());

  getContentPromise: RicosEditorRef['getContentPromise'] = ({ publishId } = {}) =>
    this.getContent(publishId, !!publishId);

  getContentTraits: RicosEditorRef['getContentTraits'] = () => {
    return (
      this.editor.current?.getContentTraits() || {
        isEmpty: false,
        isContentChanged: false,
        isLastChangeEdit: false,
      }
    );
  };

  getToolbarProps: RicosEditorRef['getToolbarProps'] = type => {
    return (
      this.editor.current?.getToolbarProps(type) || {
        buttons: {},
        context: {} as EditorContextType,
        pubsub: {} as Pubsub,
      }
    );
  };

  getEditorCommands: RicosEditorRef['getEditorCommands'] = () => {
    return this.editor.current?.getEditorCommands() || ({} as EditorCommands);
  };

  getToolbarContext(getEditorCommands: () => EditorCommands): ToolbarContextType {
    const {
      theme,
      locale,
      linkPanelSettings,
      linkSettings,
      experiments,
      cssOverride,
      isMobile,
      toolbarSettings,
      pluginsContext: { plugins },
    } = this.props;
    const helpers = this.props._rcProps?.helpers;

    const toolbarContext = convertToolbarContext({
      isMobile,
      theme,
      locale,
      helpers,
      plugins,
      linkPanelSettings,
      linkSettings,
      experiments,
      toolbarSettings,
      cssOverride,
      contentId: '',
      getEditorCommands,
    });
    return toolbarContext as unknown as ToolbarContextType;
  }

  getPluginMenuConfig = () =>
    this.props?.toolbarSettings
      ?.getToolbarSettings?.({})
      ?.find(toolbar => toolbar.name === TOOLBARS.SIDE)?.addPluginMenuConfig || {};

  render() {
    try {
      if (this.state.error) {
        this.props.onError?.(this.state.error);
        return null;
      }

      return this.renderEditor();
    } catch (e) {
      this.props.onError?.(e);
      return null;
    }
  }

  private renderEditor() {
    const {
      isMobile,
      experiments,
      locale,
      localeContent,
      theme,
      _rcProps,
      toolbarSettings,
      content,
    } = this.props;
    return (
      <>
        <RicosPortal ref={this.portalRef} className={theme?.parentClass}>
          <RicosStyles theme={theme || {}} documentStyle={content?.documentStyle || {}} />
        </RicosPortal>
        {this.portalRef.current && (
          <LocaleResourceProvider
            isMobile={isMobile}
            experiments={experiments}
            locale={locale}
            localeContent={localeContent}
            languageDir={getLangDir(locale)}
            theme={theme}
            portal={this.portalRef.current}
          >
            <EditorContextProvider adapter={this.tiptapAdapter}>
              <>
                <Shortcuts group="global" root>
                  <>
                    <UploadProvider helpers={_rcProps?.helpers}>
                      <ModalProvider>
                        <EditorContextConsumer>
                          {(editor: RichContentAdapter) => (
                            <ToolbarContext.Provider
                              value={{
                                ...this.getToolbarContext(editor.getEditorCommands),
                                portal: this.portalRef.current as RicosPortalType,
                              }}
                            >
                              <ContentQueryProvider editor={editor.tiptapEditor}>
                                <RicosToolbars
                                  content={this.content}
                                  toolbarSettings={toolbarSettings}
                                />
                                <FloatingAddPluginMenu
                                  addPluginMenuConfig={this.getPluginMenuConfig()}
                                  helpers={_rcProps?.helpers}
                                  isMobile={isMobile}
                                />

                                <PluginsToolbar content={this.content} />
                                <FooterToolbar />
                              </ContentQueryProvider>
                            </ToolbarContext.Provider>
                          )}
                        </EditorContextConsumer>
                      </ModalProvider>
                    </UploadProvider>

                    <Shortcuts group="formatting">
                      <RicosEditor {...this.props} ref={this.editor} />
                    </Shortcuts>
                  </>
                </Shortcuts>
              </>
            </EditorContextProvider>
          </LocaleResourceProvider>
        )}
      </>
    );
  }
}

export default forwardRef<FullRicosEditor, RicosEditorProps>((props, ref) => {
  const { plugins } = useContext(PluginsContext);
  return <FullRicosEditor {...props} ref={ref} pluginsContext={{ plugins }} />;
});

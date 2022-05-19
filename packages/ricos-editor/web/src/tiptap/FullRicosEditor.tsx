/* eslint-disable brace-style */
import type { Node } from 'prosemirror-model';
import type { RefObject } from 'react';
import React, { createRef, forwardRef } from 'react';
import type { RicosEditorProps } from 'ricos-common';
import { ModalProvider } from 'ricos-modals';
import type {
  EditorCommands,
  EditorContextType,
  EditorPlugin,
  Pubsub,
} from 'wix-rich-content-common';
import { getLangDir } from 'wix-rich-content-common';
import { getEmptyDraftContent, TOOLBARS } from 'wix-rich-content-editor-common';
import { Content, ToolbarContext } from 'wix-rich-content-toolbars-v3';
import type { ToolbarContextType } from 'wix-rich-content-toolbars-v3/src/utils/toolbarContexts';
import type { RichContentAdapter } from 'wix-tiptap-editor';
import { Shortcuts } from 'ricos-shortcuts';
import { TiptapEditorConsumer, TiptapEditorProvider } from 'wix-tiptap-editor';
import { LocaleResourceProvider } from '../RicosContext/locale-resource-provider';
import type { RicosEditorRef } from '../RicosEditorRef';
import { convertToolbarContext } from '../toolbars/convertToolbarContext';
import FloatingAddPluginMenu from '../toolbars/FloatingPluginMenu/FloatingAddPluginMenu';
import pluginsConfigMerger from '../utils/pluginsConfigMerger/pluginsConfigMerger';
import RicosEditor from './RicosEditor';
import RicosToolbars from './RicosToolbars';
import ThemeStyleTag from './ThemeStyleTag';
import { UploadProvider } from './UploadProvider';
import RicosPortal from './RicosPortal';
import type { RicosPortal as RicosPortalType } from 'ricos-types';

type State = {
  error: string;
};

export class FullRicosEditor
  extends React.Component<RicosEditorProps, State>
  implements RicosEditorRef
{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private toolbarContext: any;

  content = Content.create<Node[]>([]);

  state = { error: '' };

  plugins!: EditorPlugin[];

  editor = React.createRef<RicosEditorRef>();

  portalRef: RefObject<RicosPortalType>;

  constructor(props) {
    super(props);
    this.plugins = pluginsConfigMerger(props.plugins, props._rcProps) || [];
    this.portalRef = createRef<RicosPortalType>();
  }

  static getDerivedStateFromError(error: string) {
    return { error };
  }

  componentDidMount() {
    this.forceUpdate();
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
    } = this.props;
    const helpers = this.props._rcProps?.helpers;

    const toolbarContext = convertToolbarContext({
      isMobile,
      theme,
      locale,
      helpers,
      plugins: this.plugins,
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
      plugins,
      _rcProps,
      toolbarSettings,
      content,
      injectedContent,
    } = this.props;
    return (
      <>
        <RicosPortal ref={this.portalRef} className={theme?.parentClass}>
          <ThemeStyleTag theme={theme} />
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
            <TiptapEditorProvider
              plugins={this.plugins}
              content={injectedContent ?? content ?? getEmptyDraftContent()}
              ricosEditorProps={this.props}
            >
              <>
                <Shortcuts group="global" root>
                  <>
                    <UploadProvider helpers={_rcProps?.helpers}>
                      <ModalProvider>
                        <TiptapEditorConsumer>
                          {(editor: RichContentAdapter) => (
                            <ToolbarContext.Provider
                              value={{
                                ...this.getToolbarContext(editor.getEditorCommands),
                                portal: this.portalRef.current as RicosPortalType,
                              }}
                            >
                              <RicosToolbars
                                content={this.content}
                                toolbarSettings={toolbarSettings}
                              />
                              <FloatingAddPluginMenu
                                pluginsButtons={plugins
                                  ?.filter(plugin => plugin.addButtons)
                                  .map(plugin => plugin.addButtons)}
                                addPluginMenuConfig={this.getPluginMenuConfig()}
                                helpers={_rcProps?.helpers}
                              />
                            </ToolbarContext.Provider>
                          )}
                        </TiptapEditorConsumer>
                      </ModalProvider>
                    </UploadProvider>

                    <Shortcuts group="formatting">
                      <RicosEditor {...this.props} plugins={this.plugins} ref={this.editor} />
                    </Shortcuts>
                  </>
                </Shortcuts>
              </>
            </TiptapEditorProvider>
          </LocaleResourceProvider>
        )}
      </>
    );
  }
}

export default forwardRef<FullRicosEditor, RicosEditorProps>((props, ref) => (
  <FullRicosEditor {...props} ref={ref} />
));

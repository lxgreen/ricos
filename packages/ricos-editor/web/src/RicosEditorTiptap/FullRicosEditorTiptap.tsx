/* eslint-disable brace-style */
import type { Node } from 'prosemirror-model';
import React, { forwardRef } from 'react';
import type { RicosEditorProps, ThemeStrategyResult } from 'ricos-common';
import { themeStrategy } from 'ricos-common';
import { ModalProvider } from 'ricos-modals';
import { Shortcuts } from 'ricos-shortcuts';
import { getLangDir } from 'wix-rich-content-common';
import {
  EditorEvents,
  EditorEventsContext,
} from 'wix-rich-content-editor-common/libs/EditorEventsContext';
import { Content, RicosTiptapToolbar, ToolbarContext } from 'wix-rich-content-toolbars-v3';
import type { RichContentAdapter } from 'wix-tiptap-editor';
import { LocaleResourceProvider } from '../RicosContext/locale-resource-provider';
import { UploadProvider } from '../RicosContext/UploadProvider';
import type { RicosEditorRef } from '../RicosEditorRef';
import { convertToolbarContext } from '../toolbars/convertToolbarContext';
import FloatingAddPluginMenu from '../toolbars/FloatingPluginMenu/FloatingAddPluginMenu';
import { publishBI } from '../utils/bi/publish';
import RicosEditorTiptap from './RicosEditorTiptap';
import pluginsConfigMerger from '../utils/pluginsConfigMerger/pluginsConfigMerger';

type State = {
  error: string;
};

export class FullRicosEditorTiptap
  extends React.Component<RicosEditorProps, State>
  implements RicosEditorRef
{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private editor: any;

  private editorAdapter!: RichContentAdapter;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private toolbarContext: any;

  content = Content.create<Node[]>([]);

  state = { error: '' };

  themeStylesCss: ThemeStrategyResult['html'];

  plugins: RicosEditorProps['plugins'];

  constructor(props) {
    super(props);
    this.editor = null;
    this.getEditorCommands = this.getEditorCommands.bind(this);
    this.themeStylesCss = themeStrategy({ ricosTheme: props.ricosTheme }).html;
    this.plugins = pluginsConfigMerger(props.plugins, props._rcProps);
  }

  componentDidMount() {
    this.props.editorEvents?.subscribe(EditorEvents.RICOS_PUBLISH, this.onPublish);
  }

  componentWillUnmount() {
    this.props.editorEvents?.unsubscribe(EditorEvents.RICOS_PUBLISH, this.onPublish);
  }

  static getDerivedStateFromError(error: string) {
    return { error };
  }

  componentDidCatch(error, errorInfo) {
    console.error({ error, errorInfo });
  }

  onPublish = async () => {
    const draftContent = this.editorAdapter.getDraftContent();
    const onPublish = this.props._rcProps?.helpers?.onPublish;
    publishBI(draftContent, onPublish);
    console.log('editor publish callback'); // eslint-disable-line
    return {
      type: 'EDITOR_PUBLISH',
      data: await Promise.resolve(draftContent),
    };
  };

  focus: RicosEditorRef['focus'] = () => {
    this.editorAdapter.focus();
  };

  blur: RicosEditorRef['blur'] = () => {
    this.editorAdapter.blur();
  };

  getContent: RicosEditorRef['getContent'] = (postId, forPublish) => {
    return this.editorAdapter.getContent(postId, forPublish);
  };

  getContentPromise: RicosEditorRef['getContentPromise'] = ({ flush, publishId } = {}) => {
    return this.editorAdapter.getContentPromise({ flush, publishId });
  };

  getContentTraits: RicosEditorRef['getContentTraits'] = () => {
    return this.editorAdapter.getContentTraits();
  };

  getToolbarProps: RicosEditorRef['getToolbarProps'] = type => {
    return this.editorAdapter.getToolbarProps(type);
  };

  getEditorCommands: RicosEditorRef['getEditorCommands'] = () => {
    return this.editorAdapter.getEditorCommands();
  };

  getToolbarContext() {
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
    const helpers = this.props?._rcProps?.helpers;

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
      t: this.editorAdapter?.getT?.(),
      getEditorCommands: this.getEditorCommands,
    });

    return toolbarContext;
  }

  onSelectionUpdate = ({ editor }) => {
    const getSelectedNodes = ({ editor }) => {
      const selection = editor.state.selection;
      const nodes: Node[] = [];
      editor.state.doc.nodesBetween(selection.from, selection.to, (node: Node) => {
        nodes.push(node);
      });

      return nodes;
    };
    const selectedNodes = getSelectedNodes({ editor });

    this.content.update(selectedNodes);
  };

  onEditorLoad = editor => {
    this.setEditor(editor);
    this.editor.on('selectionUpdate', this.onSelectionUpdate);
  };

  setEditor(editor) {
    if (editor?.editor) {
      this.editorAdapter = editor;
      this.editor = editor.editor;
    }
  }

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
    const { isMobile, experiments, locale, localeContent, theme, _rcProps } = this.props;
    const toolbarContext = this.getToolbarContext();
    if (!this.editor) {
      return (
        <RicosEditorTiptap
          {...this.props}
          plugins={this.plugins}
          onLoad={editor => {
            this.onEditorLoad(editor);
            this.forceUpdate();
          }}
        />
      );
    }
    return (
      <LocaleResourceProvider
        isMobile={isMobile}
        experiments={experiments}
        locale={locale}
        localeContent={localeContent}
        languageDir={getLangDir(locale)}
        getEditorCommands={this.getEditorCommands}
        theme={theme}
      >
        <Shortcuts group="global" root>
          <div>
            {this.themeStylesCss}
            {this.editor && (
              <UploadProvider helpers={_rcProps?.helpers}>
                <ModalProvider>
                  {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                  <ToolbarContext.Provider value={toolbarContext as any}>
                    <RicosTiptapToolbar
                      content={this.content}
                      editorCommands={this.editor.commandManager}
                    />
                    <FloatingAddPluginMenu
                      pluginsButtons={this.plugins
                        ?.filter(plugin => plugin.addButtons)
                        .map(plugin => plugin.addButtons)}
                      editor={this.editor}
                    />
                  </ToolbarContext.Provider>
                </ModalProvider>
              </UploadProvider>
            )}
            <Shortcuts group="formatting">
              <RicosEditorTiptap
                {...this.props}
                plugins={this.plugins}
                onLoad={editor => {
                  this.onEditorLoad(editor);
                  this.forceUpdate();
                }}
              />
            </Shortcuts>
          </div>
        </Shortcuts>
      </LocaleResourceProvider>
    );
  }
}

export default forwardRef<FullRicosEditorTiptap, RicosEditorProps>((props, ref) => (
  <EditorEventsContext.Consumer>
    {contextValue => <FullRicosEditorTiptap editorEvents={contextValue} {...props} ref={ref} />}
  </EditorEventsContext.Consumer>
));

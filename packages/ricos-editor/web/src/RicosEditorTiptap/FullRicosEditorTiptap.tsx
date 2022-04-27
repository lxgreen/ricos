/* eslint-disable brace-style */
import React from 'react';
import type { RicosEditorProps } from 'ricos-common';
import type { RicosEditorRef } from '../RicosEditorRef';
import { RicosTiptapToolbar, Content, ToolbarContext } from 'wix-rich-content-toolbars-v3';
import RicosEditorTiptap from './RicosEditorTiptap';
import { convertToolbarContext } from '../toolbars/convertToolbarContext';
import { RicosContextProvider } from '../RicosContext/RicosContext';
import type { Node } from 'prosemirror-model';
import FloatingAddPluginMenu from '../toolbars/FloatingAddPluginMenu';
import { ModalService, ModalContextProvider } from 'ricos-modals';
import { getLangDir } from 'wix-rich-content-common';

class FullRicosEditorTiptap extends React.Component<RicosEditorProps> implements RicosEditorRef {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  editor: any;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  editorAdapter: any;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  toolbarContext: any;

  content = Content.create<Node[]>([]);

  modalService: ModalService;

  constructor(props) {
    super(props);
    this.editor = null;
    this.editorAdapter = null;
    this.modalService = new ModalService();
  }

  focus(): void {
    throw new Error('Method not implemented.');
  }

  blur(): void {
    throw new Error('Method not implemented.');
  }

  getContent: RicosEditorRef['getContent'] = () => {
    throw new Error('Method not implemented.');
  };

  getContentPromise: RicosEditorRef['getContentPromise'] = () => {
    throw new Error('Method not implemented.');
  };

  getContentTraits: RicosEditorRef['getContentTraits'] = () => {
    throw new Error('Method not implemented.');
  };

  // @ts-ignore
  getToolbarProps: RicosEditorRef['getToolbarProps'] = () => {
    return { buttons: {} };
  };

  getEditorCommands: RicosEditorRef['getEditorCommands'] = () => {
    throw new Error('Method not implemented.');
  };

  getToolbarContext() {
    const {
      theme,
      locale,
      plugins,
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
      plugins,
      linkPanelSettings,
      linkSettings,
      experiments,
      toolbarSettings,
      cssOverride,
      contentId: '',
      t: this.editorAdapter?.getT?.(),
      getEditorCommands: () => this.editorAdapter.getEditorCommands(),
    });

    return toolbarContext;
  }

  getModalContext() {
    const { theme, experiments, isMobile, _rcProps, locale } = this.props;
    const helpers = _rcProps?.helpers;
    return {
      ModalService: this.modalService,
      experiments,
      getEditorCommands: () => this.editorAdapter.getEditorCommands(),
      t: this.editorAdapter?.getT?.(),
      helpers,
      theme,
      isMobile,
      languageDir: getLangDir(locale),
    };
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
    const { isMobile, experiments, locale, localeContent } = this.props;
    const toolbarContext = this.getToolbarContext();
    const modalContext = this.getModalContext();
    return (
      <RicosContextProvider
        isMobile={isMobile}
        experiments={experiments}
        locale={locale}
        localeContent={localeContent}
      >
        <div>
          {this.editor && (
            <ModalContextProvider {...modalContext}>
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <ToolbarContext.Provider value={toolbarContext as any}>
                <RicosTiptapToolbar
                  content={this.content}
                  editorCommands={this.editor.commandManager}
                />
                <FloatingAddPluginMenu editor={this.editor} />
              </ToolbarContext.Provider>
            </ModalContextProvider>
          )}
          <RicosEditorTiptap
            {...this.props}
            onLoad={editor => {
              this.onEditorLoad(editor);
              this.forceUpdate();
            }}
          />
        </div>
      </RicosContextProvider>
    );
  }
}

export default FullRicosEditorTiptap;

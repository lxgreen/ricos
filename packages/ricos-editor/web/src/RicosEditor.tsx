import React, { Component, Fragment, ElementType, FunctionComponent, forwardRef } from 'react';
import {
  RicosEngine,
  shouldRenderChild,
  localeStrategy,
  getBiCallback as getCallback,
} from 'ricos-common';
import { DraftContent } from 'ricos-content';
import {
  RichContentEditor,
  RichContentEditorProps,
  RichContentAdapter,
} from 'wix-rich-content-editor';
import { createDataConverter, filterDraftEditorSettings } from './utils/editorUtils';
import ReactDOM from 'react-dom';
import { EditorState, ContentState } from 'draft-js';
import RicosModal from './modals/RicosModal';
import './styles.css';
import { RicosEditorProps, EditorDataInstance } from '.';
import { hasActiveUploads } from './utils/hasActiveUploads';
import {
  convertToRaw,
  convertFromRaw,
  createWithContent,
} from 'wix-rich-content-editor/libs/editorStateConversion';
import { isEqual, compact } from 'lodash';
import {
  EditorEventsContext,
  EditorEvents,
} from 'wix-rich-content-editor-common/libs/EditorEventsContext';
import { ToolbarType, Version, RicosTranslate, getLangDir } from 'wix-rich-content-common';
import { emptyDraftContent, getEditorContentSummary } from 'wix-rich-content-editor-common';
import englishResources from 'wix-rich-content-common/dist/statics/locale/messages_en.json';
import { TextFormattingToolbarType } from './toolbars/TextFormattingToolbar';
import { getBiFunctions } from './toolbars/utils/biUtils';
import { isLinkToolbarOpen } from './toolbars/utils/toolbarsUtils';
import toConstantCase from 'to-constant-case';

// eslint-disable-next-line
const PUBLISH_DEPRECATION_WARNING_v9 = `Please provide the postId via RicosEditor biSettings prop and use one of editorRef.publish() or editorEvents.publish() APIs for publishing.
The getContent(postId, isPublishing) API is deprecated and will be removed in ricos v9.0.0`;

const LinkToolbar = React.lazy(() => import('./toolbars/LinkToolbar'));
interface State {
  StaticToolbar?: ElementType;
  localeData: { locale?: string; localeResource?: Record<string, string> };
  remountKey: boolean;
  editorState?: EditorState;
  initialContentChanged: boolean;
  activeEditor: RichContentEditor | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tiptapEditorModule: Record<string, any> | null;
  tiptapToolbar: unknown;
  error?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  TextFormattingToolbar?: TextFormattingToolbarType | null; // eslint-disable-line @typescript-eslint/no-explicit-any
}

// controller between tiptap extensions to ricos editor
// extracts data from  Ricos Extensions
// gives context (Ricos editor context)
// awares of tiptap
// sort , filter

export class RicosEditor extends Component<RicosEditorProps, State> {
  editor!: RichContentEditor;

  useTiptap = false;

  useNewFormattingToolbar = false;

  dataInstance: EditorDataInstance;

  isBusy = false;

  getBiCallback: typeof getCallback;

  currentEditorRef!: ElementType;

  static getDerivedStateFromError(error: string) {
    return { error };
  }

  componentDidCatch(error, errorInfo) {
    console.error({ error, errorInfo });
  }

  constructor(props: RicosEditorProps) {
    super(props);
    this.dataInstance = createDataConverter(props.onChange, props.content);
    this.getBiCallback = getCallback.bind(this);
    this.state = {
      localeData: { locale: props.locale },
      remountKey: false,
      initialContentChanged: true,
      activeEditor: null,
      tiptapEditorModule: null,
      tiptapToolbar: null,
      TextFormattingToolbar: null,
    };
    this.useTiptap = !!props.experiments?.tiptapEditor?.enabled;
    this.useNewFormattingToolbar = !!props.experiments?.newFormattingToolbar?.enabled;
  }

  static defaultProps = {
    onError: err => {
      throw err;
    },
    locale: 'en',
  };

  updateLocale = async () => {
    const { children } = this.props;
    const locale = children?.props.locale || this.props.locale;
    await localeStrategy(locale)
      .then(localeData => this.setState({ localeData, remountKey: !this.state.remountKey }))
      .catch(error => this.setState({ error }));
  };

  componentDidMount() {
    this.updateLocale();
    this.loadEditor();
    this.loadToolbar();
    const { isMobile, toolbarSettings } = this.props;
    const { useStaticTextToolbar } = toolbarSettings || {};
    this.getBiCallback('onOpenEditorSuccess')?.(
      Version.currentVersion,
      isMobile ? ToolbarType.MOBILE : useStaticTextToolbar ? ToolbarType.STATIC : ToolbarType.INLINE
    );
    this.props.editorEvents?.subscribe(EditorEvents.RICOS_PUBLISH, this.onPublish);
  }

  loadEditor() {
    if (this.useTiptap) {
      import(
        /* webpackChunkName: "wix-tiptap-editor" */
        'wix-tiptap-editor'
      ).then(tiptapEditorModule => {
        this.setState({ tiptapEditorModule });
      });
    }
  }

  loadToolbar() {
    if (this.useNewFormattingToolbar) {
      import(
        /* webpackChunkName: "./toolbars/TextFormattingToolbar" */
        './toolbars/TextFormattingToolbar'
      ).then(textFormattingToolbarModule => {
        this.setState({ TextFormattingToolbar: textFormattingToolbarModule?.default });
      });
    }
  }

  onUpdate = ({ content }: { content: DraftContent }) => {
    const editorState = EditorState.createWithContent(convertFromRaw(content));
    this.onChange()(editorState);
  };

  componentWillUnmount() {
    this.props.editorEvents?.unsubscribe(EditorEvents.RICOS_PUBLISH, this.onPublish);
  }

  // TODO: remove deprecated postId once getContent(postId) is removed (9.0.0)
  sendPublishBi = async (postId?: string) => {
    const onPublish = this.props._rcProps?.helpers?.onPublish;
    if (!onPublish) {
      return;
    }
    const contentState = this.dataInstance.getContentState();
    const { pluginsCount, pluginsDetails } = getEditorContentSummary(contentState) || {};
    onPublish(postId, pluginsCount, pluginsDetails, Version.currentVersion);
  };

  onPublish = async () => {
    // TODO: remove this param after getContent(postId) is deprecated
    this.sendPublishBi((undefined as unknown) as string);
    console.debug('editor publish callback'); // eslint-disable-line
    return {
      type: 'EDITOR_PUBLISH',
      data: await this.getContent(),
    };
  };

  publish = async () => {
    const publishResponse = await this.onPublish();
    return publishResponse.data;
  };

  componentWillReceiveProps(newProps: RicosEditorProps) {
    if (newProps.locale !== this.props.locale) {
      this.updateLocale();
    }
    if (
      newProps.injectedContent &&
      !isEqual(this.props.injectedContent, newProps.injectedContent)
    ) {
      console.debug('new content provided as editorState'); // eslint-disable-line
      const editorState = createWithContent(convertFromRaw(newProps.injectedContent));
      this.setState({ editorState }, () => {
        this.dataInstance = createDataConverter(this.props.onChange, this.props.injectedContent);
        this.dataInstance.refresh(editorState);
      });
    }
  }

  onInitialContentChanged = () => {
    const { initialContentChanged } = this.state;
    if (initialContentChanged) {
      this.getBiCallback('onContentEdited')?.({ version: Version.currentVersion });
      this.setState({ initialContentChanged: false });
    }
  };

  onChange = (childOnChange?: RichContentEditorProps['onChange']) => (editorState: EditorState) => {
    try {
      this.dataInstance.refresh(editorState);
      if (this.getContentTraits().isContentChanged) {
        this.onInitialContentChanged();
      }
      childOnChange?.(editorState);
      this.onBusyChange(editorState.getCurrentContent());
    } catch (err) {
      this.setState({ error: err });
    }
  };

  getToolbarProps = (type: ToolbarType) => this.editor.getToolbarProps(type);

  focus = () => this.editor.focus();

  blur = () => this.editor.blur();

  getToolbars = () => this.editor.getToolbars();

  getContentTraits = () => this.dataInstance.getContentTraits();

  getContent = async (postId?: string, forPublish?: boolean, shouldRemoveErrorBlocks = true) => {
    if (postId && forPublish) {
      console.warn(PUBLISH_DEPRECATION_WARNING_v9); // eslint-disable-line
      this.sendPublishBi(postId); //async
    }
    return this.dataInstance.getContentState({ shouldRemoveErrorBlocks });
  };

  getContentPromise = async ({
    publishId,
    flush,
  }: { flush?: boolean; publishId?: string } = {}) => {
    const { getContentStatePromise, waitForUpdate } = this.dataInstance;
    if (flush) {
      waitForUpdate();
      this.blur();
    }
    const res = await getContentStatePromise();
    if (publishId) {
      console.warn(PUBLISH_DEPRECATION_WARNING_v9); // eslint-disable-line
      this.sendPublishBi(publishId);
    }
    return res;
  };

  onBusyChange = (contentState: ContentState) => {
    const { onBusyChange, onChange } = this.props;
    const isBusy = hasActiveUploads(contentState);
    if (this.isBusy !== isBusy) {
      this.isBusy = isBusy;
      onBusyChange?.(isBusy);
      onChange?.(convertToRaw(contentState));
    }
  };

  setActiveEditor = ref => {
    const { activeEditor } = this.state;
    if (ref && ref !== activeEditor) {
      const { MobileToolbar, TextToolbar } = ref.getToolbars();
      this.setState({ StaticToolbar: MobileToolbar || TextToolbar, activeEditor: ref });
    }
  };

  setEditorRef = ref => {
    this.editor = ref;
    this.setActiveEditor(ref);
  };

  getEditorCommands = () => this.editor.getEditorCommands();

  getT = () => this.editor.getT();

  renderToolbarPortal(Toolbar) {
    return (
      <StaticToolbarPortal
        StaticToolbar={Toolbar}
        textToolbarContainer={this.props.toolbarSettings?.textToolbarContainer}
      />
    );
  }

  renderRicosEngine(child, childProps) {
    const { toolbarSettings, draftEditorSettings = {}, localeContent, ...props } = this.props;
    const supportedDraftEditorSettings = filterDraftEditorSettings(draftEditorSettings);
    const contentProp = this.getContentProp();
    return (
      <RicosEngine
        RicosModal={RicosModal}
        isViewer={false}
        key={'editor'}
        toolbarSettings={toolbarSettings}
        {...contentProp.content}
        {...props}
      >
        {React.cloneElement(child, {
          editorKey: 'editor',
          setEditorToolbars: this.setActiveEditor,
          ...childProps,
          ...contentProp.editorState,
          ...supportedDraftEditorSettings,
          ...this.state.localeData,
          localeContent,
        })}
      </RicosEngine>
    );
  }

  renderTiptapToolbar() {
    const { experiments } = this.props;
    if (this.editor && experiments?.tiptapEditorDebugMode?.enabled) {
      const editorCommands = this.editor.getEditorCommands();
      console.log({ editorCommands });
      const style = {
        border: '1px solid #AAA',
      };

      const dividerDefault = {
        type: 'wix-draft-plugin-divider',
        data: {
          config: {
            size: 'medium',
            alignment: 'center',
            textWrap: 'nowrap',
          },
          type: 'double',
        },
      };
      const Divider = () => (
        <button
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          //@ts-ignore
          onClick={() =>
            editorCommands.insertBlock('wix-draft-plugin-divider', dividerDefault.data)
          }
        >
          Add Divder
        </button>
      );

      return (
        <div style={style}>
          <Divider />
          <button onClick={() => editorCommands.toggleInlineStyle('bold')}> Toggle Bold</button>
        </div>
      );
    }
  }

  renderNewToolbars() {
    const { TextFormattingToolbar, StaticToolbar, activeEditor } = this.state;
    const {
      isMobile,
      theme,
      locale,
      _rcProps: { helpers } = {},
      toolbarSettings: { getToolbarSettings = () => [] } = {},
      plugins,
      linkPanelSettings,
      linkSettings,
      experiments,
    } = this.props;
    const activeEditorIsTableCell = activeEditor?.isInnerRCERenderedInTable();
    const textToolbarType = StaticToolbar ? 'static' : null;
    const hideFormattingToolbar = isMobile && isLinkToolbarOpen(activeEditor);
    const biFunctions = helpers && getBiFunctions(helpers);
    const toolbarsProps = {
      textToolbarType,
      isMobile,
      theme,
      getToolbarSettings,
      plugins,
      linkPanelSettings,
      linkSettings,
      ...biFunctions,
      experiments,
    };
    const baseStyles = { flex: 'none' };
    const baseMobileStyles = { ...baseStyles, position: 'sticky', top: 0, zIndex: 9 };
    return (
      !activeEditorIsTableCell &&
      activeEditor && (
        <div
          data-hook={'ricos-editor-toolbars'}
          style={isMobile ? baseMobileStyles : baseStyles}
          dir={getLangDir(locale)}
        >
          {!hideFormattingToolbar && TextFormattingToolbar && (
            <TextFormattingToolbar activeEditor={activeEditor} {...toolbarsProps} />
          )}
          <LinkToolbar activeEditor={activeEditor} {...toolbarsProps} />
        </div>
      )
    );
  }

  renderToolbars() {
    const { StaticToolbar } = this.state;
    return this.useNewFormattingToolbar
      ? this.renderNewToolbars()
      : this.renderToolbarPortal(StaticToolbar);
  }

  renderDraftEditor() {
    const { remountKey } = this.state;
    const child =
      this.props.children && shouldRenderChild('RichContentEditor', this.props.children) ? (
        this.props.children
      ) : (
        <RichContentEditor />
      );

    return (
      <Fragment key={`${remountKey}`}>
        {this.renderToolbars()}
        {this.renderRicosEngine(child, {
          onChange: this.onChange(child.props.onChange),
          ref: this.setEditorRef,
        })}
      </Fragment>
    );
  }

  renderTiptapEditor() {
    const { tiptapEditorModule } = this.state;
    if (!tiptapEditorModule) {
      return null;
    }
    const { RicosTiptapEditor } = tiptapEditorModule;
    const {
      content,
      injectedContent,
      plugins,
      onAtomicBlockFocus,
      isMobile,
      experiments,
    } = this.props;
    const { tiptapToolbar } = this.state;
    const initalContent = tiptapEditorModule.draftToTiptap(
      content ?? injectedContent ?? emptyDraftContent
    );
    const { localeData } = this.state;
    const { locale, localeResource } = localeData;
    const extensions = compact(plugins?.flatMap(plugin => plugin.tiptapExtensions)) || [];
    return (
      <Fragment>
        {tiptapToolbar && this.renderToolbarPortal(tiptapToolbar)}
        {
          <RicosTranslate locale={locale} localeResource={localeResource || englishResources}>
            {t => {
              const tiptapEditor = (
                <RicosTiptapEditor
                  extensions={extensions}
                  content={initalContent}
                  t={t}
                  onLoad={editor => {
                    const richContentAdapter = new RichContentAdapter(editor);
                    this.setEditorRef(richContentAdapter);
                    const TextToolbar = richContentAdapter.getToolbars().TextToolbar;
                    if (experiments?.tiptapEditorDebugMode?.enabled) {
                      this.setState({ tiptapToolbar: TextToolbar });
                    }
                  }}
                  onSelectionUpdate={selectedNodes => {
                    if (selectedNodes.length === 1 && selectedNodes[0].isBlock) {
                      const blockKey = selectedNodes[0].attrs.id;
                      const type = toConstantCase(selectedNodes[0].type.name);
                      const data = selectedNodes[0].attrs;
                      onAtomicBlockFocus?.({ blockKey, type, data });
                    }
                  }}
                  onUpdate={this.onUpdate}
                />
              );
              return (
                <>
                  {this.renderTiptapToolbar()}
                  {this.renderRicosEngine(tiptapEditor, {})}
                </>
              );
            }}
          </RicosTranslate>
        }
      </Fragment>
    );
  }

  getContentProp() {
    const { editorState } = this.state;
    const { content } = this.props;
    return editorState
      ? { editorState: { editorState }, content: {} }
      : { editorState: {}, content: { content } };
  }

  render() {
    try {
      if (this.state.error) {
        this.props.onError?.(this.state.error);
        return null;
      }

      return this.useTiptap ? this.renderTiptapEditor() : this.renderDraftEditor();
    } catch (e) {
      this.props.onError?.(e);
      return null;
    }
  }
}

export default forwardRef<RicosEditor, RicosEditorProps>((props, ref) => (
  <EditorEventsContext.Consumer>
    {contextValue => <RicosEditor editorEvents={contextValue} {...props} ref={ref} />}
  </EditorEventsContext.Consumer>
));

const StaticToolbarPortal: FunctionComponent<{
  StaticToolbar?: ElementType;
  textToolbarContainer?: HTMLElement;
}> = ({ StaticToolbar, textToolbarContainer }) => {
  if (!StaticToolbar) return null;

  if (textToolbarContainer) {
    return ReactDOM.createPortal(<StaticToolbar />, textToolbarContainer);
  }
  return <StaticToolbar />;
};

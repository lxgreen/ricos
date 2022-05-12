import React, { forwardRef } from 'react';
import type { RicosEditorProps } from 'ricos-common';
import type { ExtensionProps, HtmlAttributes, TiptapEditorPlugin } from 'ricos-tiptap-types';
import type { GeneralContext } from 'ricos-types';
import { getEmptyDraftContent, withRicosContext } from 'wix-rich-content-editor-common';
import type { JSONContent } from '@tiptap/core';
import {
  draftToTiptap,
  Extensions,
  RichContentAdapter,
  RicosTiptapEditor,
  TIPTAP_TYPE_TO_RICOS_TYPE,
} from 'wix-tiptap-editor';
import { commonExtensions } from './common-extensions';

type RicosEditorState = {
  initialContent: JSONContent;
  htmlAttributes: HtmlAttributes;
  extensions: Extensions;
};
class RicosEditorTiptap extends React.Component<
  RicosEditorProps & { ricosContext: GeneralContext },
  RicosEditorState
> {
  state: Readonly<RicosEditorState> = {
    initialContent: null as unknown as JSONContent,
    htmlAttributes: {} as HtmlAttributes,
    extensions: Extensions.of([], {}),
  };

  private editorAdapter!: RichContentAdapter;

  onSelectionUpdate = ({ selectedNodes, content }) => {
    const { onAtomicBlockFocus, onChange } = this.props;
    //TODO: add 'textContainer' to group field of this extension config
    const textContainers = ['paragraph', 'codeBlock', 'heading'];
    const parentNodes =
      selectedNodes.length === 1
        ? selectedNodes
        : selectedNodes.filter(node => textContainers.includes(node.type.name));
    if (parentNodes.length === 1 && parentNodes[0].isBlock) {
      const firstNode = parentNodes[0];
      const blockKey = firstNode.attrs.id;
      const type = TIPTAP_TYPE_TO_RICOS_TYPE[firstNode.type.name] || 'text';
      const data = firstNode.attrs;
      onAtomicBlockFocus?.({ blockKey, type, data });
    } else {
      onAtomicBlockFocus?.({
        blockKey: undefined,
        type: undefined,
        data: undefined,
      });
    }

    if (onChange) {
      onChange(content);
    }
  };

  onLoad = (editor, ricosContext) => {
    const { plugins } = this.props;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const richContentAdapter = new RichContentAdapter(editor, ricosContext.t, plugins as any);
    this.editorAdapter = richContentAdapter;
    this.setState({ htmlAttributes: richContentAdapter.getHtmlAttributes(this.props) });
    if (this.props.onLoad) {
      this.props.onLoad(richContentAdapter);
    }
  };

  onUpdate = ({ content }) => {
    const { onChange } = this.props;
    if (onChange) {
      onChange(content);
    }
  };

  private extractExtensionProps(): ExtensionProps {
    const {
      placeholder,
      textAlignment,
      iframeSandboxDomain,
      textWrap,
      maxTextLength,
      linkSettings,
    } = this.props;

    const { anchorTarget, rel, relValue } = linkSettings || {};

    return {
      placeholder,
      textAlignment,
      iframeSandboxDomain,
      isTextWrap: textWrap,
      maxTextLength,
      anchorTarget,
      relValue,
      rel,
    };
  }

  private extractExtensions(plugins: TiptapEditorPlugin[] = []): Extensions {
    const extensions = plugins
      .filter(plugin => plugin.tiptapExtensions)
      .flatMap(plugin =>
        plugin.tiptapExtensions.map(extension => ({ ...extension, settings: plugin.config }))
      );
    return Extensions.of([...extensions, ...commonExtensions], this.extractExtensionProps());
  }

  componentDidMount() {
    const { content, injectedContent, plugins } = this.props;
    const initialContent = draftToTiptap(content ?? injectedContent ?? getEmptyDraftContent());
    const extensions = this.extractExtensions(plugins as TiptapEditorPlugin[]);

    this.setState({
      initialContent,
      extensions,
    });
  }

  render() {
    const { ricosContext } = this.props;
    const { initialContent, extensions, htmlAttributes } = this.state;
    if (!initialContent || !extensions) {
      return null;
    }
    return (
      <RicosTiptapEditor
        extensions={extensions}
        content={initialContent}
        t={ricosContext.t}
        // editorStyleClasses
        onLoad={editor => this.onLoad(editor, ricosContext)}
        onUpdate={this.onUpdate}
        onSelectionUpdate={this.onSelectionUpdate}
        onBlur={function (): void {}}
        theme={{
          modalTheme: undefined,
        }}
        htmlAttributes={htmlAttributes}
      />
    );
  }
}

const RicosEditorTiptapWithContext = withRicosContext()(RicosEditorTiptap);

const RicosEditorTiptapWithForwardRef = forwardRef<
  typeof RicosEditorTiptapWithContext,
  RicosEditorProps
>((props, ref) => (
  <RicosEditorTiptapWithContext
    {...props}
    ref={ref}
    onLoad={editor => {
      if (props.onLoad) {
        props.onLoad(editor);
      }
    }}
  />
));

export default RicosEditorTiptapWithForwardRef;

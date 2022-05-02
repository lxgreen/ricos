import { compact } from 'lodash';
import React, { forwardRef } from 'react';
import type { RicosEditorProps } from 'ricos-common';
import type { TiptapEditorPlugin } from 'ricos-tiptap-types';
import type { GeneralContext } from 'ricos-types';
import { getEmptyDraftContent, withRicosContext } from 'wix-rich-content-editor-common';
import {
  draftToTiptap,
  Extensions,
  RichContentAdapter,
  RicosTiptapEditor,
  TIPTAP_TYPE_TO_RICOS_TYPE,
} from 'wix-tiptap-editor';
import { commonExtensions } from './common-extensions';

class RicosEditorTiptap extends React.Component<
  RicosEditorProps & { ricosContext: GeneralContext }
> {
  // add OnLoad
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

  private configureExtensions(extensions: Extensions) {
    const {
      placeholder,
      textAlignment,
      iframeSandboxDomain,
      textWrap,
      maxTextLength = 500000,
      linkSettings,
    } = this.props;
    const { anchorTarget, relValue, rel } = linkSettings || {};

    return extensions.configure({
      placeholder,
      textAlignment,
      iframeSandboxDomain,
      isTextWrap: textWrap,
      maxTextLength,
      anchorTarget,
      relValue,
      rel,
    });
  }

  render() {
    const { content, injectedContent, plugins, ricosContext } = this.props;

    const extensions =
      compact(plugins?.flatMap((plugin: TiptapEditorPlugin) => plugin.tiptapExtensions)) || [];
    const initialContent = draftToTiptap(content ?? injectedContent ?? getEmptyDraftContent());
    const allExtensions = Extensions.of([...extensions, ...commonExtensions]);
    const configuredExtensions = this.configureExtensions(allExtensions);
    const htmlAttributes = this.editorAdapter?.getHtmlAttributes(this.props) || {};
    return (
      <RicosTiptapEditor
        extensions={configuredExtensions}
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

import { Editor, EditorContent, JSONContent } from '@tiptap/react';
import React, { FunctionComponent, useEffect, useState } from 'react';
import editorStyles from '../../statics/styles/tiptap-editor-styles.scss';
import { createEditorStyles } from 'wix-rich-content-editor-common';
import { tiptapToDraft } from '../..';
import { RicosTiptapContext } from '../../context';
import { useForceUpdate } from '../../lib/useForceUpdate';
import { Extensions } from '../../models/Extensions';
import { tiptapExtensions as coreExtensions } from '../../tiptap-extensions';
import { RicosTiptapEditorProps } from '../../types';
import { coreConfigs } from './core-configs';
import { getLangDir } from 'wix-rich-content-common';
import { Node } from 'prosemirror-model';

// TODO: maybe should move it to utils ?
const getSelectedNodes = ({ editor }) => {
  const selection = editor.state.selection;
  const nodes: Node[] = [];
  editor.state.doc.nodesBetween(selection.from, selection.to, (node: Node) => {
    nodes.push(node);
  });

  return nodes;
};

export const RicosTiptapEditor: FunctionComponent<RicosTiptapEditorProps> = ({
  content,
  extensions = [],
  onLoad,
  onUpdate,
  onSelectionUpdate,
  onBlur,
  theme,
  locale,
  ...context
}) => {
  const forceUpdate = useForceUpdate();
  const [editor, setEditor] = useState<Editor>((null as unknown) as Editor);
  const mergedExtensions = Extensions.of([...coreConfigs, ...extensions]);

  const getContent = editor => tiptapToDraft(editor.getJSON() as JSONContent);

  useEffect(() => {
    const tiptapExtensions = mergedExtensions.getTiptapExtensions();
    const editorInstance = new Editor({
      extensions: [...coreExtensions, ...tiptapExtensions],
      content,
      injectCSS: true,
      onUpdate: ({ editor }) => {
        const convertedContent = getContent(editor);
        onUpdate?.({ content: convertedContent });
      },
      onBlur: () => {
        onBlur?.();
      },
    });

    editorInstance.on('selectionUpdate', ({ editor }) => {
      const selectedNodes = getSelectedNodes({ editor });
      onSelectionUpdate?.({ selectedNodes, content: getContent(editor) });
    });
    editorInstance.on('transaction', forceUpdate);

    setEditor(editorInstance);

    onLoad?.(editorInstance);

    return () => editorInstance.destroy();
  }, []);

  const { isMobile } = context;
  const { containerClassName, containerStyle, editorClassName, editorStyle } = createEditorStyles({
    isMobile,
    theme,
    editorStyles,
  });

  return (
    <RicosTiptapContext.Provider
      value={{
        context: {
          ...context,
        },
      }}
    >
      <div dir={getLangDir(locale)} className={containerClassName} style={containerStyle}>
        <EditorContent editor={editor} className={editorClassName} style={editorStyle} />
      </div>
    </RicosTiptapContext.Provider>
  );
};

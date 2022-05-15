import type { JSONContent } from '@tiptap/react';
import { EditorContent } from '@tiptap/react';
import type { Node } from 'prosemirror-model';
import type { FunctionComponent } from 'react';
import React, { useEffect } from 'react';
import { getLangDir } from 'wix-rich-content-common';
import { tiptapToDraft } from 'wix-tiptap-extensions';
import { RicosTiptapContext } from '../../context';
import { useForceUpdate } from '../../lib/useForceUpdate';
import '../../statics/styles/tiptap-editor-styles.scss';
import type { RicosTiptapEditorProps } from '../../types';

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
  editor,
  onUpdate,
  onSelectionUpdate,
  locale,
  editorStyleClasses,
  htmlAttributes,
  ...context
}) => {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    editor.on('update', ({ editor }) => {
      onUpdate?.({ content: tiptapToDraft(editor.getJSON() as JSONContent) });
    });
    editor.on('selectionUpdate', ({ editor }) => {
      const selectedNodes = getSelectedNodes({ editor });
      onSelectionUpdate?.({
        selectedNodes,
        content: tiptapToDraft(editor.getJSON() as JSONContent),
      });
    });
    editor.on('transaction', forceUpdate);
  }, []);

  const { containerClassName, editorClassName } = editorStyleClasses || {};

  return (
    <RicosTiptapContext.Provider
      value={{
        context: {
          ...context,
        },
      }}
    >
      <div dir={getLangDir(locale)} className={containerClassName} {...htmlAttributes}>
        <EditorContent editor={editor} className={editorClassName} />
      </div>
    </RicosTiptapContext.Provider>
  );
};

import { Editor, EditorContent, JSONContent } from '@tiptap/react';
import { Node } from 'prosemirror-model';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { getLangDir } from 'wix-rich-content-common';
import { tiptapToDraft } from 'wix-tiptap-extensions';
import { RicosTiptapContext } from '../../context';
import { useForceUpdate } from '../../lib/useForceUpdate';
import { Extensions } from '../../models/Extensions';
import { RicosTiptapEditorProps } from '../../types';
import { coreConfigs } from './core-configs';
import { patchExtensions } from '../../patch-extensions';
import '../../statics/styles/tiptap-editor-styles.scss';

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
  locale,
  editorStyleClasses,
  ...context
}) => {
  const forceUpdate = useForceUpdate();
  const [editor, setEditor] = useState<Editor>((null as unknown) as Editor);

  const getContent = editor => tiptapToDraft(editor.getJSON() as JSONContent);

  useEffect(() => {
    const mergedExtensions = Extensions.of([...coreConfigs, ...extensions]);
    const patchedExtensions = patchExtensions(content, mergedExtensions);
    const tiptapExtensions = patchedExtensions.getTiptapExtensions();
    console.debug({ tiptapExtensions }); // eslint-disable-line no-console
    const editorInstance = new Editor({
      extensions: tiptapExtensions,
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

  const { containerClassName, editorClassName } = editorStyleClasses || {};

  return (
    <RicosTiptapContext.Provider
      value={{
        context: {
          ...context,
        },
      }}
    >
      <div dir={getLangDir(locale)} className={containerClassName}>
        <EditorContent editor={editor} className={editorClassName} />
      </div>
    </RicosTiptapContext.Provider>
  );
};

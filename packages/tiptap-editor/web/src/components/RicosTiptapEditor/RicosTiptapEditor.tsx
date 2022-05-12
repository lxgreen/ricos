import type { JSONContent } from '@tiptap/react';
import { Editor, EditorContent } from '@tiptap/react';
import type { Node } from 'prosemirror-model';
import type { FunctionComponent } from 'react';
import React, { useEffect, useState } from 'react';
import { getLangDir } from 'wix-rich-content-common';
import { tiptapToDraft } from 'wix-tiptap-extensions';
import { RicosTiptapContext } from '../../context';
import { useForceUpdate } from '../../lib/useForceUpdate';
import type { RicosTiptapEditorProps } from '../../types';
import { coreConfigs } from './core-configs';
import { patchExtensions } from '../../patch-extensions';
import '../../statics/styles/tiptap-editor-styles.scss';
import { applyDevTools } from './apply-dev-tools';
import { Extensions } from '../../models/Extensions';

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
  extensions = Extensions.of([], {}),
  onLoad,
  onUpdate,
  onSelectionUpdate,
  onBlur,
  locale,
  editorStyleClasses,
  htmlAttributes,
  ...context
}) => {
  const forceUpdate = useForceUpdate();
  const [editor, setEditor] = useState<Editor>(null as unknown as Editor);

  const getContent = editor => tiptapToDraft(editor.getJSON() as JSONContent);

  useEffect(() => {
    const allExtensions = extensions.concat(coreConfigs);
    const patchedExtensions = patchExtensions(content, allExtensions);
    const tiptapExtensions = patchedExtensions.getTiptapExtensions();

    console.debug({ tiptapExtensions, content }); // eslint-disable-line no-console
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

    applyDevTools(editorInstance);

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
      <div dir={getLangDir(locale)} className={containerClassName} {...htmlAttributes}>
        <EditorContent editor={editor} className={editorClassName} />
      </div>
    </RicosTiptapContext.Provider>
  );
};

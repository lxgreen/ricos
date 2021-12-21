import { Editor, EditorContent, JSONContent } from '@tiptap/react';
import { Node } from 'prosemirror-model';
import React, { FunctionComponent, useEffect, useState } from 'react';
import { getLangDir } from 'wix-rich-content-common';
import { createEditorStyles } from 'wix-rich-content-editor-common';
import { tiptapExtensions as coreExtensions, tiptapToDraft } from 'wix-tiptap-extensions';
import { RicosTiptapContext } from '../../context';
import { useForceUpdate } from '../../lib/useForceUpdate';
import { Extensions } from '../../models/Extensions';
import editorStyles from '../../statics/styles/tiptap-editor-styles.scss';
import { RicosTiptapEditorProps } from '../../types';
import { coreConfigs } from './core-configs';
// import { patchExtensions } from '../../unsupported-content';

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
  // const patchedExtensions = patchExtensions(content, [...coreConfigs, ...extensions]);

  const getContent = editor => tiptapToDraft(editor.getJSON() as JSONContent);

  useEffect(() => {
    const mergedExtensions = Extensions.of([...coreConfigs, ...extensions]);
    const tiptapExtensions = mergedExtensions.getTiptapExtensions();
    const allExtensions = [...coreExtensions, ...tiptapExtensions];
    console.log({ allExtensions }); // eslint-disable-line no-console
    const editorInstance = new Editor({
      extensions: allExtensions,
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

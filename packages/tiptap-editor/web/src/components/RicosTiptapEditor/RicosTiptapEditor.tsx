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

export const RicosTiptapEditor: FunctionComponent<RicosTiptapEditorProps> = ({
  content,
  extensions = [],
  onLoad,
  onUpdate,
  onSelectionUpdate,
  theme,
  locale,
  ...context
}) => {
  const forceUpdate = useForceUpdate();
  const [editor, setEditor] = useState<Editor>((null as unknown) as Editor);
  const mergedExtensions = Extensions.of([...coreConfigs, ...extensions]);

  useEffect(() => {
    const tiptapExtensions = mergedExtensions.getTiptapExtensions();
    const editorInstance = new Editor({
      extensions: [...coreExtensions, ...tiptapExtensions],
      content,
      injectCSS: true,
      onUpdate: ({ editor }) => {
        const newContent = editor.getJSON();
        const convertedContent = tiptapToDraft(newContent as JSONContent);
        onUpdate?.({ content: convertedContent });
      },
      onSelectionUpdate: () => {
        onSelectionUpdate?.();
      },
      onBlur: () => {
        onSelectionUpdate?.();
      },
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

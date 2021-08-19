import React, { useEffect, useState, FunctionComponent } from 'react';
import { RicosTiptapContext } from '../../context';
import { EditorContent, Editor, JSONContent } from '@tiptap/react';
import { tiptapExtensions as coreExtensions } from '../../tiptap-extensions';
import { tiptapToDraft } from '../..';
import { RicosTiptapEditorProps } from '../../types';
import { useForceUpdate } from '../../lib/useForceUpdate';
import { ExtensionManager } from '../../ricos-extensions-manager';
import { NodeHOCsContext, RicosNodeHOCManager } from '../../ricos-node-hoc-manager';
import { coreConfigs } from './core-configs';

export const RicosTiptapEditor: FunctionComponent<RicosTiptapEditorProps> = ({
  content,
  extensions = [],
  onLoad,
  onUpdate,
  ...context
}) => {
  const forceUpdate = useForceUpdate();
  const [editor, setEditor] = useState<Editor | null>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [ricosNodeHOCManager, setRicosNodeHOCManager] = useState<any>();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    const extensionManager = new ExtensionManager([...coreConfigs, ...extensions]);
    const ricosNodeHOCManager = new RicosNodeHOCManager(extensionManager.nodeHOCs);
    const tiptapExtensions = extensionManager.getTiptapExtensions();
    const editorInstance = new Editor({
      extensions: [...coreExtensions, ...tiptapExtensions],
      content,
      injectCSS: true,
      onUpdate: ({ editor }) => {
        const newContent = editor.getJSON();
        const convertedContent = tiptapToDraft(newContent as JSONContent);
        onUpdate?.({ content: convertedContent });
      },
    });

    editorInstance.on('transaction', forceUpdate);

    setRicosNodeHOCManager(ricosNodeHOCManager);
    setEditor(editorInstance);

    onLoad?.(editorInstance);

    return () => {
      editorInstance.destroy();
    };
  }, []);

  return (
    <RicosTiptapContext.Provider
      value={{
        context: {
          ...context,
        },
      }}
    >
      <NodeHOCsContext.Provider value={ricosNodeHOCManager}>
        <div dir="">
          <EditorContent editor={editor} />
        </div>
      </NodeHOCsContext.Provider>
    </RicosTiptapContext.Provider>
  );
};

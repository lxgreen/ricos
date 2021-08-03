import React, { useEffect, useState } from 'react';
import { RicosTiptapContext } from '../../context';
import { EditorContent, Editor } from '@tiptap/react';

import { RicosExtensionManager } from '../../ricos-extensions-manager';
import { tiptapExtensions as coreExtensions } from '../../tiptap-extensions';
import { createSpoilerConfig } from '../../extensions/extension-spoiler';
import { createDraftConfig } from '../../extensions/extension-draft';
import { createHistoryConfig } from '../../extensions/extension-history';
import { createStylesConfig } from '../../extensions/extension-styles';
import { createRicosExtensionsConfigs } from '../../extensions-creators';

function useForceUpdate() {
  const [, setValue] = useState(0);

  return () => setValue(value => value + 1);
}
const spoilerConfig = createSpoilerConfig();
const draftConfig = createDraftConfig();
const historyConfig = createHistoryConfig();
const stylesConfig = createStylesConfig();

export const RicosTiptapEditor = ({ content, extensions = [], onLoad, ...context }) => {
  const [editor, setEditor] = useState<Editor | null>(null);
  const [nodeViewsHOCs, setNodeViewsHOCs] = useState([]);
  const forceUpdate = useForceUpdate();

  const extensionsConfigs = [spoilerConfig, draftConfig, historyConfig, stylesConfig];
  useEffect(() => {
    const ricosExtensionsConfigs = createRicosExtensionsConfigs(extensions);
    const allConfigs = [...ricosExtensionsConfigs, ...extensionsConfigs];
    const tiptapExtensions = RicosExtensionManager.extensionsConfigsToTiptapExtensions(allConfigs);
    const nodeViewsHOCs = RicosExtensionManager.extractNodeViewsHOCsFromRicosExtensions(allConfigs);

    setNodeViewsHOCs(nodeViewsHOCs);

    const editorInstance = new Editor({
      extensions: [...coreExtensions, ...tiptapExtensions],
      content,
      injectCSS: true,
    });

    setEditor(editorInstance);

    editorInstance.on('transaction', forceUpdate);

    onLoad(editorInstance);

    return () => {
      editorInstance.destroy();
    };
  }, []);

  return (
    <RicosTiptapContext.Provider
      value={{
        nodeViewsHOCs,
        context: {
          ...context,
        },
      }}
    >
      <div dir="">
        <EditorContent editor={editor} />
      </div>
    </RicosTiptapContext.Provider>
  );
};

import React, { useEffect, useState } from 'react';
import { RicosTiptapContext } from '../../context';
import { EditorContent, Editor } from '@tiptap/react';

import { RicosExtensionManager } from '../../ricos-extensions-manager';
import { tiptapExtensions as coreExtensions } from '../../tiptap-extensions';
import { createImageConfig } from '../../extensions/extension-image';
import { createDividerConfig } from '../../extensions/extension-divider';
import { createSpoilerConfig } from '../../extensions/extension-spoiler';
import { createDraftConfig } from '../../extensions/extension-draft';
import { createHistoryConfig } from '../../extensions/extension-history';
import { createStylesConfig } from '../../extensions/extension-styles';

function useForceUpdate() {
  const [, setValue] = useState(0);

  return () => setValue(value => value + 1);
}
const imageExt = createImageConfig();
const dividerExt = createDividerConfig();
const spoiler = createSpoilerConfig();
const draft = createDraftConfig();
const history = createHistoryConfig();
const stylesExt = createStylesConfig();
export const RicosTiptapEditor = ({ content, extensions = [], onLoad, ...context }) => {
  const [editor, setEditor] = useState<Editor | null>(null);
  const [nodeViewsHOCs, setNodeViewsHOCs] = useState([]);
  const forceUpdate = useForceUpdate();
  const allExtensions = [...extensions, imageExt, dividerExt, spoiler, draft, history, stylesExt];
  useEffect(() => {
    const tiptapExtensions = RicosExtensionManager.ricosExtensionsTotiptapExtensions(allExtensions);
    const nodeViewsHOCs = RicosExtensionManager.extractNodeViewsHOCsFromRicosExtensions(
      allExtensions
    );

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

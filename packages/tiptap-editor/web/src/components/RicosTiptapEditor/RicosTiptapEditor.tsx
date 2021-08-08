import { pipe } from 'fp-ts/function';
import * as A from 'fp-ts/Array';
import React, { useEffect, useState } from 'react';
import { EditorContent, Editor, JSONContent } from '@tiptap/react';
import {
  NodeViewHocMap,
  EditorPlugin,
  EditorPluginConfig,
  TranslationFunction,
  RicosExtensionConfig,
  TiptapExtensionConfig,
} from 'wix-rich-content-common';

import { initializeExtensions, extractNodeViewsHOCs } from '../../ricos-extensions-manager';
import { tiptapExtensions as coreExtensions } from '../../tiptap-extensions';
import { RicosTiptapContext } from '../../context';
import { createDraftConfig } from '../../extensions/extension-draft';
import { createFocusConfig } from '../../extensions/extension-focus/focus';
import { createOnNodeFocusConfig } from '../../extensions/extension-focus/on-node-focus';
import { createHistoryConfig } from '../../extensions/extension-history';
import { createStylesConfig } from '../../extensions/extension-styles';
import { createRicosExtensionsConfigs } from '../../extensions-creators';

function useForceUpdate() {
  const [, setValue] = useState(0);
  return () => setValue(value => value + 1);
}

const getEditorExtensionConfigs = (): TiptapExtensionConfig[] => [
  createDraftConfig(),
  createHistoryConfig(),
  createStylesConfig(),
  createFocusConfig(),
  createOnNodeFocusConfig(),
];

export const RicosTiptapEditor = ({
  content,
  extensions = [],
  onLoad,
  ...context
}: {
  content: JSONContent;
  extensions: EditorPlugin[];
  onLoad: (editor: Editor) => void;
  config: Record<string, EditorPluginConfig>;
  t: TranslationFunction;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  context: any; // TODO: context type
}) => {
  const forceUpdate = useForceUpdate();
  const [editor, setEditor] = useState<Editor | null>(null);
  const [nodeViewsHOCs, setNodeViewsHOCs] = useState<NodeViewHocMap>(
    (null as unknown) as NodeViewHocMap
  );

  useEffect(() => {
    const extensionConfigs = pipe(
      extensions,
      createRicosExtensionsConfigs,
      A.concat(getEditorExtensionConfigs())
    );

    const nodeViewsHOCs = extractNodeViewsHOCs(extensionConfigs as RicosExtensionConfig[]);
    setNodeViewsHOCs(nodeViewsHOCs);

    const tiptapExtensions = initializeExtensions(extensionConfigs);
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

import { Editor } from '@tiptap/react';
import type { ComponentType, FC, ReactChild } from 'react';
import React, { useState, useEffect, useContext } from 'react';
import type { RicosEditorProps } from 'ricos-common';
import type { ExtensionProps, TiptapEditorPlugin } from 'ricos-tiptap-types';
import type { DraftContent, EditorPlugin } from 'wix-rich-content-common';
import { convertRelObjectToString, convertRelStringToObject } from 'wix-rich-content-common';
import { commonExtensions } from './common-extensions';
import { RichContentAdapter } from './components/RichContentAdapter/RichContentAdapter';
import { applyDevTools } from './components/RicosTiptapEditor/apply-dev-tools';
import { coreConfigs } from './components/RicosTiptapEditor/core-configs';
import { Extensions } from './models/Extensions';
import { patchExtensions } from './patch-extensions';
import { RicosContext } from 'wix-rich-content-editor-common';
import { draftToTiptap } from 'wix-tiptap-extensions';

type TiptapEditorProviderProps = {
  content: DraftContent;
  plugins: EditorPlugin[];
  children: ReactChild;
  ricosEditorProps: RicosEditorProps;
};

export const TiptapEditorContext = React.createContext<RichContentAdapter>(
  null as unknown as RichContentAdapter
);

const extractExtensionProps = (props: RicosEditorProps): ExtensionProps => {
  const { placeholder, textAlignment, iframeSandboxDomain, textWrap, maxTextLength, linkSettings } =
    props;

  const { anchorTarget, rel, relValue } = linkSettings || {};

  const processedRel = convertRelObjectToString(
    relValue ? convertRelStringToObject(relValue) : rel
  );

  return {
    placeholder,
    textAlignment,
    iframeSandboxDomain,
    isTextWrap: textWrap,
    maxTextLength,
    anchorTarget,
    rel: processedRel,
  };
};

const extractExtensions = (plugins: TiptapEditorPlugin[], props: RicosEditorProps): Extensions => {
  const extensions = plugins
    .filter(plugin => plugin.tiptapExtensions)
    .flatMap(plugin =>
      plugin.tiptapExtensions.map(extension => ({ ...extension, settings: plugin.config }))
    );
  return Extensions.of([...extensions, ...commonExtensions], extractExtensionProps(props));
};

export const TiptapEditorProvider: FC<TiptapEditorProviderProps> = ({
  content,
  plugins,
  children,
  ricosEditorProps,
}) => {
  const [adapter, setAdapter] = useState<RichContentAdapter>(null as unknown as RichContentAdapter);
  const { t } = useContext(RicosContext);
  useEffect(() => {
    const tiptapContent = draftToTiptap(content);
    const extensions = extractExtensions(plugins as TiptapEditorPlugin[], ricosEditorProps);
    const allExtensions = extensions.concat(coreConfigs);
    const patchedExtensions = patchExtensions(tiptapContent, allExtensions);
    const tiptapExtensions = patchedExtensions.getTiptapExtensions();

    console.debug({ tiptapExtensions, tiptapContent }); // eslint-disable-line no-console

    const editor = new Editor({
      extensions: tiptapExtensions,
      content: tiptapContent,
      injectCSS: true,
    });

    applyDevTools(editor);

    setAdapter(new RichContentAdapter(editor, t, plugins));
  }, []);
  return adapter ? (
    <TiptapEditorContext.Provider value={adapter}>{children}</TiptapEditorContext.Provider>
  ) : null;
};

export const TiptapEditorConsumer = ({ children }) => (
  <TiptapEditorContext.Consumer>{value => children(value)}</TiptapEditorContext.Consumer>
);

export function withTiptapEditorContext<Props>(Component: ComponentType<Props>) {
  return (props: Props) => (
    <TiptapEditorConsumer>
      {(adapter: RichContentAdapter) => <Component {...props} editor={adapter} />}
    </TiptapEditorConsumer>
  );
}

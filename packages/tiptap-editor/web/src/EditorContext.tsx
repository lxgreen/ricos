import { Editor } from '@tiptap/react';
import type { ComponentType, FC, ReactChild } from 'react';
import React, { useContext, useEffect, useState } from 'react';
import type { RicosEditorProps } from 'ricos-common';
import type { ExtensionProps } from 'ricos-tiptap-types';
import type { DraftContent } from 'wix-rich-content-common';
import { RicosContext } from 'wix-rich-content-editor-common';
import { draftToTiptap } from 'ricos-converters';
import { commonExtensions } from './common-extensions';
import { RichContentAdapter } from './components/RichContentAdapter/RichContentAdapter';
import { applyDevTools } from './components/RicosTiptapEditor/apply-dev-tools';
import { coreConfigs } from './components/RicosTiptapEditor/core-configs';
import { Extensions } from './models/Extensions';
import { patchExtensions } from './patch-extensions';
import { PluginsContext } from 'ricos-plugins';

type TiptapEditorProviderProps = {
  content: DraftContent;
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

  return {
    placeholder,
    textAlignment,
    iframeSandboxDomain,
    isTextWrap: textWrap,
    maxTextLength,
    anchorTarget,
    rel,
    relValue,
  };
};

const extractExtensions = (extensions, props: RicosEditorProps): Extensions => {
  return Extensions.of([...extensions, ...commonExtensions], extractExtensionProps(props));
};

export const TiptapEditorProvider: FC<TiptapEditorProviderProps> = ({
  content,
  children,
  ricosEditorProps,
}) => {
  const [adapter, setAdapter] = useState<RichContentAdapter>(null as unknown as RichContentAdapter);
  const { t, experiments } = useContext(RicosContext);
  const { plugins } = useContext(PluginsContext);

  useEffect(() => {
    const tiptapContent = draftToTiptap(content);
    const extensions = extractExtensions(plugins.getTiptapExtensions(), ricosEditorProps);
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

    setAdapter(new RichContentAdapter(editor, t, plugins, experiments));
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

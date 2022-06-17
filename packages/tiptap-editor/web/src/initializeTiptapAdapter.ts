import { Editor } from '@tiptap/react';
import type { RicosEditorProps } from 'ricos-common';
import { draftToTiptap } from 'ricos-converters';
import type { EditorPlugins } from 'ricos-plugins';
import type { ExtensionProps } from 'ricos-tiptap-types';
import { getEmptyDraftContent } from 'wix-rich-content-editor-common';
import { commonExtensions } from './common-extensions';
import { RichContentAdapter } from './components/RichContentAdapter/RichContentAdapter';
import { applyDevTools } from './components/RicosTiptapEditor/apply-dev-tools';
import { coreConfigs } from './components/RicosTiptapEditor/core-configs';
import { Extensions } from './models/Extensions';
import { patchExtensions } from './patch-extensions';

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

const extractExtensions = (plugins: EditorPlugins, props: RicosEditorProps): Extensions => {
  const extensions = plugins.getTiptapExtensions();
  return Extensions.of([...extensions, ...commonExtensions], extractExtensionProps(props));
};

export const initializeTiptapAdapter = (
  ricosEditorProps: RicosEditorProps,
  plugins: EditorPlugins
) => {
  const content =
    ricosEditorProps.injectedContent || ricosEditorProps.content || getEmptyDraftContent();
  const tiptapContent = draftToTiptap(content);
  const extensions = extractExtensions(plugins, ricosEditorProps);
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

  return new RichContentAdapter(editor, ricosEditorProps);
};

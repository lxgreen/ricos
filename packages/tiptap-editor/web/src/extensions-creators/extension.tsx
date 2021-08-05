import { mergeAttributes } from '@tiptap/react';
import { RicosGenericExtension } from 'wix-rich-content-common';
import { CreateExtensionParams } from 'wix-rich-content-editor-common';
import { RicosGenericExtensionConfig } from '../types';

type RicosGenericExtensionConfigCreator = (
  params: CreateExtensionParams<RicosGenericExtension>
) => RicosGenericExtensionConfig;

export const createRicosGenericExtensionConfig: RicosGenericExtensionConfigCreator = ({
  createConfig,
}) => {
  return {
    ...createConfig({ mergeAttributes }),
    extensionType: 'extension',
  };
};

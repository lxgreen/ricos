import { ExtensionConfig, mergeAttributes } from '@tiptap/react';
import { CreateTiptapExtensionConfig } from 'wix-rich-content-common';
import { RicosGenericExtensionConfig } from '../types';

type RicosGenericExtensionConfigCreator = (
  configCreator: CreateTiptapExtensionConfig<ExtensionConfig>
) => RicosGenericExtensionConfig;

export const createRicosGenericExtensionConfig: RicosGenericExtensionConfigCreator = configCreator => {
  return {
    ...configCreator({ mergeAttributes }),
    extensionType: 'extension',
  };
};

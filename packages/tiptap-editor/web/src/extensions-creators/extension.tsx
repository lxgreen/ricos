import { mergeAttributes } from '@tiptap/react';
import { RicosExtensionConfig } from 'wix-rich-content-common';
import { CreateExtensionParams } from 'wix-rich-content-editor-common';
import { RicosGenericExtensionConfig } from '../types';

type RicosGenericExtensionConfigCreator = (
  params: CreateExtensionParams<RicosExtensionConfig>
) => RicosGenericExtensionConfig;

export const createRicosGenericExtensionConfig: RicosGenericExtensionConfigCreator = ({
  createConfig,
}) => {
  return {
    ...createConfig({ mergeAttributes }),
    extensionType: 'extension',
  };
};

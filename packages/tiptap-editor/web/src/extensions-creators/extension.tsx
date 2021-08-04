import { mergeAttributes } from '@tiptap/react';
import { CreateExtensionParams } from 'wix-rich-content-editor-common';
import { RicosGenericExtensionConfig } from '../types';

type RicosGenericExtensionConfigCreator = (
  params: CreateExtensionParams<'extension'>
) => RicosGenericExtensionConfig;

export const createRicosGenericExtensionConfig: RicosGenericExtensionConfigCreator = ({
  createConfig,
}) => {
  return {
    ...createConfig({ mergeAttributes }),
    extensionType: 'extension',
  };
};

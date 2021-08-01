import { mergeAttributes, MarkConfig } from '@tiptap/react';
import { CreateTiptapExtensionConfig } from 'wix-rich-content-common';
import { RicosMarkConfig } from '../types';

type RicosMarkConfigCreator = (
  configCreator: CreateTiptapExtensionConfig<MarkConfig>
) => RicosMarkConfig;

export const createRicosMarkConfig: RicosMarkConfigCreator = configCreator => {
  return {
    ...configCreator({ mergeAttributes }),
    extensionType: 'mark',
  };
};

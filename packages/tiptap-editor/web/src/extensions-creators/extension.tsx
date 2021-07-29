import { mergeAttributes } from '@tiptap/react';
import { RicosExtensionConfig } from '../types';

type TiptapExtensionConfigCreator = ({ mergeAttributes }) => RicosExtensionConfig;

export const createRicosExtensionConfig = (tiptapExtensionConfigCreator): RicosExtensionConfig => {
  return {
    ...tiptapExtensionConfigCreator({ mergeAttributes }),
    extensionType: 'extension',
  };
};

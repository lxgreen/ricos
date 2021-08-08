import { mergeAttributes } from '@tiptap/react';
import { RicosGenericExtension, RicosExtensionConfig } from 'wix-rich-content-common';

export const createRicosGenericExtensionConfig = (
  ext: RicosGenericExtension
): RicosExtensionConfig => {
  return {
    ...ext.createConfig({ mergeAttributes }),
    type: ext.type,
  };
};

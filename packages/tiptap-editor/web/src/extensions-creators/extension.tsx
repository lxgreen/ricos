import { mergeAttributes } from '@tiptap/react';
import { RicosFunctionalExtension, RicosExtensionConfig } from 'wix-rich-content-common';

export const createRicosFunctionalExtensionConfig = (
  ext: RicosFunctionalExtension
): RicosExtensionConfig => {
  return {
    ...ext.createExtensionConfig({ mergeAttributes }),
    type: ext.type,
  };
};

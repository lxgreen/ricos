import { mergeAttributes } from '@tiptap/react';
import { RicosFunctionalExtension, RicosExtensionConfig } from 'wix-rich-content-common';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createRicosFunctionalExtensionConfig = (ext: RicosFunctionalExtension): any => {
  return {
    ...ext.createExtensionConfig({ mergeAttributes }),
    type: ext.type,
  };
};

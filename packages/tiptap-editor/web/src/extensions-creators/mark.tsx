import { RicosMarkExtension } from 'wix-rich-content-common';
import { mergeAttributes } from '@tiptap/react';
import { MarkConfig } from '@tiptap/core';

export const createRicosMarkConfig = (ext): MarkConfig => ({
  addAttributes: () => ext.componentDataDefaults || {},
  ...ext.createExtensionConfig({ mergeAttributes }),
  type: ext.type,
});

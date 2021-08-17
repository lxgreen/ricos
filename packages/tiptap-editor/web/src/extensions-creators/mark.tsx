import * as ricosSchema from 'ricos-schema';
import { RicosMarkExtension } from 'wix-rich-content-common';
import { mergeAttributes } from '@tiptap/react';
import { MarkConfig } from '@tiptap/core';

export const createRicosMarkConfig = (ext: RicosMarkExtension): any => ({
  addAttributes: () => ext.createComponentDataDefaults?.(ricosSchema) || {},
  ...ext.createExtensionConfig({ mergeAttributes }),
  type: ext.type,
});

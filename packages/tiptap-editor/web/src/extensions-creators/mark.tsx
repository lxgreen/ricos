import * as ricosSchema from 'ricos-schema';
import { RicosMarkExtension } from 'wix-rich-content-common';
import { mergeAttributes } from '@tiptap/react';
import { MarkConfig } from '@tiptap/core';

export const createRicosMarkConfig = (ext: RicosMarkExtension): MarkConfig => ({
  addAttributes: () => ext.createComponentDataDefaults?.(ricosSchema) || {},
  ...ext.createConfig({ mergeAttributes }),
  type: ext.type,
});

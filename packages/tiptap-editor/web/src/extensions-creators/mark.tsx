import * as ricosSchema from 'ricos-schema';
import { CreateExtensionParams } from 'wix-rich-content-editor-common';
import { mergeAttributes, MarkConfig } from '@tiptap/react';
import { RicosMarkConfig } from '../types';

type RicosMarkConfigCreator = (params: CreateExtensionParams<MarkConfig>) => RicosMarkConfig;

export const createRicosMarkConfig: RicosMarkConfigCreator = ({
  createConfig,
  createComponentDataDefaults,
}) => {
  return {
    addAttributes: () => createComponentDataDefaults?.(ricosSchema) || {},
    ...createConfig({ mergeAttributes }),
    extensionType: 'mark',
  };
};

import * as ricosSchema from 'ricos-schema';
import { CreateExtensionParams } from 'wix-rich-content-editor-common';
import { mergeAttributes } from '@tiptap/react';
import { RicosMarkConfig } from '../types';

type RicosMarkConfigCreator = (params: CreateExtensionParams<'mark'>) => RicosMarkConfig;

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

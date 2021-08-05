import * as ricosSchema from 'ricos-schema';
import { RicosMarkExtensionConfig } from 'wix-rich-content-common';
import { RicosExtensionConfigCreatorParams } from 'wix-rich-content-editor-common';
import { MarkConfig, mergeAttributes } from '@tiptap/react';
import { RicosConfigWithType } from '../types';

type RicosMarkConfigCreator = (
  params: RicosExtensionConfigCreatorParams<RicosMarkExtensionConfig>
) => MarkConfig & RicosConfigWithType<'mark'>;

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

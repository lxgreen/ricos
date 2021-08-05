import { ExtensionConfig, mergeAttributes } from '@tiptap/react';
import { RicosExtensionConfig } from 'wix-rich-content-common';
import { RicosExtensionConfigCreatorParams } from 'wix-rich-content-editor-common';
import { RicosConfigWithType } from '../types';

type RicosExtensionConfigCreator = (
  params: RicosExtensionConfigCreatorParams<RicosExtensionConfig>
) => ExtensionConfig & RicosConfigWithType<'extension'>;

export const createRicosExtensionConfig: RicosExtensionConfigCreator = ({ createConfig }) => {
  return {
    ...createConfig({ mergeAttributes }),
    extensionType: 'extension',
  };
};

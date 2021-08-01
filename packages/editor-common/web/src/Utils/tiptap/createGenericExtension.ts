import { extendConfig } from './extendConfig';
import { CreateExtension } from './types';
import { ExtensionConfig } from '@tiptap/core';

export const createGenericExtension: CreateExtension<ExtensionConfig> = ({
  componentDataDefaults,
  extensionConfig,
}) => ({
  type: 'extension',
  createConfig: extendConfig(
    () => ({
      addAttributes() {
        return componentDataDefaults;
      },
    }),
    extensionConfig
  ),
});

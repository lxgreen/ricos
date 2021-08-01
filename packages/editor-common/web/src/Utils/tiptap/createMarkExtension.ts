import { extendConfig } from './extendConfig';
import { CreateExtension } from './types';
import { MarkConfig } from '@tiptap/core';

export const createMarkExtension: CreateExtension<MarkConfig> = ({
  componentDataDefaults,
  extensionConfig,
}) => ({
  type: 'mark',
  createConfig: extendConfig(
    () => ({
      addAttributes() {
        return componentDataDefaults;
      },
    }),
    extensionConfig
  ),
});

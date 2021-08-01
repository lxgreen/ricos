import { extendConfig } from './extendConfig';
import { CreateExtension } from './types';
import { NodeConfig } from '@tiptap/core';

export const createNodeExtension: CreateExtension<NodeConfig> = ({
  Component,
  componentDataDefaults,
  extensionConfig,
}) => ({
  type: 'node',
  Component,
  createConfig: extendConfig(
    () => ({
      addAttributes() {
        return componentDataDefaults;
      },
    }),
    extensionConfig
  ),
});

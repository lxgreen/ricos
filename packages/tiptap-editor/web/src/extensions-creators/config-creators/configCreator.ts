import { NodeConfig, MarkConfig, ExtensionConfig } from '@tiptap/react';
import { compact } from 'lodash';
import { CreateTiptapExtensionConfig, EditorPlugin } from 'wix-rich-content-common';
import {
  createRicosNodeConfig,
  createRicosMarkConfig,
  createRicosGenericExtensionConfig,
} from '..';

export const createRicosExtensionsConfigs = (ricosExtensions: EditorPlugin[]) => {
  const tiptapExtensions = compact(ricosExtensions.map(extension => extension.tiptapExtension));
  const configs = tiptapExtensions.map(({ type, Component, createConfig }) => {
    let creator;
    switch (type) {
      case 'node':
        creator = createConfig as CreateTiptapExtensionConfig<NodeConfig>;
        return createRicosNodeConfig(Component as React.ComponentType, creator);
      case 'mark':
        creator = createConfig as CreateTiptapExtensionConfig<MarkConfig>;
        return createRicosMarkConfig(creator);
      case 'extension':
        creator = createConfig as CreateTiptapExtensionConfig<ExtensionConfig>;
        return createRicosGenericExtensionConfig(creator);
      default:
        throw Error('Extension type is unknown');
    }
  });
  return configs;
};

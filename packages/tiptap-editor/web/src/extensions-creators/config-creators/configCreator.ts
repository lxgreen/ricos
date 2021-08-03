import { NodeConfig, MarkConfig, ExtensionConfig } from '@tiptap/react';
import { compact, flatten } from 'lodash';
import { CreateTiptapExtensionConfig, EditorPlugin } from 'wix-rich-content-common';
import {
  createRicosNodeConfig,
  createRicosMarkConfig,
  createRicosGenericExtensionConfig,
} from '..';

export const createRicosExtensionsConfigs = (ricosExtensions: EditorPlugin[]) => {
  const tiptapExtensions = flatten(
    compact(ricosExtensions.map(extension => extension.tiptapExtensions))
  );
  const configs = tiptapExtensions.map(
    ({ type, Component, createConfig: creator, createComponentDataDefaults }) => {
      let createConfig;
      switch (type) {
        case 'node':
          createConfig = creator as CreateTiptapExtensionConfig<NodeConfig>;
          return createRicosNodeConfig({ Component, createConfig, createComponentDataDefaults });
        case 'mark':
          createConfig = creator as CreateTiptapExtensionConfig<MarkConfig>;
          return createRicosMarkConfig({ createConfig, createComponentDataDefaults });
        case 'extension':
          createConfig = creator as CreateTiptapExtensionConfig<ExtensionConfig>;
          return createRicosGenericExtensionConfig({ createConfig, createComponentDataDefaults });
        default:
          throw Error('Extension type is unknown');
      }
    }
  );
  return configs;
};

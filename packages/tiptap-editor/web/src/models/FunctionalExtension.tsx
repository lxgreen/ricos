import { Extension } from '@tiptap/core';
import { mergeAttributes } from '@tiptap/react';
import React from 'react';
import type { ExtensionAggregate, IFunctionalExtension } from './domain-types';
import { DEFAULT_PRIORITY } from './domain-types';
import type {
  Group,
  NodeHocDescriptor,
  RicosExtension,
  RicosExtensionConfig,
} from 'ricos-tiptap-types';
import { isRicosFunctionalExtension } from 'ricos-tiptap-types';

const DEFAULT_HOC_DESCRTIPTOR: NodeHocDescriptor = {
  nodeTypes: [],
  priority: Number.POSITIVE_INFINITY,
  nodeHoc: () => () => <div />,
};

export class FunctionalExtension implements IFunctionalExtension {
  config: RicosExtensionConfig;

  priority: number;

  type = 'extension' as const;

  name: string;

  groups: Group[];

  private readonly ricosExtension: RicosExtension;

  private readonly dynamicConfiguration: (
    config: RicosExtensionConfig,
    extensions: RicosExtension[]
  ) => RicosExtensionConfig;

  constructor(extension: RicosExtension, config?: RicosExtensionConfig) {
    if (!isRicosFunctionalExtension(extension)) {
      throw new TypeError('invalid argument');
    }
    // omit addKeyboardShortcuts
    const { addKeyboardShortcuts: _, ...rest } =
      config || extension.createExtensionConfig({ mergeAttributes });
    this.config = { ...rest, type: 'extension' };
    this.priority = this.config.priority || DEFAULT_PRIORITY;
    this.name = this.config.name;
    this.groups = extension.groups || [];
    this.ricosExtension = extension;
    this.dynamicConfiguration = extension.dynamicConfiguration || (() => this.config);
  }

  getRicosExtension() {
    return this.ricosExtension;
  }

  toTiptapExtension(extensions: ExtensionAggregate) {
    const config = this.dynamicConfiguration(this.config, extensions.getRicosExtensions());
    return Extension.create(config).configure(config);
  }

  getNodeHocDescriptor(extensions: ExtensionAggregate) {
    const config = this.dynamicConfiguration(this.config, extensions.getRicosExtensions());
    return config.addNodeHoc?.() || DEFAULT_HOC_DESCRTIPTOR;
  }

  configure = (config: Record<string, unknown>) => {
    return new FunctionalExtension(this.ricosExtension, {
      ...this.config,
      ...config,
    });
  };
}

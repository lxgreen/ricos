import { Extension } from '@tiptap/core';
import { mergeAttributes } from '@tiptap/react';
import React from 'react';
import { DEFAULT_PRIORITY, IFunctionalExtension } from './domain-types';
import {
  isRicosFunctionalExtension,
  NodeHocDescriptor,
  RicosExtension,
  RicosExtensionConfig,
} from './extension-types';

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

  constructor(extension: RicosExtension) {
    if (!isRicosFunctionalExtension(extension)) {
      throw new TypeError('invalid argument');
    }
    this.config = {
      ...extension.createExtensionConfig({ mergeAttributes }),
      type: 'extension',
    };
    this.priority = this.config.priority || DEFAULT_PRIORITY;
    this.name = this.config.name;
  }

  toTiptapExtension() {
    return Extension.create(this.config);
  }

  getNodeHocDescriptor() {
    return this.config.addNodeHoc?.() || DEFAULT_HOC_DESCRTIPTOR;
  }
}

import { Extension } from '@tiptap/core';
import { mergeAttributes } from '@tiptap/react';
import React from 'react';
import type { IFunctionalExtension } from './domain-types';
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
    this.groups = extension.groups || [];
  }

  toTiptapExtension() {
    return Extension.create(this.config);
  }

  getNodeHocDescriptor() {
    return this.config.addNodeHoc?.() || DEFAULT_HOC_DESCRTIPTOR;
  }
}

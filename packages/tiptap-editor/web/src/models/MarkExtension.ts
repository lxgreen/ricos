import { Mark, markInputRule, markPasteRule, textblockTypeInputRule } from '@tiptap/core';
import { MarkConfig, mergeAttributes } from '@tiptap/react';
import { isRicosMarkExtension, RicosExtension } from 'ricos-tiptap-types';
import { DEFAULT_PRIORITY, IMarkExtension } from './domain-types';
import { Plugin, PluginKey } from 'prosemirror-state';

export class MarkExtension implements IMarkExtension {
  config: MarkConfig;

  priority: number;

  type = 'mark' as const;

  name: string;

  constructor(extension: RicosExtension) {
    if (!isRicosMarkExtension(extension)) {
      throw new TypeError('invalid argument');
    }
    this.config = {
      addAttributes: () => extension.componentDataDefaults || {},
      ...extension.createExtensionConfig({
        textblockTypeInputRule,
        mergeAttributes,
        markInputRule,
        markPasteRule,
        Plugin,
        PluginKey,
      }),
      type: 'mark',
    };
    this.priority = this.config.priority || DEFAULT_PRIORITY;
    this.name = this.config.name;
  }

  toTiptapExtension() {
    return Mark.create(this.config);
  }
}

import { Mark, markInputRule, markPasteRule, textblockTypeInputRule } from '@tiptap/core';
import type { MarkConfig } from '@tiptap/react';
import { mergeAttributes } from '@tiptap/react';
import type { RicosExtension } from 'ricos-tiptap-types';
import { isRicosMarkExtension } from 'ricos-tiptap-types';
import type { IMarkExtension } from './domain-types';
import { DEFAULT_PRIORITY } from './domain-types';
import { Plugin, PluginKey } from 'prosemirror-state';

export class MarkExtension implements IMarkExtension {
  config: MarkConfig;

  priority: number;

  type = 'mark' as const;

  name: string;

  groups: RicosExtension['groups'];

  constructor(extension: RicosExtension) {
    if (!isRicosMarkExtension(extension)) {
      throw new TypeError('invalid argument');
    }
    this.groups = extension.groups || [];
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

import { Mark, markInputRule, markPasteRule, textblockTypeInputRule } from '@tiptap/core';
import type { MarkConfig } from '@tiptap/react';
import { mergeAttributes } from '@tiptap/react';
import type { RicosExtension } from 'ricos-tiptap-types';
import { isRicosMarkExtension } from 'ricos-tiptap-types';
import type { ExtensionAggregate, IMarkExtension } from './domain-types';
import { DEFAULT_PRIORITY } from './domain-types';
import { Plugin, PluginKey } from 'prosemirror-state';

export class MarkExtension implements IMarkExtension {
  config: MarkConfig;

  priority: number;

  type = 'mark' as const;

  name: string;

  groups: RicosExtension['groups'];

  dynamicConfiguration: (config: MarkConfig, extensions: RicosExtension[]) => MarkConfig;

  private readonly ricosExtension: RicosExtension;

  constructor(extension: RicosExtension, config?: MarkConfig) {
    if (!isRicosMarkExtension(extension)) {
      throw new TypeError('invalid argument');
    }
    this.groups = extension.groups || [];
    // omit addKeyboardShortcuts
    const { addKeyboardShortcuts: _, ...rest } =
      config ||
      extension.createExtensionConfig({
        textblockTypeInputRule,
        mergeAttributes,
        markInputRule,
        markPasteRule,
        Plugin,
        PluginKey,
      });
    this.config = {
      ...rest,
      type: 'mark',
    };
    this.priority = this.config.priority || DEFAULT_PRIORITY;
    this.name = this.config.name;
    this.ricosExtension = extension;
    this.dynamicConfiguration = extension.dynamicConfiguration || (() => this.config);
  }

  getRicosExtension() {
    return this.ricosExtension;
  }

  toTiptapExtension(extensions: ExtensionAggregate) {
    const config = this.dynamicConfiguration(this.config, extensions.getRicosExtensions());
    return Mark.create(config).configure(config);
  }

  configure = (config: Record<string, unknown>) =>
    new MarkExtension(this.ricosExtension, {
      ...this.config,
      ...config,
    });
}

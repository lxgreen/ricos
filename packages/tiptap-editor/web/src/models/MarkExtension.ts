import { Mark, markInputRule, markPasteRule, textblockTypeInputRule } from '@tiptap/core';
import type { MarkConfig } from '@tiptap/react';
import { mergeAttributes } from '@tiptap/react';
import { Plugin, PluginKey } from 'prosemirror-state';
import type { ExtensionProps, RicosExtension } from 'ricos-tiptap-types';
import { isRicosMarkExtension } from 'ricos-tiptap-types';
import type { ExtensionAggregate, IMarkExtension } from './domain-types';
import { DEFAULT_PRIORITY } from './domain-types';

export class MarkExtension implements IMarkExtension {
  config: MarkConfig;

  priority: number;

  type = 'mark' as const;

  name: string;

  groups: RicosExtension['groups'];

  private readonly reconfigure: (
    config: MarkConfig,
    extensions: RicosExtension[],
    ricosProps: ExtensionProps
  ) => MarkConfig;

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
    this.reconfigure = extension.reconfigure || (() => this.config);
  }

  getRicosExtension() {
    return this.ricosExtension;
  }

  toTiptapExtension(extensions: ExtensionAggregate, ricosProps: ExtensionProps) {
    const config = this.reconfigure(this.config, extensions.getRicosExtensions(), ricosProps);
    return Mark.create(config);
  }
}

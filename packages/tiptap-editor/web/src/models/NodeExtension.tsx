import type { NodeConfig, NodeViewRendererProps } from '@tiptap/react';
import {
  mergeAttributes,
  textblockTypeInputRule,
  markPasteRule,
  markInputRule,
  Node,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from '@tiptap/react';
import { pipe } from 'fp-ts/function';
import type { ComponentType } from 'react';
import React from 'react';
import type {
  DecoratedNodeExtension,
  IReactNodeExtension,
  IHtmlNodeExtension,
} from './domain-types';
import { DEFAULT_PRIORITY } from './domain-types';
import type { RicosExtension, RicosNodeExtension } from 'ricos-tiptap-types';
import { isRicosNodeExtension } from 'ricos-tiptap-types';
import { RicosNode } from '../components/RicosNode';
import { Plugin, PluginKey } from 'prosemirror-state';

const toExtensionConfig = (ext: RicosNodeExtension) =>
  ext.createExtensionConfig({
    textblockTypeInputRule,
    markPasteRule,
    markInputRule,
    mergeAttributes,
    Plugin,
    PluginKey,
  });

const toFullNodeConfig =
  (ext: RicosNodeExtension) =>
  (config: NodeConfig): NodeConfig => ({
    ...(ext.groups.includes('text')
      ? {}
      : {
          parseHTML: () => [{ tag: `${config.name}-component` }],
          renderHTML: ({ HTMLAttributes }) => [
            `${config.name}-component`,
            mergeAttributes(HTMLAttributes),
          ],
        }),
    ...(ext.componentDataDefaults ? { addAttributes: () => ext.componentDataDefaults } : {}),
    ...config,
  });

const createRicosNodeConfig = (ext: RicosNodeExtension): NodeConfig =>
  pipe(ext, toExtensionConfig, toFullNodeConfig(ext));

const createRicosNodeHOC = (Component: ComponentType) => (props: NodeViewRendererProps) =>
  (
    <NodeViewWrapper as="div">
      <RicosNode Component={Component} tiptapNodeProps={props} />
    </NodeViewWrapper>
  );

export class ReactNodeExtension implements IReactNodeExtension {
  config: NodeConfig;

  priority: number;

  type = 'node' as const;

  name: string;

  groups: RicosExtension['groups'];

  ricosExtension: RicosNodeExtension;

  constructor(extension: RicosExtension) {
    if (!isRicosNodeExtension(extension)) {
      throw new TypeError('invalid argument');
    }
    this.ricosExtension = extension;
    this.config = createRicosNodeConfig(extension);
    this.priority = this.config.priority || DEFAULT_PRIORITY;
    this.name = this.config.name;
    this.groups = extension.groups;
  }

  getComponent() {
    return this.ricosExtension.Component as ComponentType;
  }

  asRenderable(decoratedComponent: ComponentType) {
    return new RenderableNodeExtension(decoratedComponent, this.ricosExtension);
  }
}

class RenderableNodeExtension extends ReactNodeExtension implements DecoratedNodeExtension {
  constructor(component: ComponentType, extension: RicosExtension) {
    super(extension);
    this.config = {
      ...this.config,
      addNodeView: () => pipe(component, createRicosNodeHOC, ReactNodeViewRenderer),
    };
  }

  toTiptapExtension() {
    return Node.create(this.config);
  }
}

export class HtmlNodeExtension implements IHtmlNodeExtension {
  config: NodeConfig;

  priority: number;

  type = 'node' as const;

  name: string;

  ricosExtension: RicosNodeExtension;

  groups: RicosExtension['groups'];

  constructor(extension: RicosExtension) {
    if (!isRicosNodeExtension(extension)) {
      throw new TypeError('invalid argument');
    }
    this.ricosExtension = extension;
    this.config = createRicosNodeConfig(extension);
    this.priority = this.config.priority || DEFAULT_PRIORITY;
    this.name = this.config.name;
    this.groups = extension.groups || [];
  }

  toTiptapExtension() {
    return Node.create(this.config);
  }
}

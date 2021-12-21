import {
  mergeAttributes,
  textblockTypeInputRule,
  markPasteRule,
  markInputRule,
  Node,
  NodeConfig,
  NodeViewRendererProps,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from '@tiptap/react';
import { pipe } from 'fp-ts/function';
import React, { ComponentType } from 'react';
import {
  DecoratedNodeExtension,
  DEFAULT_PRIORITY,
  IReactNodeExtension,
  IHtmlNodeExtension,
} from './domain-types';
import { isRicosNodeExtension, RicosExtension, RicosNodeExtension } from 'ricos-tiptap-types';
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

const toFullNodeConfig = (ext: RicosNodeExtension) => (config: NodeConfig): NodeConfig => ({
  type: 'node',
  parseHTML: () => [{ tag: `${config.name}-component` }],
  renderHTML: ({ HTMLAttributes }) => [`${config.name}-component`, mergeAttributes(HTMLAttributes)],
  addAttributes: () => ext.componentDataDefaults || {},
  ...config,
});

const createRicosNodeConfig = (ext: RicosNodeExtension): NodeConfig =>
  pipe(ext, toExtensionConfig, toFullNodeConfig(ext));

const createRicosNodeHOC = (Component: ComponentType) => (props: NodeViewRendererProps) => (
  <NodeViewWrapper as="div">
    <RicosNode Component={Component} tiptapNodeProps={props} />
  </NodeViewWrapper>
);

export class ReactNodeExtension implements IReactNodeExtension {
  config: NodeConfig;

  priority: number;

  type = 'react-node' as const;

  name: string;

  ricosExtension: RicosNodeExtension;

  constructor(extension: RicosExtension) {
    if (!isRicosNodeExtension(extension)) {
      throw new TypeError('invalid argument');
    }
    this.ricosExtension = extension;
    this.config = createRicosNodeConfig(extension);
    this.priority = this.config.priority || DEFAULT_PRIORITY;
    this.name = this.config.name;
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

  type = 'html-node' as const;

  name: string;

  ricosExtension: RicosNodeExtension;

  constructor(extension: RicosExtension) {
    if (!isRicosNodeExtension(extension)) {
      throw new TypeError('invalid argument');
    }
    this.ricosExtension = extension;
    this.config = createRicosNodeConfig(extension);
    this.priority = this.config.priority || DEFAULT_PRIORITY;
    this.name = this.config.name;
  }

  toTiptapExtension() {
    return Node.create(this.config);
  }
}

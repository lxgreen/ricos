import {
  mergeAttributes,
  Node,
  NodeConfig,
  NodeViewRendererProps,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from '@tiptap/react';
import { pipe } from 'fp-ts/function';
import React, { ComponentType } from 'react';
import { DecoratedNodeExtension, DEFAULT_PRIORITY, INodeExtension } from './domain-types';
import { isRicosNodeExtension, RicosExtension, RicosNodeExtension } from './extension-types';
import { RicosNode } from '../components/RicosNode';

const toExtensionConfig = (ext: RicosNodeExtension) =>
  ext.createExtensionConfig({ mergeAttributes });

const toFullNodeConfig = (ext: RicosNodeExtension) => (config: NodeConfig): NodeConfig => ({
  type: 'node',
  group: 'block',
  atom: true,
  selectable: true,
  draggable: true,
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

export class NodeExtension implements INodeExtension {
  config: NodeConfig;

  priority: number;

  type = 'node' as const;

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
    return this.ricosExtension.Component;
  }

  asRenderable(decoratedComponent: ComponentType) {
    return new RenderableNodeExtension(decoratedComponent, this.ricosExtension);
  }
}

class RenderableNodeExtension extends NodeExtension implements DecoratedNodeExtension {
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

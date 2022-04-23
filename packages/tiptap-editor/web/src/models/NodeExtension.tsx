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
  ExtensionAggregate,
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

  private readonly ricosExtension: RicosNodeExtension;

  protected readonly dynamicConfiguration: (
    config: NodeConfig,
    extensions: RicosExtension[]
  ) => NodeConfig;

  constructor(extension: RicosExtension) {
    if (!isRicosNodeExtension(extension)) {
      throw new TypeError('invalid argument');
    }
    this.ricosExtension = extension;
    this.config = createRicosNodeConfig(extension);
    this.priority = this.config.priority || DEFAULT_PRIORITY;
    this.name = this.config.name;
    this.groups = extension.groups;
    this.dynamicConfiguration = extension.dynamicConfiguration || (() => this.config);
  }

  getComponent() {
    return this.ricosExtension.Component as ComponentType;
  }

  asRenderable(decoratedComponent: ComponentType) {
    return new RenderableNodeExtension(decoratedComponent, this.ricosExtension);
  }

  getRicosExtension() {
    return this.ricosExtension;
  }

  configure(config: Record<string, unknown>) {
    this.config = {
      ...this.config,
      ...config,
    };
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

  toTiptapExtension(extensions: ExtensionAggregate) {
    const ricosExtensions = extensions.getRicosExtensions();
    const config = this.dynamicConfiguration(this.config, ricosExtensions);
    return Node.create(config);
  }
}

export class HtmlNodeExtension implements IHtmlNodeExtension {
  config: NodeConfig;

  priority: number;

  type = 'node' as const;

  name: string;

  private readonly ricosExtension: RicosNodeExtension;

  private readonly dynamicConfiguration: (
    config: NodeConfig,
    extensions: RicosExtension[]
  ) => NodeConfig;

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
    this.dynamicConfiguration = extension.dynamicConfiguration || (() => this.config);
  }

  getRicosExtension() {
    return this.ricosExtension;
  }

  toTiptapExtension(extensions: ExtensionAggregate) {
    const ricosExtensions = extensions.getRicosExtensions();
    const config = this.dynamicConfiguration(this.config, ricosExtensions);
    return Node.create(config).configure(config);
  }

  configure(config: Record<string, unknown>) {
    this.config = {
      ...this.config,
      ...config,
    };
  }
}

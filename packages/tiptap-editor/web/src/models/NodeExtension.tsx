import type { NodeConfig, NodeViewRendererProps } from '@tiptap/react';
import {
  markInputRule,
  markPasteRule,
  mergeAttributes,
  Node,
  NodeViewWrapper,
  ReactNodeViewRenderer,
  textblockTypeInputRule,
} from '@tiptap/react';
import { pipe } from 'fp-ts/function';
import { Plugin, PluginKey } from 'prosemirror-state';
import type { ComponentType } from 'react';
import React from 'react';
import type { ExtensionProps, RicosExtension, RicosNodeExtension } from 'ricos-tiptap-types';
import { isRicosNodeExtension } from 'ricos-tiptap-types';
import { RicosNode } from '../components/RicosNode';
import type {
  DecoratedNodeExtension,
  ExtensionAggregate,
  IHtmlNodeExtension,
  IReactNodeExtension,
} from './domain-types';
import { DEFAULT_PRIORITY } from './domain-types';

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
  (config: NodeConfig): NodeConfig => {
    // omit addKeyboardShortcuts
    const { addKeyboardShortcuts: _, ...rest } = config;
    return {
      ...(ext.groups.includes('text')
        ? {}
        : {
            parseHTML: () => [{ tag: `${config.name}-component` }],
            renderHTML: ({ HTMLAttributes }) => [
              `${config.name}-component`,
              mergeAttributes(HTMLAttributes),
            ],
          }),
      ...rest,
    };
  };

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

  protected readonly reconfigure: (
    config: NodeConfig,
    extensions: RicosExtension[],
    ricosProps: ExtensionProps
  ) => NodeConfig;

  constructor(extension: RicosExtension, config?: NodeConfig) {
    if (!isRicosNodeExtension(extension)) {
      throw new TypeError('invalid argument');
    }
    this.ricosExtension = extension;
    this.config = config || createRicosNodeConfig(extension);
    this.priority = this.config.priority || DEFAULT_PRIORITY;
    this.name = this.config.name;
    this.groups = extension.groups;
    this.reconfigure = extension.reconfigure || (() => this.config);
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
}

class RenderableNodeExtension extends ReactNodeExtension implements DecoratedNodeExtension {
  constructor(component: ComponentType, extension: RicosExtension) {
    super(extension);
    this.config = {
      ...this.config,
      addNodeView: () => pipe(component, createRicosNodeHOC, ReactNodeViewRenderer),
    };
  }

  toTiptapExtension(extensions: ExtensionAggregate, ricosProps: ExtensionProps) {
    const ricosExtensions = extensions.getRicosExtensions();
    const config = this.reconfigure(this.config, ricosExtensions, ricosProps);
    return Node.create(config);
  }
}

export class HtmlNodeExtension implements IHtmlNodeExtension {
  config: NodeConfig;

  priority: number;

  type = 'node' as const;

  name: string;

  private readonly ricosExtension: RicosNodeExtension;

  private readonly reconfigure: (
    config: NodeConfig,
    extensions: RicosExtension[],
    ricosProps: ExtensionProps
  ) => NodeConfig;

  groups: RicosExtension['groups'];

  constructor(extension: RicosExtension, config?: NodeConfig) {
    if (!isRicosNodeExtension(extension)) {
      throw new TypeError('invalid argument');
    }
    this.ricosExtension = extension;
    this.config = config || createRicosNodeConfig(extension);
    this.priority = this.config.priority || DEFAULT_PRIORITY;
    this.name = this.config.name;
    this.groups = extension.groups || [];
    this.reconfigure = extension.reconfigure || (() => this.config);
  }

  getRicosExtension() {
    return this.ricosExtension;
  }

  toTiptapExtension(extensions: ExtensionAggregate, ricosProps: ExtensionProps) {
    const ricosExtensions = extensions.getRicosExtensions();
    const config = this.reconfigure(this.config, ricosExtensions, ricosProps);
    return Node.create(config);
  }
}

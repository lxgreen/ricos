import { pipe } from 'fp-ts/function';
import React, { ComponentType } from 'react';
import { NodeConfig } from '@tiptap/core';
import {
  ReactNodeViewRenderer,
  NodeViewRendererProps,
  mergeAttributes,
  NodeViewWrapper,
} from '@tiptap/react';
import { RicosNode, RicosNodeProps } from '../components/RicosNode/RicosNode';
import { RicosNodeExtension } from 'wix-rich-content-common';

const createRicosNodeHOC = (Component: ComponentType<RicosNodeProps>) => (
  props: NodeViewRendererProps
) => (
  <NodeViewWrapper as="div">
    <RicosNode component={Component} tiptapNodeProps={props} />
  </NodeViewWrapper>
);

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
  addNodeView: () => pipe(ext.Component, createRicosNodeHOC, ReactNodeViewRenderer),
  addAttributes: () => ext.componentDataDefaults || {},
  ...config,
});

export const createRicosNodeConfig = (ext: RicosNodeExtension): NodeConfig =>
  pipe(ext, toExtensionConfig, toFullNodeConfig(ext));

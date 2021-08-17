import { pipe } from 'fp-ts/function';
import React, { ComponentType } from 'react';
import * as ricosSchema from 'ricos-schema';
import { NodeConfig } from '@tiptap/core';
import {
  ReactNodeViewRenderer,
  NodeViewRendererProps,
  mergeAttributes,
  NodeViewWrapper,
} from '@tiptap/react';
import { RicosNode, RicosNodeProps } from '../components/RicosNode/RicosNode';
import { RicosNodeExtension } from 'wix-rich-content-common';
import { RicosNodeHOCComposer } from '../components/RicosNodeHOCComposer/RicosNodeHOCComposer';

const createRicosNodeHOC = (Component: ComponentType<RicosNodeProps>) => (
  props: NodeViewRendererProps
) => (
  <NodeViewWrapper as="div">
    <RicosNodeHOCComposer Component={Component} nodeName={props.node.type.name}>
      {ComponentWithNodeHOCs => {
        return <RicosNode Component={ComponentWithNodeHOCs} tiptapNodeProps={props} />;
      }}
    </RicosNodeHOCComposer>
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
  addAttributes: () => ext.createComponentDataDefaults?.(ricosSchema) || {},
  ...config,
});

export const createRicosNodeConfig = (ext: RicosNodeExtension): any =>
  pipe(ext, toExtensionConfig, toFullNodeConfig(ext));

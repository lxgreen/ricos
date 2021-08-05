import React from 'react';
import * as ricosSchema from 'ricos-schema';
import { CreateExtensionParams } from 'wix-rich-content-editor-common';
import { ReactNodeViewRenderer, mergeAttributes, NodeViewWrapper, NodeConfig } from '@tiptap/react';
import { RicosNodeConfig } from '../types';
import { RicosNode } from '../components/RicosNode';

// RicosNode change it to regular component
const createRicosNodeHOC = Component => {
  return props => (
    <NodeViewWrapper as="div">
      <RicosNode component={Component} tiptapNodeProps={props} />
    </NodeViewWrapper>
  );
};

type RicosNodeConfigCreator = (params: CreateExtensionParams<NodeConfig>) => RicosNodeConfig;

export const createRicosNodeConfig: RicosNodeConfigCreator = ({
  Component,
  createConfig,
  createComponentDataDefaults,
}) => {
  const config = createConfig({ mergeAttributes });
  const { name } = config;
  return {
    group: 'block',
    atom: true,
    selectable: true,
    draggable: true,

    parseHTML() {
      return [
        {
          tag: `${name}-component`,
        },
      ];
    },

    renderHTML({ HTMLAttributes }) {
      return [`${name}-component`, mergeAttributes(HTMLAttributes)];
    },
    addNodeView: () => ReactNodeViewRenderer(createRicosNodeHOC(Component)),
    addAttributes: () => createComponentDataDefaults?.(ricosSchema) || {},
    ...config,
    extensionType: 'node',
  };
};

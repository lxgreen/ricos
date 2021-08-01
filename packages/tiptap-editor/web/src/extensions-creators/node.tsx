import React from 'react';
import { CreateTiptapExtensionConfig } from 'wix-rich-content-common';
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

type RicosNodeConfigCreator = (
  Component: React.ComponentType,
  configCreator: CreateTiptapExtensionConfig<NodeConfig>
) => RicosNodeConfig;

export const createRicosNodeConfig: RicosNodeConfigCreator = (Component, configCreator) => {
  const config = configCreator({ mergeAttributes });
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
    ...config,
    extensionType: 'node',
  };
};

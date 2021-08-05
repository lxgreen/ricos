import React from 'react';
import * as ricosSchema from 'ricos-schema';
import { RicosNodeExtensionConfig } from 'wix-rich-content-common';
import { RicosExtensionConfigCreatorParams } from 'wix-rich-content-editor-common';
import { NodeConfig, ReactNodeViewRenderer, mergeAttributes, NodeViewWrapper } from '@tiptap/react';
import { RicosConfigWithType } from '../types';
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
  params: RicosExtensionConfigCreatorParams<RicosNodeExtensionConfig>
) => NodeConfig & RicosConfigWithType<'node'>;

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

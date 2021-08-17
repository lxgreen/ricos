import React, { useContext } from 'react';
import { NodeViewRendererProps, NodeViewWrapper } from '@tiptap/react';
import { RicosTiptapContext } from '../../context';
import { RicosTiptapContextValue } from 'wix-rich-content-common';

export type RicosNodeProps = NodeViewRendererProps &
  RicosTiptapContextValue & {
    componentData: NodeViewRendererProps['node']['attrs'];
  };

export const RicosNode = ({ Component, tiptapNodeProps }) => {
  const ricosTiptapContext = useContext(RicosTiptapContext) || {};

  const componentProps = {
    ...ricosTiptapContext, // helpes , editor Props
    componentData: tiptapNodeProps.node.attrs,
    ...tiptapNodeProps,
  };
  console.log({ Component });
  return (
    <NodeViewWrapper>
      <Component {...componentProps} />
    </NodeViewWrapper>
  );
};

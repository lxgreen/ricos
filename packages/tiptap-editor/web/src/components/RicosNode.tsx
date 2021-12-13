import { NodeViewWrapper } from '@tiptap/react';
import React, { useContext } from 'react';
import { RicosTiptapContext } from '../context';

export const RicosNode = ({ Component, tiptapNodeProps }) => {
  const ricosTiptapContext = useContext(RicosTiptapContext) || {};

  const componentProps = {
    ...ricosTiptapContext, // helpes , editor Props
    componentData: tiptapNodeProps.node.attrs,
    ...tiptapNodeProps,
  };
  return (
    Component && (
      <NodeViewWrapper>
        <Component {...componentProps} />
      </NodeViewWrapper>
    )
  );
};

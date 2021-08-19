import React, { useRef, useContext } from 'react';
import { NodeHOCsContext } from '../../ricos-node-hoc-manager';

const withApplyNodeHOCs = Comp => props => {
  const ricosNodeHOCManager = useContext(NodeHOCsContext) || {};
  return React.createElement(Comp, {
    applyNodeHOCs: ricosNodeHOCManager.applyNodeHOCs,
    ...props,
  });
};

const _RicosNodeHOCComposer = ({ applyNodeHOCs, Component, nodeName, children }) => {
  const ComponentWithNodeHOCs = useRef(applyNodeHOCs(nodeName, Component)).current;

  return children(ComponentWithNodeHOCs);
};

export const RicosNodeHOCComposer = withApplyNodeHOCs(_RicosNodeHOCComposer);

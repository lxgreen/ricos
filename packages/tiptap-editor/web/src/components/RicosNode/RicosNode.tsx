import { pipe } from 'fp-ts/function';
import * as A from 'fp-ts/Array';
import { concatAll } from 'fp-ts/Monoid';
import * as E from 'fp-ts/Endomorphism';
import React, { useContext, useRef, ComponentType } from 'react';
import { NodeViewWrapper, NodeViewRendererProps } from '@tiptap/react';
import { NodeViewHoc, NodeViewHocMap, RicosTiptapContextValue } from 'wix-rich-content-common';
import { RicosTiptapContext } from '../../context';

export type RicosNodeProps = NodeViewRendererProps &
  RicosTiptapContextValue & {
    componentData: NodeViewRendererProps['node']['attrs'];
  };

const composeHocs = (component: ComponentType<RicosNodeProps>) => (
  hocs: NodeViewHoc<RicosNodeProps>[]
): ComponentType<RicosNodeProps> =>
  concatAll(E.getMonoid<ComponentType<RicosNodeProps>>())(hocs)(component);

const getHocsByKey = (key: string) => (map: NodeViewHocMap) => map[key] || ([] as NodeViewHoc[]);

export const RicosNode = ({
  component,
  tiptapNodeProps,
}: {
  component: ComponentType<RicosNodeProps>;
  tiptapNodeProps: NodeViewRendererProps;
}) => {
  const ricosTiptapContext = useContext(RicosTiptapContext);

  // TODO: merged hoc array cannot be sorted by priority, as it does not exist in NodeViewHoc
  const componentWithNodeHOCs = pipe(
    [getHocsByKey('*'), getHocsByKey(tiptapNodeProps.node.type.name)],
    A.ap(A.of(ricosTiptapContext.nodeViewsHOCs)),
    concatAll(A.getMonoid<NodeViewHoc>()),
    A.reverse,
    composeHocs(component)
  );

  const componentProps: RicosNodeProps = {
    ...ricosTiptapContext,
    componentData: tiptapNodeProps.node.attrs,
    ...tiptapNodeProps,
  };

  const ComponentWithNodeHOCs = useRef(componentWithNodeHOCs).current;
  return (
    <NodeViewWrapper>
      <ComponentWithNodeHOCs {...componentProps} />
    </NodeViewWrapper>
  );
};

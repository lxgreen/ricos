import * as A from 'fp-ts/Array';
import * as R from 'fp-ts/Record';
import * as O from 'fp-ts/Option';
import * as N from 'fp-ts/number';
import { flow, pipe } from 'fp-ts/function';
import { concatAll } from 'fp-ts/Monoid';
import { contramap, reverse } from 'fp-ts/Ord';
import { firstRight } from 'ricos-content';
import {
  NodeViewHoc,
  NodeViewHocMap,
  TiptapExtensionConfig,
  RicosExtensionConfig,
  isNodeConfig,
  isMarkConfig,
  isExtensionConfig,
} from 'wix-rich-content-common';
import {
  Node,
  AnyExtension,
  Mark,
  Extension,
  NodeConfig,
  MarkConfig,
  ExtensionConfig,
} from '@tiptap/core';

const toExtension = (config: TiptapExtensionConfig): AnyExtension =>
  firstRight(config, Extension.create(<ExtensionConfig>config) as AnyExtension, [
    [isNodeConfig, c => Node.create(<NodeConfig>c)],
    [isMarkConfig, c => Mark.create(<MarkConfig>c)],
    [isExtensionConfig, c => Mark.create(<MarkConfig>c)],
  ]);

export const initializeExtensions = A.map(toExtension);

const NodeViewHocM = R.getMonoid<string, NodeViewHoc[]>(A.getSemigroup());

const byPriority = pipe(
  reverse(N.Ord),
  contramap((c: RicosExtensionConfig) => c.priority || 100)
);

const hasNodeViewHOC = (c: RicosExtensionConfig) => !!c.addNodeViewHOC;

export const extractNodeViewsHOCs = flow(
  A.filter(hasNodeViewHOC),
  A.sort(byPriority),
  A.map((c: RicosExtensionConfig) => (c.addNodeViewHOC ? O.some(c.addNodeViewHOC()) : O.none)),
  A.compact,
  A.reduce({} as NodeViewHocMap, (map, { nodeTypes, nodeViewHOC }) =>
    pipe(
      nodeTypes,
      A.map(t => ({ [t]: A.of(nodeViewHOC) })),
      A.concat(A.of(map)),
      concatAll(NodeViewHocM)
    )
  )
);

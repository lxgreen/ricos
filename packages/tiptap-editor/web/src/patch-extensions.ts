import { JSONContent } from '@tiptap/react';
import * as A from 'fp-ts/Array';
import { flow, identity, pipe } from 'fp-ts/function';
import * as S from 'fp-ts/string';
import { RicosMarkExtension, RicosNodeExtension } from 'ricos-tiptap-types';
import { getUnsupportedNodeConfig } from 'wix-rich-content-plugin-unsupported-blocks';
import { createUniqueId, extract } from 'wix-tiptap-extensions';
import { getUnsupportedMarkConfig } from './components/unsupported-mark';
import { Extensions } from './models/Extensions';

type ContentTypes = {
  marks: string[];
  nodes: string[];
};

const extractNodeNames = (extensions: Extensions): ContentTypes['nodes'] => [
  ...extensions
    .getReactNodeExtensions()
    .asArray()
    .map(({ name }) => name),
  ...extensions
    .getHtmlNodeExtensions()
    .asArray()
    .map(({ name }) => name),
];

const extractMarkNames = (extensions: Extensions): ContentTypes['marks'] =>
  extensions
    .getMarkExtensions()
    .asArray()
    .map(({ name }) => name);

const toContentTypes = (extensions: Extensions): ContentTypes => ({
  marks: extractMarkNames(extensions),
  nodes: extractNodeNames(extensions),
});

const toExtensions = (transform: {
  marks: (m: ContentTypes['marks']) => RicosMarkExtension[];
  nodes: (n: ContentTypes['nodes']) => RicosNodeExtension[];
}) => (contentTypes: ContentTypes) => ({
  nodes: transform.nodes(contentTypes.nodes),
  marks: transform.marks(contentTypes.marks),
});

const extractUnsupportedMarks = (content: JSONContent) => (
  supportedMarks: ContentTypes['marks']
): ContentTypes['marks'] =>
  pipe(
    extract(content)
      .map(
        flow(
          ({ marks }) => marks || [],
          A.map(({ type }) => type)
        )
      )
      .get(),
    A.chain(identity),
    A.uniq(S.Eq),
    A.difference(S.Eq)(supportedMarks)
  );

const extractUnsupportedNodes = (content: JSONContent) => (
  supportedNodes: ContentTypes['nodes']
): ContentTypes['nodes'] =>
  pipe(
    extract(content)
      .map(({ type }) => type)
      .get(),
    A.uniq(S.Eq),
    A.difference(S.Eq)(supportedNodes)
  );

const mergeExtensions = (extensions: Extensions) => ({
  nodes,
  marks,
}: {
  nodes: RicosNodeExtension[];
  marks: RicosMarkExtension[];
}): Extensions => extensions.concat([...nodes, ...marks]);

const appendUniqueId = (extensions: Extensions): Extensions =>
  pipe(
    extensions,
    extractNodeNames,
    A.filter(n => n !== 'text'),
    createUniqueId,
    A.of,
    extensions.concat.bind(extensions)
  );

export const patchExtensions = (content: JSONContent, extensions: Extensions): Extensions =>
  pipe(
    extensions,
    toContentTypes,
    toExtensions({
      nodes: flow(extractUnsupportedNodes(content), A.map(getUnsupportedNodeConfig)),
      marks: flow(extractUnsupportedMarks(content), A.map(getUnsupportedMarkConfig)),
    }),
    mergeExtensions(extensions),
    appendUniqueId
  );

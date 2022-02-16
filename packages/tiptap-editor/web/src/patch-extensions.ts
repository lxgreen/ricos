import type { JSONContent } from '@tiptap/react';
import * as A from 'fp-ts/Array';
import { flow, identity, pipe } from 'fp-ts/function';
import * as S from 'fp-ts/string';
import type { RicosMarkExtension, RicosNodeExtension } from 'ricos-tiptap-types';
import { getUnsupportedNodeConfig } from 'wix-rich-content-plugin-unsupported-blocks';
import {
  createUniqueId,
  createTextAlign,
  createTextDirection,
  extract,
} from 'wix-tiptap-extensions';
import { log } from 'ricos-content';
import { getUnsupportedMarkConfig } from './components/unsupported-mark';
import type { Extensions } from './models/Extensions';

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

const toExtensions =
  (transform: {
    marks: (m: ContentTypes['marks']) => RicosMarkExtension[];
    nodes: (n: ContentTypes['nodes']) => RicosNodeExtension[];
  }) =>
  (contentTypes: ContentTypes) => ({
    nodes: transform.nodes(contentTypes.nodes),
    marks: transform.marks(contentTypes.marks),
  });

const extractUnsupportedMarks =
  (content: JSONContent) =>
  (supportedMarks: ContentTypes['marks']): ContentTypes['marks'] =>
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

const extractUnsupportedNodes =
  (content: JSONContent) =>
  (supportedNodes: ContentTypes['nodes']): ContentTypes['nodes'] =>
    pipe(
      extract(content)
        .map(({ type }) => type)
        .get(),
      A.uniq(S.Eq),
      A.difference(S.Eq)(supportedNodes)
    );

const mergeExtensions =
  (extensions: Extensions) =>
  ({ nodes, marks }: { nodes: RicosNodeExtension[]; marks: RicosMarkExtension[] }): Extensions =>
    extensions.concat([...nodes, ...marks]);

const appendUniqueId = (extensions: Extensions): Extensions => {
  const identifiedNodeNames = extractNodeNames(extensions).filter(n => n !== 'text');
  return extensions.concat([createUniqueId(identifiedNodeNames)]);
};

const extractNamesGroupedByText = (extensions: Extensions): string[] =>
  extensions
    .byGroup('text-container')
    .asArray()
    .map(({ name }) => name);

const appendTextExtensions = (extensions: Extensions): Extensions => {
  const textContainerNames = extractNamesGroupedByText(extensions);
  return extensions.concat([
    createTextDirection(textContainerNames),
    createTextAlign(textContainerNames),
  ]);
};

export const patchExtensions = (content: JSONContent, extensions: Extensions): Extensions =>
  pipe(
    extensions,
    toContentTypes,
    toExtensions({
      nodes: flow(extractUnsupportedNodes(content), A.map(getUnsupportedNodeConfig)),
      marks: flow(extractUnsupportedMarks(content), A.map(getUnsupportedMarkConfig)),
    }),
    mergeExtensions(extensions),
    appendTextExtensions,
    appendUniqueId
  );

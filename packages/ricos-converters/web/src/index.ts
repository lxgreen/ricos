import { flow } from 'fp-ts/function';
import type { JSONContent } from '@tiptap/core';
import type { DraftContent } from 'ricos-content';
import { toDraft } from 'ricos-content/libs/toDraft';
import { fromDraft } from 'ricos-content/libs/fromDraft';
import { toTiptap, fromTiptap, toTiptapNodeAttrs } from './tiptap-converters';
import type { Node, Node_Type } from 'ricos-schema';
import { RichContent } from 'ricos-schema';
import { convertBlockDataToRicos } from 'ricos-content/libs/convertBlockDataToRicos';
import { TO_RICOS_NODE_TYPE } from 'ricos-content/libs/draftConsts';
import toCamelCase from 'to-camel-case';
import type { TiptapNode } from './types';
export * from './types';

const richContentNormalizer = (richContent: RichContent) =>
  RichContent.toJSON(RichContent.fromJSON(richContent)) as RichContent;

export const draftToTiptap: (draftContent: DraftContent) => JSONContent = flow(
  fromDraft,
  JSON.stringify,
  JSON.parse,
  toTiptap
);

const toRichContentNodeNormalizer = (
  blockType: string,
  draftBlockData: Record<string, unknown>
): Node => {
  const type = TO_RICOS_NODE_TYPE[blockType] as Node_Type;
  const dataType = `${toCamelCase(type)}Data`;
  return {
    [dataType]: { ...convertBlockDataToRicos(blockType, draftBlockData) },
    type,
    id: '',
    nodes: [],
  };
};

export const draftBlockDataToTiptap = (
  blockType: string,
  draftBlockData: Record<string, unknown>
): TiptapNode['attrs'] =>
  flow(
    toRichContentNodeNormalizer,
    toTiptapNodeAttrs,
    JSON.stringify,
    JSON.parse
  )(blockType, draftBlockData);

export const tiptapToDraft = (
  proseContent: JSONContent,
  shouldRevealConverterErrors = false
): DraftContent => {
  const richContent = fromTiptap(proseContent);
  return toDraft(shouldRevealConverterErrors ? richContent : richContentNormalizer(richContent));
};
export { fromTiptap, toTiptap };

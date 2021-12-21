/* eslint-disable @typescript-eslint/no-explicit-any */
import { JSONContent } from '@tiptap/core';
import { flow } from 'fp-ts/function';
import { DraftContent } from 'ricos-content';
import { fromDraft, toDraft } from 'ricos-content/libs/converters';
import { convertBlockDataToRicos } from 'ricos-content/libs/migrateSchema';
import { convertNodeDataToDraft } from 'ricos-content/libs/toDraftData';
import { Node_Type } from 'ricos-schema';
import { fromTiptap } from './fromTiptap/fromTiptap';
import { toTiptap } from './toTiptap/toTiptap';

export { extract } from './extract';
export { modify } from './modify';

export const draftToTiptap: (draftContent: DraftContent) => JSONContent = flow(fromDraft, toTiptap);

export const draftBlockDataToTiptap = (
  blockType: string,
  draftBlockData: Record<string, any>
): Record<string, any> => toTiptap(convertBlockDataToRicos(blockType, draftBlockData));

export const tiptapToDraft: (proseContent: JSONContent) => DraftContent = flow(fromTiptap, toDraft);

export const tiptapNodeDataToDraft = (
  nodeType: Node_Type,
  nodeData: Record<string, any>
): Record<string, any> => convertNodeDataToDraft(nodeType, fromTiptap(nodeData));

export { toTiptap, fromTiptap };

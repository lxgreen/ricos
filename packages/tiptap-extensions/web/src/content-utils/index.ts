/* eslint-disable @typescript-eslint/no-explicit-any */
import type { JSONContent } from '@tiptap/core';
import { flow } from 'fp-ts/function';
import type { DraftContent } from 'ricos-content';
import {
  convertBlockDataToRicos,
  toDraft,
  fromDraft,
  convertNodeDataToDraft,
} from 'ricos-content/libs/migrateSchema';
import type { Node_Type, Node } from 'ricos-schema';
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

// TODO: pass actual nodes to support nested plugin structure
export const tiptapNodeDataToDraft = (
  nodeType: Node_Type,
  nodeData: Record<string, any>
): Record<string, any> => convertNodeDataToDraft(nodeType, fromTiptap(nodeData), [] as Node[]);

export { toTiptap, fromTiptap };

/* eslint-disable @typescript-eslint/no-explicit-any */
import { toTiptap } from './toTiptap/toTiptap';
import { fromTiptap } from './fromTiptap/fromTiptap';
import { DraftContent } from 'ricos-content';
import { fromDraft, toDraft } from 'ricos-content/libs/converters';
import { convertNodeDataToDraft } from 'ricos-content/libs/toDraftData';
import { convertBlockDataToRicos } from 'ricos-content/libs/migrateSchema';
import { JSONContent } from '@tiptap/core';
import { Node_Type } from 'ricos-schema';

export const draftToTiptap = (draftContent: DraftContent): JSONContent =>
  toTiptap(fromDraft(draftContent));

export const draftBlockDataToTiptap = (
  blockType: string,
  draftBlockData: Record<string, any>
): Record<string, any> => toTiptap(convertBlockDataToRicos(blockType, draftBlockData));

export const tiptapToDraft = (proseContent: JSONContent): DraftContent =>
  toDraft(fromTiptap(proseContent));

export const tiptapNodeDataToDraft = (
  nodeType: Node_Type,
  nodeData: Record<string, any>
): Record<string, any> => convertNodeDataToDraft(nodeType, fromTiptap(nodeData));

export { toTiptap, fromTiptap };

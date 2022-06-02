import { flow } from 'fp-ts/function';
import type { JSONContent } from '@tiptap/core';
import type { DraftContent } from 'ricos-content';
import { toDraft } from 'ricos-content/libs/toDraft';
import { fromDraft } from 'ricos-content/libs/fromDraft';
import {
  toTiptapWithConverters as toTiptap,
  fromTiptapWithConverters as fromTiptap,
} from './tiptap-converters';
export * from './types';

export const draftToTiptap: (draftContent: DraftContent) => JSONContent = flow(
  fromDraft,
  JSON.stringify,
  JSON.parse,
  toTiptap
);
export const tiptapToDraft: (proseContent: JSONContent) => DraftContent = flow(fromTiptap, toDraft);
export { fromTiptap, toTiptap };

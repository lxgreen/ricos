import { flow } from 'fp-ts/function';
import type { JSONContent } from '@tiptap/core';
import type { DraftContent } from 'ricos-content';
import { toDraft } from 'ricos-content/libs/toDraft';
import { fromDraft } from 'ricos-content/libs/fromDraft';
import {
  toTiptapWithConverters as toTiptap,
  fromTiptapWithConverters as fromTiptap,
} from './tiptap-converters';
import { RichContent } from 'ricos-schema';
export * from './types';

const richContentNormalizer = (richContent: RichContent) =>
  RichContent.toJSON(RichContent.fromJSON(richContent)) as RichContent;

export const draftToTiptap: (draftContent: DraftContent) => JSONContent = flow(
  fromDraft,
  JSON.stringify,
  JSON.parse,
  toTiptap
);

export const tiptapToDraft = (
  proseContent: JSONContent,
  removeRichContentSchemaNormalizer = false
): DraftContent => {
  const richContent = fromTiptap(proseContent);
  return toDraft(
    removeRichContentSchemaNormalizer ? richContent : richContentNormalizer(richContent)
  );
};
export { fromTiptap, toTiptap };

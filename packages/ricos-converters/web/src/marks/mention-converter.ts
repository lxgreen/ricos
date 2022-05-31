import type { MentionData } from 'ricos-schema';
import { Decoration_Type } from 'ricos-schema';
import type { TiptapMarkConverter } from '../types';

export const mentionConverter: TiptapMarkConverter = {
  fromTiptap: {
    type: 'mention',
    convert: mark => {
      const { attrs } = mark;
      return {
        type: Decoration_Type.MENTION,
        mentionData: { ...attrs } as MentionData,
      };
    },
  },
  toTiptap: {
    type: Decoration_Type.MENTION,
    convert: decoration => {
      const { mentionData } = decoration;
      return {
        type: 'mention',
        attrs: { ...mentionData },
      };
    },
  },
};

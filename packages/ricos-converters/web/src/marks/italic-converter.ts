import { Decoration_Type } from 'ricos-schema';
import type { TiptapMarkConverter } from '../types';

export const italicConverter: TiptapMarkConverter = {
  fromTiptap: {
    type: 'italic',
    convert: mark => {
      const { type: _, ...data } = mark;
      return {
        type: Decoration_Type.ITALIC,
        ...data,
      };
    },
  },
  toTiptap: {
    type: Decoration_Type.ITALIC,
    convert: decoration => {
      const { type: _, ...data } = decoration;
      return {
        type: 'italic',
        ...data,
      };
    },
  },
};

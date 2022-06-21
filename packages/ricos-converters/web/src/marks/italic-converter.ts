import { Decoration_Type } from 'ricos-schema';
import type { TiptapMarkConverter } from '../types';

export const italicConverter: TiptapMarkConverter = {
  fromTiptap: {
    type: Decoration_Type.ITALIC,
    convert: mark => {
      const { type: _, attrs } = mark;
      return {
        type: Decoration_Type.ITALIC,
        ...attrs,
      };
    },
  },
  toTiptap: {
    type: Decoration_Type.ITALIC,
    convert: decoration => {
      const { type: _, ...data } = decoration;
      return {
        type: Decoration_Type.ITALIC,
        attrs: { ...data },
      };
    },
  },
};

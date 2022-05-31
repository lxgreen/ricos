import { Decoration_Type } from 'ricos-schema';
import type { TiptapMarkConverter } from '../types';

export const underlineConverter: TiptapMarkConverter = {
  fromTiptap: {
    type: 'underline',
    convert: mark => {
      const { type: _, ...data } = mark;
      return {
        type: Decoration_Type.UNDERLINE,
        ...data,
      };
    },
  },
  toTiptap: {
    type: Decoration_Type.UNDERLINE,
    convert: decoration => {
      const { type: _, ...data } = decoration;
      return {
        type: 'underline',
        ...data,
      };
    },
  },
};

import { Decoration_Type } from 'ricos-schema';
import type { TiptapMarkConverter } from '../types';

export const boldConverter: TiptapMarkConverter = {
  fromTiptap: {
    type: 'bold',
    convert: mark => {
      const { type: _, ...data } = mark;
      return {
        type: Decoration_Type.BOLD,
        ...data,
      };
    },
  },
  toTiptap: {
    type: Decoration_Type.BOLD,
    convert: decoration => {
      const { type: _, ...data } = decoration;
      return {
        type: 'bold',
        ...data,
      };
    },
  },
};

import { Decoration_Type } from 'ricos-schema';
import type { TiptapMarkConverter } from '../types';

export const colorConverter: TiptapMarkConverter = {
  fromTiptap: {
    type: 'color',
    convert: mark => {
      const { attrs } = mark;
      return {
        type: Decoration_Type.COLOR,
        colorData: { ...attrs },
      };
    },
  },
  toTiptap: {
    type: Decoration_Type.COLOR,
    convert: decoration => {
      const { type: _, colorData } = decoration;
      return {
        type: 'color',
        attrs: { ...colorData },
      };
    },
  },
};

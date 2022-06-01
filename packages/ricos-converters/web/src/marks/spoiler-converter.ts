import { Decoration_Type } from 'ricos-schema';
import type { TiptapMarkConverter } from '../types';

export const spoilerConverter: TiptapMarkConverter = {
  fromTiptap: {
    type: 'spoiler',
    convert: _mark => {
      return {
        type: Decoration_Type.SPOILER,
      };
    },
  },
  toTiptap: {
    type: Decoration_Type.SPOILER,
    convert: _decoration => {
      return {
        type: 'spoiler',
      };
    },
  },
};

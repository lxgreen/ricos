// TODO: distribute specific implementations to appropriate packages

import type { Decoration } from 'ricos-schema';
import { Decoration_Type } from 'ricos-schema';
import toCamelCase from 'to-camel-case';
import toConstantCase from 'to-constant-case';
import type { TiptapMark, TiptapMarkConverter } from './types';

export const getUnsupportedDecorationToTiptap = (
  decoration: Decoration
): TiptapMarkConverter['toTiptap'] => ({
  type: decoration.type,
  convert: decoration => {
    const { type, ...data } = decoration;
    return {
      ...(data ? { attrs: { ...data } } : {}),
      type: toCamelCase(type.toString()),
    };
  },
});

export const getUnsupportedMarkFromTiptap = (
  mark: TiptapMark
): TiptapMarkConverter['fromTiptap'] => ({
  type: mark.type,
  convert: mark => {
    const { type, attrs, ...data } = mark;
    const decortionType = toConstantCase(type) as Decoration_Type;
    return {
      type: decortionType,
      [`${decortionType}Data`]: { ...attrs, ...data },
    };
  },
});

export const boldConverter: TiptapMarkConverter = {
  fromTiptap: {
    type: 'bold',
    convert: mark => ({
      type: Decoration_Type.BOLD,
      ...mark.attrs,
    }),
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

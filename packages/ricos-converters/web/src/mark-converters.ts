// TODO: distribute specific implementations to appropriate packages

import type { Decoration, Decoration_Type } from 'ricos-schema';
import toCamelCase from 'to-camel-case';
import toConstantCase from 'to-constant-case';
import { anchorConverter } from './marks/anchor-converter';
import { boldConverter } from './marks/bold-converter';
import { colorConverter } from './marks/color-converter';
import { fontSizeConverter } from './marks/font-size-converter';
import { italicConverter } from './marks/italic-converter';
import { linkConverter } from './marks/link-converter';
import { mentionConverter } from './marks/mention-converter';
import { underlineConverter } from './marks/underline-converter';
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
    const decorationType = toConstantCase(type) as Decoration_Type;
    return {
      type: decorationType,
      ...data,
      ...attrs,
    };
  },
});

export const markConverters = [
  boldConverter,
  italicConverter,
  underlineConverter,
  // TODO: add spoiler converter
  anchorConverter,
  mentionConverter,
  linkConverter,
  colorConverter,
  fontSizeConverter,
];

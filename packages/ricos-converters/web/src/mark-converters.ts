// TODO: distribute specific implementations to appropriate packages

import type { AnchorData, Decoration, FontSizeData, MentionData } from 'ricos-schema';
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
    const decorationType = toConstantCase(type) as Decoration_Type;
    return {
      type: decorationType,
      ...data,
      ...attrs,
    };
  },
});

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

export const anchorConverter: TiptapMarkConverter = {
  fromTiptap: {
    type: 'anchor',
    convert: mark => {
      const { attrs } = mark;
      return {
        type: Decoration_Type.ANCHOR,
        anchorData: { ...attrs } as AnchorData,
      };
    },
  },
  toTiptap: {
    type: Decoration_Type.ANCHOR,
    convert: decoration => {
      const { type: _, anchorData } = decoration;
      return {
        type: 'anchor',
        attrs: { ...anchorData },
      };
    },
  },
};

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

export const linkConverter: TiptapMarkConverter = {
  fromTiptap: {
    type: 'link',
    convert: mark => {
      const { attrs } = mark;
      return {
        type: Decoration_Type.LINK,
        linkData: { ...attrs },
      };
    },
  },
  toTiptap: {
    type: Decoration_Type.LINK,
    convert: decoration => {
      const { linkData } = decoration;
      return {
        type: 'link',
        attrs: { ...linkData },
      };
    },
  },
};

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

export const fontSizeConverter: TiptapMarkConverter = {
  fromTiptap: {
    type: 'fontSize',
    convert: mark => {
      const { attrs } = mark;
      return {
        type: Decoration_Type.FONT_SIZE,
        fontSizeData: { ...attrs } as FontSizeData,
      };
    },
  },
  toTiptap: {
    type: Decoration_Type.FONT_SIZE,
    convert: decoration => {
      const { fontSizeData } = decoration;
      return {
        type: 'fontSize',
        attrs: { ...fontSizeData },
      };
    },
  },
};

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

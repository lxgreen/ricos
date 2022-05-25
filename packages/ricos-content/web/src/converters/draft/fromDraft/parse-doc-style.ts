import type { DocumentStyle as RicosDocumentStyle } from 'ricos-schema';
import { Decoration_Type } from 'ricos-schema';
import type { DocumentStyle } from '../../../types';

const cssToRicosDecoration = {
  color: (style: string) => {
    return { type: Decoration_Type.COLOR, colorData: { foreground: style } };
  },
  'background-color': (style: string) => {
    return { type: Decoration_Type.COLOR, colorData: { background: style } };
  },
  'font-weight': (style: string) => {
    return { type: Decoration_Type.BOLD, fontWeightValue: style === 'bold' ? 700 : 400 };
  },
  'font-style': (style: string) => {
    return { type: Decoration_Type.ITALIC, italicData: style === 'italic' };
  },
  'text-decoration': (style: string) => {
    return { type: Decoration_Type.UNDERLINE, underlineData: style === 'underline' };
  },
  'font-size': (style: string) => {
    const [value, unit] = style.split(/(px|em)/gi);
    return {
      type: Decoration_Type.FONT_SIZE,
      fontSizeData: { unit: unit.toUpperCase(), value: parseInt(value) },
    };
  },
};

const convertHeaderToRicosDecorations = styles =>
  Object.entries(styles)
    .filter(([key, _]) => cssToRicosDecoration[key])
    .map(([key, style]) => cssToRicosDecoration[key](style));

const convertCssToNodeStyle = styles => {
  return styles['padding-top'] || styles['padding-bottom']
    ? {
        paddingTop: styles['padding-top'],
        paddingBottom: styles['padding-bottom'],
      }
    : undefined;
};

export const parseDocStyle = (documentStyle?: DocumentStyle): RicosDocumentStyle | undefined => {
  if (documentStyle) {
    const ricosDoucmentStyle: RicosDocumentStyle = {};
    Object.entries(documentStyle).forEach(([header, styles]) => {
      if (header) {
        const decorations = convertHeaderToRicosDecorations(styles);
        const nodeStyle = convertCssToNodeStyle(styles);
        const lineHeight = styles['line-height'];
        ricosDoucmentStyle[header] = {};
        decorations?.length > 0 && (ricosDoucmentStyle[header].decorations = decorations);
        nodeStyle && (ricosDoucmentStyle[header].nodeStyle = nodeStyle);
        lineHeight && (ricosDoucmentStyle[header].lineHeight = lineHeight);
      }
    });
    return ricosDoucmentStyle;
  }
};

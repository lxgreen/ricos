import { Decoration_Type, FontSizeData_fontType } from 'ricos-schema';

export const decorations = [
  { type: Decoration_Type.COLOR, colorData: { foreground: '#414141', background: '#808080' } },
  { type: Decoration_Type.BOLD, fontWeightValue: 700 },
  {
    type: Decoration_Type.FONT_SIZE,
    fontSizeData: { unit: FontSizeData_fontType.PX, value: 18 },
  },
  { type: Decoration_Type.ITALIC, italicData: true },
];

export const customStyle = {
  color: '#414141',
  fontWeight: 700,
  fontSize: 18,
  fontStyle: 'italic',
};

export const nodeStyle = {
  paddingBottom: '3px',
  paddingTop: '2px',
};

export const textStyle = { lineHeight: '3' };

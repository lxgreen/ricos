import type { ReactElement, ComponentClass } from 'react';
import { Children } from 'react';
import type { RichContentProps } from './types';
import type { DraftContent } from 'ricos-types';

export const emptyState: DraftContent = { blocks: [], entityMap: {} };

export const shouldRenderChild = (
  expectedChildName: 'RichContentViewer' | 'RichContentEditor',
  children: ReactElement
): boolean => {
  const child = Children.only(children) as ReactElement<RichContentProps, ComponentClass>; // ComponentClass has a displayName
  const childName = child?.type.displayName;
  return !!children && childName === expectedChildName;
};

const rtlLangs = [
  'ae' /* Avestan */,
  'ar' /* 'العربية', Arabic */,
  'arc' /* Aramaic */,
  'bcc' /* 'بلوچی مکرانی', Southern Balochi */,
  'bqi' /* 'بختياري', Bakthiari */,
  'ckb' /* 'Soranî / کوردی', Sorani */,
  'dv' /* Dhivehi */,
  'fa' /* 'فارسی', Persian */,
  'glk' /* 'گیلکی', Gilaki */,
  'he' /* 'עברית', Hebrew */,
  'ku' /* 'Kurdî / كوردی', Kurdish */,
  'mzn' /* 'مازِرونی', Mazanderani */,
  'nqo' /* N'Ko */,
  'pnb' /* 'پنجابی', Western Punjabi */,
  'ps' /* 'پښتو', Pashto, */,
  'sd' /* 'سنڌي', Sindhi */,
  'ug' /* 'Uyghurche / ئۇيغۇرچە', Uyghur */,
  'ur' /* 'اردو', Urdu */,
  'yi' /* 'ייִדיש', Yiddish */,
];

export const isRtl = (locale?: string) =>
  !!locale && rtlLangs.includes(locale.split('-|_')[0].toLowerCase());

export const getLangDir = (locale?: string) => (isRtl(locale) ? 'rtl' : 'ltr');

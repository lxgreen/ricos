import { has, mergeWith, pickBy } from 'lodash';
import { RichContentTheme } from '../types';

const cssClassMerger = (defaultStyleClassName: string, themeClassName: string) =>
  `${defaultStyleClassName} ${themeClassName}`;

export const mergeStyles = ({
  styles,
  theme,
}: {
  styles: Record<string, string>;
  theme: RichContentTheme;
}): Record<string, string> => {
  if (!theme) {
    console.warn('mergeStyles invoked without theme!'); //eslint-disable-line no-console
    return styles;
  }
  const _theme = {};
  Object.keys(theme).forEach(key => (_theme[`${key}${key}`] = theme[key]));
  const themeStyles = pickBy(_theme);
  const themeStylesToMerge = pickBy(themeStyles, (_, key) => has(styles, key));
  return mergeWith({ ...styles }, themeStylesToMerge, cssClassMerger);
};

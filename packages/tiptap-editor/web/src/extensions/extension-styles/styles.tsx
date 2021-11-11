import classNames from 'classnames';
import { camelCase, upperFirst } from 'lodash';
import generalStyles from 'wix-rich-content-editor-common/dist/statics/styles/general.scss';
import generalRTLIgnoredStyles from 'wix-rich-content-common/dist/statics/styles/general.rtlignore.scss';
import { RichContentTheme } from 'wix-rich-content-common';

const stylesWithRTL = { ...generalStyles, ...generalRTLIgnoredStyles };
export const getAlignmentClassName = (styles, alignment, theme: RichContentTheme = {}) => {
  if (!alignment) {
    return '';
  }
  const key = `align${upperFirst(alignment.toLowerCase())}`;
  return classNames(styles[key], theme[key]);
};

export const getSizeClassName = (styles, size, theme: RichContentTheme = {}) => {
  if (!size) {
    return '';
  }
  const key = `size${upperFirst(camelCase(size))}`;
  return classNames(styles[key], theme[key]);
};

export const getFocusClassName = (styles, theme: RichContentTheme = {}, isFocused) => {
  return classNames({
    [styles.hasFocus]: isFocused,
    [theme.hasFocus]: isFocused,
    [styles.hideTextSelection]: !isFocused,
  });
};

export const getTextWrapClassName = (styles, theme: RichContentTheme = {}, textWrap) => {
  if (!textWrap) {
    return '';
  }
  const key = `textWrap${upperFirst(camelCase(textWrap))}`;
  return classNames(styles[key], theme[key]);
};

export const getPluginContainerClassName = (styles, theme: RichContentTheme = {}, isMobile) => {
  return classNames(styles.pluginContainer, theme.pluginContainer, theme.pluginContainerWrapper, {
    [styles.pluginContainerMobile]: isMobile,
    [theme.pluginContainerMobile]: isMobile,
  });
};

export const getComponentStyles = ({ componentData, theme, isFocused, isMobile }) => {
  const alignment = componentData?.containerData?.alignment;
  const size = componentData?.containerData?.width?.size;
  const textWrap = componentData?.containerData?.textWrap;

  return {
    alignmentClassName: getAlignmentClassName(stylesWithRTL, alignment, theme),
    sizeClassName: getSizeClassName(stylesWithRTL, size, theme),
    focusClassName: getFocusClassName(stylesWithRTL, theme, isFocused),
    textWrapClassName: getTextWrapClassName(stylesWithRTL, theme, textWrap),
    pluginContainerClassName: getPluginContainerClassName(stylesWithRTL, theme, isMobile),
  };
};

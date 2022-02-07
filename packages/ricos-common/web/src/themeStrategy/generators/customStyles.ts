import type { CustomTextualStyle, RicosSettingsStyles, RicosCustomStyles } from 'ricos-types';
import type { CssVarsObject } from '../themeTypes';
import { merge } from 'lodash';

/**
 * Sets `lineHeight` to `1.5` when `fontSize` is provided without `lineHeight`.
 * @param param0 CustomTextualStyle element
 */
const lineHeightFix = ({
  lineHeight,
  fontSize,
  ...rest
}: CustomTextualStyle): CustomTextualStyle => ({
  ...rest,
  fontSize,
  lineHeight: lineHeight || (fontSize !== undefined ? 1.5 : undefined),
});

type ToVars = (
  customStyles: RicosCustomStyles | RicosSettingsStyles,
  prefix: string,
  withLineHeightFix?: boolean
) => CssVarsObject;
const toVars: ToVars = (customStyles, prefix, fix = false) =>
  Object.entries(customStyles).reduce(
    (prev, [fieldName, customStyle]) => ({
      ...prev,
      ...Object.entries(fix ? lineHeightFix(customStyle) : customStyle).reduce(
        (prevStyle, styleName) => ({
          ...prevStyle,
          [`${prefix}-${fieldName.toLowerCase()}-${styleName[0]}`]: styleName[1],
        }),
        {}
      ),
    }),
    {}
  );

type CreateCustomStyles = (param: {
  customStyles?: RicosCustomStyles;
  settingsStyles?: RicosSettingsStyles;
}) => CssVarsObject;

const createCustomStyles: CreateCustomStyles = ({ customStyles = {}, settingsStyles = {} }) => {
  return merge({}, toVars(customStyles, 'custom', true), toVars(settingsStyles, 'settings'));
};

export default createCustomStyles;

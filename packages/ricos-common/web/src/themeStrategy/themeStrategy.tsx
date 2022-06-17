import React from 'react';
import createPalette from './generators/palette';
import createTypography from './generators/typography';
import createCustomStyles from './generators/customStyles';
import { defaultTheme } from './defaults';
import * as utils from './themeUtils';
import type { ThemeData } from 'ricos-types';
import type { ThemeStrategyArgs, ThemeStrategyResult } from './themeTypes';
import { isDefined } from 'ts-is-present';

export default function themeStrategy(args: ThemeStrategyArgs): ThemeStrategyResult {
  const { buildCssVars } = utils;
  const { ricosTheme = {}, plugins = [], cssOverride = {}, experiments } = args;
  const {
    parentClass = '',
    palette,
    paletteConfig,
    typography,
    customStyles,
    settingsStyles,
    oneAppStyles,
  } = ricosTheme;

  const isTiptap = experiments?.tiptapEditor?.enabled;

  const themeGeneratorFunctions = plugins.map(plugin => plugin.theme).filter(isDefined);

  // Create CSS Vars
  const { paletteVarsObject, colors } = createPalette(palette, paletteConfig);
  const typographyVarsObject = createTypography(typography);
  const customsVarsObject = createCustomStyles({
    customStyles,
    settingsStyles,
    oneAppStyles,
  });

  const themeData: ThemeData = {
    colors,
    utils,
    customStyles,
  };

  // Run themeGenerators
  if (colors) {
    themeGeneratorFunctions.forEach(themeGen => themeGen({ colors, utils, customStyles }));
  }

  const html = (
    <style type="text/css" key={'styleElement'}>
      {buildCssVars(parentClass, paletteVarsObject, typographyVarsObject, customsVarsObject)}
    </style>
  );

  return isTiptap
    ? { html }
    : {
        theme: { ...defaultTheme, ...cssOverride },
        html,
        themeData,
      };
}

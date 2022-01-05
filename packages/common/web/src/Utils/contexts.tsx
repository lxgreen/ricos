import React from 'react';
import type { TranslationFunction, AvailableExperiments, TextDirection } from '../types';

export const GlobalContext = React.createContext<{
  experiments: AvailableExperiments;
  isMobile: boolean;
  t?: TranslationFunction;
  languageDir?: TextDirection;
}>({
  isMobile: false,
  experiments: {},
  languageDir: 'ltr',
});

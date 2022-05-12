import type { AvailableExperiments, TextDirection, TranslationFunction } from './commonTypes';
import type { RicosTheme } from './themeTypes';

export interface GeneralContext {
  locale: string;
  localeContent: string;
  experiments: AvailableExperiments;
  isMobile: boolean;
  t: TranslationFunction;
  languageDir: TextDirection;
  theme: RicosTheme;
}

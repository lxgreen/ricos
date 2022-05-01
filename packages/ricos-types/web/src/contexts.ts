import type { AvailableExperiments, TextDirection, TranslationFunction } from './commonTypes';
import type { EditorCommands } from './editorCommandsType';
import type { RicosTheme } from './themeTypes';

export interface GeneralContext {
  locale: string;
  getEditorCommands: () => EditorCommands;
  localeContent: string;
  experiments: AvailableExperiments;
  isMobile: boolean;
  t: TranslationFunction;
  languageDir: TextDirection;
  theme: RicosTheme;
}

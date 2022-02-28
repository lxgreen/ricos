/* eslint-disable func-call-spacing */
import React from 'react';
import type {
  TranslationFunction,
  AvailableExperiments,
  Helpers,
  EditorCommands,
  EditorPlugin,
  LinkPanelSettings,
} from 'ricos-types';
import type { LinkSettings, ToolbarSettings, RicosCssOverride, RicosTheme } from 'ricos-common';

export const ToolbarContext = React.createContext<{
  contentId: string;
  isMobile: boolean;
  theme: RicosTheme;
  locale: string;
  helpers: Helpers;
  plugins: EditorPlugin[];
  linkPanelSettings: LinkPanelSettings;
  linkSettings: LinkSettings;
  experiments: AvailableExperiments;
  toolbarSettings: ToolbarSettings;
  cssOverride: RicosCssOverride;
  t: TranslationFunction;
  getEditorCommands: () => EditorCommands | void;
}>({
  contentId: '',
  isMobile: false,
  theme: {},
  locale: 'en',
  helpers: {},
  plugins: [],
  linkPanelSettings: {},
  linkSettings: {},
  experiments: {},
  toolbarSettings: {},
  cssOverride: {},
  t: key => key,
  getEditorCommands: () => {},
});

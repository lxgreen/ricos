/* eslint-disable func-call-spacing */
import React from 'react';
import type {
  AvailableExperiments,
  Helpers,
  EditorCommands,
  EditorPlugin,
  LinkPanelSettings,
  RicosTheme,
} from 'ricos-types';
import type { LinkSettings, ToolbarSettings, RicosCssOverride } from 'ricos-common';

export type ToolbarContextType = {
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
  getEditorCommands: () => EditorCommands | void;
};

export const ToolbarContext = React.createContext<ToolbarContextType>({
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
  getEditorCommands: () => {},
});

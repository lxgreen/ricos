import React from 'react';
import { EditorPlugins } from './editorPlugins';

export interface PluginsContextValue {
  plugins: EditorPlugins;
}

const plugins = new EditorPlugins();

export const PluginsContext = React.createContext<PluginsContextValue>({ plugins });

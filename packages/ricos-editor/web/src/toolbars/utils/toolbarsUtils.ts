import { EditorCommands } from 'wix-rich-content-common';
import { RichContentEditor } from 'wix-rich-content-editor';

export const isLinkToolbarOpen = (activeEditor: RichContentEditor | null) => {
  const editorCommands: EditorCommands | undefined = activeEditor?.getEditorCommands();
  return editorCommands?.getSelection().getIsCollapsed && editorCommands?.hasLinkInSelection();
};

export const getPluginsKey = (activeEditor: RichContentEditor | null) => {
  const rawPlugins = activeEditor?.getPlugins?.();
  const plugins = rawPlugins.filter(plugin => plugin?.blockType !== undefined);
  const pluginsKeys = plugins.map(plugin => plugin.blockType);
  return pluginsKeys;
};

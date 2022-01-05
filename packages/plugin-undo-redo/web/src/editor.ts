import { createUndoRedoPlugin } from './createUndoRedoPlugin';
import type { UndoRedoPluginEditorConfig } from './types';
import { UNDO_REDO_TYPE } from './types';
import { DEFAULTS } from './defaults';
import type { EditorPluginCreator } from 'wix-rich-content-common';

export const pluginUndoRedo: EditorPluginCreator<UndoRedoPluginEditorConfig> = config => {
  return {
    config: { ...DEFAULTS.config, ...config },
    type: UNDO_REDO_TYPE,
    createPlugin: createUndoRedoPlugin,
    ModalsMap: {},
  };
};

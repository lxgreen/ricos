import { createRicosGenericExtensionConfig } from '../../extensions-creators/extension';
import { history, undo, redo } from './lib';

const name = 'ricosHistory';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    ricosHistory: {
      /**
       * Toggle a paragraph
       */
      rebase: (count) => ReturnType;
      silent: () => ReturnType;
      redo: () => ReturnType;
      undo: () => ReturnType;
    };
  }
}

export const createHistoryConfig = () =>
  createRicosGenericExtensionConfig({
    type: 'extension',
    createConfig: () => {
      return {
        name,

        priority: 1000,
        defaultOptions: {
          depth: 100,
          newGroupDelay: 500,
        },

        addCommands() {
          return {
            rebase: count => ({ tr }) => {
              tr.setMeta('rebased', count);
              return true;
            },
            silent: () => ({ tr }) => {
              tr.setMeta('skip', true);
              return true;
            },
            undo: () => ({ state, dispatch }) => {
              return undo(state, dispatch);
            },
            redo: () => ({ state, dispatch }) => {
              return redo(state, dispatch);
            },
          };
        },

        addProseMirrorPlugins() {
          return [history(this.options)];
        },

        addKeyboardShortcuts() {
          return {
            'Mod-z': () => this.editor.commands.undo(),
            'Mod-y': () => this.editor.commands.redo(),
            'Shift-Mod-z': () => this.editor.commands.redo(),
          };
        },
      };
    },
  });

export interface HistoryOptions {
  depth: number;
  newGroupDelay: number;
}

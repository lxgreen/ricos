import { Mark } from '@tiptap/core';
import { ColorData } from 'ricos-schema';

export interface ColorOptions {
  HTMLAttributes: Record<string, unknown>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    color: {
      /**
       * Set a color mark
       */
      setColor: (color: string) => ReturnType;
      /**
       * Unset a color mark
       */
      unsetColor: () => ReturnType;
    };
  }
}

export const Color = Mark.create<ColorOptions>({
  name: 'color',

  defaultOptions: {
    HTMLAttributes: {},
  },

  addAttributes() {
    return ColorData.fromJSON({});
  },

  parseHTML() {
    return [
      {
        tag: 'span',
        getAttrs: element => ((element as HTMLElement).style?.color ? {} : false),
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return ['span', { style: `color: ${HTMLAttributes.foreground}` }, 0];
  },

  addCommands() {
    return {
      setColor: color => ({ commands }) => {
        return commands.setMark('color', { foreground: color });
      },
      unsetColor: () => ({ commands }) => {
        return commands.unsetMark('color');
      },
    };
  },
});

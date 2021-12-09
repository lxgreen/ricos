import { Mark } from '@tiptap/core';
import { ColorData } from 'ricos-schema';

export interface SpoilerOptions {
  HTMLAttributes: Record<string, unknown>;
}

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    spoiler: {
      /**
       * Set a spoiler mark
       */
      toggleSpoiler: () => ReturnType;
    };
  }
}

const SPOILER_STYLE = 'blur(0.25em)';

export const Spoiler = Mark.create<SpoilerOptions>({
  name: 'spoiler',

  addOptions: () => ({
    HTMLAttributes: {},
  }),

  addAttributes() {
    return ColorData.fromJSON({});
  },

  parseHTML() {
    return [
      {
        tag: 'span',
        getAttrs: element => {
          const { filter } = (element as HTMLElement).style || {};
          return filter === SPOILER_STYLE ? {} : false;
        },
      },
    ];
  },

  renderHTML() {
    return ['span', { style: `filter: ${SPOILER_STYLE}` }, 0];
  },

  addCommands() {
    return {
      toggleSpoiler: () => ({ commands }) => {
        return commands.toggleMark('spoiler');
      },
    };
  },
});

export const createSpoiler = () => Spoiler;

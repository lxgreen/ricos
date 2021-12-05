import mentionDataDefaults from 'ricos-schema/dist/statics/mention.defaults.json';
import { CreateRicosExtensions } from 'wix-tiptap-editor';
import { Node as ProseMirrorNode } from 'prosemirror-model';
import { SuggestionOptions } from '@tiptap/suggestion';
import { PluginKey } from 'prosemirror-state';
import styles from '../../statics/mentions.scss';
import suggestion from './suggestion';

export type MentionOptions = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  HTMLAttributes: Record<string, any>;
  renderLabel: (props: { options: MentionOptions; node: ProseMirrorNode }) => string;
  suggestion: Omit<SuggestionOptions, 'editor'>;
};

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    mention: {
      /**
       * Add text with mention mark
       */
      insertMention: (attributes, pos?: { from: number; to: number }) => ReturnType;
    };
  }
}

export const MentionPluginKey = new PluginKey('mention');

export const createTiptapExtensions: CreateRicosExtensions = defaultOptions => [
  {
    type: 'mark',
    createExtensionConfig: () => ({
      name: 'mention',

      addOptions() {
        return {
          HTMLAttributes: {},
          renderLabel({ node }) {
            return `${defaultOptions.mentionTrigger}${node.attrs.label ?? node.attrs.id}`;
          },
        };
      },

      group: 'inline',

      inline: true,

      selectable: false,

      atom: true,

      addAttributes() {
        return mentionDataDefaults.mentionData;
      },

      renderHTML() {
        return ['span', { class: styles.mention }, 0];
      },

      addKeyboardShortcuts() {
        return {
          Backspace: () =>
            this.editor.commands.command(({ tr, state }) => {
              let isMention = false;
              const { selection } = state;
              const { empty, anchor } = selection;

              if (!empty) {
                return false;
              }

              state.doc.nodesBetween(anchor - 1, anchor, (node, pos) => {
                if (node.type.name === this.name) {
                  isMention = true;
                  tr.insertText(defaultOptions.mentionTrigger || '', pos, pos + node.nodeSize);

                  return false;
                }
              });

              return isMention;
            }),
        };
      },

      addProseMirrorPlugins() {
        return [suggestion(this.editor, defaultOptions)];
      },

      addCommands() {
        return {
          insertMention: (attributes, pos) => ({ view, tr, editor }) => {
            // increase range.to by one when the next node is of type "text"
            // and starts with a space character
            const nodeAfter = view.state.selection.$to.nodeAfter;
            const overrideSpace = nodeAfter?.text?.startsWith(' ');
            const range = pos || { from: tr.selection.from, to: tr.selection.to };
            if (overrideSpace) {
              range.to += 1;
            }

            return editor
              .chain()
              .focus()
              .insertContentAt(range, [
                {
                  type: 'text',
                  text: attributes.name,
                  marks: [
                    {
                      type: 'mention',
                      attrs: {
                        name: attributes.name,
                        slug: attributes.name,
                      },
                    },
                  ],
                },
                {
                  type: 'text',
                  text: ' ',
                },
              ])
              .run();
          },
        };
      },
    }),
  },
];

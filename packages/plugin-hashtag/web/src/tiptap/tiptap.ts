import type { CreateRicosExtensions } from 'ricos-tiptap-types';
import findHashTag from './findHashTag';

export const createTiptapExtensions: CreateRicosExtensions = defaultOptions => [
  {
    type: 'mark' as const,
    groups: [],
    name: 'hashtag',
    createExtensionConfig({ Plugin }) {
      return {
        name: this.name,

        addProseMirrorPlugins() {
          return [
            new Plugin({
              state: {
                init(_, { doc }) {
                  return findHashTag(doc);
                },
                apply(transaction, oldState) {
                  return transaction.docChanged ? findHashTag(transaction.doc) : oldState;
                },
              },
              props: {
                decorations(state) {
                  return this.getState(state);
                },
              },
            }),
          ];
        },
      };
    },
  },
];

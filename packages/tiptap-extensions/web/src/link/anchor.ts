import classNames from 'classnames';
import type { RicosExtension } from 'ricos-tiptap-types';
import { findChildren } from '@tiptap/core';
import styles from '../statics/styles.scss';
import { setCommand } from './utils';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    anchor: {
      /**
       * Set an anchor mark
       */
      setAnchor: (anchor: string) => ReturnType;
      /**
       * Unset an anchor mark
       */
      unsetAnchor: () => ReturnType;
      /**
       * Scroll view to anchor
       */
      scrollToAnchor: (anchor: string) => ReturnType;
    };
  }
}

export const anchor: RicosExtension = {
  type: 'mark' as const,
  groups: [],
  name: 'anchor',
  createExtensionConfig() {
    return {
      name: this.name,

      addOptions: () => ({
        HTMLAttributes: {},
      }),

      addAttributes() {
        return {
          anchor: {
            default: '',
          },
        };
      },

      renderHTML({ HTMLAttributes }) {
        const { link, linkInViewer } = styles;
        const classes = classNames(link, linkInViewer);
        // it can be implement using <a href="sectionName">/> but it requires to add to all nodes id/name attributes
        const span = document.createElement('span');
        if (HTMLAttributes.anchor) {
          span.setAttribute('ricos-anchor', HTMLAttributes.anchor);
          span.setAttribute('class', classes);
        }

        return span;
      },

      addCommands() {
        return {
          setAnchor:
            anchor =>
            ({ commands, state, tr }) => {
              return setCommand(
                this.name,
                'link',
                commands.unsetLink,
                state.schema,
                tr.selection,
                state.doc,
                commands,
                {
                  anchor,
                }
              );
            },

          unsetAnchor:
            () =>
            ({ commands, tr }) => {
              const from = tr.selection.from;
              commands.setTextSelection(from);
              return commands.unsetMark(this.name, { extendEmptyMarkRange: true });
            },
          scrollToAnchor:
            anchor =>
            ({ editor }) => {
              const { view } = editor;
              const foundNodes = findChildren(view.state.doc, node => {
                return node?.attrs?.id?.toString() === anchor;
              });

              if (foundNodes.length === 0) {
                return false;
              }

              let targetDom: HTMLElement | null = null;

              targetDom = view.nodeDOM(foundNodes[0].pos);

              if (targetDom && !targetDom.scrollIntoView) {
                // might be text node
                targetDom = targetDom.parentElement;
              }

              if (targetDom) {
                targetDom.scrollIntoView({ behavior: 'smooth' });
                return true;
              } else {
                return false;
              }
            },
        };
      },
    };
  },
};

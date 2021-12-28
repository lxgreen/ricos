import classNames from 'classnames';
import { find } from 'linkifyjs';
import { Plugin } from 'prosemirror-state';
import { parseLink } from 'ricos-content/libs/nodeUtils';
import { LinkData } from 'ricos-schema';
import linkDataDefaults from 'ricos-schema/dist/statics/link.defaults.json';
import { RicosExtension } from 'ricos-tiptap-types';
import { DeepPartial } from 'utility-types';
import styles from '../statics/styles.scss';
import { autolink } from './helpers/autolink';
import { clickHandler } from './helpers/clickHandler';
import { pasteHandler } from './helpers/pasteHandler';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    link: {
      /**
       * Set a link mark
       */
      setLink: (attributes: DeepPartial<LinkData>) => ReturnType;
      /**
       * Toggle a link mark
       */
      toggleLink: (attributes: DeepPartial<LinkData>) => ReturnType;
      /**
       * Unset a link mark
       */
      unsetLink: () => ReturnType;
    };
  }
}

export const createLink = (defaultOptions): RicosExtension => ({
  type: 'mark' as const,
  createExtensionConfig: ({ markPasteRule }) => ({
    name: 'link',

    priority: 1000,

    inclusive: false,

    addOptions: () => ({
      openOnClick: true,
      linkOnPaste: true,
      autolink: true,
      HTMLAttributes: { link: {} },
      ...defaultOptions,
    }),

    addAttributes() {
      return linkDataDefaults;
    },

    parseHTML() {
      return [{ tag: 'a[href]' }];
    },

    renderHTML({ HTMLAttributes }) {
      const { link, linkInViewer } = styles;
      const classes = classNames(link, linkInViewer);
      const { url: href, rel, target } = parseLink(HTMLAttributes.link);
      return { 0: 'a', 1: { href, rel, target, class: classes } };
    },

    addCommands() {
      return {
        setLink: attributes => ({ commands }) => {
          return commands.setMark('link', attributes);
        },
        toggleLink: attributes => ({ commands }) => {
          return commands.toggleMark('link', attributes);
        },
        unsetLink: () => ({ commands }) => {
          return commands.unsetMark('link');
        },
      };
    },

    addPasteRules() {
      return [
        markPasteRule({
          find: (text: string) =>
            find(text)
              .filter(link => link.isLink)
              .map(link => ({
                text: link.value,
                index: link.start,
                data: link,
              })),
          type: this.type,
          getAttributes: match => ({
            href: match.data?.href,
          }),
        }),
      ];
    },

    addProseMirrorPlugins() {
      const plugins: Plugin[] = [];

      if (this.options.autolink) {
        plugins.push(
          autolink({
            type: this.type,
          })
        );
      }

      if (this.options.openOnClick) {
        plugins.push(
          clickHandler({
            type: this.type,
          })
        );
      }

      if (this.options.linkOnPaste) {
        plugins.push(
          pasteHandler({
            editor: this.editor,
            type: this.type,
          })
        );
      }

      return plugins;
    },
  }),
});

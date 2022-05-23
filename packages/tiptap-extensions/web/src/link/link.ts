import classNames from 'classnames';
import { find } from 'linkifyjs';
import type { Plugin } from 'prosemirror-state';
import { parseLink } from 'ricos-content/libs/nodeUtils';
import type { LinkData } from 'ricos-schema';
import linkDataDefaults from 'ricos-schema/dist/statics/link.defaults.json';
import type { DOMOutputSpec, ExtensionProps, MarkConfig, RicosExtension } from 'ricos-tiptap-types';
import type { DeepPartial } from 'utility-types';
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

export const link: RicosExtension = {
  type: 'mark' as const,
  groups: [],
  name: 'link',
  reconfigure: (config: MarkConfig, _extensions: RicosExtension[], props: ExtensionProps) => ({
    ...config,
    addOptions: () => ({
      openOnClick: true,
      linkOnPaste: true,
      autolink: true,
      HTMLAttributes: { link: {} },
      defaults: { target: props.anchorTarget || '_self', rel: props.rel || 'noopener noreferrer' },
    }),
  }),
  createExtensionConfig({ markPasteRule }) {
    return {
      name: this.name,
      keepOnSplit: false,

      priority: 1000,

      inclusive() {
        return this.options.autolink;
      },

      addAttributes() {
        return linkDataDefaults;
      },

      parseHTML() {
        return [{ tag: 'a[href]:not([href *= "javascript:" i])' }];
      },

      renderHTML({ HTMLAttributes }) {
        const { link, linkInViewer } = styles;
        const classes = classNames(link, linkInViewer);
        const {
          url: href,
          rel = this.options.defaults.rel,
          target = this.options.defaults.target,
        } = parseLink(HTMLAttributes.link);
        return ['a', { href, rel, target, class: classes }, 0] as DOMOutputSpec;
      },

      addCommands() {
        return {
          setLink:
            attributes =>
            ({ commands }) => {
              return commands.setMark(this.name, attributes);
            },
          toggleLink:
            attributes =>
            ({ commands }) => {
              return commands.toggleMark(this.name, attributes, { extendEmptyMarkRange: true });
            },
          unsetLink:
            () =>
            ({ commands, tr }) => {
              const from = tr.selection.from;
              commands.setTextSelection(from);
              return commands.unsetMark(this.name, { extendEmptyMarkRange: true });
            },
        };
      },

      addPasteRules() {
        return [
          markPasteRule({
            find: text =>
              find(text)
                .filter(link => {
                  if (this.options.validate) {
                    return this.options.validate(link.value);
                  }

                  return true;
                })
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
              defaults: this.options.defaults,
            })
          );
        }

        return plugins;
      },
    };
  },
};

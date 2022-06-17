import type { ExtendedRegExpMatchArray } from '@tiptap/core';
import classNames from 'classnames';
import { find } from 'linkifyjs';
import type { Plugin } from 'prosemirror-state';
import { Decoration_Type } from 'ricos-schema';
import type { LinkData } from 'ricos-schema';
import type { DOMOutputSpec, ExtensionProps, MarkConfig, RicosExtension } from 'ricos-tiptap-types';
import type { DeepPartial } from 'utility-types';
import styles from '../statics/styles.scss';
import { autolink } from './helpers/autolink';
import { clickHandler } from './helpers/clickHandler';
import { pasteHandler } from './helpers/pasteHandler';
import { RicosLink } from './models';
import { setCommand } from './utils';

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
  name: Decoration_Type.LINK,
  reconfigure: (config: MarkConfig, _extensions: RicosExtension[], props: ExtensionProps) => {
    const { rel, relValue, anchorTarget } = props;
    return {
      ...config,
      addOptions: () => ({
        openOnClick: false,
        linkOnPaste: true,
        autolink: true,
        HTMLAttributes: { link: {} },
        defaultLink: RicosLink.of('', anchorTarget, relValue, rel),
      }),
    };
  },
  createExtensionConfig({ markPasteRule }) {
    return {
      name: this.name,
      keepOnSplit: false,

      priority: 1000,

      inclusive() {
        return this.options.autolink;
      },

      addAttributes() {
        return RicosLink.getLinkDefaults();
      },

      parseHTML() {
        return [{ tag: 'a[href]:not([href *= "javascript:" i])' }];
      },

      renderHTML({ HTMLAttributes }) {
        const { link, linkInViewer } = styles;
        const classes = classNames(link, linkInViewer);
        const {
          url: href,
          rel,
          target,
        } = HTMLAttributes.link
          ? RicosLink.fromLink(HTMLAttributes.link).toHtmlAttributes()
          : this.options.defaultLink.toHtmlAttributes();
        return ['a', { href, rel, target, class: classes }, 0] as DOMOutputSpec;
      },

      addCommands() {
        return {
          setLink:
            (link: LinkData) =>
            ({ commands, tr, state }) => {
              return setCommand(
                this.name,
                Decoration_Type.ANCHOR,
                commands.unsetAnchor,
                state.schema,
                tr.selection,
                state.doc,
                commands,
                link
              );
            },
          toggleLink:
            (link: LinkData) =>
            ({ commands }) => {
              return commands.toggleMark(this.name, link, { extendEmptyMarkRange: true });
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
            find: (text: string) => {
              return find(text)
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
                }));
            },
            type: this.type,
            getAttributes: (match: ExtendedRegExpMatchArray) => {
              return this.options.defaultLink.setUrl(match.data?.href || '');
            },
          }),
        ];
      },

      addProseMirrorPlugins() {
        const plugins: Plugin[] = [];

        if (this.options.autolink) {
          plugins.push(
            autolink({
              type: this.type,
              defaultLink: this.options.defaultLink,
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
              defaultLink: this.options.defaultLink,
            })
          );
        }

        return plugins;
      },
    };
  },
};

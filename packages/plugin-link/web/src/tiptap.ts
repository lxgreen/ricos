import linkDataDefaults from 'ricos-schema/dist/statics/link.defaults.json';
import { CreateRicosExtensions } from 'wix-tiptap-editor';
import { KeyboardShortcutCommand } from '@tiptap/core';
import { parseLink } from 'ricos-content/libs/nodeUtils';
import { DeepPartial } from 'utility-types';
import { LinkData } from 'ricos-schema';
import styles from '../statics/link-viewer.scss';
import classNames from 'classnames';

export interface LinkOptions {
  /**
   * If enabled, links will be opened on click.
   */
  openOnClick: boolean;
  /**
   * Adds a link to the current selection if the pasted content only contains an url.
   */
  linkOnPaste: boolean;
  /**
   * A list of HTML attributes to be rendered.
   */
  HTMLAttributes: Record<string, unknown>;
}

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

/**
 * A regex that matches any string that contains a link
 */
// eslint-disable-next-line max-len
export const urlRegex = /(?:https?:\/\/)?(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z]{2,}\b(?:[-a-zA-Z0-9@:%._+~#=?!&/]*)(?:[-a-zA-Z0-9@:%._+~#=?!&/]*)/gi;

/**
 * A regex that matches an url
 */
export const urlRegexExact = new RegExp('^' + urlRegex.source + '$', 'gi');

export const urlRegexExactWithSpace = new RegExp('^' + urlRegex.source + '[\\s\\n]$', 'gi');

const linkifyLastWord: KeyboardShortcutCommand = ({ editor }) => {
  const { nodeBefore, pos } = editor.state.selection.$from;
  const { text, nodeSize: nodeBeforeSize } = nodeBefore || {};
  const url = text?.match(urlRegex)?.[0];
  const urlIndex: number = text ? text.search(urlRegex) : -1;
  if (nodeBeforeSize && url && urlIndex !== -1) {
    const from = pos - nodeBeforeSize + urlIndex;
    editor
      .chain()
      .focus()
      .setTextSelection({
        from,
        to: pos,
      })
      .setLink({ link: { url } })
      .setTextSelection(pos)
      .run();
  }
  return false;
};

export const createTiptapExtensions: CreateRicosExtensions = defaultOptions => [
  {
    type: 'mark',
    createExtensionConfig: ({ markPasteRule, markInputRule, Plugin, PluginKey }) => ({
      name: 'link',

      priority: 1000,

      inclusive: false,

      defaultOptions: {
        openOnClick: true,
        linkOnPaste: true,
        HTMLAttributes: { link: {} },
        ...defaultOptions,
      },

      addAttributes() {
        return linkDataDefaults.linkData;
      },

      parseHTML() {
        return [{ tag: 'a[href]' }];
      },

      renderHTML({ HTMLAttributes }) {
        const { link, linkInViewer } = styles;
        const classes = classNames(link, linkInViewer);
        const { url: href, rel, target } = parseLink(HTMLAttributes.link);
        return ['a', { href, rel, target, class: classes }, 0];
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
          markPasteRule(urlRegex, this.type, (match: RegExpExecArray) => ({
            link: { url: match[0] },
          })),
        ];
      },

      addInputRules() {
        return [
          markInputRule(urlRegexExactWithSpace, this.type, (match: RegExpExecArray) => {
            return { link: { url: match[0].trim() } };
          }),
        ];
      },

      addProseMirrorPlugins() {
        const plugins: import('prosemirror-state').Plugin[] = [];

        if (this.options.openOnClick) {
          plugins.push(
            new Plugin({
              key: new PluginKey('handleClickLink'),
              props: {
                handleClick: (view, pos, event) => {
                  const attrs = this.editor.getAttributes('link');
                  const link = (event.target as HTMLElement)?.closest('a');

                  if (link && attrs.href) {
                    window.open(attrs.href, attrs.target);

                    return true;
                  }

                  return false;
                },
              },
            })
          );
        }

        if (this.options.linkOnPaste) {
          plugins.push(
            new Plugin({
              key: new PluginKey('handlePasteLink'),
              props: {
                handlePaste: (view, event, slice) => {
                  const { state } = view;
                  const { selection } = state;
                  const { empty } = selection;

                  if (empty) {
                    return false;
                  }

                  let textContent = '';

                  slice.content.forEach(node => {
                    textContent += node.textContent;
                  });

                  if (!textContent || !textContent.match(urlRegexExact)) {
                    return false;
                  }

                  this.editor.commands.setMark(this.type, {
                    link: { url: textContent },
                  });

                  return true;
                },
              },
            })
          );
        }

        return plugins;
      },
    }),
  },
  {
    type: 'extension',
    createExtensionConfig: () => ({
      name: 'linkEnter',

      addKeyboardShortcuts() {
        return {
          Enter: linkifyLastWord,
          Space: linkifyLastWord,
        };
      },
    }),
  },
];

import type { CreateRicosExtensions, PluginProps } from 'ricos-tiptap-types';
import { LinkPreview } from './component';
import type { Editor } from '@tiptap/core';
import type { KeyboardShortcutCommand } from '@tiptap/react';
import type { LinkPreviewPluginEditorConfig } from '../types';
import { LINK_PREVIEW_TYPE } from '../types';
import linkPreviewDefaults from 'ricos-schema/dist/statics/link_preview.defaults.json';
import type { LinkPreviewData } from 'ricos-schema';
import {
  createLinkPreviewData,
  fetchLinkPreview,
  shouldAddEmbed,
  shouldAddLinkPreview,
} from '../../lib/utils';
import { convertBlockDataToRicos } from 'ricos-content/libs/convertBlockDataToRicos';
import type { DeepPartial } from 'utility-types';
import type { ResolvedPos } from 'prosemirror-model';
import { TIPTAP_LINK_PREVIEW_TYPE } from 'ricos-content';
import type { ComponentType } from 'react';
import { decorateComponentWithProps } from 'wix-rich-content-editor-common';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    linkPreview: {
      /**
       * Set a linkPreview node
       */
      setLinkPreview: (attributes: DeepPartial<LinkPreviewData>) => ReturnType;
    };
  }
}

const name = TIPTAP_LINK_PREVIEW_TYPE;

//// Regexes should be shared with link extension

/**
 * A regex that matches any string that contains a link
 */
export const urlRegex =
  // eslint-disable-next-line max-len
  /(?:https?:\/\/)?(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z]{2,}\b(?:[-a-zA-Z0-9@:%._+~#=?!&/]*)(?:[-a-zA-Z0-9@:%._+~#=?!&/]*)/gi;

/**
 * A regex that matches an url
 */
export const urlRegexExact = new RegExp('^' + urlRegex.source + '$', 'gi');

const isLinkOnlyBlock = ({ parent, nodeBefore }: ResolvedPos): boolean =>
  parent.childCount === 1 && nodeBefore?.text?.search(urlRegexExact) !== -1;

const insertNewLineAbove = (editor: Editor) =>
  editor.chain().enter().setTextSelection(editor.state.selection.anchor).run();

const addLinkPreview =
  (config: LinkPreviewPluginEditorConfig): KeyboardShortcutCommand =>
  ({ editor }) => {
    const pos = editor.state.selection.$anchor;
    const {
      enableEmbed = true,
      enableLinkPreview = true,
      fetchData,
      link: linkConfig,
    } = config || {};
    if (pos.nodeBefore?.text && isLinkOnlyBlock(pos) && fetchData) {
      const { target, rel } = linkConfig || {};
      const url = pos.nodeBefore?.text;
      fetchLinkPreview(fetchData, url)
        .then(linkPreviewData => {
          if (
            shouldAddEmbed(linkPreviewData.html, enableEmbed, linkPreviewData.fixedUrl) ||
            shouldAddLinkPreview(linkPreviewData.title, enableLinkPreview)
          ) {
            return createLinkPreviewData({ url, target, rel }, linkPreviewData, config).then(
              linkPreviewComponentData => {
                const convertedLinkPreviewData = convertBlockDataToRicos(
                  LINK_PREVIEW_TYPE,
                  linkPreviewComponentData
                );
                editor
                  .chain()
                  .deleteRange({ from: pos.pos - (pos.nodeBefore?.nodeSize || 0), to: pos.pos })
                  .insertContent({ type: name, attrs: convertedLinkPreviewData })
                  .run();
              }
            );
          }
        })
        .finally(() => insertNewLineAbove(editor));
      return true;
    }
    return false;
  };

export const createRicosExtensions: CreateRicosExtensions = settings => [
  {
    type: 'node' as const,
    name,
    groups: ['react'],
    Component: decorateComponentWithProps(LinkPreview, { settings }) as ComponentType<PluginProps>,
    createExtensionConfig() {
      return {
        group: 'block',
        selectable: true,
        draggable: true,
        name: this.name,
        addAttributes: () => linkPreviewDefaults,
        addCommands() {
          return {
            setLinkPreview:
              attributes =>
              ({ commands }) => {
                return commands.setNode('linkPreview', attributes);
              },
          };
        },
      };
    },
  },
  {
    type: 'extension' as const,
    groups: [],
    name: 'linkPreviewEnter',
    createExtensionConfig() {
      return {
        name: this.name,
        addKeyboardShortcuts() {
          return {
            Enter: addLinkPreview(settings),
          };
        },
      };
    },
  },
];

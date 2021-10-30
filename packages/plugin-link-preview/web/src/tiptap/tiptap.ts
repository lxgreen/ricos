// import linkPreviewDataDefaults from 'ricos-schema/dist/statics/link_preview.defaults.json';
import { CreateRicosExtensions, TIPTAP_LINK_PREVIEW_TYPE } from 'wix-tiptap-editor';
import { LinkPreview as Component } from './component';
import { Editor } from '@tiptap/core';
import { KeyboardShortcutCommand } from '@tiptap/react';
import { LinkPreviewPluginEditorConfig, LINK_PREVIEW_TYPE } from '../types';
import { LinkPreviewData } from 'ricos-schema';
import {
  createLinkPreviewData,
  fetchLinkPreview,
  shouldAddEmbed,
  shouldAddLinkPreview,
} from '../../lib/utils';
import { convertBlockDataToRicos } from 'ricos-content/libs/migrateSchema';
import { DeepPartial } from 'utility-types';
import { ResolvedPos } from 'prosemirror-model';

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
// eslint-disable-next-line max-len
export const urlRegex = /(?:https?:\/\/)?(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z]{2,}\b(?:[-a-zA-Z0-9@:%._+~#=?!&/]*)(?:[-a-zA-Z0-9@:%._+~#=?!&/]*)/gi;

/**
 * A regex that matches an url
 */
export const urlRegexExact = new RegExp('^' + urlRegex.source + '$', 'gi');

const isLinkOnlyBlock = ({ parent, nodeBefore }: ResolvedPos): boolean =>
  parent.childCount === 1 && nodeBefore?.text?.search(urlRegexExact) !== -1;

const insertNewLineAbove = (editor: Editor) =>
  editor
    .chain()
    .enter()
    .setTextSelection(editor.state.selection.anchor)
    .run();

const addLinkPreview = (config: LinkPreviewPluginEditorConfig): KeyboardShortcutCommand => ({
  editor,
}) => {
  const pos = editor.state.selection.$anchor;
  const { enableEmbed = true, enableLinkPreview = true, fetchData, link: linkConfig } =
    config || {};
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

export const createRicosExtensions: CreateRicosExtensions = config => [
  {
    type: 'node' as const,
    Component,
    componentDataDefaults: { ...LinkPreviewData.fromJSON({}), id: '' },
    createExtensionConfig: () => ({
      name,
      addCommands() {
        return {
          setLinkPreview: attributes => ({ commands }) => {
            return commands.setNode('linkPreview', attributes);
          },
        };
      },
    }),
  },
  {
    type: 'extension',
    createExtensionConfig: () => ({
      name: 'linkPreviewEnter',
      addKeyboardShortcuts() {
        return {
          Enter: addLinkPreview(config),
        };
      },
    }),
  },
];

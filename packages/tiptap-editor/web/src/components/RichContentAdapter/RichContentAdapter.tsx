import React from 'react';
import { TiptapAPI } from '../../types';
import Toolbar from '../../components/Toolbar';
import { capitalize } from 'lodash';
import {
  RICOS_DIVIDER_TYPE,
  DIVIDER_TYPE,
  RICOS_LINK_TYPE,
  IMAGE_TYPE,
  RICOS_IMAGE_TYPE,
  TranslationFunction,
  EditorPlugin,
  TextAlignment,
  GALLERY_TYPE,
  RICOS_GALLERY_TYPE,
  FILE_UPLOAD_TYPE,
  RICOS_FILE_TYPE,
  GIPHY_TYPE,
  RICOS_GIPHY_TYPE,
  VIDEO_TYPE,
  RICOS_VIDEO_TYPE,
} from 'wix-rich-content-common';
import { toTiptap } from '../../converters';
import { Editor } from '@tiptap/core';

const TIPTAP_DIVIDER_TYPE = 'divider'; //should be taken from tip-tap common
const TIPTAP_IMAGE_TYPE = 'image';
const TIPTAP_GALLERY_TYPE = 'gallery';
const TIPTAP_FILE_TYPE = 'file';
const TIPTAP_GIF_TYPE = 'gif';
const TIPTAP_VIDEO_TYPE = 'video';

const PLUGIN_TYPE_MAP = {
  [RICOS_DIVIDER_TYPE]: TIPTAP_DIVIDER_TYPE,
  [DIVIDER_TYPE]: TIPTAP_DIVIDER_TYPE,
  [RICOS_IMAGE_TYPE]: TIPTAP_IMAGE_TYPE,
  [IMAGE_TYPE]: TIPTAP_IMAGE_TYPE,
  [GALLERY_TYPE]: TIPTAP_GALLERY_TYPE,
  [RICOS_GALLERY_TYPE]: TIPTAP_GALLERY_TYPE,
  [FILE_UPLOAD_TYPE]: TIPTAP_FILE_TYPE,
  [RICOS_FILE_TYPE]: TIPTAP_FILE_TYPE,
  [GIPHY_TYPE]: TIPTAP_GIF_TYPE,
  [RICOS_GIPHY_TYPE]: TIPTAP_GIF_TYPE,
  [VIDEO_TYPE]: TIPTAP_VIDEO_TYPE,
  [RICOS_VIDEO_TYPE]: TIPTAP_VIDEO_TYPE,
};

// todo : should change to RichContentInterface
export class RichContentAdapter implements TiptapAPI {
  constructor(
    private editor: Editor,
    private t: TranslationFunction,
    private plugins: EditorPlugin[]
  ) {
    this.editor = editor;
    this.t = t;
    this.plugins = plugins;
  }

  focus() {
    this.editor.commands.focus();
  }

  blur() {
    this.editor.commands.blur();
  }

  getEditorCommands() {
    return {
      ...this.editorMocks,
      toggleInlineStyle: inlineStyle => {
        const editorCommand = this.editor.chain().focus();
        const styleName = `toggle${capitalize(inlineStyle)}`;
        editorCommand[styleName]().run();
      },
      hasInlineStyle: style => {
        const {
          state: {
            doc,
            selection: { from, to },
          },
        } = this.editor;

        const marks = {};
        doc.nodesBetween(from, to, node => {
          node.marks.forEach(({ type: { name } }) => {
            marks[name] = true;
          });
        });

        return marks[style];
      },
      insertBlock: (pluginType, data) => {
        const type = PLUGIN_TYPE_MAP[pluginType];
        if (type) {
          const attrs = toTiptap(data);
          this.editor.commands.insertContent({
            type,
            attrs,
            content: [],
          });
        } else {
          console.error(`No such plugin type ${pluginType}`);
        }
        return 'result!';
      },
      findNodeByKey() {},
      // setBlock: (blockKey, pluginType, data) => {
      //   editor.commands.updateAttributes('heading', { level: 1 })
      // },
      getSelection: () => ({
        getIsFocused: this.editor.isFocused,
        getIsCollapsed: this.editor.state.selection.empty,
      }),

      insertDecoration: (type, data) => {
        if (type !== RICOS_LINK_TYPE) {
          console.error(`${type} decoration not supported`);
        } else {
          this.editor.commands.setLink({ link: data });
        }
      },
      hasLinkInSelection: () => {
        const {
          state: {
            doc,
            selection: { from, to },
          },
        } = this.editor;

        const marks: Record<string, boolean> = {};
        doc.nodesBetween(from, to, node => {
          node.marks.forEach(({ type: { name } }) => {
            marks[name] = true;
          });
        });
        return marks.link;
      },

      getLinkDataInSelection: () => {
        const {
          state: {
            doc,
            selection: { from, to },
          },
        } = this.editor;

        let link;
        doc.nodesBetween(from, to, node => {
          node.marks.forEach(mark => {
            const {
              type: { name },
            } = mark;
            if (name === 'link') {
              link = mark.attrs.link;
            }
          });
        });
        return link;
      },
    };
  }

  getToolbars() {
    return {
      // MobileToolbar: () => <Toolbar editor={this.editor} />,
      // TextToolbar: () => <Toolbar editor={this.editor} />,
    };
  }

  getToolbarProps() {
    return {};
  }

  destroy!: () => null;

  getT() {
    return this.t;
  }

  getPlugins() {
    return this.plugins;
  }

  editorMocks = {
    getAnchorableBlocks: () => ({
      anchorableBlocks: [],
      pluginsIncluded: [],
    }),
    getColor: () => 'unset',
    getFontSize: () => 'big',
    getTextAlignment: (): TextAlignment => 'center',
    isBlockTypeSelected: () => false,
    isUndoStackEmpty: () => false,
    isRedoStackEmpty: () => false,
    getSelectedData: () => 'blah',
    getPluginsList: () => [],
    getBlockSpacing: () => 5,
    saveEditorState: () => {},
    loadEditorState: () => {},
    saveSelectionState: () => {},
    loadSelectionState: () => {},
    triggerDecoration: () => {},
    deleteDecoration: () => {},
    setBlock: () => {},
    deleteBlock: () => {},
    undo: () => {},
    redo: () => {},
    setBlockType: () => {},
    setTextAlignment: () => {},
    _setSelection: () => {},
  };
}

import { TiptapAPI } from '../../types';
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
  RICOS_TEXT_COLOR_TYPE,
  RICOS_TEXT_HIGHLIGHT_TYPE,
} from 'wix-rich-content-common';
import { toTiptap } from '../../converters';
import { Editor } from '@tiptap/core';
import {
  generateId,
  HEADER_BLOCK,
  UNSTYLED,
  BULLET_LIST_TYPE,
  CODE_BLOCK_TYPE,
  BLOCKQUOTE,
  HEADINGS_TYPE,
  NUMBERED_LIST_TYPE,
  TIPTAP_DIVIDER_TYPE,
  TIPTAP_IMAGE_TYPE,
  TIPTAP_GALLERY_TYPE,
  TIPTAP_FILE_TYPE,
  TIPTAP_GIF_TYPE,
  TIPTAP_VIDEO_TYPE,
} from 'ricos-content';

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

const headingTypeToLevelMap = {
  'header-one': 1,
  'header-two': 2,
  'header-three': 3,
  'header-four': 4,
  'header-five': 5,
  'header-six': 6,
};

// todo : should change to RichContentInterface
export class RichContentAdapter implements TiptapAPI {
  constructor(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private editor: any,
    private t: TranslationFunction,
    private plugins: EditorPlugin[],
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private decorationCommandMap: Record<string, any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private blockTypeCommandMap: Record<string, any>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    private deleteDecorationCommandMap: Record<string, any>
  ) {
    this.editor = editor;
    this.t = t;
    this.plugins = plugins;
    this.decorationCommandMap = {
      [RICOS_LINK_TYPE]: data => this.editor.commands.setLink({ link: data }),
      [RICOS_TEXT_COLOR_TYPE]: data => this.editor.commands.setColor(data.color),
      [RICOS_TEXT_HIGHLIGHT_TYPE]: data => this.editor.commands.setHighlight(data.color),
    };
    this.blockTypeCommandMap = {
      [UNSTYLED]: () => this.editor.commands.setParagraph(),
      [HEADINGS_TYPE]: level => this.editor.commands.toggleHeading({ level }),
      [BLOCKQUOTE]: () => this.editor.commands.toggleBlockquote(),
      [CODE_BLOCK_TYPE]: () => this.editor.commands.toggleCodeBlock(),
      [BULLET_LIST_TYPE]: () => this.editor.commands.toggleBulletList(),
      [NUMBERED_LIST_TYPE]: () => this.editor.commands.toggleOrderedList(),
    };
    this.deleteDecorationCommandMap = {
      [RICOS_LINK_TYPE]: () => this.editor.commands.unsetLink(),
    };
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
        let id = '';
        if (type) {
          id = generateId();
          const attrs = { ...toTiptap(data), id };
          this.editor.commands.insertContent({
            type,
            attrs,
            content: [],
          });
        } else {
          console.error(`No such plugin type ${pluginType}`);
        }
        return id;
      },
      findNodeByKey() {},
      setBlock: (blockKey, pluginType, data) => {
        return this.editor.commands.updateNodeAttrsById(blockKey, toTiptap(data));
      },
      getSelection: () => ({
        getIsFocused: this.editor.isFocused,
        getIsCollapsed: this.editor.state.selection.empty,
      }),

      insertDecoration: (type, data) => {
        if (this.decorationCommandMap[type]) {
          this.decorationCommandMap[type](data);
        } else {
          console.error(`${type} decoration not supported`);
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
      setBlockType: type => {
        if (Object.values(HEADER_BLOCK).includes(type)) {
          this.blockTypeCommandMap.headings(headingTypeToLevelMap[type]);
        } else if (this.blockTypeCommandMap[type]) {
          this.blockTypeCommandMap[type]();
        } else {
          console.error(`${type} block type not supported`);
        }
      },
      deleteDecoration: type => {
        if (this.deleteDecorationCommandMap[type]) {
          this.deleteDecorationCommandMap[type]();
        } else {
          console.error(`delete ${type} decoration type not supported`);
        }
      },
      addImage: file => this.editor.commands.addImage(file),
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
    deleteBlock: () => {},
    undo: () => {},
    redo: () => {},
    setBlockType: () => {},
    setTextAlignment: () => {},
    _setSelection: () => {},
  };
}

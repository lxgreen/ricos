import { TiptapAPI } from '../../types';
import { capitalize } from 'lodash';
import {
  TranslationFunction,
  EditorPlugin,
  TextAlignment,
  RICOS_LINK_TYPE,
  RICOS_TEXT_COLOR_TYPE,
  RICOS_TEXT_HIGHLIGHT_TYPE,
  RICOS_MENTION_TYPE,
} from 'wix-rich-content-common';
import {
  generateId,
  HEADER_BLOCK,
  UNSTYLED,
  BULLET_LIST_TYPE,
  CODE_BLOCK_TYPE,
  BLOCKQUOTE,
  HEADINGS_TYPE,
  NUMBERED_LIST_TYPE,
} from 'ricos-content';
import { TO_TIPTAP_TYPE } from '../../consts';
import { Editor } from '@tiptap/core';

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
    private editor: Editor,
    private t: TranslationFunction,
    private plugins: EditorPlugin[]
  ) {
    this.editor = editor;
    this.t = t;
    this.plugins = plugins;
  }

  getContainer = () => {
    return this.editor?.options?.element;
  };

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
            selection: { from, to, $from },
          },
        } = this.editor;

        const marks = {};
        if (from === to) {
          $from.nodeBefore?.marks.forEach(({ type: { name } }) => {
            marks[name] = true;
          });
        } else {
          doc.nodesBetween(from, to, node => {
            node.marks.forEach(({ type: { name } }) => {
              marks[name] = true;
            });
          });
        }

        return marks[style];
      },
      insertBlock: (pluginType, data) => {
        const type = TO_TIPTAP_TYPE[pluginType];
        let id = '';
        if (type) {
          id = generateId();
          const attrs = { id, ...data };
          this.editor.commands.insertNode(type, attrs);
        } else {
          console.error(`No such plugin type ${pluginType}`);
        }
        return id;
      },
      deleteBlock: blockKey => {
        return this.editor.commands.deleteNode(blockKey);
      },
      findNodeByKey() {},
      setBlock: (blockKey, pluginType, data) => {
        return this.editor.commands.updateNodeById(blockKey, data);
      },
      getSelection: () => ({
        isFocused: this.editor.isFocused,
        isCollapsed: this.editor.state.selection.empty,
      }),

      insertDecoration: (type, data) => {
        const decorationCommandMap = {
          [RICOS_LINK_TYPE]: data => ({ command: 'setLink', args: { link: data } }),
          [RICOS_TEXT_COLOR_TYPE]: data => ({ command: 'setColor', args: data.color }),
          [RICOS_TEXT_HIGHLIGHT_TYPE]: data => ({ command: 'setHighlight', args: data.color }),
          [RICOS_MENTION_TYPE]: data => ({ command: 'insertMention', args: data.mention }),
        };
        if (decorationCommandMap[type]) {
          const { command, args } = decorationCommandMap[type](data);
          const editorCommand = this.editor.chain().focus();
          editorCommand[command](args).run();
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
        const blockTypeCommandMap = {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          [UNSTYLED]: () => this.editor.commands.setParagraph(),
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          [HEADINGS_TYPE]: level => this.editor.commands.toggleHeading({ level }),
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          [BLOCKQUOTE]: () => this.editor.commands.toggleBlockquote(),
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          [CODE_BLOCK_TYPE]: () => this.editor.commands.toggleCodeBlock(),
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          [BULLET_LIST_TYPE]: () => this.editor.commands.toggleBulletList(),
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          [NUMBERED_LIST_TYPE]: () => this.editor.commands.toggleOrderedList(),
        };
        if (Object.values(HEADER_BLOCK).includes(type)) {
          blockTypeCommandMap.headings(headingTypeToLevelMap[type]);
        } else if (blockTypeCommandMap[type]) {
          blockTypeCommandMap[type]();
        } else {
          console.error(`${type} block type not supported`);
        }
      },
      deleteDecoration: type => {
        const deleteDecorationCommandMap = {
          [RICOS_LINK_TYPE]: () => this.editor.commands.unsetLink(),
        };
        if (deleteDecorationCommandMap[type]) {
          deleteDecorationCommandMap[type]();
        } else {
          console.error(`delete ${type} decoration type not supported`);
        }
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
    scrollToBlock: _blockKey => {},
    isBlockInContent: _blockKey => false,
    toggleBlockOverlay: _blockKey => false,
    getBlockSpacing: () => 5,
    saveEditorState: () => {},
    loadEditorState: () => {},
    saveSelectionState: () => {},
    loadSelectionState: () => {},
    triggerDecoration: () => {},
    undo: () => {},
    redo: () => {},
    setBlockType: () => {},
    setTextAlignment: () => {},
    _setSelection: () => {},
    getDocumentStyle: () => undefined,
    getAnchorBlockInlineStyles: () => {
      return {};
    },
    updateDocumentStyle: () => {},
    clearSelectedBlocksInlineStyles: () => {},
    getWiredFontStyles: () => undefined,
    isAtomicBlockInSelection: () => false,
    getAnchorBlockType: () => 'paragraph',
  };
}

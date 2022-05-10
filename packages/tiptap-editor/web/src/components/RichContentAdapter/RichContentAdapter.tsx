import type { HtmlAttributes, TiptapAPI } from '../../types';
import { capitalize } from 'lodash';
import type {
  TranslationFunction,
  EditorPlugin,
  TextAlignment,
  RicosCustomStyles,
  ToolbarType,
} from 'wix-rich-content-common';
import {
  RICOS_LINK_TYPE,
  RICOS_TEXT_COLOR_TYPE,
  RICOS_TEXT_HIGHLIGHT_TYPE,
  RICOS_MENTION_TYPE,
  defaultFontSizes,
  defaultMobileFontSizes,
  DOC_STYLE_TYPES,
} from 'wix-rich-content-common';
import {
  generateId,
  HEADER_BLOCK,
  UNSTYLED,
  BULLET_LIST_TYPE,
  CODE_BLOCK_TYPE,
  BLOCKQUOTE,
  NUMBERED_LIST_TYPE,
} from 'ricos-content';
import { TO_TIPTAP_TYPE } from '../../consts';
import type { Editor } from '@tiptap/core';
import { findNodeById } from '../../helpers';
import { tiptapToDraft } from 'wix-tiptap-extensions';
import type { JSONContent } from '@tiptap/react';
import type { RicosEditorProps } from 'ricos-common';
import type { Node as ProseMirrorNode } from 'prosemirror-model';

export class RichContentAdapter implements TiptapAPI {
  constructor(
    public editor: Editor,
    private t: TranslationFunction,
    private plugins: EditorPlugin[]
  ) {
    this.editor = editor;
    this.t = t;
    this.plugins = plugins;
  }

  getContent: TiptapAPI['getContent'] = async (postId, forPublish, shouldRemoveErrorBlocks) => {
    throw new Error('Method not implemented.');
  };

  getContentPromise: TiptapAPI['getContentPromise'] = async ({ flush, publishId } = {}) => {
    throw new Error('Method not implemented.');
  };

  getContentTraits: TiptapAPI['getContentTraits'] = () => {
    throw new Error('Method not implemented.');
  };

  //@ts-ignore
  getToolbarProps: TiptapAPI['getToolbarProps'] = (type: ToolbarType) => {
    return { buttons: {} };
  };

  getContainer = () => {
    return this.editor?.options?.element;
  };

  getDraftContent = () => tiptapToDraft(this.editor.getJSON() as JSONContent);

  focus() {
    this.editor.commands.focus();
  }

  blur() {
    this.editor.commands.blur();
  }

  getHtmlAttributes(props: RicosEditorProps): HtmlAttributes {
    return {
      autoCapitalize: props.draftEditorSettings?.autoCapitalize || 'off',
      spellCheck: props.draftEditorSettings?.spellCheck ? 'true' : 'false',
      autoComplete: props.draftEditorSettings?.autoComplete || 'off',
      autoCorrect: props.draftEditorSettings?.autoCorrect || 'off',
      tabIndex: props.draftEditorSettings?.tabIndex || 0,
    };
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
          id = data.id || generateId();
          const attrs = { id, ...flatComponentState(data) };
          this.editor
            .chain()
            .focus()
            .insertContent([{ type: 'paragraph' }, { type, attrs }, { type: 'paragraph' }])
            .command(({ tr, commands }) => {
              const nodesWithPos = findNodeById(tr, id);
              if (nodesWithPos[0]) {
                const { pos } = nodesWithPos[0];
                commands.setNodeSelection(pos);
                return true;
              } else {
                console.error('Failed to find inserted node and focusing it');
                return false;
              }
            })
            .run();
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
        return this.editor.commands.setNodeAttrsById(blockKey, flatComponentState(data));
      },
      updateBlock: (blockKey, pluginType, data) => {
        return this.editor.commands.updateNodeAttrsById(blockKey, flatComponentState(data));
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
          [HEADER_BLOCK.ONE]: () => this.editor.commands.toggleHeading({ level: 1 }),
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          [HEADER_BLOCK.TWO]: () => this.editor.commands.toggleHeading({ level: 2 }),
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          [HEADER_BLOCK.THREE]: () => this.editor.commands.toggleHeading({ level: 3 }),
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          [HEADER_BLOCK.FOUR]: () => this.editor.commands.toggleHeading({ level: 4 }),
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          [HEADER_BLOCK.FIVE]: () => this.editor.commands.toggleHeading({ level: 5 }),
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          [HEADER_BLOCK.SIX]: () => this.editor.commands.toggleHeading({ level: 6 }),
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
        const currentSetBlockTypeCommand = blockTypeCommandMap[type];
        if (currentSetBlockTypeCommand) {
          currentSetBlockTypeCommand();
        } else {
          throw new Error(`${type} block type not supported`);
        }
      },
      isBlockTypeSelected: type => {
        const blockTypeActiveCommandMap = {
          [UNSTYLED]: () => this.editor.isActive('unstyled'),
          [HEADER_BLOCK.ONE]: () => this.editor.isActive('heading', { level: 1 }),
          [HEADER_BLOCK.TWO]: () => this.editor.isActive('heading', { level: 2 }),
          [HEADER_BLOCK.THREE]: () => this.editor.isActive('heading', { level: 3 }),
          [HEADER_BLOCK.FOUR]: () => this.editor.isActive('heading', { level: 4 }),
          [HEADER_BLOCK.FIVE]: () => this.editor.isActive('heading', { level: 5 }),
          [HEADER_BLOCK.SIX]: () => this.editor.isActive('heading', { level: 6 }),
          [CODE_BLOCK_TYPE]: () => this.editor.isActive('codeBlock'),
          [BLOCKQUOTE]: () => this.editor.isActive('blockquote'),
          [NUMBERED_LIST_TYPE]: () => this.editor.isActive('orderedList'),
          [BULLET_LIST_TYPE]: () => this.editor.isActive('bulletList'),
        };
        const currentBlockTypeActiveCommand = blockTypeActiveCommandMap[type];

        if (currentBlockTypeActiveCommand) {
          return currentBlockTypeActiveCommand();
        } else {
          throw new Error(`${type} block type not supported`);
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
      setTextAlignment: alignment => {
        this.editor.commands.setTextAlign(alignment);
      },
      undo: () => this.editor.commands.undo(),
      redo: () => this.editor.commands.redo(),
      insertText: text =>
        this.editor
          .chain()
          .focus()
          .command(({ tr }) => {
            tr.insertText(text);
            return true;
          })
          .run(),

      getAllBlocksKeys: () => {
        const keys: string[] = [];
        this.editor.state.doc.descendants((node: ProseMirrorNode) => {
          keys.push(node.attrs.id);
        });

        return keys;
      },
      getBlockComponentData: id => {
        const nodesWithPos = findNodeById(this.editor.state.tr, id);
        if (nodesWithPos[0]) {
          const { node } = nodesWithPos[0];
          return node.attrs;
        } else {
          console.error('Failed to find node and return its data');
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
    getTextAlignment: (): TextAlignment => {
      const {
        state: {
          doc,
          selection: { from, to },
        },
      } = this.editor;

      const textStyles: string[] = [];
      doc.nodesBetween(from, to, node => {
        const textAlignment = node.attrs?.textStyle?.textAlignment;
        if (textAlignment) {
          textStyles.push(textAlignment);
        }
      });
      let currentTextStyle = 'auto';
      if (textStyles[0]) {
        currentTextStyle = textStyles[0].toLowerCase();
      }
      return currentTextStyle as TextAlignment;
    },
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
    setBlockType: () => {},
    _setSelection: () => {},
    getDocumentStyle: () => undefined,
    getAnchorBlockInlineStyles: () => {
      return {};
    },
    getInlineStylesInSelection: () => {
      return {};
    },
    updateDocumentStyle: () => {},
    clearSelectedBlocksInlineStyles: () => {},
    getWiredFontStyles: (customStyles?: RicosCustomStyles, isMobile?: boolean) => {
      const fontStyles = {};
      Object.values(DOC_STYLE_TYPES).forEach((docType: string) => {
        fontStyles[docType] = {
          'font-size': isMobile ? defaultMobileFontSizes[docType] : defaultFontSizes[docType],
          'font-family': 'HelveticaNeue, Helvetica, Arial',
        };
      });
      return fontStyles;
    },
    isAtomicBlockInSelection: () => false,
    isTextBlockInSelection: () => true,
    getAnchorBlockType: () => 'paragraph',
    focus: () => {},
  };
}

const flatComponentState = data => {
  const { componentState, ...rest } = data;
  return { ...(rest || {}), ...(componentState || {}) };
};

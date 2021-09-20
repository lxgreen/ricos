import React from 'react';
import { TiptapAPI } from '../../types';
import Toolbar from '../../components/Toolbar';
import { capitalize } from 'lodash';
import {
  RICOS_DIVIDER_TYPE,
  DIVIDER_TYPE,
  TranslationFunction,
  EditorPlugin,
} from 'wix-rich-content-common';
import { draftBlockDataToTiptap } from '../../converters';
import { Editor } from '@tiptap/core';

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
        if (pluginType === RICOS_DIVIDER_TYPE || pluginType === DIVIDER_TYPE) {
          const attrs = draftBlockDataToTiptap(DIVIDER_TYPE, data);
          this.editor.commands.insertContent({
            type: DIVIDER_TYPE.toLowerCase(),
            attrs,
            content: [],
          });
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
    getTextAlignment: () => 'center',
    isBlockTypeSelected: () => false,
    isUndoStackEmpty: () => false,
    isRedoStackEmpty: () => false,
    hasLinkInSelection: () => false,
    getLinkDataInSelection: () => 'im a link!',
    getSelectedData: () => 'blah',
    getPluginsList: () => [],
    getBlockSpacing: () => 5,
    saveEditorState: () => {},
    loadEditorState: () => {},
    saveSelectionState: () => {},
    loadSelectionState: () => {},
    insertDecoration: () => {},
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

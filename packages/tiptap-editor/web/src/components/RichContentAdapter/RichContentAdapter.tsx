import React from 'react';
import { TiptapAPI } from '../../types';
import Toolbar from '../../components/Toolbar';
import { capitalize } from 'lodash';
import { RICOS_DIVIDER_TYPE, DIVIDER_TYPE } from 'wix-rich-content-common';
import { draftBlockDataToTiptap } from '../../converters';

import { Editor } from '@tiptap/core';

// todo : should change to RichContentInterface
export class RichContentAdapter implements TiptapAPI {
  constructor(private editor: Editor) {
    this.editor = editor;
  }

  focus() {
    this.editor.commands.focus();
  }

  blur() {
    this.editor.commands.blur();
  }

  getEditorCommands() {
    return {
      ...this.editor.commands,
      toggleInlineStyle: inlineStyle => {
        const editorCommand = this.editor.chain().focus();
        const styleName = `toggle${capitalize(inlineStyle)}`;
        editorCommand[styleName]().run();
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
      },
      findNodeByKey() {},
      // setBlock: (blockKey, pluginType, data) => {
      //   editor.commands.updateAttributes('heading', { level: 1 })
      // },
      getSelection: {
        getIsFocused: this.editor.isFocused,
        getIsCollapsed: this.editor.state.selection.empty,
      },
    };
  }

  getToolbars() {
    return {
      MobileToolbar: () => <Toolbar editor={this.editor} />,
      TextToolbar: () => <Toolbar editor={this.editor} />,
    };
  }

  getToolbarProps() {
    return {};
  }

  destroy!: () => null;
}

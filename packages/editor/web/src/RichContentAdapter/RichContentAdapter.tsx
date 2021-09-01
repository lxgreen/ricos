import React from 'react';
// import Toolbar from '../../../../tiptap-editor/web/src/components/Toolbar';
import { capitalize, camelCase } from 'lodash';
import { RICOS_DIVIDER_TYPE, DIVIDER_TYPE } from 'wix-rich-content-common';
import { draftBlockDataToTiptap } from '../../../../tiptap-editor/web/src/converters';
import { TO_RICOS_PLUGIN_TYPE_MAP } from '../RichContentEditor/EditorCommands';

// TODO: should change to RichContentInterface
// TODO: this class should move out from this package (maybe to editor package)
export class RichContentAdapter {
  constructor(private editor) {
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
        const attrs = draftBlockDataToTiptap(pluginType, data);
        this.editor.commands.insertContent({
          type: camelCase(TO_RICOS_PLUGIN_TYPE_MAP[pluginType]),
          attrs,
          content: [],
        });
      },
      findNodeByKey() {},
      // setBlock: (blockKey, pluginType, data) => {
      //   editor.commands.updateAttributes('heading', { level: 1 })
      // },
    };
  }

  getToolbars() {
    return {
      // MobileToolbar: () => <Toolbar editor={this.editor} />,
      // TextToolbar: () => <Toolbar editor={this.editor} />,
      MobileToolbar: () => null,
      TextToolbar: () => null,
    };
  }

  getToolbarProps() {
    return {};
  }

  destroy!: () => null;
}

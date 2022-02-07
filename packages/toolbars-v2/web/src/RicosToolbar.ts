import type { IToolbarItem, ToolbarSpec } from './types';
import type { EditorCommands } from 'wix-rich-content-common';
import EventEmitter from './lib/EventEmitter';
import { Content } from './Content';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ToolbarItemCreator = (content: Content, editorCommands: EditorCommands) => IToolbarItem;

type RicosToolbarProps = {
  toolbarItemCreators: ToolbarItemCreator[];
  content: Content;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  editorCommands: any;
};

export class RicosToolbar extends EventEmitter {
  static EVENTS = {
    toolbarItemsCreated: 'toolbarsCreated',
  };

  editorCommands;

  private toolbarItems: IToolbarItem[] = [];

  private toolbarItemCreators: ToolbarItemCreator[];

  private content: Content;

  static create({ toolbarItemCreators, content, editorCommands }: RicosToolbarProps) {
    return new RicosToolbar({ toolbarItemCreators, content, editorCommands });
  }

  private constructor({ toolbarItemCreators, content, editorCommands }: RicosToolbarProps) {
    super();
    this.toolbarItems = [];
    this.toolbarItemCreators = toolbarItemCreators;
    this.content = content;
    this.editorCommands = editorCommands;

    this.toolbarItems = this.createToolbarItems();

    content.on(Content.EVENTS.contentChangeEvent, () => {
      const previousToolbarItems = Object.freeze(this.toolbarItems);

      this.toolbarItems = this.createToolbarItems();

      this.emit(RicosToolbar.EVENTS.toolbarItemsCreated, {
        previousToolbarItems,
        toolbarItems: Object.freeze(this.toolbarItems),
      });
    });
  }

  private createToolbarItems() {
    return this.toolbarItemCreators.map(toolbarItemCreator => {
      return toolbarItemCreator(this.content, this.editorCommands);
    });
  }

  getItems() {
    return this.toolbarItems;
  }

  getItemsBy(spec: ToolbarSpec) {
    return this.toolbarItems.filter(spec);
  }

  getItemById(id) {
    return this.toolbarItems.find(item => item.id === id);
  }

  setEditorCommands(editorCommands) {
    this.editorCommands = editorCommands;
  }
}

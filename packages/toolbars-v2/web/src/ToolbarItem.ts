import type { IToolbarItemConfig } from './types';
import type { Content } from './Content';
import type { ToolbarItemCreator } from './RicosToolbar';

export class ToolbarItem {
  static create(toolbarItemConfig: IToolbarItemConfig): ToolbarItemCreator {
    return (content: Content, editorCommands) => {
      const toolbarItem = {
        id: toolbarItemConfig.id,
        presentation: toolbarItemConfig.presentation,
        type: toolbarItemConfig.type,
        attributes: {},
        commands: {},
      };

      Object.keys(toolbarItemConfig.commands).forEach(commandName => {
        toolbarItem.commands[commandName] = toolbarItemConfig.commands[commandName]({
          attributes: toolbarItem.attributes,
          editorCommands,
        });
      });

      Object.keys(toolbarItemConfig.attributes).forEach(attributeName => {
        toolbarItem.attributes[attributeName] = content.resolve(
          toolbarItemConfig.attributes[attributeName]
        );
      });

      return toolbarItem;
    };
  }
}

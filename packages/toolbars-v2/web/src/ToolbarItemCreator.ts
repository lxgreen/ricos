import type { IToolbarItemConfig } from './types';
import type { Content } from './Content';
import type { ToolbarItemCreator as ToolbarItemCreatorType } from './RicosToolbar';

export class ToolbarItemCreator {
  static create(toolbarItemConfig: IToolbarItemConfig): ToolbarItemCreatorType {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (content: Content, editorCommands: any) => {
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

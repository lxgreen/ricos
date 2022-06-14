import type { ReactElement } from 'react';
import type {
  DataHookDecoratedToolbarButtons,
  ToolbarButtonsCollection,
} from './toolbarButtonsTypes';
import type { ToolbarButton } from './ToolbarButton';

export class ToolbarButtons implements DataHookDecoratedToolbarButtons, ToolbarButtonsCollection {
  private readonly toolbarButtons: ToolbarButton[];

  constructor(toolbarButtons: ToolbarButton[]) {
    this.toolbarButtons = toolbarButtons;
  }

  getButtonByIndex(index: number): ToolbarButton {
    return this.toolbarButtons[index];
  }

  isEmpty() {
    return this.toolbarButtons.length === 0;
  }

  addButton(toolbarButton: ToolbarButton) {
    this.toolbarButtons.push(toolbarButton);
  }

  getButtonsElements(): ReactElement[] {
    return this.toolbarButtons.map(toolbarButton => toolbarButton.getButtonElement());
  }

  getButtonsElementsWithDataHook(): ReactElement[] {
    return this.toolbarButtons.map(toolbarButton => toolbarButton.getButtonElementWithDataHook());
  }
}

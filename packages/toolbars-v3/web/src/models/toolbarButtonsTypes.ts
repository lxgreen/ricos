import type { ReactElement } from 'react';
import type { ToolbarButton } from './index';

export interface DataHookDecoratedToolbarButton {
  getButtonElement: () => ReactElement;
  getButtonElementWithDataHook: () => ReactElement;
}

export interface DataHookDecoratedToolbarButtons {
  getButtonsElements: () => ReactElement[];
  getButtonsElementsWithDataHook: () => ReactElement[];
}

export interface ToolbarButtonsCollection {
  getButtonByIndex: (number) => ToolbarButton;
  isEmpty: () => boolean;
  addButton: (ToolbarButton) => void;
}

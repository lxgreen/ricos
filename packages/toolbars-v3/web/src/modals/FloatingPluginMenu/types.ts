import type { AddButton } from 'wix-rich-content-common';

export interface IPluginMenuButtonClick {
  (modal: AddButton['modal'], command: AddButton['command']): void;
}

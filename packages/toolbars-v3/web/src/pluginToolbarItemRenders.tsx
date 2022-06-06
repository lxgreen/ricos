import React from 'react';
import { ToggleButton, SettingsButton } from './components/buttons';
import { PLUGIN_TOOLBAR_BUTTON_ID } from 'wix-rich-content-editor-common';

export const pluginToolbarItemsRenders = {
  [PLUGIN_TOOLBAR_BUTTON_ID.DELETE]: toolbarItem => {
    return <ToggleButton onClick={e => toolbarItem.commands.delete(e)} toolbarItem={toolbarItem} />;
  },
  [PLUGIN_TOOLBAR_BUTTON_ID.ALIGN_LEFT]: toolbarItem => {
    return (
      <ToggleButton onClick={e => toolbarItem.commands.alignLeft(e)} toolbarItem={toolbarItem} />
    );
  },
  [PLUGIN_TOOLBAR_BUTTON_ID.ALIGN_RIGHT]: toolbarItem => {
    return (
      <ToggleButton onClick={e => toolbarItem.commands.alignRight(e)} toolbarItem={toolbarItem} />
    );
  },
  [PLUGIN_TOOLBAR_BUTTON_ID.ALIGN_CENTER]: toolbarItem => {
    return (
      <ToggleButton onClick={e => toolbarItem.commands.alignCenter(e)} toolbarItem={toolbarItem} />
    );
  },
  [PLUGIN_TOOLBAR_BUTTON_ID.SETTINGS]: toolbarItem => {
    return <SettingsButton toolbarItem={toolbarItem} />;
  },
};

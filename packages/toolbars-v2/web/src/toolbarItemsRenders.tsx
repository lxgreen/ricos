import React from 'react';
import { ToggleButton } from './components/buttons/ToggleButton';

export const toolbarItemsRenders = {
  bold: toolbarItem => {
    return <ToggleButton toolbarItem={toolbarItem} />;
  },
  italic: toolbarItem => {
    return <ToggleButton toolbarItem={toolbarItem} />;
  },
  underline: toolbarItem => {
    return <ToggleButton toolbarItem={toolbarItem} />;
  },
};
